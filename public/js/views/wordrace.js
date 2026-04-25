// Kelime Yarışması View

let wrSocket = null;
let wrTimerInterval = null;
let wrMySocketId = null;
let wrMyName = '';
let wrIsHost = false;
let wrMode = 'tr_en';
let wrPrevScores = {};

function renderWordRace(container) {
  wrDestroy();
  const saved = Auth.isLoggedIn() ? Auth.getUser().displayName : '';
  const t = (k) => I18N.t(k);

  container.innerHTML = `
    <div class="wr-page">

      <!-- Lobi -->
      <div id="wr-screen-lobby" class="wr-screen wr-active">
        <div class="wr-card">
          <div class="wr-title">🏆 ${I18N.bi('Kelime Yarışması', 'wr_title')}</div>
          <p class="wr-subtitle">
            ${I18N.bi('Türkçe kelimeyi en hızlı İngilizce\'ye çeviren kazanır!', 'wr_subtitle')}<br>
            <span style="color:var(--text-muted);font-size:0.83rem">${t('wr_subtitle2')}</span>
          </p>
          <div class="wr-name-row">
            <input type="text" id="wr-name" class="wr-input" placeholder="${t('wr_name_ph')}" maxlength="20" value="${saved}">
          </div>
          <div class="wr-mode-toggle">
            <button class="wr-mode-btn wr-mode-active" id="wr-mode-tr-en">🇹🇷 → 🇬🇧 Türkçe → İngilizce</button>
            <button class="wr-mode-btn" id="wr-mode-en-tr">🇬🇧 → 🇹🇷 İngilizce → Türkçe</button>
          </div>
          <div class="wr-btn-group">
            <button class="wr-btn wr-btn-primary" id="wr-btn-queue">${t('wr_quick_match')}</button>
            <button class="wr-btn wr-btn-secondary" id="wr-btn-create">${t('wr_create_table')}</button>
          </div>
          <div class="wr-open-rooms-section">
            <div class="wr-open-rooms-title">${t('wr_open_tables')}</div>
            <div id="wr-open-rooms"><div class="wr-no-rooms">${t('wr_no_tables')}</div></div>
          </div>
        </div>
      </div>

      <!-- Bekleme (matchmaking) -->
      <div id="wr-screen-waiting" class="wr-screen">
        <div class="wr-card">
          <span class="wr-waiting-anim">🔍</span>
          <div class="wr-title">${I18N.bi('Rakip aranıyor', 'wr_searching')}</div>
          <div class="wr-dots"><span>.</span><span>.</span><span>.</span></div>
          <p class="wr-hint-small" style="margin-bottom:1rem">${t('wr_bot_hint')}</p>
          <button class="wr-btn wr-btn-outline" id="wr-btn-cancel">${t('wr_cancel')}</button>
        </div>
      </div>

      <!-- Masa bekleme -->
      <div id="wr-screen-room" class="wr-screen">
        <div class="wr-card" style="padding:1.5rem 1rem">
          <div class="wr-open-badge" style="justify-content:center;margin-bottom:0.8rem">
            <span class="wr-badge-dot"></span>
            AÇIK · ${t('wr_table_hint')}
          </div>
          <div id="wr-table-scene"></div>
          <div id="wr-host-controls" style="display:none;margin-top:0.8rem">
            <button class="wr-btn wr-btn-primary" id="wr-btn-start" style="width:100%">${t('wr_start_game')}</button>
            <p class="wr-hint-small">${t('wr_min_players')}</p>
          </div>
          <p id="wr-guest-wait" class="wr-hint-small" style="display:none;margin-top:0.8rem">${t('wr_host_starts')}</p>
          <button class="wr-btn wr-btn-outline wr-mt" id="wr-btn-leave">${t('wr_leave_table')}</button>
        </div>
      </div>

      <!-- Geri sayım -->
      <div id="wr-screen-countdown" class="wr-screen">
        <div class="wr-card wr-card-center">
          <div class="wr-countdown-label">${I18N.bi('Hazır ol!', 'wr_get_ready')}</div>
          <div class="wr-countdown-num" id="wr-countdown-num">3</div>
        </div>
      </div>

      <!-- Oyun -->
      <div id="wr-screen-game" class="wr-screen">
        <div class="wr-game-header">
          <span class="wr-round-label" id="wr-round-label">Tur 1/10</span>
          <div class="wr-timer-bar"><div class="wr-timer-fill" id="wr-timer-fill"></div></div>
        </div>
        <div class="wr-word-box">
          <div class="wr-word-tr" id="wr-word-tr">—</div>
          <div class="wr-word-hint" id="wr-word-hint">${I18N.bi('İngilizce çevirisi nedir?', 'wr_word_hint')}</div>
          <div class="wr-letter-boxes" id="wr-letter-boxes"></div>
        </div>
        <div class="wr-answer-row">
          <input type="text" id="wr-answer" class="wr-input wr-input-answer" placeholder="${t('wr_answer_ph')}" autocomplete="off" autocorrect="off" spellcheck="false">
          <button class="wr-btn wr-btn-primary" id="wr-btn-send">↵</button>
        </div>
        <div class="wr-feedback" id="wr-feedback"></div>
        <div class="wr-scores-label">${I18N.bi('Skor', 'wr_score')}</div>
        <div class="wr-scores" id="wr-scores"></div>
      </div>

      <!-- Oyun bitti -->
      <div id="wr-screen-gameover" class="wr-screen">
        <div class="wr-card">
          <div class="wr-title">${I18N.bi('🏁 Oyun Bitti!', 'wr_game_over')}</div>
          <div class="wr-results" id="wr-results"></div>
          <div class="wr-share-result" id="wr-share-result"></div>
          <div class="wr-btn-group">
            <button class="wr-btn wr-btn-primary" id="wr-btn-again">${I18N.bi('Tekrar Oyna', 'wr_play_again')}</button>
            <button class="wr-btn wr-btn-outline" id="wr-btn-home">${I18N.bi('Ana Sayfa', 'wr_home_btn')}</button>
          </div>
        </div>
      </div>

    </div>
  `;

  wrSocket = io();
  wrSocket.on('connect', () => { wrMySocketId = wrSocket.id; });

  wrBindButtons();
  wrBindSocketEvents();
}

