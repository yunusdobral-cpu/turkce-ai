const WORDS = [
  // Aile & İnsanlar
  { tr: 'anne', en: 'mother' },
  { tr: 'baba', en: 'father' },
  { tr: 'kardeş', en: 'sibling' },
  { tr: 'çocuk', en: 'child' },
  { tr: 'arkadaş', en: 'friend' },
  { tr: 'öğretmen', en: 'teacher' },
  { tr: 'doktor', en: 'doctor' },
  { tr: 'kadın', en: 'woman' },
  { tr: 'erkek', en: 'man' },
  { tr: 'aile', en: 'family' },
  // Ev & Nesneler
  { tr: 'ev', en: 'house' },
  { tr: 'masa', en: 'table' },
  { tr: 'sandalye', en: 'chair' },
  { tr: 'pencere', en: 'window' },
  { tr: 'kapı', en: 'door' },
  { tr: 'kitap', en: 'book' },
  { tr: 'telefon', en: 'phone' },
  // Yiyecek & İçecek
  { tr: 'su', en: 'water' },
  { tr: 'ekmek', en: 'bread' },
  { tr: 'yemek', en: 'food' },
  { tr: 'çay', en: 'tea' },
  { tr: 'kahve', en: 'coffee' },
  { tr: 'süt', en: 'milk' },
  { tr: 'elma', en: 'apple' },
  { tr: 'et', en: 'meat' },
  // Zaman
  { tr: 'gün', en: 'day' },
  { tr: 'gece', en: 'night' },
  { tr: 'sabah', en: 'morning' },
  { tr: 'akşam', en: 'evening' },
  { tr: 'hafta', en: 'week' },
  { tr: 'yıl', en: 'year' },
  // Yerler
  { tr: 'okul', en: 'school' },
  { tr: 'hastane', en: 'hospital' },
  { tr: 'restoran', en: 'restaurant' },
  { tr: 'şehir', en: 'city' },
  { tr: 'ülke', en: 'country' },
  { tr: 'sokak', en: 'street' },
  { tr: 'park', en: 'park' },
  // Ulaşım
  { tr: 'araba', en: 'car' },
  { tr: 'otobüs', en: 'bus' },
  { tr: 'tren', en: 'train' },
  { tr: 'uçak', en: 'plane' },
  // Doğa
  { tr: 'güneş', en: 'sun' },
  { tr: 'deniz', en: 'sea' },
  { tr: 'dağ', en: 'mountain' },
  { tr: 'ağaç', en: 'tree' },
  { tr: 'çiçek', en: 'flower' },
  { tr: 'hava', en: 'weather' },
  // Hayvanlar
  { tr: 'köpek', en: 'dog' },
  { tr: 'kedi', en: 'cat' },
  { tr: 'kuş', en: 'bird' },
  { tr: 'balık', en: 'fish' },
  { tr: 'at', en: 'horse' },
  // Sıfatlar
  { tr: 'büyük', en: 'big' },
  { tr: 'küçük', en: 'small' },
  { tr: 'yeni', en: 'new' },
  { tr: 'eski', en: 'old' },
  { tr: 'güzel', en: 'beautiful' },
  { tr: 'iyi', en: 'good' },
  { tr: 'kötü', en: 'bad' },
  { tr: 'hızlı', en: 'fast' },
  { tr: 'yavaş', en: 'slow' },
  { tr: 'sıcak', en: 'hot' },
  { tr: 'soğuk', en: 'cold' },
  { tr: 'uzun', en: 'long' },
  { tr: 'kısa', en: 'short' },
  // Fiiller (sade halde)
  { tr: 'git', en: 'go' },
  { tr: 'gel', en: 'come' },
  { tr: 'ye', en: 'eat' },
  { tr: 'iç', en: 'drink' },
  { tr: 'uyu', en: 'sleep' },
  { tr: 'konuş', en: 'speak' },
  { tr: 'oku', en: 'read' },
  { tr: 'yaz', en: 'write' },
  { tr: 'öğren', en: 'learn' },
  { tr: 'çalış', en: 'work' },
  { tr: 'oyna', en: 'play' },
  { tr: 'gül', en: 'laugh' },
  // Sayılar & Renkler
  { tr: 'bir', en: 'one' },
  { tr: 'iki', en: 'two' },
  { tr: 'üç', en: 'three' },
  { tr: 'beş', en: 'five' },
  { tr: 'on', en: 'ten' },
  { tr: 'kırmızı', en: 'red' },
  { tr: 'mavi', en: 'blue' },
  { tr: 'yeşil', en: 'green' },
  { tr: 'sarı', en: 'yellow' },
  { tr: 'siyah', en: 'black' },
  { tr: 'beyaz', en: 'white' },
  // Diğer
  { tr: 'para', en: 'money' },
  { tr: 'zaman', en: 'time' },
  { tr: 'yol', en: 'road' },
  { tr: 'dil', en: 'language' },
  { tr: 'soru', en: 'question' },
  { tr: 'cevap', en: 'answer' },
  { tr: 'isim', en: 'name' },
  { tr: 'renk', en: 'color' },
];

