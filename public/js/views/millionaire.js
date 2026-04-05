// Milyoner Yarışması View

// Dil yardımcıları: soru ve seçenekleri aktif dile göre döndürür
function getMillLang() {
  return (typeof I18N !== 'undefined') ? I18N._lang : 'tr';
}

function getMillQ(q) {
  if (typeof q.q === 'string') return q.q;
  const lang = getMillLang();
  return q.q[lang] || q.q['tr'] || q.q['en'] || '';
}

function getMillOpts(q) {
  if (Array.isArray(q.options)) return q.options;
  const lang = getMillLang();
  return q.options[lang] || q.options['tr'] || q.options['en'] || [];
}

let millionaireState = {
  phase: 'menu', // menu | playing | result
  level: null,
  questions: [],
  currentIndex: 0,
  prize: '0 TL',
  jokers: { fifty: true, audience: true, skip: true },
  answered: false,
  gameOver: false
};

function shuffleMillionaire(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getMillionaireLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem('millionaire_leaderboard') || '[]');
  } catch { return []; }
}

function saveMillionaireScore(name, level, prize, questionNum) {
  const board = getMillionaireLeaderboard();
  const prizeValue = parseInt(prize.replace(/[^0-9]/g, '')) || 0;
  board.push({
    name,
    level,
    prize,
    prizeValue,
    questionNum,
    date: new Date().toISOString()
  });
  board.sort((a, b) => b.prizeValue - a.prizeValue);
  // Keep top 50
  localStorage.setItem('millionaire_leaderboard', JSON.stringify(board.slice(0, 50)));
}

function startMillionaireGame(level) {
  const data = window.MILLIONAIRE_DATA[level];
  if (!data || data.length < 15) {
    // If not enough questions, reuse with shuffle
    const pool = shuffleMillionaire(data || []);
    while (pool.length < 15) {
      pool.push(...shuffleMillionaire(data || []));
    }
    millionaireState.questions = pool.slice(0, 15);
  } else {
    millionaireState.questions = shuffleMillionaire(data).slice(0, 15);
  }

  millionaireState = {
    phase: 'playing',
    level,
    questions: millionaireState.questions,
    currentIndex: 0,
    prize: '0 TL',
    jokers: { fifty: true, audience: true, skip: true },
    answered: false,
    gameOver: false
  };

  renderMillionaireGame(document.getElementById('app'));
}

function renderMillionaireMenu(container) {
  const levels = [
    { code: 'A1', name: 'Başlangıç', color: '#22c55e', desc: 'Temel kelimeler ve ifadeler' },
    { code: 'A2', name: 'Temel', color: '#84cc16', desc: 'Günlük yaşam soruları' },
    { code: 'B1', name: 'Orta', color: '#eab308', desc: 'Dilbilgisi ve kelime hazinesi' },
    { code: 'B2', name: 'Orta Üstü', color: '#f97316', desc: 'İleri kelime ve yapılar' },
    { code: 'C1', name: 'İleri', color: '#ef4444', desc: 'Akademik ve edebi Türkçe' },
    { code: 'C2', name: 'Uzman', color: '#9333ea', desc: 'Osmanlıca ve nadir kelimeler' },
  ];

  const board = getMillionaireLeaderboard();
  const top10 = board.slice(0, 10);

  const leaderboardHtml = top10.length > 0 ? `
    <div class="mill-leaderboard">
      <h3>🏆 Skor Tablosu</h3>
      <div class="mill-board-list">
        ${top10.map((entry, i) => `
          <div class="mill-board-item ${i < 3 ? 'mill-board-top' : ''}">
            <span class="mill-board-rank">${i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : (i + 1) + '.'}</span>
            <span class="mill-board-name">${entry.name}</span>
            <span class="mill-board-level">${entry.level}</span>
            <span class="mill-board-prize">${entry.prize}</span>
          </div>
        `).join('')}
      </div>
      <button class="mill-clear-btn" onclick="clearMillionaireBoard()">Tabloyu Temizle</button>
    </div>
  ` : '';

  container.innerHTML = `
    <div class="mill-page">
      <div class="mill-menu">
        <div class="mill-menu-header">
          <div class="mill-logo">💎</div>
          <h1><span class="mill-title-race">YARIŞ</span> <span class="mill-title-arrow">→</span> <span class="mill-title-prize">ÜCRETSİZ ÜYELİK KAZAN</span></h1>
          <p>Türkçe Bilgi Yarışması</p>
        </div>
        <div class="mill-level-grid">
          ${levels.map(l => `
            <div class="mill-level-card" onclick="startMillionaireGame('${l.code}')" style="--level-color: ${l.color}">
              <div class="mill-level-badge" style="background: ${l.color}">${l.code}</div>
              <div class="mill-level-name">${l.name}</div>
              <div class="mill-level-desc">${l.desc}</div>
            </div>
          `).join('')}
        </div>
        ${leaderboardHtml}
      </div>
    </div>
  `;
}