function wrDestroy() {
  if (wrSocket) {
    wrSocket.emit('leave_room');
    wrSocket.disconnect();
    wrSocket = null;
  }
  clearInterval(wrTimerInterval);
  wrTimerInterval = null;
  wrMySocketId = null;
}

function wrShow(id) {
  document.querySelectorAll('.wr-screen').forEach(s => s.classList.remove('wr-active'));
  const el = document.getElementById(id);
  if (el) el.classList.add('wr-active');
}

function wrName() {
  return (document.getElementById('wr-name')?.value || '').trim() || 'Anonim';
}

function wrBindButtons() {
  document.getElementById('wr-mode-tr-en')?.addEventListener('click', () => {
    wrMode = 'tr_en';
    document.getElementById('wr-mode-tr-en').classList.add('wr-mode-active');
    document.getElementById('wr-mode-en-tr').classList.remove('wr-mode-active');
  });
  document.getElementById('wr-mode-en-tr')?.addEventListener('click', () => {
    wrMode = 'en_tr';
    document.getElementById('wr-mode-en-tr').classList.add('wr-mode-active');
    document.getElementById('wr-mode-tr-en').classList.remove('wr-mode-active');
  });

  document.getElementById('wr-btn-queue')?.addEventListener('click', () => {
    wrMyName = wrName();
    wrSocket.emit('join_queue', { name: wrMyName, mode: wrMode });
    wrShow('wr-screen-waiting');
  });

  document.getElementById('wr-btn-cancel')?.addEventListener('click', () => {
    wrSocket.emit('cancel_queue');
    wrShow('wr-screen-lobby');
  });

  document.getElementById('wr-btn-create')?.addEventListener('click', () => {
    wrMyName = wrName();
    wrSocket.emit('create_room', { name: wrMyName, mode: wrMode });
  });

  document.getElementById('wr-btn-start')?.addEventListener('click', () => {
    wrSocket.emit('start_game');
  });

  document.getElementById('wr-btn-leave')?.addEventListener('click', () => {
    wrSocket.emit('leave_room');
    wrShow('wr-screen-lobby');
  });

  const sendBtn = document.getElementById('wr-btn-send');
  const answerInput = document.getElementById('wr-answer');
  sendBtn?.addEventListener('click', wrSubmit);
  answerInput?.addEventListener('keydown', (e) => { if (e.key === 'Enter') wrSubmit(); });

  document.getElementById('wr-btn-again')?.addEventListener('click', () => {
    wrShow('wr-screen-lobby');
  });

  document.getElementById('wr-btn-home')?.addEventListener('click', () => {
    wrDestroy();
    location.hash = '#/';
  });
}

