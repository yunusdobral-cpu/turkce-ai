// Kelime Yarışması View

let wrSocket = null;
let wrTimerInterval = null;
let wrMySocketId = null;
let wrMyName = '';
let wrIsHost = false;

function renderWordRace(container) {
  wrDestroy();
  const saved = Auth.isLoggedIn() ? Auth.getUser().displayName : '';

  container.innerHTML = `
    <div class="wr-page">

      <!-- Lobi -->
      <div id="wr-screen-lobby" class="wr-screen wr-active">
        <div class="wr-card">
          <div class="wr-title">🏆 Kelime Yarışması</div>
          <p class="wr-subtitle">Türkçe kelimeyi en hızlı İngilizce'ye çeviren kazanır!<br>2–8 oyuncu · 10 tur · 12 saniye/tur</p>
          <div class="wr-name-row">
            <input type="text" id="wr-name" class="wr-input" placeholder="Adınız" maxlength="20" value="${saved}">
          </div>
          <div class="wr-btn-group">
            <button class="wr-btn wr-btn-primary" id="wr-btn-queue">⚡ Hızlı Eşleşme</button>
            <button class="wr-btn wr-btn-secondary" id="wr-btn-create">🏠 Masa Kur</button>
          </div>
          <div class="wr-open-rooms-section">
            <div class="wr-open-rooms-title">Açık Masalar</div>
            <div id="wr-open-rooms"><div class="wr-no-rooms">Şu an açık masa yok — sen kur!</div></div>
          </div>
        </div>
      </div>

      <!-- Bekleme (matchmaking) -->
      <div id="wr-screen-waiting" class="wr-screen">
        <div class="wr-card">
          <span class="wr-waiting-anim">🔍</span>
          <div class="wr-title">Rakip aranıyor</div>
          <div class="wr-dots"><span>.</span><span>.</span><span>.</span></div>
          <button class="wr-btn wr-btn-outline" id="wr-btn-cancel">İptal</button>
        </div>
      </div>

      <!-- Masa bekleme -->
      <div id="wr-screen-room" class="wr-screen">
        <div class="wr-card">
          <div class="wr-title">🏠 Masa</div>
          <p class="wr-hint-small" style="margin-bottom:1rem">Diğer oyuncular açık masalar listesinden katılabilir</p>
          <div class="wr-players-list" id="wr-players-list"></div>
          <div id="wr-host-controls" style="display:none">
            <button class="wr-btn wr-btn-primary" id="wr-btn-start" style="width:100%">▶ Oyunu Başlat</button>
            <p class="wr-hint-small">En az 2 kişi gerekli</p>
          </div>
          <p id="wr-guest-wait" class="wr-hint-small" style="display:none">Masa sahibi oyunu başlatacak...</p>
          <button class="wr-btn wr-btn-outline wr-mt" id="wr-btn-leave">Masadan Çık</button>
        </div>
      </div>

      <!-- Geri sayım -->
      <div id="wr-screen-countdown" class="wr-screen">
        <div class="wr-card wr-card-center">
          <div class="wr-countdown-label">Hazır ol!</div>
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
          <div class="wr-word-hint">İngilizce çevirisi nedir?</div>
        </div>
        <div class="wr-answer-row">
          <input type="text" id="wr-answer" class="wr-input wr-input-answer" placeholder="Yaz ve Enter'a bas..." autocomplete="off" autocorrect="off" spellcheck="false">
          <button class="wr-btn wr-btn-primary" id="wr-btn-send">↵</button>
        </div>
        <div class="wr-feedback" id="wr-feedback"></div>
        <div class="wr-scores-label">Skor</div>
        <div class="wr-scores" id="wr-scores"></div>
      </div>

      <!-- Oyun bitti -->
      <div id="wr-screen-gameover" class="wr-screen">
        <div class="wr-card">
          <div class="wr-title">🏁 Oyun Bitti!</div>
          <div class="wr-results" id="wr-results"></div>
          <div class="wr-share-result" id="wr-share-result"></div>
          <div class="wr-btn-group">
            <button class="wr-btn wr-btn-primary" id="wr-btn-again">Tekrar Oyna</button>
            <button class="wr-btn wr-btn-outline" id="wr-btn-home">Ana Sayfa</button>
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
  document.getElementById('wr-btn-queue')?.addEventListener('click', () => {
    wrMyName = wrName();
    wrSocket.emit('join_queue', { name: wrMyName });
    wrShow('wr-screen-waiting');
  });

  document.getElementById('wr-btn-cancel')?.addEventListener('click', () => {
    wrSocket.emit('cancel_queue');
    wrShow('wr-screen-lobby');
  });

  document.getElementById('wr-btn-create')?.addEventListener('click', () => {
    wrMyName = wrName();
    wrSocket.emit('create_room', { name: wrMyName });
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
  const sorted = [...scores].sort((a, b) => b.score - a.score);
  el.innerHTML = sorted.map(s => `
    <div class="wr-score-row ${s.id === wrMySocketId ? 'wr-me' : ''}">
      <span>${s.id === wrMySocketId ? '👤 ' : ''}${s.name}</span>
      <span class="wr-score-pts">${s.score}</span>
    </div>
  `).join('');
}

function wrStartTimer(duration) {
  clearInterval(wrTimerInterval);
  const bar = document.getElementById('wr-timer-fill');
  if (!bar) return;
  const start = Date.now();
  wrTimerInterval = setInterval(() => {
    const pct = Math.max(0, 100 - ((Date.now() - start) / duration * 100));
    bar.style.width = pct + '%';
    bar.style.background = pct > 50 ? '#22c55e' : pct > 25 ? '#f59e0b' : '#ef4444';
    if (pct === 0) clearInterval(wrTimerInterval);
  }, 50);
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
    el.innerHTML = '<div class="wr-no-rooms">Şu an açık masa yok — sen kur!</div>';
    return;
  }
  el.innerHTML = openRooms.map(r => `
    <div class="wr-open-room-row">
      <div class="wr-open-room-info">
        <span class="wr-open-room-host">👑 ${r.hostName}</span>
        <span class="wr-open-room-count">${r.playerCount}/8 oyuncu</span>
      </div>
      <button class="wr-btn wr-btn-primary wr-btn-sm" onclick="wrJoinOpenRoom('${r.code}')">Katıl →</button>
    </div>
  `).join('');
}

function wrRenderPlayers(players, isHost) {
  const el = document.getElementById('wr-players-list');
  if (!el) return;
  el.innerHTML = players.map((p, i) => `
    <div class="wr-player-item">
      <span class="wr-player-avatar">${(p.name[0] || '?').toUpperCase()}</span>
      <span>${p.name}</span>
      ${i === 0 ? '<span class="wr-host-badge">👑</span>' : ''}
    </div>
  `).join('');
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

  wrSocket.on('round_start', ({ word, roundNum, total, duration }) => {
    clearInterval(wrTimerInterval);
    wrShow('wr-screen-game');
    document.getElementById('wr-round-label').textContent = `Tur ${roundNum}/${total}`;
    document.getElementById('wr-word-tr').textContent = word;
    const input = document.getElementById('wr-answer');
    if (input) { input.value = ''; input.disabled = false; input.focus(); }
    wrFeedback('', '');
    wrStartTimer(duration);
  });

  wrSocket.on('wrong_answer', () => {
    wrFeedback('✗ Yanlış, tekrar dene!', 'wrong');
  });

  wrSocket.on('round_win', ({ winnerId, winnerName, answer, scores }) => {
    clearInterval(wrTimerInterval);
    const input = document.getElementById('wr-answer');
    if (input) input.disabled = true;
    document.getElementById('wr-timer-fill').style.width = '0%';
    const isMe = winnerId === wrMySocketId;
    wrFeedback(
      isMe ? `🎉 Sen kazandın! Cevap: "${answer}"` : `✅ ${winnerName} doğru! Cevap: "${answer}"`,
      isMe ? 'correct' : 'win'
    );
    wrRenderScores(scores);
  });

  wrSocket.on('round_timeout', ({ answer, scores }) => {
    clearInterval(wrTimerInterval);
    const input = document.getElementById('wr-answer');
    if (input) input.disabled = true;
    document.getElementById('wr-timer-fill').style.width = '0%';
    wrFeedback(`⏱️ Süre doldu! Cevap: "${answer}"`, 'timeout');
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
        <span class="wr-result-score">${r.score} puan</span>
      </div>
    `).join('');

    // Paylaşım butonları
    const me = results.find(r => r.id === wrMySocketId);
    if (me) {
      const shareEl = document.getElementById('wr-share-result');
      const isWinner = me.rank === 1;
      const total = results[0]?.score !== undefined ? 10 : 10;
      const text = isWinner
        ? `🥇 Kelime Yarışması'nı kazandım! ${me.score}/${total} puan. Türkçe öğrenmede sana da meydan okuyorum! lingual.work`
        : `🏆 Kelime Yarışması'nda ${me.score}/${total} puan aldım! Sen kaç alırsın? lingual.work`;
      const encoded = encodeURIComponent(text);
      const siteUrl = encodeURIComponent('https://lingual.work');
      shareEl.innerHTML = `
        <div class="wr-share-label">Sonucunu paylaş:</div>
        <div class="wr-share-btns">
          <a href="https://twitter.com/intent/tweet?text=${encoded}" target="_blank" rel="noopener" class="wr-share-btn wr-share-twitter">𝕏 Twitter</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${siteUrl}&quote=${encoded}" target="_blank" rel="noopener" class="wr-share-btn wr-share-facebook">f Facebook</a>
          <button class="wr-share-btn wr-share-instagram" onclick="wrCopyResult(this, ${JSON.stringify(text)})">📷 Instagram</button>
        </div>
      `;
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

function wrCopyResult(btn, text) {
  navigator.clipboard.writeText(text).then(() => {
    btn.textContent = '✓ Kopyalandı!';
    showToast('Instagram için kopyalandı! Yapıştırarak paylaşabilirsin 📋', 'success');
    setTimeout(() => { btn.textContent = '📷 Instagram'; }, 2500);
  }).catch(() => showToast('Kopyalanamadı', 'error'));
}