function clearMillionaireBoard() {
  if (confirm('Skor tablosunu temizlemek istediğinize emin misiniz?')) {
    localStorage.removeItem('millionaire_leaderboard');
    renderMillionaireMenu(document.getElementById('app'));
  }
}

function renderMillionaireGame(container) {
  const q = millionaireState.questions[millionaireState.currentIndex];
  const prizes = window.MILLIONAIRE_PRIZES;
  const safePoints = window.MILLIONAIRE_SAFE;
  const currentPrize = millionaireState.currentIndex > 0 ? prizes[millionaireState.currentIndex - 1] : '0 TL';

  const prizeListHtml = prizes.map((p, i) => {
    const isCurrent = i === millionaireState.currentIndex;
    const isPassed = i < millionaireState.currentIndex;
    const isSafe = safePoints.includes(i);
    let cls = 'mill-prize-item';
    if (isCurrent) cls += ' mill-prize-current';
    if (isPassed) cls += ' mill-prize-passed';
    if (isSafe) cls += ' mill-prize-safe';
    return `<div class="${cls}"><span class="mill-prize-num">${i + 1}</span><span class="mill-prize-amount">${p}</span></div>`;
  }).reverse().join('');

  const optionLetters = ['A', 'B', 'C', 'D'];

  container.innerHTML = `
    <div class="mill-page">
      <div class="mill-game">
        <div class="mill-game-main">
          <div class="mill-top-bar">
            <div class="mill-level-tag">${millionaireState.level}</div>
            <div class="mill-question-num">Soru ${millionaireState.currentIndex + 1} / 15</div>
            <button class="mill-quit-btn" onclick="millionaireQuit()">Çekil (${currentPrize})</button>
          </div>

          <div class="mill-jokers">
            <button class="mill-joker ${!millionaireState.jokers.fifty ? 'mill-joker-used' : ''}"
              onclick="useJokerFifty()" ${!millionaireState.jokers.fifty ? 'disabled' : ''}>
              <span>50:50</span>
            </button>
            <button class="mill-joker ${!millionaireState.jokers.audience ? 'mill-joker-used' : ''}"
              onclick="useJokerAudience()" ${!millionaireState.jokers.audience ? 'disabled' : ''}>
              <span>👥 Seyirci</span>
            </button>
            <button class="mill-joker ${!millionaireState.jokers.skip ? 'mill-joker-used' : ''}"
              onclick="useJokerSkip()" ${!millionaireState.jokers.skip ? 'disabled' : ''}>
              <span>⏭️ Pas</span>
            </button>
          </div>

          <div class="mill-question-card">
            <div class="mill-question-text">${getMillQ(q)}</div>
          </div>

          <div class="mill-options">
            ${getMillOpts(q).map((opt, i) => `
              <button class="mill-option" data-index="${i}" onclick="millionaireAnswer(${i})">
                <span class="mill-option-letter">${optionLetters[i]}</span>
                <span class="mill-option-text">${opt}</span>
              </button>
            `).join('')}
          </div>
        </div>

        <div class="mill-prize-ladder">
          <div class="mill-prize-title">Para Basamakları</div>
          ${prizeListHtml}
        </div>
      </div>
    </div>
  `;
}