function wrJoinOpenRoom(code) {
  wrMyName = wrName();
  wrIsHost = false;
  wrSocket.emit('join_room', { code, name: wrMyName });
}

function wrSubmit() {
  const input = document.getElementById('wr-answer');
  const answer = (input?.value || '').trim();
  if (!answer || input?.disabled) return;
  wrSocket?.emit('submit_answer', { answer });
}

function wrRenderScores(scores) {
  const el = document.getElementById('wr-scores');
  if (!el) return;
  const medals = ['🥇', '🥈', '🥉'];
  const sorted = [...scores].sort((a, b) => b.score - a.score);
  el.innerHTML = sorted.map((s, i) => {
    const popped = wrPrevScores[s.id] !== undefined && wrPrevScores[s.id] < s.score;
    return `
      <div class="wr-score-row ${s.id === wrMySocketId ? 'wr-me' : ''}">
        <span>${medals[i] || (i + 1) + '.'} ${s.id === wrMySocketId ? '👤 ' : ''}${s.name}</span>
        <span class="wr-score-pts${popped ? ' wr-pop' : ''}">${s.score}</span>
      </div>
    `;
  }).join('');
  scores.forEach(s => { wrPrevScores[s.id] = s.score; });
}

function wrStartTimer(duration) {
  clearInterval(wrTimerInterval);
  const bar = document.getElementById('wr-timer-fill');
  const wordBox = document.querySelector('.wr-word-box');
  if (!bar) return;
  const start = Date.now();
  let wasCrit = false;
  wrTimerInterval = setInterval(() => {
    const pct = Math.max(0, 100 - ((Date.now() - start) / duration * 100));
    bar.style.width = pct + '%';
    bar.style.background = pct > 50 ? '#22c55e' : pct > 25 ? '#f59e0b' : '#ef4444';
    const isCrit = pct <= 25 && pct > 0;
    if (isCrit !== wasCrit) {
      bar.classList.toggle('wr-crit', isCrit);
      if (wordBox) wordBox.classList.toggle('wr-crit', isCrit);
      wasCrit = isCrit;
    }
    if (pct === 0) clearInterval(wrTimerInterval);
  }, 50);
}

function wrFlash(type) {
  const el = document.createElement('div');
  el.className = `wr-flash wr-flash-${type}`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 600);
}

function wrRenderLetterBoxes(answerLens) {
  const el = document.getElementById('wr-letter-boxes');
  if (!el || !answerLens || !answerLens.length) { if (el) el.innerHTML = ''; return; }
  const primary = answerLens[0];
  const alts = answerLens.slice(1);
  const boxes = Array(primary).fill('<span class="wr-box"></span>').join('');
  const altHtml = alts.length
    ? `<div class="wr-boxes-alt">${alts.map(l => `veya ${l} harf`).join(' · ')}</div>`
    : '';
  el.innerHTML = `<div class="wr-boxes-row">${boxes}</div>${altHtml}`;
}

