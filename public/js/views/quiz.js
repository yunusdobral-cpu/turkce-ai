// Sınav / Quiz View

let quizState = {
  phase: 'config', // config | active | results
  level: 'A1',
  category: 'mixed',
  lang: 'en',
  quizType: 'mc', // mc | reverse | fill
  questionCount: 10,
  timerEnabled: false,
  timerSeconds: 15,
  questions: [],
  currentIndex: 0,
  score: { correct: 0, wrong: 0 },
  answers: [],
  timerInterval: null,
  timeLeft: 0
};

function clearQuizTimer() {
  if (quizState.timerInterval) {
    clearInterval(quizState.timerInterval);
    quizState.timerInterval = null;
  }
}

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getAllWordsForQuiz() {
  const data = window.VOCAB_DATA;
  if (!data || !data[quizState.level]) return [];

  const levelData = data[quizState.level];
  const categories = quizState.category === 'mixed'
    ? ['isim', 'fiil', 'sifat', 'zarf']
    : [quizState.category];

  const words = [];
  categories.forEach(cat => {
    if (!levelData[cat]) return;
    levelData[cat].forEach(section => {
      if (Array.isArray(section)) {
        section.forEach(w => {
          if (w && w.tr) words.push(w);
        });
      }
    });
  });
  return words;
}

function generateQuestions(count) {
  const pool = getAllWordsForQuiz();
  if (pool.length < 4) return [];

  const selected = shuffleArray(pool).slice(0, count);
  const lang = quizState.lang;

  return selected.map(word => {
    const q = {
      word,
      type: quizState.quizType,
      correctAnswer: '',
      options: [],
      userAnswer: null,
      isCorrect: null
    };

    if (quizState.quizType === 'mc') {
      q.correctAnswer = word[lang] || word.en;
      const distractors = shuffleArray(pool.filter(w => w.tr !== word.tr && w[lang]))
        .slice(0, 3)
        .map(w => w[lang]);
      q.options = shuffleArray([q.correctAnswer, ...distractors]);
    } else if (quizState.quizType === 'reverse') {
      q.correctAnswer = word.tr;
      const distractors = shuffleArray(pool.filter(w => w.tr !== word.tr))
        .slice(0, 3)
        .map(w => w.tr);
      q.options = shuffleArray([q.correctAnswer, ...distractors]);
    } else {
      q.correctAnswer = word.tr;
    }

    return q;
  });
}

function saveQuizResult() {
  const total = quizState.score.correct + quizState.score.wrong;
  const result = {
    date: new Date().toISOString(),
    level: quizState.level,
    category: quizState.category,
    quizType: quizState.quizType,
    lang: quizState.lang,
    score: { ...quizState.score, total },
    percentage: total > 0 ? Math.round((quizState.score.correct / total) * 100) : 0
  };

  let history = [];
  try { history = JSON.parse(localStorage.getItem('turkceai_quiz_history') || '[]'); } catch(e) {}
  history.unshift(result);
  if (history.length > 50) history = history.slice(0, 50);
  localStorage.setItem('turkceai_quiz_history', JSON.stringify(history));
}

function getQuizHistory() {
  try { return JSON.parse(localStorage.getItem('turkceai_quiz_history') || '[]'); } catch(e) { return []; }
}

// ===== RENDER CONFIG =====
function renderQuiz(container, mode) {
  clearQuizTimer();

  // If mode is passed (from homepage cards), start level test directly
  if (mode) {
    startLevelTest(mode);
    return;
  }

  quizState.phase = 'config';
  renderQuizConfig(container);
}

