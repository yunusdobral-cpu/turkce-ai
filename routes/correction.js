const express = require('express');
const OpenAI = require('openai');

const router = express.Router();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const langNames = {
  en: 'English', es: 'Spanish', ar: 'Arabic',
  ru: 'Russian', de: 'German', fr: 'French', tr: 'Turkish'
};

router.post('/', async (req, res) => {
  const { text, sourceLang, intended } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const lang = langNames[sourceLang] || 'English';

  const systemPrompt = `You are a Turkish language correction assistant. The user wants to express something in Turkish. They will provide:
1. What they want to say (in ${lang})
2. Their Turkish attempt

Your job:
- Provide the correct Turkish translation
- Identify every mistake in their attempt
- Explain each mistake in ${lang}

IMPORTANT: Respond ONLY with valid JSON in this exact format, no markdown, no code blocks:
{
  "corrected": "the correct Turkish sentence",
  "translation": "what the sentence means in ${lang}",
  "mistakes": [
    {
      "wrong": "the incorrect part",
      "correct": "what it should be",
      "explanation": "explanation in ${lang}"
    }
  ],
  "score": 85,
  "praise": "short encouraging message in ${lang}"
}

If the Turkish attempt is perfect, return empty mistakes array and score 100.
The score should be 0-100 based on accuracy.`;

  const userMessage = intended
    ? `I want to say in Turkish: "${intended}"\nMy Turkish attempt: "${text}"`
    : `Please correct this Turkish text: "${text}"`;

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 1024,
      temperature: 0.3,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage }
      ]
    });

    const content = completion.choices[0]?.message?.content || '';

    try {
      const cleaned = content.replace(/```json\s*/g, '').replace(/```\s*/g, '').trim();
      const result = JSON.parse(cleaned);
      res.json(result);
    } catch (parseErr) {
      res.json({
        corrected: content,
        translation: '',
        mistakes: [],
        score: 0,
        praise: ''
      });
    }
  } catch (error) {
    console.error('Correction error:', error);
    res.status(500).json({ error: 'AI could not process the correction.' });
  }
});

module.exports = router;