function wrFeedback(msg, type) {
  const el = document.getElementById('wr-feedback');
  if (!el) return;
  el.textContent = msg;
  el.className = 'wr-feedback wr-feedback-' + type;
}

function wrRenderOpenRooms(openRooms) {
  const el = document.getElementById('wr-open-rooms');
  if (!el) return;
  if (!openRooms || openRooms.length === 0) {
    el.innerHTML = `<div class="wr-no-rooms">${I18N.t('wr_no_tables')}</div>`;
    return;
  }
  const joinLabel = I18N.t('wr_join_btn');
  const playersLabel = I18N.t('wr_players');
  el.innerHTML = openRooms.map(r => `
    <div class="wr-open-room-row">
      <div class="wr-open-room-info">
        <span class="wr-open-room-host">👑 ${r.hostName}</span>
        <span class="wr-open-room-count">${r.playerCount}/8 ${playersLabel}</span>
      </div>
      <button class="wr-btn wr-btn-primary wr-btn-sm" onclick="wrJoinOpenRoom('${r.code}')">${joinLabel}</button>
    </div>
  `).join('');
}

function wrRenderPlayers(players, isHost) {
  const el = document.getElementById('wr-table-scene');
  if (!el) return;

  const MAX = 8;
  const cx = 120, cy = 120, r = 86, sz = 48;
  const positions = Array.from({ length: MAX }, (_, i) => {
    const a = i * (2 * Math.PI / MAX) - Math.PI / 2;
    return { left: Math.round(cx + r * Math.cos(a) - sz / 2), top: Math.round(cy + r * Math.sin(a) - sz / 2) };
  });

  const emptyShow = Math.min(Math.max(1, 3 - players.length + 1), MAX - players.length);
  let seats = '';

  players.forEach((p, i) => {
    const { left, top } = positions[i];
    const isH = i === 0;
    seats += `
      <div class="wr-ts-seat" style="left:${left}px;top:${top}px">
        <div class="wr-ts-avatar${isH ? ' wr-ts-host' : ''}">${(p.name[0] || '?').toUpperCase()}</div>
        <div class="wr-ts-name">${isH ? '👑 ' : ''}${p.name}</div>
      </div>`;
  });

  for (let i = 0; i < emptyShow; i++) {
    const { left, top } = positions[players.length + i];
    seats += `
      <div class="wr-ts-seat" style="left:${left}px;top:${top}px">
        <div class="wr-ts-empty">＋</div>
        <div class="wr-ts-name wr-ts-empty-lbl">bekliyor...</div>
      </div>`;
  }

  el.innerHTML = `
    <div class="wr-ts-wrap">
      <div class="wr-ts-table">
        <span class="wr-ts-table-icon">🎮</span>
        <span class="wr-ts-table-lbl">MASA</span>
      </div>
      ${seats}
    </div>`;

  const hostCtrl = document.getElementById('wr-host-controls');
  const guestWait = document.getElementById('wr-guest-wait');
  if (hostCtrl) hostCtrl.style.display = isHost ? 'block' : 'none';
  if (guestWait) guestWait.style.display = isHost ? 'none' : 'block';
}