function renderQuizConfig(container) {
  const levelChipsHtml = ['A1','A2','B1','B2','C1','C2'].map(lvl => `
    <button class="vocab-chip${lvl === quizState.level ? ' active' : ''}" data-level="${lvl}">${lvl}</button>
  `).join('');

  const catEntries = [['mixed', 'Karışık / Mixed'], ...Object.entries(CAT_MAP)];
  const catChipsHtml = catEntries.map(([key, name]) => `
    <button class="quiz-cat-chip${key === quizState.category ? ' active' : ''}" data-cat="${key}">${name}</button>
  `).join('');

  const typeChipsHtml = [
    ['mc', 'Çoktan Seçmeli'],
    ['reverse', 'Ters Yön'],
    ['fill', 'Yazarak Cevapla']
  ].map(([key, name]) => `
    <button class="quiz-type-chip${key === quizState.quizType ? ' active' : ''}" data-type="${key}">${name}</button>
  `).join('');

  const countChipsHtml = [10, 20, 30].map(n => `
    <button class="quiz-count-chip${n === quizState.questionCount ? ' active' : ''}" data-count="${n}">${n}</button>
  `).join('');

  const langOptionsHtml = Object.entries(LANG_MAP).map(([code, name]) => `
    <option value="${code}" ${code === quizState.lang ? 'selected' : ''}>${name}</option>
  `).join('');

  const history = getQuizHistory().slice(0, 5);
  const historyHtml = history.length > 0 ? `
    <div class="quiz-history">
      <div class="quiz-history-title">Son Sınavlar</div>
      ${history.map(h => {
        const color = h.percentage >= 70 ? 'var(--success)' : h.percentage >= 40 ? 'var(--warning)' : 'var(--danger)';
        return `<div class="quiz-history-item">
          <span class="quiz-history-score" style="color:${color}">%${h.percentage}</span>
          <span class="quiz-history-info">${h.level} ${h.category === 'mixed' ? 'Karışık' : h.category} &middot; ${h.score.correct}/${h.score.total}</span>
          <span class="quiz-history-date">${new Date(h.date).toLocaleDateString('tr-TR')}</span>
        </div>`;
      }).join('')}
    </div>
  ` : '';

  container.innerHTML = `
    <div class="quiz-page">
      <div class="gallery-header">
        <h1>Sınav / Quiz</h1>
        <p class="gallery-subtitle">Bilgini test et / Test your knowledge</p>
      </div>

      <div class="level-test-cards" style="margin-bottom:1.5rem">
        <div class="level-test-card-main" onclick="startLevelTest('placement')">
          <div class="level-test-card-icon">🎯</div>
          <div>
            <div class="level-test-card-title">Seviyeni Belirle / Find Your Level</div>
            <div class="level-test-card-desc">Tüm seviyeleri kapsayan genel test ile Türkçe seviyeni öğren</div>
          </div>
        </div>
        <div class="level-test-levels-row">
          <div class="level-test-card" onclick="startLevelTest('A1')">
            <div class="level-test-card-badge a1">A1</div>
            <div class="level-test-card-title">Başlangıç</div>
            <div class="level-test-card-desc">Temel kelimeler</div>
          </div>
          <div class="level-test-card" onclick="startLevelTest('A2')">
            <div class="level-test-card-badge a2">A2</div>
            <div class="level-test-card-title">Temel</div>
            <div class="level-test-card-desc">Günlük ifadeler</div>
          </div>
          <div class="level-test-card" onclick="startLevelTest('B1')">
            <div class="level-test-card-badge b1">B1</div>
            <div class="level-test-card-title">Orta</div>
            <div class="level-test-card-desc">İş & akademik</div>
          </div>
          <div class="level-test-card" onclick="startLevelTest('B2')">
            <div class="level-test-card-badge b2">B2</div>
            <div class="level-test-card-title">Orta Üstü</div>
            <div class="level-test-card-desc">İleri kelimeler</div>
          </div>
          <div class="level-test-card" onclick="startLevelTest('C1')">
            <div class="level-test-card-badge c1">C1</div>
            <div class="level-test-card-title">İleri</div>
            <div class="level-test-card-desc">Yakında</div>
          </div>
          <div class="level-test-card" onclick="startLevelTest('C2')">
            <div class="level-test-card-badge c2">C2</div>
            <div class="level-test-card-title">Uzman</div>
            <div class="level-test-card-desc">Yakında</div>
          </div>
        </div>
      </div>

      <div class="quiz-full">
        <div class="quiz-full-sidebar">
          <div class="vocab-sidebar-section">
            <div class="vocab-sidebar-label">Seviye / Level</div>
            <div class="vocab-level-chips">${levelChipsHtml}</div>
          </div>
          <div class="vocab-sidebar-section">
            <div class="vocab-sidebar-label">Kategori / Category</div>
            <div class="quiz-cat-chips">${catChipsHtml}</div>
          </div>
          <div class="vocab-sidebar-section">
            <div class="vocab-sidebar-label">Soru Tipi / Question Type</div>
            <div class="quiz-type-chips">${typeChipsHtml}</div>
          </div>
          <div class="vocab-sidebar-section">
            <div class="vocab-sidebar-label">Soru Sayısı</div>
            <div class="quiz-count-chips">${countChipsHtml}</div>
          </div>
          <div class="vocab-sidebar-section">
            <div class="vocab-sidebar-label">Dil / Language</div>
            <select class="vocab-select vocab-select-full" id="quizLangSelect">${langOptionsHtml}</select>
          </div>
          <div class="vocab-sidebar-section">
            <label class="quiz-timer-label">
              <input type="checkbox" id="quizTimerToggle" ${quizState.timerEnabled ? 'checked' : ''}>
              <span>Zamanlayıcı (${quizState.timerSeconds}sn)</span>
            </label>
          </div>
        </div>

        <div class="quiz-full-main">
          <div class="quiz-start-area">
            <div class="quiz-start-icon">&#128221;</div>
            <div class="quiz-start-info" id="quizWordCount"></div>
            <button class="btn btn-primary quiz-start-btn" id="quizStartBtn">Sınava Başla</button>
          </div>
          ${historyHtml}
        </div>
      </div>
    </div>
  `;

  initQuizConfig();
}

