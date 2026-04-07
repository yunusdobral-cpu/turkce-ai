const express = require('express');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '..', 'data', 'characters.json');

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const sessions = new Map();
const MAX_MESSAGES = 50;

// ===== Public Chatroom =====
const chatroomMessages = []; // { id, nickname, text, createdAt }
const MAX_CHATROOM_MESSAGES = 200;

// Clean up messages older than 24 hours
setInterval(() => {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  while (chatroomMessages.length > 0 && chatroomMessages[0].createdAt < cutoff) {
    chatroomMessages.shift();
  }
}, 60 * 1000);

// GET /api/chat/room — get all messages
router.get('/room', (req, res) => {
  const cutoff = Date.now() - 24 * 60 * 60 * 1000;
  const messages = chatroomMessages.filter(m => m.createdAt >= cutoff);
  res.json(messages);
});

// POST /api/chat/room — send a message
router.post('/room', (req, res) => {
  const { nickname, text } = req.body;
  if (!nickname || !nickname.trim()) return res.status(400).json({ error: 'Nickname gerekli' });
  if (!text || !text.trim()) return res.status(400).json({ error: 'Mesaj gerekli' });

  const msg = {
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    nickname: nickname.trim().substring(0, 20),
    text: text.trim().substring(0, 500),
    createdAt: Date.now()
  };

  chatroomMessages.push(msg);
  if (chatroomMessages.length > MAX_CHATROOM_MESSAGES) {
    chatroomMessages.shift();
  }

  res.json(msg);
});

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