function wrBindSocketEvents() {
  wrSocket.on('open_rooms', (openRooms) => {
    wrRenderOpenRooms(openRooms);
  });

  wrSocket.on('room_created', ({ players }) => {
    wrIsHost = true;
    wrRenderPlayers(players, true);
    wrShow('wr-screen-room');
  });

  wrSocket.on('room_joined', ({ players }) => {
    wrIsHost = false;
    wrRenderPlayers(players, false);
    wrShow('wr-screen-room');
  });

  wrSocket.on('player_joined', ({ name, players }) => {
    wrRenderPlayers(players, wrIsHost);
    showToast(`${name} masaya katıldı!`, 'success');
  });

  wrSocket.on('player_left', ({ name, players }) => {
    wrRenderPlayers(players, wrIsHost);
    showToast(`${name} ayrıldı`, 'error');
  });

  wrSocket.on('room_ready', ({ players }) => {
    // Matched from queue, countdown will follow
  });

  wrSocket.on('countdown', ({ n }) => {
    wrShow('wr-screen-countdown');
    const el = document.getElementById('wr-countdown-num');
    if (el) {
      el.textContent = n;
      el.style.animation = 'none';
      el.offsetHeight; // reflow to restart animation
      el.style.animation = '';
    }
  });

  wrSocket.on('round_start', ({ word, roundNum, total, duration, mode, answerLens }) => {
    clearInterval(wrTimerInterval);
    wrPrevScores = {};
    wrShow('wr-screen-game');
    document.getElementById('wr-round-label').textContent = `${roundNum}/${total}`;
    document.getElementById('wr-word-tr').textContent = word;
    const hint = document.getElementById('wr-word-hint');
    if (hint) hint.textContent = mode === 'en_tr'
      ? I18N.bi('Türkçe çevirisi nedir?', 'wr_word_hint_tr')
      : I18N.bi('İngilizce çevirisi nedir?', 'wr_word_hint');
    wrRenderLetterBoxes(answerLens);
    const wordBox = document.querySelector('.wr-word-box');
    if (wordBox) {
      wordBox.classList.remove('wr-new', 'wr-crit');
      void wordBox.offsetWidth;
      wordBox.classList.add('wr-new');
    }
    const input = document.getElementById('wr-answer');
    if (input) { input.value = ''; input.disabled = false; input.focus(); }
    wrFeedback('', '');
    wrStartTimer(duration);
  });

  wrSocket.on('wrong_answer', () => {
    wrFeedback(I18N.t('wr_wrong'), 'wrong');
    const input = document.getElementById('wr-answer');
    if (input) {
      input.classList.remove('wr-shake');
      void input.offsetWidth;
      input.classList.add('wr-shake');
      input.value = '';
    }
  });

  wrSocket.on('round_win', ({ winnerId, winnerName, answer, scores }) => {
    clearInterval(wrTimerInterval);
    const input = document.getElementById('wr-answer');
    if (input) input.disabled = true;
    const bar = document.getElementById('wr-timer-fill');
    if (bar) { bar.style.width = '0%'; bar.classList.remove('wr-crit'); }
    const wordBox = document.querySelector('.wr-word-box');
    if (wordBox) wordBox.classList.remove('wr-crit');
    const isMe = winnerId === wrMySocketId;
    wrFlash(isMe ? 'win' : 'lose');
    wrFeedback(
      isMe
        ? `${I18N.t('wr_you_won')}"${answer}"`
        : `${I18N.t('wr_other_won').replace('{name}', winnerName)}"${answer}"`,
      isMe ? 'correct' : 'win'
    );
    wrRenderScores(scores);
  });

  wrSocket.on('round_timeout', ({ answer, scores }) => {
    clearInterval(wrTimerInterval);
    const input = document.getElementById('wr-answer');
    if (input) input.disabled = true;
    const bar = document.getElementById('wr-timer-fill');
    if (bar) { bar.style.width = '0%'; bar.classList.remove('wr-crit'); }
    const wordBox = document.querySelector('.wr-word-box');
    if (wordBox) wordBox.classList.remove('wr-crit');
    wrFlash('lose');
    wrFeedback(`${I18N.t('wr_timeout')}"${answer}"`, 'timeout');
    wrRenderScores(scores);
  });

  wrSocket.on('game_over', ({ results }) => {
    clearInterval(wrTimerInterval);
    wrShow('wr-screen-gameover');
    const medals = ['🥇', '🥈', '🥉'];
    document.getElementById('wr-results').innerHTML = results.map((r) => `
      <div class="wr-result-row wr-rank-${r.rank} ${r.id === wrMySocketId ? 'wr-mine' : ''}">
        <span class="wr-result-rank">${medals[r.rank - 1] || `${r.rank}.`}</span>
        <span class="wr-result-name">${r.name}${r.id === wrMySocketId ? ' 👤' : ''}</span>
        <span class="wr-result-score">${r.score} ${I18N.bi('puan', 'wr_score').toLowerCase()}</span>
      </div>
    `).join('');

    const me = results.find(r => r.id === wrMySocketId);
    if (me) {
      const shareEl = document.getElementById('wr-share-result');
      const isWinner = me.rank === 1;
      const shareKey = isWinner ? 'wr_share_won' : 'wr_share_played';
      const text = I18N.t(shareKey).replace('{score}', me.score);
      shareEl.innerHTML = `
        <div class="wr-share-label">${I18N.t('wr_share_label')}</div>
        <div class="wr-share-btns">
          <button class="wr-share-btn wr-share-twitter" id="wr-twitter-btn">𝕏 Twitter</button>
          <button class="wr-share-btn wr-share-facebook" id="wr-fb-btn">f Facebook</button>
          <button class="wr-share-btn wr-share-instagram" id="wr-ig-btn">📷 Instagram</button>
        </div>
      `;
      const _setLoading = (btn, on) => { btn.disabled = on; btn.style.opacity = on ? '0.55' : ''; };
      document.getElementById('wr-twitter-btn').addEventListener('click', async function () {
        _setLoading(this, true);
        await wrShareCard(results, wrMySocketId, text, 'twitter');
        _setLoading(this, false);
      });
      document.getElementById('wr-fb-btn').addEventListener('click', async function () {
        _setLoading(this, true);
        await wrShareCard(results, wrMySocketId, text, 'facebook');
        _setLoading(this, false);
      });
      document.getElementById('wr-ig-btn').addEventListener('click', async function () {
        _setLoading(this, true);
        await wrShareCard(results, wrMySocketId, text, 'instagram');
        _setLoading(this, false);
      });
    }
  });

  wrSocket.on('room_error', (msg) => {
    showToast(msg, 'error');
  });

  wrSocket.on('disconnect', () => {
    showToast('Bağlantı kesildi', 'error');
    wrShow('wr-screen-lobby');
  });
}