function initQuizConfig() {
  // Level chips
  document.querySelectorAll('.quiz-page .vocab-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.quiz-page .vocab-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      quizState.level = chip.dataset.level;
      updateWordCount();
    });
  });

  // Category chips
  document.querySelectorAll('.quiz-cat-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.quiz-cat-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      quizState.category = chip.dataset.cat;
      updateWordCount();
    });
  });

  // Type chips
  document.querySelectorAll('.quiz-type-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.quiz-type-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      quizState.quizType = chip.dataset.type;
    });
  });

  // Count chips
  document.querySelectorAll('.quiz-count-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.quiz-count-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      quizState.questionCount = parseInt(chip.dataset.count);
      updateWordCount();
    });
  });

  // Language
  document.getElementById('quizLangSelect').addEventListener('change', (e) => {
    quizState.lang = e.target.value;
  });

  // Timer
  document.getElementById('quizTimerToggle').addEventListener('change', (e) => {
    quizState.timerEnabled = e.target.checked;
  });

  // Start
  document.getElementById('quizStartBtn').addEventListener('click', startQuiz);

  updateWordCount();
}

function updateWordCount() {
  const pool = getAllWordsForQuiz();
  const el = document.getElementById('quizWordCount');
  if (!el) return;
  const available = pool.length;
  const needed = quizState.questionCount;
  if (available < 4) {
    el.innerHTML = `<span style="color:var(--danger)">Bu seviyede yeterli kelime yok (${available} kelime)</span>`;
    document.getElementById('quizStartBtn').disabled = true;
  } else {
    el.textContent = `${available} kelimeden ${Math.min(needed, available)} soru`;
    document.getElementById('quizStartBtn').disabled = false;
  }
}

function startQuiz() {
  const questions = generateQuestions(quizState.questionCount);
  if (questions.length === 0) {
    showToast('Yeterli kelime yok!', 'error');
    return;
  }
  quizState.phase = 'active';
  quizState.questions = questions;
  quizState.currentIndex = 0;
  quizState.score = { correct: 0, wrong: 0 };
  quizState.answers = [];
  renderQuizQuestion(document.getElementById('app'));
}