const ROUND_DURATION = 12000;
const TOTAL_ROUNDS = 10;
const BOT_NAMES = ['🤖 Ayla', '🤖 Kerem', '🤖 Zeynep', '🤖 Can', '🤖 Elif', '🤖 Burak'];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function getScores(room) {
  return room.players.map(p => ({ id: p.id, name: p.name, score: p.score }));
}

function checkAnswer(submitted, correct) {
  const s = submitted.toLowerCase().trim();
  const variants = [];
  correct.toLowerCase().split('/').forEach(v => {
    v.split(' or ').forEach(sub => variants.push(sub.trim()));
  });
  return variants.includes(s);
}

module.exports = function (io) {
  const rooms = new Map();
  const queue = [];

  function getOpenRooms() {
    return Array.from(rooms.values())
      .filter(r => r.state === 'lobby' && r.players.length > 0)
      .map(r => ({ code: r.code, hostName: r.players[0]?.name || 'Anonim', playerCount: r.players.length }));
  }

  function broadcastOpenRooms() {
    io.emit('open_rooms', getOpenRooms());
  }

  function addBot(room) {
    const name = BOT_NAMES[Math.floor(Math.random() * BOT_NAMES.length)];
    const bot = { id: 'bot_' + Date.now(), name, score: 0, isBot: true, answerTimer: null };
    room.players.push(bot);
    return bot;
  }

  function scheduleBotAnswer(room) {
    room.players.filter(p => p.isBot).forEach(bot => {
      if (bot.answerTimer) clearTimeout(bot.answerTimer);
      const willAnswer = Math.random() < 0.62;
      if (!willAnswer) return;
      const delay = 2800 + Math.random() * 7200;
      bot.answerTimer = setTimeout(() => {
        if (room.currentWordAnswered || room.state !== 'playing') return;
        room.currentWordAnswered = true;
        clearTimeout(room.roundTimer);
        bot.score++;
        io.to(room.code).emit('round_win', {
          winnerId: bot.id,
          winnerName: bot.name,
          answer: room.currentWord.en,
          scores: getScores(room),
        });
        scheduleNext(room);
      }, delay);
    });
  }

  function createRoom(isPrivate = false) {
    let code;
    do { code = generateCode(); } while (rooms.has(code));
    const room = {
      code, isPrivate,
      players: [],
      state: 'lobby',
      words: shuffle(WORDS).slice(0, TOTAL_ROUNDS),
      round: 0,
      totalRounds: TOTAL_ROUNDS,
      currentWord: null,
      currentWordAnswered: false,
      roundTimer: null,
    };
    rooms.set(code, room);
    return room;
  }

  function startCountdown(room) {
    room.state = 'countdown';
    let count = 3;
    io.to(room.code).emit('countdown', { n: count });
    const timer = setInterval(() => {
      count--;
      if (count > 0) {
        io.to(room.code).emit('countdown', { n: count });
      } else {
        clearInterval(timer);
        startRound(room);
      }
    }, 1000);
  }

  function startRound(room) {
    room.state = 'playing';
    room.round++;
    room.currentWordAnswered = false;
    const word = room.words[room.round - 1];
    room.currentWord = word;
    io.to(room.code).emit('round_start', {
      word: word.tr,
      roundNum: room.round,
      total: room.totalRounds,
      duration: ROUND_DURATION,
    });
    scheduleBotAnswer(room);
    room.roundTimer = setTimeout(() => {
      if (!room.currentWordAnswered) {
        room.currentWordAnswered = true;
        io.to(room.code).emit('round_timeout', {
          word: word.tr,
          answer: word.en,
          scores: getScores(room),
        });
        scheduleNext(room);
      }
    }, ROUND_DURATION);
  }

  function scheduleNext(room) {
    setTimeout(() => {
      if (room.round >= room.totalRounds) endGame(room);
      else startRound(room);
    }, 2500);
  }

  function endGame(room) {
    room.state = 'finished';
    if (room.roundTimer) clearTimeout(room.roundTimer);
    room.players.filter(p => p.isBot).forEach(bot => { if (bot.answerTimer) clearTimeout(bot.answerTimer); });
    const sorted = [...room.players].sort((a, b) => b.score - a.score);
    io.to(room.code).emit('game_over', {
      results: sorted.map((p, i) => ({ rank: i + 1, id: p.id, name: p.name, score: p.score })),
    });
    broadcastOpenRooms();
    setTimeout(() => rooms.delete(room.code), 120000);
  }

  function handleLeave(socket) {
    const room = rooms.get(socket.roomCode);
    if (!room) return;
    room.players = room.players.filter(p => p.id !== socket.id);
    socket.leave(room.code);
    socket.roomCode = null;
    if (room.players.length === 0) {
      if (room.roundTimer) clearTimeout(room.roundTimer);
      rooms.delete(room.code);
      broadcastOpenRooms();
      return;
    }
    io.to(room.code).emit('player_left', {
      name: socket.playerName,
      players: room.players.map(p => ({ name: p.name })),
    });
    broadcastOpenRooms();
    if (['playing', 'countdown'].includes(room.state) && room.players.length < 2) {
      if (room.roundTimer) clearTimeout(room.roundTimer);
      endGame(room);
    }
  }

  io.on('connection', (socket) => {
    socket.roomCode = null;
    socket.playerName = 'Anonim';
    socket.emit('open_rooms', getOpenRooms());

    socket.on('get_open_rooms', () => {
      socket.emit('open_rooms', getOpenRooms());
    });

    socket.on('join_queue', ({ name }) => {
      if (socket.roomCode) return;
      socket.playerName = (name || 'Anonim').slice(0, 20);
      const entry = { id: socket.id, name: socket.playerName, botTimer: null };
      queue.push(entry);
      socket.emit('waiting', { position: queue.length });

      if (queue.length >= 2) {
        const matched = queue.splice(0, Math.min(8, queue.length));
        matched.forEach(p => { if (p.botTimer) clearTimeout(p.botTimer); });
        const room = createRoom(false);
        matched.forEach(p => {
          const s = io.sockets.sockets.get(p.id);
          if (!s) return;
          s.join(room.code);
          s.roomCode = room.code;
          room.players.push({ id: p.id, name: p.name, score: 0 });
        });
        io.to(room.code).emit('room_ready', { players: room.players.map(p => ({ name: p.name })) });
        setTimeout(() => startCountdown(room), 1500);
      } else {
        entry.botTimer = setTimeout(() => {
          const idx = queue.indexOf(entry);
          if (idx === -1 || socket.roomCode) return;
          queue.splice(idx, 1);
          const room = createRoom(false);
          socket.join(room.code);
          socket.roomCode = room.code;
          room.players.push({ id: socket.id, name: socket.playerName, score: 0 });
          addBot(room);
          socket.emit('room_ready', { players: room.players.map(p => ({ name: p.name })) });
          setTimeout(() => startCountdown(room), 1200);
        }, 8000);
      }
    });

    socket.on('cancel_queue', () => {
      const i = queue.findIndex(q => q.id === socket.id);
      if (i !== -1) {
        if (queue[i].botTimer) clearTimeout(queue[i].botTimer);
        queue.splice(i, 1);
      }
    });

    socket.on('join_with_bot', ({ name }) => {
      if (socket.roomCode) return;
      socket.playerName = (name || 'Anonim').slice(0, 20);
      const room = createRoom(false);
      socket.join(room.code);
      socket.roomCode = room.code;
      room.players.push({ id: socket.id, name: socket.playerName, score: 0 });
      addBot(room);
      socket.emit('room_joined', { players: room.players.map(p => ({ name: p.name })) });
      setTimeout(() => startCountdown(room), 1500);
    });

    socket.on('create_room', ({ name }) => {
      if (socket.roomCode) return;
      socket.playerName = (name || 'Anonim').slice(0, 20);
      const room = createRoom(false);
      socket.join(room.code);
      socket.roomCode = room.code;
      room.players.push({ id: socket.id, name: socket.playerName, score: 0 });
      socket.emit('room_created', { players: [{ name: socket.playerName }] });
      broadcastOpenRooms();
    });

    socket.on('join_room', ({ code, name }) => {
      if (socket.roomCode) return;
      const room = rooms.get((code || '').toUpperCase());
      if (!room) { socket.emit('room_error', 'Masa bulunamadı'); return; }
      if (room.state !== 'lobby') { socket.emit('room_error', 'Oyun zaten başladı'); return; }
      if (room.players.length >= 8) { socket.emit('room_error', 'Masa dolu (max 8 kişi)'); return; }
      socket.playerName = (name || 'Anonim').slice(0, 20);
      socket.join(room.code);
      socket.roomCode = room.code;
      room.players.push({ id: socket.id, name: socket.playerName, score: 0 });
      socket.emit('room_joined', { players: room.players.map(p => ({ name: p.name })) });
      socket.to(room.code).emit('player_joined', { name: socket.playerName, players: room.players.map(p => ({ name: p.name })) });
      broadcastOpenRooms();
    });

    socket.on('start_game', () => {
      const room = rooms.get(socket.roomCode);
      if (!room || room.state !== 'lobby') return;
      if (room.players[0]?.id !== socket.id) { socket.emit('room_error', 'Sadece masa sahibi başlatabilir'); return; }
      if (room.players.length < 2) { socket.emit('room_error', 'En az 2 kişi gerekli'); return; }
      startCountdown(room);
      broadcastOpenRooms();
    });

    socket.on('submit_answer', ({ answer }) => {
      const room = rooms.get(socket.roomCode);
      if (!room || room.state !== 'playing' || room.currentWordAnswered) return;
      const player = room.players.find(p => p.id === socket.id);
      if (!player) return;
      if (checkAnswer(answer, room.currentWord.en)) {
        room.currentWordAnswered = true;
        clearTimeout(room.roundTimer);
        player.score++;
        io.to(room.code).emit('round_win', {
          winnerId: socket.id,
          winnerName: player.name,
          answer: room.currentWord.en,
          scores: getScores(room),
        });
        scheduleNext(room);
      } else {
        socket.emit('wrong_answer');
      }
    });

    socket.on('leave_room', () => handleLeave(socket));

    socket.on('disconnect', () => {
      const i = queue.findIndex(q => q.id === socket.id);
      if (i !== -1) {
        if (queue[i].botTimer) clearTimeout(queue[i].botTimer);
        queue.splice(i, 1);
      }
      handleLeave(socket);
    });
  });
};
