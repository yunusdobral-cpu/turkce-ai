const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const adminAuth = require('../middleware/auth');

const router = express.Router();
const DATA_FILE = path.join(__dirname, '..', 'data', 'characters.json');

function readCharacters() {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

function writeCharacters(characters) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(characters, null, 2), 'utf-8');
}

// List all characters
router.get('/', (req, res) => {
  const characters = readCharacters();
  const safe = characters.map(({ systemPrompt, ...rest }) => rest);
  res.json(safe);
});

// Get single character
router.get('/:id', (req, res) => {
  const characters = readCharacters();
  const char = characters.find(c => c.id === req.params.id);
  if (!char) return res.status(404).json({ error: 'Öğretmen bulunamadı / Teacher not found' });
  const { systemPrompt, ...safe } = char;
  res.json(safe);
});

// Get single character (admin - includes systemPrompt)
router.get('/:id/full', adminAuth, (req, res) => {
  const characters = readCharacters();
  const char = characters.find(c => c.id === req.params.id);
  if (!char) return res.status(404).json({ error: 'Kişilik bulunamadı' });
  res.json(char);
});

// Create character
router.post('/', adminAuth, (req, res) => {
  const characters = readCharacters();
  const { name, avatar, role, description, descriptionEn, greeting, personality, tone, systemPrompt, topics, tags } = req.body;

  if (!name || !personality) {
    return res.status(400).json({ error: 'Ad ve kişilik özellikleri zorunludur' });
  }

  const newChar = {
    id: uuidv4(),
    name,
    avatar: avatar || '',
    role: role || '',
    description: description || '',
    descriptionEn: descriptionEn || '',
    greeting: greeting || `Merhaba! Ben ${name}. Nasıl yardımcı olabilirim?`,
    personality,
    tone: tone || 'casual',
    systemPrompt: systemPrompt || '',
    topics: topics || [],
    tags: tags || [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  characters.push(newChar);
  writeCharacters(characters);
  res.status(201).json(newChar);
});

// Update character
router.put('/:id', adminAuth, (req, res) => {
  const characters = readCharacters();
  const index = characters.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Kişilik bulunamadı' });

  const { name, avatar, role, description, descriptionEn, greeting, personality, tone, systemPrompt, topics, tags } = req.body;

  characters[index] = {
    ...characters[index],
    ...(name !== undefined && { name }),
    ...(avatar !== undefined && { avatar }),
    ...(role !== undefined && { role }),
    ...(description !== undefined && { description }),
    ...(descriptionEn !== undefined && { descriptionEn }),
    ...(greeting !== undefined && { greeting }),
    ...(personality !== undefined && { personality }),
    ...(tone !== undefined && { tone }),
    ...(systemPrompt !== undefined && { systemPrompt }),
    ...(topics !== undefined && { topics }),
    ...(tags !== undefined && { tags }),
    updatedAt: new Date().toISOString()
  };

  writeCharacters(characters);
  res.json(characters[index]);
});

// Delete character
router.delete('/:id', adminAuth, (req, res) => {
  const characters = readCharacters();
  const index = characters.findIndex(c => c.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Kişilik bulunamadı' });

  characters.splice(index, 1);
  writeCharacters(characters);
  res.json({ success: true });
});

module.exports = router;