// ===== RENDER QUESTION =====
function renderQuizQuestion(container) {
  clearQuizTimer();
  const q = quizState.questions[quizState.currentIndex];
  const total = quizState.questions.length;
  const current = quizState.currentIndex + 1;
  const progress = (current / total) * 100;

  let promptLabel, promptText;
  if (q.type === 'mc') {
    promptLabel = 'Bu kelimenin anlamını seçin:';
    promptText = q.word.tr;
  } else if (q.type === 'reverse') {
    promptLabel = 'Bu kelimenin Türkçesini seçin:';
    promptText = q.word[quizState.lang] || q.word.en;
  } else {
    promptLabel = 'Bu kelimenin Türkçesini yazın:';
    promptText = q.word[quizState.lang] || q.word.en;
  }

  let answerHtml;
  if (q.type === 'fill') {
    answerHtml = `
      <form class="quiz-fill-form" id="quizFillForm">
        <input type="text" class="quiz-fill-input" id="quizFillInput" placeholder="Türkçe yazın..." autocomplete="off" autofocus>
        <button type="submit" class="btn btn-primary">Cevapla</button>
      </form>
    `;
  } else {
    answerHtml = `
      <div class="quiz-options">
        ${q.options.map((opt, i) => `
          <button class="quiz-option" data-index="${i}" data-answer="${opt.replace(/"/g, '&quot;')}">${opt}</button>
        `).join('')}
      </div>
    `;
  }

  container.innerHTML = `
    <div class="quiz-page quiz-active">
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width:${progress}%"></div>
      </div>
      <div class="quiz-header-row">
        <div class="quiz-counter">${current} / ${total}</div>
        <div class="quiz-score-display">
          <span class="quiz-score-correct">${quizState.score.correct}</span>
          <span class="quiz-score-sep">/</span>
          <span class="quiz-score-wrong">${quizState.score.wrong}</span>
        </div>
        ${quizState.timerEnabled ? `<div class="quiz-timer" id="quizTimer">${quizState.timerSeconds}</div>` : ''}
      </div>
      <div class="quiz-question-card">
        <div class="quiz-prompt-label">${promptLabel}</div>
        <div class="quiz-prompt">${promptText}</div>
        ${q.word.ex ? `<div class="quiz-prompt-example">"${q.word.ex}"</div>` : ''}
        ${answerHtml}
      </div>
    </div>
  `;

  // Bind events
  if (q.type === 'fill') {
    document.getElementById('quizFillForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('quizFillInput').value.trim();
      if (!input) return;
      handleQuizAnswer(input);
    });
    document.getElementById('quizFillInput').focus();
  } else {
    document.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => {
        handleQuizAnswer(btn.dataset.answer);
      });
    });
  }

  // Timer
  if (quizState.timerEnabled) {
    quizState.timeLeft = quizState.timerSeconds;
    quizState.timerInterval = setInterval(() => {
      quizState.timeLeft--;
      const timerEl = document.getElementById('quizTimer');
      if (timerEl) {
        timerEl.textContent = quizState.timeLeft;
        if (quizState.timeLeft <= 5) timerEl.classList.add('quiz-timer-danger');
      }
      if (quizState.timeLeft <= 0) {
        clearQuizTimer();
        handleQuizAnswer(null); // timeout
      }
    }, 1000);
  }
}