function millionaireAnswer(index) {
  if (millionaireState.answered) return;
  millionaireState.answered = true;

  const q = millionaireState.questions[millionaireState.currentIndex];
  const correct = q.answer;
  const isCorrect = index === correct;

  const buttons = document.querySelectorAll('.mill-option');

  // Highlight selected
  buttons[index].classList.add('mill-option-selected');
  buttons.forEach(b => b.style.pointerEvents = 'none');

  // Reveal answer after delay
  setTimeout(() => {
    buttons[correct].classList.add('mill-option-correct');
    if (!isCorrect) {
      buttons[index].classList.remove('mill-option-selected');
      buttons[index].classList.add('mill-option-wrong');
    }

    setTimeout(() => {
      if (isCorrect) {
        millionaireState.currentIndex++;
        millionaireState.answered = false;

        if (millionaireState.currentIndex >= 15) {
          // WON THE GAME!
          millionaireState.prize = window.MILLIONAIRE_PRIZES[14];
          millionaireState.phase = 'result';
          millionaireState.gameOver = true;
          renderMillionaireResult(document.getElementById('app'), true);
        } else {
          renderMillionaireGame(document.getElementById('app'));
        }
      } else {
        // Wrong answer - game over
        const safePoints = window.MILLIONAIRE_SAFE;
        let earnedPrize = '0 TL';
        for (let s of safePoints) {
          if (millionaireState.currentIndex > s) {
            earnedPrize = window.MILLIONAIRE_PRIZES[s];
          }
        }
        millionaireState.prize = earnedPrize;
        millionaireState.phase = 'result';
        millionaireState.gameOver = true;
        renderMillionaireResult(document.getElementById('app'), false);
      }
    }, 1500);
  }, 1500);
}

function millionaireQuit() {
  const prizes = window.MILLIONAIRE_PRIZES;
  const currentPrize = millionaireState.currentIndex > 0 ? prizes[millionaireState.currentIndex - 1] : '0 TL';
  millionaireState.prize = currentPrize;
  millionaireState.phase = 'result';
  renderMillionaireResult(document.getElementById('app'), true);
}

function useJokerFifty() {
  if (!millionaireState.jokers.fifty || millionaireState.answered) return;
  millionaireState.jokers.fifty = false;

  const q = millionaireState.questions[millionaireState.currentIndex];
  const correct = q.answer;

  // Pick 2 wrong options to eliminate
  const wrongIndices = [0, 1, 2, 3].filter(i => i !== correct);
  const toRemove = shuffleMillionaire(wrongIndices).slice(0, 2);

  toRemove.forEach(i => {
    const btn = document.querySelector(`.mill-option[data-index="${i}"]`);
    if (btn) {
      btn.classList.add('mill-option-eliminated');
      btn.disabled = true;
      btn.onclick = null;
    }
  });

  // Update joker button
  document.querySelectorAll('.mill-joker')[0].classList.add('mill-joker-used');
  document.querySelectorAll('.mill-joker')[0].disabled = true;
}

function useJokerAudience() {
  if (!millionaireState.jokers.audience || millionaireState.answered) return;
  millionaireState.jokers.audience = false;

  const q = millionaireState.questions[millionaireState.currentIndex];
  const correct = q.answer;

  // Generate fake audience percentages (correct answer gets highest)
  const percentages = [0, 0, 0, 0];
  percentages[correct] = 40 + Math.floor(Math.random() * 35); // 40-74%
  let remaining = 100 - percentages[correct];

  [0, 1, 2, 3].filter(i => i !== correct).forEach((i, idx, arr) => {
    if (idx === arr.length - 1) {
      percentages[i] = remaining;
    } else {
      const val = Math.floor(Math.random() * remaining * 0.6);
      percentages[i] = val;
      remaining -= val;
    }
  });

  // Show audience panel
  const panel = document.createElement('div');
  panel.className = 'mill-audience-panel';
  panel.innerHTML = `
    <div class="mill-audience-overlay" onclick="this.parentElement.remove()"></div>
    <div class="mill-audience-card">
      <h3>👥 Seyirci Sonuçları</h3>
      <div class="mill-audience-bars">
        ${['A', 'B', 'C', 'D'].map((letter, i) => `
          <div class="mill-audience-bar-group">
            <div class="mill-audience-pct">${percentages[i]}%</div>
            <div class="mill-audience-bar-track">
              <div class="mill-audience-bar-fill" style="height: ${percentages[i]}%"></div>
            </div>
            <div class="mill-audience-letter">${letter}</div>
          </div>
        `).join('')}
      </div>
      <button class="btn btn-primary" onclick="this.closest('.mill-audience-panel').remove()">Tamam</button>
    </div>
  `;
  document.body.appendChild(panel);

  // Update joker button
  document.querySelectorAll('.mill-joker')[1].classList.add('mill-joker-used');
  document.querySelectorAll('.mill-joker')[1].disabled = true;
}