function wrBuildShareCard(results, mySocketId) {
  const me = results.find(r => r.id === mySocketId) || results[0];
  const medals = ['🥇', '🥈', '🥉'];
  const rankLabel = ['🥇 Birinci!', '🥈 İkinci', '🥉 Üçüncü'][me.rank - 1] || `${me.rank}. Sıra`;

  const card = document.createElement('div');
  card.style.cssText = [
    'position:fixed', 'top:-9999px', 'left:-9999px',
    'width:360px', 'height:640px',
    'background:linear-gradient(160deg,#1e1b4b 0%,#312e81 45%,#4c1d95 100%)',
    'display:flex', 'flex-direction:column', 'align-items:center',
    'justify-content:space-between', 'padding:48px 28px 40px',
    'box-sizing:border-box',
    "font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif",
    'color:white', 'overflow:hidden',
  ].join(';');

  const topList = results.slice(0, 4).map(r => `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.08)">
      <span style="font-size:13px;${r.id === mySocketId ? 'font-weight:800;color:#fbbf24' : 'color:rgba(255,255,255,0.8)'}">${medals[r.rank - 1] || r.rank + '.'} ${r.name}</span>
      <span style="font-size:14px;font-weight:800;${r.id === mySocketId ? 'color:#fbbf24' : 'color:rgba(255,255,255,0.55)'}">${r.score}</span>
    </div>
  `).join('');

  card.innerHTML = `
    <div style="text-align:center">
      <div style="font-size:38px;line-height:1;margin-bottom:10px">🏆</div>
      <div style="font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.5)">KELIME YARIŞMASI</div>
      <div style="font-size:10px;color:rgba(255,255,255,0.3);margin-top:4px;letter-spacing:1px">lingual.work</div>
    </div>

    <div style="text-align:center">
      <div style="font-size:14px;color:rgba(255,255,255,0.7);margin-bottom:6px;font-weight:500">${me.name}</div>
      <div style="font-size:88px;font-weight:900;line-height:1;color:#fbbf24;text-shadow:0 0 40px rgba(251,191,36,0.35)">${me.score}</div>
      <div style="font-size:16px;color:rgba(255,255,255,0.45);margin-top:2px">/ 10 puan</div>
      <div style="margin-top:12px;font-size:24px;font-weight:700">${rankLabel}</div>
    </div>

    <div style="width:100%;background:rgba(255,255,255,0.07);border-radius:14px;padding:14px 18px;box-sizing:border-box">
      ${topList}
    </div>

    <div style="text-align:center">
      <div style="font-size:10px;color:rgba(255,255,255,0.35);letter-spacing:2px;text-transform:uppercase">Türkçe öğren · Yarış · Kazan</div>
      <div style="font-size:15px;font-weight:800;color:white;margin-top:5px;letter-spacing:1px">lingual.work</div>
    </div>
  `;
  return card;
}

