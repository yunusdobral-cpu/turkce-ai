require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const charactersRouter = require('./routes/characters');
const chatRouter = require('./routes/chat');
const forumRouter = require('./routes/forum');
const authRouter = require('./routes/auth');
const correctionRouter = require('./routes/correction');
const streakRouter = require('./routes/streak');

const app = express();
const PORT = process.env.PORT || 3000;
const BUILD_VERSION = Date.now().toString(36);

app.use(cors());
app.use(express.json({ limit: '5mb' }));
// Static files: cache CSS/JS for 1 hour, skip index.html (handled by SPA fallback)
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1h',
  index: false
}));

app.use('/api/characters', charactersRouter);
app.use('/api/chat', chatRouter);
app.use('/api/forum', forumRouter);
app.use('/api/auth', authRouter);
app.use('/api/correction', correctionRouter);
app.use('/api/streak', streakRouter);

// SPA fallback — inject cache-busting version into HTML
const indexHtmlPath = path.join(__dirname, 'public', 'index.html');
let indexHtmlCache = null;

function getIndexHtml() {
  if (!indexHtmlCache) {
    const raw = fs.readFileSync(indexHtmlPath, 'utf-8');
    indexHtmlCache = raw
      .replace(/(\.css)(")/g, `$1?v=${BUILD_VERSION}$2`)
      .replace(/(\.js)(")/g, `$1?v=${BUILD_VERSION}$2`);
  }
  return indexHtmlCache;
}

app.get('*', (req, res) => {
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Content-Type', 'text/html');
  res.send(getIndexHtml());
});

app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor`);
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your-api-key-here') {
    console.warn('UYARI: .env dosyasında geçerli bir OPENAI_API_KEY ayarlayın!');
  }
});