function useJokerSkip() {
  if (!millionaireState.jokers.skip || millionaireState.answered) return;
  millionaireState.jokers.skip = false;

  // Replace current question with a new one from the pool
  const data = window.MILLIONAIRE_DATA[millionaireState.level];
  const usedQuestions = millionaireState.questions.map(q => getMillQ(q));
  const available = data.filter(q => !usedQuestions.includes(getMillQ(q)));

  if (available.length > 0) {
    const newQ = shuffleMillionaire(available)[0];
    millionaireState.questions[millionaireState.currentIndex] = newQ;
  } else {
    // If no new questions, just re-render (can't easily shuffle multilingual options)
  }

  renderMillionaireGame(document.getElementById('app'));
}

function renderMillionaireResult(container, isWin) {
  const prize = millionaireState.prize;
  const questionNum = millionaireState.currentIndex;
  const totalAnswered = isWin ? questionNum : questionNum + 1;

  const emoji = prize === '1.000.000 TL' ? '🏆' : prize === '0 TL' ? '😢' : '💰';
  const message = prize === '1.000.000 TL'
    ? 'TEBRİKLER! MİLYONER OLDUNUZ!'
    : isWin
      ? `Tebrikler! ${prize} kazandınız!`
      : `Maalesef! ${prize} ile ayrılıyorsunuz.`;

  const playerName = localStorage.getItem('millionaire_name') || '';

  container.innerHTML = `
    <div class="mill-page">
      <div class="mill-result">
        <div class="mill-result-emoji">${emoji}</div>
        <h1 class="mill-result-title">${message}</h1>
        <div class="mill-result-details">
          <div class="mill-result-stat">
            <span class="mill-result-stat-label">Seviye</span>
            <span class="mill-result-stat-value">${millionaireState.level}</span>
          </div>
          <div class="mill-result-stat">
            <span class="mill-result-stat-label">Cevaplanan Soru</span>
            <span class="mill-result-stat-value">${totalAnswered} / 15</span>
          </div>
          <div class="mill-result-stat">
            <span class="mill-result-stat-label">Kazanılan</span>
            <span class="mill-result-stat-value mill-result-prize">${prize}</span>
          </div>
        </div>

        <div class="mill-save-score">
          <input type="text" id="millPlayerName" class="mill-name-input" placeholder="Adınızı girin..." value="${playerName}" maxlength="20">
          <button class="btn btn-primary" onclick="saveMillionaireResult()">Skoru Kaydet</button>
        </div>

        <div class="mill-result-actions">
          <button class="btn btn-outline" onclick="renderMillionaireMenu(document.getElementById('app'))">Ana Menü</button>
          <button class="btn btn-primary" onclick="startMillionaireGame('${millionaireState.level}')">Tekrar Oyna</button>
        </div>
      </div>
    </div>
  `;
}

function saveMillionaireResult() {
  const nameInput = document.getElementById('millPlayerName');
  const name = (nameInput.value.trim() || 'Anonim').substring(0, 20);
  localStorage.setItem('millionaire_name', name);

  saveMillionaireScore(
    name,
    millionaireState.level,
    millionaireState.prize,
    millionaireState.currentIndex
  );

  showToast('Skor kaydedildi!');
  renderMillionaireMenu(document.getElementById('app'));
}
