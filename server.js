require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const charactersRouter = require('./routes/characters');
const chatRouter = require('./routes/chat');
const forumRouter = require('./routes/forum');
const authRouter = require('./routes/auth');
const correctionRouter = require('./routes/correction');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/characters', charactersRouter);
app.use('/api/chat', chatRouter);
app.use('/api/forum', forumRouter);
app.use('/api/auth', authRouter);
app.use('/api/correction', correctionRouter);

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-api-key-here') {
    console.warn('UYARI: .env dosyasında geçerli bir OPENAI_API_KEY ayarlayın!');
  }
});
