const express = require('express');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
const { supabaseAdmin } = require('../lib/supabase');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '..', 'data', 'characters.json');

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const sessions = new Map();
const MAX_MESSAGES = 50;

// IP-based rate limiting for non-authenticated users
const ipMessageCounts = new Map(); // ip -> { count, resetAt }
const GUEST_MESSAGE_LIMIT = 10;

function getClientIp(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || req.ip;
}

function checkGuestLimit(ip) {
  const now = Date.now();
  const record = ipMessageCounts.get(ip);

  if (!record || now > record.resetAt) {
    // New day — reset
    const tomorrow = new Date();
    tomorrow.setHours(24, 0, 0, 0);
    ipMessageCounts.set(ip, { count: 1, resetAt: tomorrow.getTime() });
    return true;
  }

  if (record.count >= GUEST_MESSAGE_LIMIT) {
    return false;
  }

  record.count++;
  return true;
}

// Clean up old IP records daily
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of ipMessageCounts) {
    if (now > record.resetAt) {
      ipMessageCounts.delete(ip);
    }
  }
}, 60 * 60 * 1000);

const toneDirectives = {
  formal: 'Use a polite, structured teaching style.',
  casual: 'Use a friendly, relaxed teaching style.',
  humorous: 'Use humor and fun examples while teaching.',
  dramatic: 'Use vivid, engaging storytelling in your teaching.',
  poetic: 'Use literary, expressive language in your teaching.'
};

function readCharacters() {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

function buildSystemPrompt(character, topicId) {
  const topic = (character.topics || []).find(t => t.id === topicId);
  const topicContext = topic
    ? `\n\nSEÇİLEN KONU / SELECTED TOPIC: "${topic.name}"\nKonu açıklaması: ${topic.description}\nBu konuya odaklan. İlgili örnekler, alıştırmalar ve açıklamalar ver.`
    : '\n\nSerbest sohbet modu. Öğrencinin istediği konuda yardımcı ol.';

  // Public chat room: Turkish only
  if (topicId === 'public-chat') {
    return `${character.systemPrompt}

Ton: ${toneDirectives[character.tone] || toneDirectives.formal}

Serbest sohbet modu. Öğrencinin istediği konuda yardımcı ol.

GENEL KURALLAR:
- HER ZAMAN SADECE TÜRKÇE YAZ. Kesinlikle İngilizce kullanma.
- Öğrenciyi motive et ve cesaretlendir.
- Öğrencinin seviyesini anlamaya çalış ve ona göre ayarla.
- Yanıtlarını kısa ve doğal tut (1-3 paragraf), çok uzun yanıtlar verme.
- Zor kelimelerin yanına parantez içinde basit Türkçe açıklama ekle.`;
  }

  return `${character.systemPrompt}

Ton: ${toneDirectives[character.tone] || toneDirectives.formal}
${topicContext}

GENEL KURALLAR:
- Açıklamaları İngilizce yap, Türkçe örnekler ver.
- Türkçe kelimelerin/cümlelerin yanına parantez içinde İngilizce karşılıklarını yaz.
- Öğrenciyi motive et ve cesaretlendir.
- Öğrencinin seviyesini anlamaya çalış ve ona göre ayarla.
- Yanıtlarını kısa ve doğal tut (1-3 paragraf), çok uzun yanıtlar verme.`;
}

// Start new session
router.post('/new', (req, res) => {
  const { characterId } = req.body;
  const characters = readCharacters();
  const character = characters.find(c => c.id === characterId);
  if (!character) return res.status(404).json({ error: 'Öğretmen bulunamadı / Teacher not found' });

  const sessionId = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  sessions.set(sessionId, {
    characterId,
    messages: [],
    lastActivity: Date.now()
  });

  res.json({ sessionId, greeting: character.greeting });
});

// Send message (streaming)
router.post('/', async (req, res) => {
  const { sessionId, characterId, message, topicId } = req.body;

  // Check if user is authenticated
  let isAuthenticated = false;
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.slice(7);
      const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
      if (user && !error) isAuthenticated = true;
    } catch (e) {}
  }

  // Rate limit for guests
  if (!isAuthenticated) {
    const ip = getClientIp(req);
    if (!checkGuestLimit(ip)) {
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.write(`data: ${JSON.stringify({ type: 'error', content: 'RATE_LIMIT' })}\n\n`);
      res.end();
      return;
    }
  }

  const characters = readCharacters();
  const character = characters.find(c => c.id === characterId);
  if (!character) return res.status(404).json({ error: 'Öğretmen bulunamadı / Teacher not found' });

  let session = sessions.get(sessionId);
  if (!session) {
    session = { characterId, messages: [] };
    sessions.set(sessionId, session);
  }

  session.lastActivity = Date.now();
  session.messages.push({ role: 'user', content: message });

  if (session.messages.length > MAX_MESSAGES) {
    session.messages = session.messages.slice(-MAX_MESSAGES);
  }

  const systemPrompt = buildSystemPrompt(character, topicId);

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  try {
    const stream = await client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 1024,
      messages: [
        { role: 'system', content: systemPrompt },
        ...session.messages
      ],
      stream: true
    });

    let fullResponse = '';

    for await (const chunk of stream) {
      const text = chunk.choices[0]?.delta?.content || '';
      if (text) {
        fullResponse += text;
        res.write(`data: ${JSON.stringify({ type: 'text', content: text })}\n\n`);
      }
    }

    session.messages.push({ role: 'assistant', content: fullResponse });
    res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`);
    res.end();

  } catch (error) {
    console.error('Chat error:', error);
    res.write(`data: ${JSON.stringify({ type: 'error', content: 'AI yanıt veremedi. / AI could not respond. Please try again.' })}\n\n`);
    res.end();
  }
});

// Delete session
router.delete('/:sessionId', (req, res) => {
  sessions.delete(req.params.sessionId);
  res.json({ success: true });
});

// Clean up old sessions
setInterval(() => {
  const thirtyMinAgo = Date.now() - 30 * 60 * 1000;
  for (const [id, session] of sessions) {
    if (session.lastActivity && session.lastActivity < thirtyMinAgo) {
      sessions.delete(id);
    }
  }
}, 30 * 60 * 1000);

module.exports = router;