async function wrGenerateShareImage(results, mySocketId) {
  if (typeof html2canvas === 'undefined') return null;
  const card = wrBuildShareCard(results, mySocketId);
  document.body.appendChild(card);
  try {
    const canvas = await html2canvas(card, { scale: 2, useCORS: true, logging: false, backgroundColor: null });
    return await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
  } catch (e) {
    return null;
  } finally {
    document.body.removeChild(card);
  }
}

function wrDownloadImage(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

async function wrShareCard(results, mySocketId, text, platform) {
  const blob = await wrGenerateShareImage(results, mySocketId);

  // Mobile Web Share API — opens native sheet (Instagram, WhatsApp, etc.)
  if (blob && navigator.share && navigator.canShare) {
    const file = new File([blob], 'kelime-yarismasi.png', { type: 'image/png' });
    if (navigator.canShare({ files: [file] })) {
      try { await navigator.share({ title: 'Kelime Yarışması', text, files: [file] }); return; }
      catch (e) { /* kullanıcı iptal etti, aşağı düş */ }
    }
  }

  const encoded = encodeURIComponent(text);
  const siteUrl = encodeURIComponent('https://lingual.work');

  if (blob) {
    wrDownloadImage(blob, 'kelime-yarismasi.png');
    const msgs = {
      instagram: 'Karne indirildi! Instagram story olarak yükle 📸',
      twitter:   'Karne indirildi! Tweet\'e resmi ekleyebilirsin 🐦',
      facebook:  'Karne indirildi! Gönderiyi açtık, resmi ekleyebilirsin 👍',
    };
    showToast(msgs[platform] || 'İndirildi!', 'success');
    if (platform === 'twitter')  setTimeout(() => window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank'), 400);
    if (platform === 'facebook') setTimeout(() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${siteUrl}&quote=${encoded}`, '_blank'), 400);
  } else {
    // html2canvas yoksa metin paylaş
    if (platform === 'twitter')  { window.open(`https://twitter.com/intent/tweet?text=${encoded}`, '_blank'); return; }
    if (platform === 'facebook') { window.open(`https://www.facebook.com/sharer/sharer.php?u=${siteUrl}&quote=${encoded}`, '_blank'); return; }
    const btn = document.getElementById('wr-ig-btn');
    if (btn) wrCopyResult(btn, text);
  }
}

function wrCopyResult(btn, text) {
  const doCopy = () => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return Promise.resolve();
  };
  doCopy().then(() => {
    btn.textContent = '✓ Kopyalandı!';
    showToast('Instagram için kopyalandı! Yapıştırarak paylaşabilirsin 📋', 'success');
    setTimeout(() => { btn.textContent = '📷 Instagram'; }, 2500);
  }).catch(() => showToast('Kopyalanamadı', 'error'));
}