function handleQuizAnswer(answer) {
  clearQuizTimer();
  const q = quizState.questions[quizState.currentIndex];

  let isCorrect;
  if (answer === null) {
    isCorrect = false;
  } else if (q.type === 'fill') {
    isCorrect = answer.toLowerCase().trim() === q.correctAnswer.toLowerCase().trim();
  } else {
    isCorrect = answer === q.correctAnswer;
  }

  q.userAnswer = answer;
  q.isCorrect = isCorrect;

  if (isCorrect) {
    quizState.score.correct++;
  } else {
    quizState.score.wrong++;
  }

  // Visual feedback
  if (q.type === 'fill') {
    const input = document.getElementById('quizFillInput');
    const form = document.getElementById('quizFillForm');
    if (input) {
      input.disabled = true;
      input.style.borderColor = isCorrect ? 'var(--success)' : 'var(--danger)';
      input.style.background = isCorrect ? '#f0fdf4' : '#fef2f2';
    }
    if (!isCorrect && form) {
      const correctDiv = document.createElement('div');
      correctDiv.className = 'quiz-correct-answer';
      correctDiv.textContent = 'Doğru cevap: ' + q.correctAnswer;
      form.appendChild(correctDiv);
    }
    // Disable submit
    form.querySelector('button').disabled = true;
  } else {
    document.querySelectorAll('.quiz-option').forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.answer === q.correctAnswer) {
        btn.classList.add('correct');
      }
      if (btn.dataset.answer === answer && !isCorrect) {
        btn.classList.add('wrong');
      }
    });
  }

  // Next question after delay
  setTimeout(() => {
    quizState.currentIndex++;
    if (quizState.currentIndex >= quizState.questions.length) {
      quizState.phase = 'results';
      saveQuizResult();
      renderQuizResults(document.getElementById('app'));
    } else {
      renderQuizQuestion(document.getElementById('app'));
    }
  }, answer === null ? 500 : 1200);
}

// ===== RENDER RESULTS =====
function renderQuizResults(container) {
  const total = quizState.score.correct + quizState.score.wrong;
  const pct = total > 0 ? Math.round((quizState.score.correct / total) * 100) : 0;
  const color = pct >= 70 ? 'var(--success)' : pct >= 40 ? 'var(--warning)' : 'var(--danger)';
  const emoji = pct >= 90 ? '&#127942;' : pct >= 70 ? '&#127881;' : pct >= 40 ? '&#128170;' : '&#128218;';
  const message = pct >= 90 ? 'Mükemmel! / Excellent!' : pct >= 70 ? 'Çok iyi! / Very good!' : pct >= 40 ? 'İyi gidiyorsun! / Keep going!' : 'Pratik yapmaya devam et! / Keep practicing!';

  const reviewHtml = quizState.questions.map((q, i) => {
    const icon = q.isCorrect ? '&#10004;' : '&#10008;';
    const cls = q.isCorrect ? 'quiz-review-correct' : 'quiz-review-wrong';
    const userAns = q.userAnswer === null ? '(Süre doldu)' : q.userAnswer;
    return `
      <div class="quiz-review-item ${cls}">
        <span class="quiz-review-icon">${icon}</span>
        <div class="quiz-review-body">
          <div class="quiz-review-word">${q.word.tr} — ${q.word[quizState.lang] || q.word.en}</div>
          ${!q.isCorrect ? `<div class="quiz-review-answer">Senin cevabın: <strong>${userAns}</strong> &middot; Doğru: <strong>${q.correctAnswer}</strong></div>` : ''}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="quiz-page">
      <div class="quiz-results-card">
        <div class="quiz-results-emoji">${emoji}</div>
        <div class="quiz-results-pct" style="color:${color}">%${pct}</div>
        <div class="quiz-results-message">${message}</div>
        <div class="quiz-results-stats">
          <div class="quiz-stat">
            <div class="quiz-stat-num" style="color:var(--success)">${quizState.score.correct}</div>
            <div class="quiz-stat-label">Doğru</div>
          </div>
          <div class="quiz-stat">
            <div class="quiz-stat-num" style="color:var(--danger)">${quizState.score.wrong}</div>
            <div class="quiz-stat-label">Yanlış</div>
          </div>
          <div class="quiz-stat">
            <div class="quiz-stat-num">${total}</div>
            <div class="quiz-stat-label">Toplam</div>
          </div>
        </div>
        <div class="quiz-results-actions">
          <button class="btn btn-outline" onclick="location.hash='#/quiz';renderQuiz(document.getElementById('app'))">Yeni Sınav</button>
          <button class="btn btn-primary" onclick="retryQuiz()">Tekrar Dene</button>
        </div>
      </div>

      <div class="quiz-review-section">
        <h3>Cevap Anahtarı</h3>
        <div class="quiz-review-list">${reviewHtml}</div>
      </div>
    </div>
  `;
}

function retryQuiz() {
  startQuiz();
}
