// Anasayfa / Home View

function getDailyContent() {
  const items = [
    {
      icon: '📖',
      label: I18N.bi('Günün Kelimesi', 'daily_word_label'),
      text: `Merak — ${I18N.t('daily_word_text')}`,
      sub: `"Merak etme, her şey güzel olacak." (${I18N.t('daily_word_sub')})`
    },
    {
      icon: '🗣️',
      label: I18N.bi('Günün İfadesi', 'daily_phrase_label'),
      text: `Kolay gelsin! — ${I18N.t('daily_phrase_text')}`,
      sub: `Çalışan birine söylenen nezaket ifadesi. ${I18N.t('daily_phrase_sub')}`
    },
    {
      icon: '🎯',
      label: I18N.bi('Dilbilgisi İpucu', 'daily_grammar_label'),
      text: 'Türkçede sözcük sırası: Özne + Nesne + Yüklem (SOV)',
      sub: `"Ben elma yedim." (${I18N.t('daily_grammar_sub')})`
    },
    {
      icon: '🌍',
      label: I18N.bi('Kültür Köşesi', 'daily_culture_label'),
      text: `Çay kültürü — ${I18N.t('daily_culture_text')}`,
      sub: `Türkiye dünyada en çok çay tüketen ülkedir. ${I18N.t('daily_culture_sub')}`
    },
    {
      icon: '💡',
      label: I18N.bi('Biliyor muydunuz?', 'daily_didyouknow_label'),
      text: 'Türkçede 8 ünlü harf vardır: a, e, ı, i, o, ö, u, ü',
      sub: `Ünlü uyumu (vowel harmony) ${I18N.t('daily_didyouknow_sub')}`
    }
  ];
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  const shuffled = items.map((item, i) => ({ item, sort: (dayOfYear + i * 7) % items.length }));
  shuffled.sort((a, b) => a.sort - b.sort);
  const result = shuffled.map(s => s.item);
  const isApril23 = today.getMonth() === 3 && (today.getDate() === 22 || today.getDate() === 23);
  if (isApril23) {
    result.unshift({
      icon: '🇹🇷',
      label: '23 Nisan Özel',
      text: 'Ulusal Egemenlik ve Çocuk Bayramı',
      sub: '🇬🇧 National Sovereignty & Children\'s Day · 🇩🇪 Tag der nationalen Souveränität · 🇫🇷 Fête de la Souveraineté Nationale',
      special: 'april23'
    });
  }
  return result;
}

function initTicker() {
  const track = document.getElementById('tickerTrack');
  const dots = document.querySelectorAll('.daily-ticker-dot');
  const prevBtn = document.getElementById('tickerPrev');
  const nextBtn = document.getElementById('tickerNext');
  if (!track) return;
  let current = 0;
  const total = track.children.length;
  let autoPlay;
  function goTo(index) {
    current = (index + total) % total;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }
  prevBtn.addEventListener('click', () => { goTo(current - 1); resetAuto(); });
  nextBtn.addEventListener('click', () => { goTo(current + 1); resetAuto(); });
  dots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); resetAuto(); }));
  function resetAuto() {
    clearInterval(autoPlay);
    autoPlay = setInterval(() => goTo(current + 1), 6000);
  }
  resetAuto();
}

function timeAgo(dateStr) {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 60) return 'az önce';
  if (diff < 3600) return Math.floor(diff / 60) + ' dk önce';
  if (diff < 86400) return Math.floor(diff / 3600) + ' saat önce';
  if (diff < 604800) return Math.floor(diff / 86400) + ' gün önce';
  return date.toLocaleDateString('tr-TR');
}

function formatPostContent(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}

function getCorrectionUsage() {
  const today = new Date().toISOString().slice(0, 10);
  const stored = JSON.parse(localStorage.getItem('correction_usage') || '{}');
  if (stored.date !== today) return { date: today, count: 0 };
  return stored;
}

function incrementCorrectionUsage() {
  const usage = getCorrectionUsage();
  usage.count++;
  localStorage.setItem('correction_usage', JSON.stringify(usage));
  return usage;
}

function updateCorrectionCounter() {
  const counter = document.getElementById('correctionCounter');
  if (!counter) return;
  if (Auth.isLoggedIn()) {
    counter.style.display = 'none';
    return;
  }
  const usage = getCorrectionUsage();
  const remaining = Math.max(0, 3 - usage.count);
  counter.textContent = I18N.bi(
    `Günlük ${remaining}/3 hak kaldı`,
    'correction_daily_limit'
  ).replace('${remaining}', remaining);
  counter.style.display = 'block';
}

function initCorrection() {
  const btn = document.getElementById('correctionCheck');
  if (!btn) return;
  updateCorrectionCounter();
  const doCheck = async () => {
    if (!Auth.isLoggedIn() && !sessionStorage.getItem('adminPassword')) {
      const usage = getCorrectionUsage();
      if (usage.count >= 3) {
        Auth.showLoginModal();
        showToast(I18N.bi('Günlük ücretsiz hakkınız doldu. Üye olun!', 'correction_limit_reached'), 'error');
        return;
      }
    }
    const text = document.getElementById('correctionText').value.trim();
    const intended = document.getElementById('correctionIntended').value.trim();
    const resultEl = document.getElementById('correctionResult');
    if (!text) {
      showToast(I18N.bi('Türkçe yazımınızı girin', 'correction_empty'), 'error');
      return;
    }
    btn.disabled = true;
    btn.textContent = I18N.bi('Kontrol ediliyor...', 'correction_checking');
    resultEl.style.display = 'none';
    try {
      const lang = (typeof I18N !== 'undefined') ? I18N._lang : 'en';
      const sourceLang = lang === 'tr' ? 'en' : lang;
      const result = await API.correctText(text, sourceLang, intended || null);
      let html = '';
      if (result.corrected) {
        html += `<div class="correction-correct-box">
          <div class="correction-label">${I18N.bi('Doğru Türkçe', 'correction_correct_ver')}</div>
          <div class="correction-correct-text">${result.corrected}</div>
        </div>`;
      }
      if (result.translation) {
        html += `<div class="correction-translation">${result.translation}</div>`;
      }
      if (result.score !== undefined) {
        const scoreClass = result.score >= 80 ? 'high' : result.score >= 50 ? 'mid' : 'low';
        html += `<div class="correction-score ${scoreClass}">
          <span class="correction-score-num">${result.score}</span>/100
        </div>`;
      }
      if (result.praise) {
        html += `<div class="correction-praise">${result.praise}</div>`;
      }
      if (result.mistakes && result.mistakes.length > 0) {
        html += `<div class="correction-mistakes">
          <div class="correction-label">${I18N.bi('Hatalar', 'correction_mistakes')}</div>
          ${result.mistakes.map(m => `
            <div class="correction-mistake-item">
              <div class="correction-mistake-line">
                <span class="correction-wrong">${m.wrong}</span>
                <span class="correction-arrow">→</span>
                <span class="correction-right">${m.correct}</span>
              </div>
              <div class="correction-explanation">${m.explanation}</div>
            </div>
          `).join('')}
        </div>`;
      } else if (result.score === 100) {
        html += `<div class="correction-perfect">${I18N.bi('Mükemmel! Hiç hata yok!', 'correction_perfect')}</div>`;
      }
      resultEl.innerHTML = html;
      resultEl.style.display = 'block';
      if (!Auth.isLoggedIn()) {
        incrementCorrectionUsage();
        updateCorrectionCounter();
      }
    } catch (err) {
      showToast(I18N.bi('Düzeltme yapılamadı', 'correction_error'), 'error');
    }
    btn.disabled = false;
    btn.textContent = I18N.bi('Kontrol Et', 'correction_check');
  };
  btn.addEventListener('click', doCheck);
  document.getElementById('correctionText').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doCheck(); }
  });
  document.getElementById('correctionIntended').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); doCheck(); }
  });
}

let chatroomEventSource = null;
let chatroomMessagesList = [];
let pendingChatroomText = null;

function initChatroom() {
  const messagesDiv = document.getElementById('publicChatMessages');
  const textarea = document.getElementById('publicChatInput');
  const sendBtn = document.getElementById('publicChatSendBtn');
  if (!messagesDiv || !textarea || !sendBtn) return;

  // Connect SSE for real-time messages
  connectChatroomSSE();

  // Enter to send
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleChatroomSend();
    }
  });
  sendBtn.addEventListener('click', handleChatroomSend);

  // Nick bar submit
  const nickBtn = document.getElementById('publicChatNickBtn');
  const nickInput = document.getElementById('publicChatNick');
  if (nickBtn) nickBtn.addEventListener('click', submitWithNick);
  if (nickInput) {
    nickInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); submitWithNick(); }
    });
  }
}

function connectChatroomSSE() {
  if (chatroomEventSource) chatroomEventSource.close();

  chatroomEventSource = new EventSource('/api/chat/room/stream');

  chatroomEventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      if (data.type === 'init') {
        chatroomMessagesList = data.messages;
        renderChatroomMessages();
      } else if (data.type === 'message') {
        chatroomMessagesList.push(data.message);
        renderChatroomMessages(true);
      }
    } catch (e) {}
  };

  chatroomEventSource.onerror = () => {
    chatroomEventSource.close();
    // Reconnect after 3 seconds
    setTimeout(() => {
      if (document.getElementById('publicChatMessages')) connectChatroomSSE();
    }, 3000);
  };
}

function handleChatroomSend() {
  const textarea = document.getElementById('publicChatInput');
  const text = textarea.value.trim();
  if (!text) return;

  const savedNick = localStorage.getItem('chatroom_nick');
  if (savedNick) {
    // Nick already saved, send directly
    sendChatroomMessage(savedNick, text);
    textarea.value = '';
  } else {
    // Show nick bar, hide message input
    pendingChatroomText = text;
    document.getElementById('publicChatInputArea').style.display = 'none';
    const nickBar = document.getElementById('chatroomNickBar');
    nickBar.style.display = 'flex';
    document.getElementById('publicChatNick').focus();
  }
}

function submitWithNick() {
  const nickInput = document.getElementById('publicChatNick');
  const nick = nickInput.value.trim();
  if (!nick) {
    nickInput.style.borderColor = 'var(--danger)';
    setTimeout(() => nickInput.style.borderColor = '', 2000);
    return;
  }

  localStorage.setItem('chatroom_nick', nick);

  // Hide nick bar, show message input
  document.getElementById('chatroomNickBar').style.display = 'none';
  document.getElementById('publicChatInputArea').style.display = 'flex';

  if (pendingChatroomText) {
    sendChatroomMessage(nick, pendingChatroomText);
    document.getElementById('publicChatInput').value = '';
    pendingChatroomText = null;
  }
}

function renderChatroomMessages(scrollToBottom) {
  const messagesDiv = document.getElementById('publicChatMessages');
  if (!messagesDiv) return;

  const wasAtBottom = messagesDiv.scrollHeight - messagesDiv.scrollTop - messagesDiv.clientHeight < 50;

  messagesDiv.innerHTML = chatroomMessagesList.length === 0
    ? `<div class="chatroom-empty">${I18N.bi('Henüz mesaj yok. İlk mesajı sen yaz!', 'chatroom_empty')}</div>`
    : chatroomMessagesList.map(m => `
      <div class="chatroom-msg">
        <span class="chatroom-nick" style="color:${nickColor(m.nickname)}">${escapeHtmlText(m.nickname)}</span>
        <span class="chatroom-text">${escapeHtmlText(m.text)}</span>
        <span class="chatroom-time">${chatroomTimeAgo(m.createdAt)}</span>
      </div>
    `).join('');

  if (scrollToBottom || wasAtBottom) messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function sendChatroomMessage(nickname, text) {
  try {
    await fetch('/api/chat/room', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nickname, text })
    });
    // No need to manually load — SSE broadcast will deliver the message
  } catch (e) {
    showToast(I18N.bi('Mesaj gönderilemedi', 'chatroom_send_error'), 'error');
  }
}

function escapeHtmlText(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function nickColor(nick) {
  let hash = 0;
  for (let i = 0; i < nick.length; i++) hash = nick.charCodeAt(i) + ((hash << 5) - hash);
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 65%, 40%)`;
}

function chatroomTimeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return 'az önce';
  if (diff < 3600) return Math.floor(diff / 60) + ' dk';
  if (diff < 86400) return Math.floor(diff / 3600) + ' sa';
  return '1g+';
}

// ===== CATEGORY LIST (main forum page) =====
async function renderHome(container) {
  const dailyContent = getDailyContent();

  const slidesHtml = dailyContent.map(item => `
    <div class="daily-ticker-slide${item.special ? ` daily-ticker-slide--${item.special}` : ''}">
      <div class="daily-ticker-icon">${item.icon}</div>
      <div class="daily-ticker-content">
        <div class="daily-ticker-label">${item.label}</div>
        <div class="daily-ticker-text">${item.text}</div>
        <div class="daily-ticker-sub">${item.sub}</div>
      </div>
    </div>
  `).join('');

  const dotsHtml = dailyContent.map((_, i) => `
    <button class="daily-ticker-dot${i === 0 ? ' active' : ''}" aria-label="Slide ${i + 1}"></button>
  `).join('');

  container.innerHTML = `
    <div class="home-page">
      <div class="mill-home-card" onclick="location.hash='#/millionaire'">
        <div class="mill-home-icon">💎</div>
        <div class="mill-home-info">
          <div class="mill-home-title"><span class="mill-title-race">YARIŞ</span> <span class="mill-title-arrow">→</span> <span class="mill-title-prize">ÜCRETSİZ ÜYELİK KAZAN</span></div>
          <div class="mill-home-desc">Seviye seç, 15 soruyu geç, skor tablosunda zirveye çık!</div>
        </div>
        <div class="mill-home-badge">Oyna →</div>
      </div>

      <div class="gallery-header">
        <a href="https://www.instagram.com/lingual.work/" target="_blank" rel="noopener" class="home-logo-link">
          <img src="/logo.png" alt="Lingual.work" class="home-logo">
        </a>
        <h1>lingual.work</h1>
        <p class="gallery-subtitle">${I18N.bi('Yapay Zeka ile Türkçe Öğren', 'home_subtitle')}</p>
      </div>

      <div id="streakWidget" class="streak-widget" style="display:none"></div>

      <div class="daily-ticker">
        <div class="daily-ticker-header">
          <div class="daily-ticker-title">${I18N.bi('Günlük İçerik', 'daily_title')}</div>
          <div class="daily-ticker-nav">
            <button id="tickerPrev" aria-label="Önceki">&#8249;</button>
            <button id="tickerNext" aria-label="Sonraki">&#8250;</button>
          </div>
        </div>
        <div class="daily-ticker-body">
          <div id="tickerTrack" class="daily-ticker-track">${slidesHtml}</div>
        </div>
        <div class="daily-ticker-dots">${dotsHtml}</div>
      </div>

      <div class="public-chat-section">
        <div class="public-chat-header">
          <h2>${I18N.bi('Sohbet Odası', 'chatroom_title')}</h2>
          <p>${I18N.bi('Mesajını yaz ve sohbete başla!', 'chatroom_subtitle')}</p>
        </div>
        <div class="public-chat-box">
          <div class="public-chat-messages" id="publicChatMessages">
            <div class="chatroom-empty">${I18N.bi('Mesajlar yükleniyor...', 'chatroom_loading')}</div>
          </div>
          <div class="public-chat-input-area" id="publicChatInputArea">
            <textarea id="publicChatInput" placeholder="${I18N.bi('Mesajınızı yazın...', 'chatroom_placeholder')}" rows="1"></textarea>
            <button class="send-btn" id="publicChatSendBtn">${I18N.bi('Gönder', 'chatroom_send')}</button>
          </div>
          <div class="chatroom-nick-bar" id="chatroomNickBar" style="display:none">
            <input type="text" id="publicChatNick" class="chatroom-nick-input" placeholder="${I18N.bi('Nickini yaz...', 'chatroom_nick_ph')}" maxlength="20">
            <button class="send-btn" id="publicChatNickBtn">${I18N.bi('Gönder', 'chatroom_send')}</button>
          </div>
        </div>
      </div>

      <div class="correction-section">
        <div class="correction-header">
          <h2>${I18N.bi('Türkçe Düzeltme', 'correction_title')}</h2>
          <p>${I18N.bi('Türkçe yazımınızı kontrol edin, hatalarınızı öğrenin', 'correction_subtitle')}</p>
        </div>
        <div class="correction-form">
          <div class="correction-field">
            <label>${I18N.bi('Ne yazmak istiyorsunuz?', 'correction_intended')}</label>
            <textarea id="correctionIntended" rows="2" placeholder="${I18N.bi('Yazmak istediğinizi kendi dilinizde yazın...', 'correction_intended_ph')}"></textarea>
          </div>
          <div class="correction-field">
            <label>${I18N.bi('Türkçe yazımınız', 'correction_your_try')}</label>
            <textarea id="correctionText" rows="2" placeholder="${I18N.bi('Türkçe çevirinizi deneyin...', 'correction_your_try_ph')}"></textarea>
          </div>
          <button class="btn btn-primary correction-btn" id="correctionCheck">
            ${I18N.bi('Kontrol Et', 'correction_check')}
          </button>
          <div id="correctionCounter" class="correction-counter"></div>
        </div>
        <div id="correctionResult" class="correction-result" style="display:none"></div>
      </div>

      <div class="level-test-section">
        <div class="level-test-cards">
          <div class="level-test-card-main" onclick="location.hash='#/quiz?mode=placement'">
            <div class="level-test-card-icon">🎯</div>
            <div>
              <div class="level-test-card-title">${I18N.bi('Seviyeni Belirle', 'find_level')}</div>
              <div class="level-test-card-desc">${I18N.bi('Tüm seviyeleri kapsayan genel test ile Türkçe seviyeni öğren', 'find_level_desc')}</div>
            </div>
          </div>
          <div class="level-test-levels-row">
            <div class="level-test-card" onclick="location.hash='#/quiz?mode=A1'">
              <div class="level-test-card-badge a1">A1</div>
              <div class="level-test-card-title">${I18N.bi('Başlangıç', 'level_beginner')}</div>
              <div class="level-test-card-desc">${I18N.bi('Temel kelimeler', 'level_basic_words')}</div>
            </div>
            <div class="level-test-card" onclick="location.hash='#/quiz?mode=A2'">
              <div class="level-test-card-badge a2">A2</div>
              <div class="level-test-card-title">${I18N.bi('Temel', 'level_elementary')}</div>
              <div class="level-test-card-desc">${I18N.bi('Günlük ifadeler', 'level_daily_phrases')}</div>
            </div>
            <div class="level-test-card" onclick="location.hash='#/quiz?mode=B1'">
              <div class="level-test-card-badge b1">B1</div>
              <div class="level-test-card-title">${I18N.bi('Orta', 'level_intermediate')}</div>
              <div class="level-test-card-desc">${I18N.bi('İş & akademik', 'level_work_academic')}</div>
            </div>
            <div class="level-test-card" onclick="location.hash='#/quiz?mode=B2'">
              <div class="level-test-card-badge b2">B2</div>
              <div class="level-test-card-title">${I18N.bi('Orta Üstü', 'level_upper_int')}</div>
              <div class="level-test-card-desc">${I18N.bi('İleri kelimeler', 'level_advanced_words')}</div>
            </div>
            <div class="level-test-card" onclick="location.hash='#/quiz?mode=C1'">
              <div class="level-test-card-badge c1">C1</div>
              <div class="level-test-card-title">${I18N.bi('İleri', 'level_advanced')}</div>
              <div class="level-test-card-desc">${I18N.bi('Yakında', 'level_coming_soon')}</div>
            </div>
            <div class="level-test-card" onclick="location.hash='#/quiz?mode=C2'">
              <div class="level-test-card-badge c2">C2</div>
              <div class="level-test-card-title">${I18N.bi('Uzman', 'level_expert')}</div>
              <div class="level-test-card-desc">${I18N.bi('Yakında', 'level_coming_soon')}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="forum-section">
        <div class="forum-section-header">
          <h2>Forum</h2>
          <button class="btn btn-primary btn-sm" onclick="showNewCategoryForm()">${I18N.bi('+ Kategori Ekle', 'forum_add_cat')}</button>
        </div>
        <div class="forum-cat-list" id="forumCatList">
          <div class="forum-loading">${I18N.bi('Yükleniyor...', 'forum_loading')}</div>
        </div>
      </div>
    </div>
  `;

  initTicker();
  initCorrection();
  initChatroom();
  initStreak();
  await loadForumCategories();
}

async function loadForumCategories() {
  const listEl = document.getElementById('forumCatList');
  if (!listEl) return;

  try {
    const categories = await API.getForumCategories();
    if (categories.length === 0) {
      listEl.innerHTML = `<div class="forum-empty">${I18N.bi('Henüz kategori yok. Yeni kategori ekleyin.', 'forum_empty')}</div>`;
      return;
    }

    listEl.innerHTML = `
      <div class="forum-table">
        <div class="forum-table-head">
          <div class="forum-th forum-th-name">Forum</div>
          <div class="forum-th forum-th-stats">${I18N.bi('Konu', 'forum_topic')}</div>
          <div class="forum-th forum-th-stats">${I18N.bi('Mesaj', 'forum_message')}</div>
          <div class="forum-th forum-th-last">${I18N.bi('Son Mesaj', 'forum_last_msg')}</div>
        </div>
        ${categories.map(cat => `
          <div class="forum-table-row" onclick="navigateToCategory('${cat.id}')" style="cursor:pointer">
            <div class="forum-td forum-td-name">
              <span class="forum-cat-icon">${cat.icon}</span>
              <div>
                <div class="forum-cat-name">${cat.name}</div>
                <div class="forum-cat-desc">${cat.description}</div>
              </div>
            </div>
            <div class="forum-td forum-td-stats">${cat.threadCount}</div>
            <div class="forum-td forum-td-stats">${cat.postCount}</div>
            <div class="forum-td forum-td-last">
              ${cat.lastThread
                ? `<div class="forum-last-title">${cat.lastThread.title.substring(0, 30)}${cat.lastThread.title.length > 30 ? '...' : ''}</div>
                   <div class="forum-last-time">${timeAgo(cat.lastThread.updatedAt)}</div>`
                : '<span class="forum-no-post">—</span>'}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } catch (err) {
    listEl.innerHTML = `<div class="forum-empty">${I18N.bi('Forum yüklenemedi.', 'forum_load_err')}</div>`;
  }
}

function navigateToCategory(catId) {
  location.hash = '#/forum/' + catId;
}

function showNewCategoryForm() {
  const html = `
    <form id="newCatForm">
      <div class="form-group">
        <label>Kategori Adı *</label>
        <input type="text" name="name" required placeholder="Örn: Dilbilgisi Soruları">
      </div>
      <div class="form-group">
        <label>Açıklama</label>
        <input type="text" name="description" placeholder="Bu kategori hakkında kısa açıklama">
      </div>
      <div class="form-group">
        <label>İkon</label>
        <input type="text" name="icon" placeholder="📁" value="📁" style="width:60px">
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-outline" onclick="closeModal()">İptal</button>
        <button type="submit" class="btn btn-primary">Oluştur</button>
      </div>
    </form>
  `;
  openModal('Yeni Kategori Ekle', html);

  document.getElementById('newCatForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.elements.name.value.trim(),
      description: form.elements.description.value.trim(),
      icon: form.elements.icon.value.trim() || '📁'
    };
    await API.createForumCategory(data);
    closeModal();
    showToast('Kategori oluşturuldu');
    await loadForumCategories();
  });
}


// ===== THREAD LIST (inside a category) =====
async function renderForumCategory(container, catId) {
  container.innerHTML = `
    <div class="forum-page">
      <div class="forum-breadcrumb">
        <a href="#/">Anasayfa</a> &rsaquo; <span id="forumCatTitle">...</span>
      </div>
      <div class="forum-section">
        <div class="forum-section-header">
          <h2 id="forumCatHeading">...</h2>
          <button class="btn btn-primary btn-sm" onclick="showNewThreadForm('${catId}')">+ Yeni Konu</button>
        </div>
        <div id="forumThreadList" class="forum-thread-list">
          <div class="forum-loading">Yükleniyor...</div>
        </div>
      </div>
    </div>
  `;

  try {
    const [categories, threads] = await Promise.all([
      API.getForumCategories(),
      API.getForumThreads(catId)
    ]);
    const cat = categories.find(c => c.id === catId);
    if (cat) {
      document.getElementById('forumCatTitle').textContent = cat.name;
      document.getElementById('forumCatHeading').innerHTML = `${cat.icon} ${cat.name}`;
    }

    const listEl = document.getElementById('forumThreadList');
    if (threads.length === 0) {
      listEl.innerHTML = '<div class="forum-empty">Bu kategoride henüz konu yok. İlk konuyu siz açın!</div>';
      return;
    }

    listEl.innerHTML = `
      <div class="forum-table">
        <div class="forum-table-head">
          <div class="forum-th forum-th-name">Konu</div>
          <div class="forum-th forum-th-stats">Yanıt</div>
          <div class="forum-th forum-th-last">Son Mesaj</div>
        </div>
        ${threads.map(t => `
          <div class="forum-table-row${t.pinned ? ' forum-pinned' : ''}" onclick="location.hash='#/forum/thread/${t.id}'" style="cursor:pointer">
            <div class="forum-td forum-td-name">
              ${t.pinned ? '<span class="forum-pin-badge">Sabit</span>' : ''}
              <div>
                <div class="forum-thread-title">${t.title}</div>
                <div class="forum-thread-meta">${t.author} &middot; ${timeAgo(t.createdAt)}</div>
              </div>
            </div>
            <div class="forum-td forum-td-stats">${Math.max(0, t.postCount - 1)}</div>
            <div class="forum-td forum-td-last">
              ${t.lastPost
                ? `<div class="forum-last-title">${t.lastPost.author}</div>
                   <div class="forum-last-time">${timeAgo(t.lastPost.createdAt)}</div>`
                : '—'}
            </div>
          </div>
        `).join('')}
      </div>
    `;
  } catch (err) {
    document.getElementById('forumThreadList').innerHTML = '<div class="forum-empty">Konular yüklenemedi.</div>';
  }
}

function showNewThreadForm(catId) {
  const html = `
    <form id="newThreadForm">
      <div class="form-group">
        <label>Adınız</label>
        <input type="text" name="author" placeholder="Adınızı yazın" value="${localStorage.getItem('forumAuthor') || ''}">
      </div>
      <div class="form-group">
        <label>Konu Başlığı *</label>
        <input type="text" name="title" required placeholder="Başlık yazın...">
      </div>
      <div class="form-group">
        <label>İçerik *</label>
        <textarea name="content" rows="6" required placeholder="Mesajınızı yazın..."></textarea>
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-outline" onclick="closeModal()">İptal</button>
        <button type="submit" class="btn btn-primary">Konuyu Aç</button>
      </div>
    </form>
  `;
  openModal('Yeni Konu Aç', html);

  document.getElementById('newThreadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const author = form.elements.author.value.trim() || 'Anonim';
    localStorage.setItem('forumAuthor', author);
    const data = {
      categoryId: catId,
      author,
      title: form.elements.title.value.trim(),
      content: form.elements.content.value.trim()
    };
    const result = await API.createForumThread(data);
    closeModal();
    showToast('Konu oluşturuldu');
    location.hash = '#/forum/thread/' + result.thread.id;
  });
}


// ===== THREAD DETAIL (posts) =====
async function renderForumThread(container, threadId) {
  container.innerHTML = `
    <div class="forum-page">
      <div class="forum-breadcrumb">
        <a href="#/">Anasayfa</a> &rsaquo; <a href="#" id="threadCatLink">...</a> &rsaquo; <span id="threadTitle">...</span>
      </div>
      <div id="forumThreadContent">
        <div class="forum-loading">Yükleniyor...</div>
      </div>
    </div>
  `;

  try {
    const data = await API.getForumThread(threadId);
    const { thread, category, posts } = data;

    document.getElementById('threadCatLink').textContent = category ? category.name : '...';
    document.getElementById('threadCatLink').href = '#/forum/' + thread.categoryId;
    document.getElementById('threadTitle').textContent = thread.title;

    const postsHtml = posts.map((p, i) => `
      <div class="forum-post-card${i === 0 ? ' forum-post-op' : ''}">
        <div class="forum-post-sidebar">
          <div class="forum-post-avatar">${p.author.charAt(0).toUpperCase()}</div>
          <div class="forum-post-author">${p.author}</div>
          <div class="forum-post-date">${timeAgo(p.createdAt)}</div>
        </div>
        <div class="forum-post-body">
          <div class="forum-post-content">${formatPostContent(p.content)}</div>
        </div>
      </div>
    `).join('');

    document.getElementById('forumThreadContent').innerHTML = `
      <div class="forum-thread-header-bar">
        <h2>${thread.title}</h2>
        <div class="forum-thread-info">${thread.author} tarafından &middot; ${timeAgo(thread.createdAt)} &middot; ${posts.length} mesaj</div>
      </div>
      <div class="forum-posts-list">
        ${postsHtml}
      </div>
      <div class="forum-reply-box">
        <h3>Yanıt Yaz</h3>
        <form id="replyForm">
          <div class="form-group">
            <input type="text" name="author" placeholder="Adınız" value="${localStorage.getItem('forumAuthor') || ''}">
          </div>
          <div class="form-group">
            <textarea name="content" rows="4" required placeholder="Yanıtınızı yazın..."></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Gönder</button>
        </form>
      </div>
    `;

    document.getElementById('replyForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const author = form.elements.author.value.trim() || 'Anonim';
      localStorage.setItem('forumAuthor', author);
      const content = form.elements.content.value.trim();
      if (!content) return;

      await API.replyForumThread(threadId, { author, content });
      showToast('Yanıt gönderildi');
      renderForumThread(container, threadId);
    });

  } catch (err) {
    document.getElementById('forumThreadContent').innerHTML = '<div class="forum-empty">Konu yüklenemedi.</div>';
  }
}

// ===== LEVEL TEST =====

let levelTestState = {
  mode: '', // 'placement' or level like 'A1'
  lang: 'en',
  questions: [],
  currentIndex: 0,
  score: { correct: 0, wrong: 0 },
  levelScores: {} // for placement: { A1: {correct, total}, A2: ... }
};

function getLevelTestLang() {
  return localStorage.getItem('turkceai_level_test_lang') || 'en';
}

function saveLevelTestLang(lang) {
  localStorage.setItem('turkceai_level_test_lang', lang);
}

function getLevelWords(level) {
  const data = window.VOCAB_DATA;
  if (!data || !data[level]) return [];
  const levelData = data[level];
  const words = [];
  ['isim', 'fiil', 'sifat', 'zarf'].forEach(cat => {
    if (!levelData[cat]) return;
    levelData[cat].forEach(section => {
      if (Array.isArray(section)) {
        section.forEach(w => { if (w && w.tr) words.push(w); });
      }
    });
  });
  return words;
}

function shuffleLT(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateLevelTestQuestions(mode, lang) {
  const questions = [];

  if (mode === 'placement') {
    ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].forEach(lvl => {
      const words = getLevelWords(lvl).filter(w => w[lang]);
      if (words.length < 4) return;
      const picked = shuffleLT(words).slice(0, 5);
      picked.forEach(w => {
        const correct = w[lang];
        const distractors = shuffleLT(words.filter(x => x.tr !== w.tr && x[lang]))
          .slice(0, 3).map(x => x[lang]);
        questions.push({
          level: lvl,
          word: w,
          correctAnswer: correct,
          options: shuffleLT([correct, ...distractors]),
          userAnswer: null,
          isCorrect: null
        });
      });
    });
  } else {
    const words = getLevelWords(mode).filter(w => w[lang]);
    if (words.length < 4) return questions;
    const picked = shuffleLT(words).slice(0, 10);
    picked.forEach(w => {
      const correct = w[lang];
      const distractors = shuffleLT(words.filter(x => x.tr !== w.tr && x[lang]))
        .slice(0, 3).map(x => x[lang]);
      questions.push({
        level: mode,
        word: w,
        correctAnswer: correct,
        options: shuffleLT([correct, ...distractors]),
        userAnswer: null,
        isCorrect: null
      });
    });
  }

  return questions;
}

function startLevelTest(mode) {
  const lang = getLevelTestLang();
  const questions = generateLevelTestQuestions(mode, lang);
  if (questions.length === 0) {
    showToast('Bu seviyede yeterli kelime yok!', 'error');
    return;
  }

  levelTestState = {
    mode,
    lang,
    questions,
    currentIndex: 0,
    score: { correct: 0, wrong: 0 },
    levelScores: {}
  };

  renderLevelTestQuestion(document.getElementById('app'));
}

function renderLevelTestQuestion(container) {
  const q = levelTestState.questions[levelTestState.currentIndex];
  const total = levelTestState.questions.length;
  const current = levelTestState.currentIndex + 1;
  const progress = (current / total) * 100;

  const modeLabel = levelTestState.mode === 'placement'
    ? 'Seviye Belirleme Testi'
    : `${levelTestState.mode} Seviye Testi`;

  const langNames = { en:'English', es:'Español', ar:'العربية', ru:'Русский', de:'Deutsch', fr:'Français' };
  const isFirstQuestion = levelTestState.currentIndex === 0;
  const langPickerHtml = isFirstQuestion ? `
    <div class="level-test-lang-picker">
      <span>Dil / Language:</span>
      ${Object.entries(langNames).map(([code, name]) => `
        <button class="level-test-lang-btn${code === levelTestState.lang ? ' active' : ''}" data-lang="${code}">${name}</button>
      `).join('')}
    </div>
  ` : '';

  container.innerHTML = `
    <div class="level-test-page">
      <div class="quiz-progress-bar">
        <div class="quiz-progress-fill" style="width:${progress}%"></div>
      </div>
      <div class="quiz-header-row">
        <div class="quiz-counter">${current} / ${total}</div>
        <div class="level-test-mode-label">${modeLabel}</div>
        <div class="level-test-level-badge">${q.level}</div>
      </div>
      ${langPickerHtml}
      <div class="quiz-question-card">
        <div class="quiz-prompt-label">Bu kelimenin anlamını seçin / Select the meaning:</div>
        <div class="quiz-prompt">${q.word.tr}</div>
        ${q.word.ex ? `<div class="quiz-prompt-example">"${q.word.ex}"</div>` : ''}
        <div class="quiz-options">
          ${q.options.map((opt, i) => `
            <button class="quiz-option" data-answer="${opt.replace(/"/g, '&quot;')}">${opt}</button>
          `).join('')}
        </div>
      </div>
    </div>
  `;

  // Lang picker - only on first question
  if (isFirstQuestion) {
    document.querySelectorAll('.level-test-lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const newLang = btn.dataset.lang;
        saveLevelTestLang(newLang);
        startLevelTest(levelTestState.mode);
      });
    });
  }

  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => handleLevelTestAnswer(btn.dataset.answer));
  });
}

function handleLevelTestAnswer(answer) {
  const q = levelTestState.questions[levelTestState.currentIndex];
  const isCorrect = answer === q.correctAnswer;

  q.userAnswer = answer;
  q.isCorrect = isCorrect;

  if (isCorrect) levelTestState.score.correct++;
  else levelTestState.score.wrong++;

  // Track per-level scores
  if (!levelTestState.levelScores[q.level]) {
    levelTestState.levelScores[q.level] = { correct: 0, total: 0 };
  }
  levelTestState.levelScores[q.level].total++;
  if (isCorrect) levelTestState.levelScores[q.level].correct++;

  // Visual feedback
  document.querySelectorAll('.quiz-option').forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.answer === q.correctAnswer) btn.classList.add('correct');
    if (btn.dataset.answer === answer && !isCorrect) btn.classList.add('wrong');
  });

  setTimeout(() => {
    levelTestState.currentIndex++;
    if (levelTestState.currentIndex >= levelTestState.questions.length) {
      saveLevelTestResult();
      renderLevelTestResults(document.getElementById('app'));
    } else {
      renderLevelTestQuestion(document.getElementById('app'));
    }
  }, 1000);
}

function determinePlacementLevel() {
  const levels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  let determinedLevel = 'A1';

  for (const lvl of levels) {
    const s = levelTestState.levelScores[lvl];
    if (!s || s.total === 0) continue;
    const pct = (s.correct / s.total) * 100;
    if (pct >= 60) determinedLevel = lvl;
    else break;
  }

  return determinedLevel;
}

function renderLevelTestResults(container) {
  const total = levelTestState.score.correct + levelTestState.score.wrong;
  const pct = total > 0 ? Math.round((levelTestState.score.correct / total) * 100) : 0;
  const isPlacement = levelTestState.mode === 'placement';

  let resultLevel = '';
  let headerHtml = '';

  if (isPlacement) {
    resultLevel = determinePlacementLevel();
    headerHtml = `
      <div class="level-test-result-level">${resultLevel}</div>
      <div class="level-test-result-message">Tahmini Türkçe seviyen / Your estimated Turkish level</div>
    `;
  } else {
    const emoji = pct >= 90 ? '&#127942;' : pct >= 70 ? '&#127881;' : pct >= 40 ? '&#128170;' : '&#128218;';
    const msg = pct >= 90 ? 'Mükemmel!' : pct >= 70 ? 'Çok iyi!' : pct >= 40 ? 'İyi gidiyorsun!' : 'Pratik yapmaya devam!';
    headerHtml = `
      <div class="quiz-results-emoji">${emoji}</div>
      <div class="level-test-result-message">${levelTestState.mode} Seviye Testi - ${msg}</div>
    `;
  }

  // Per-level breakdown for placement
  let breakdownHtml = '';
  if (isPlacement) {
    breakdownHtml = `
      <div class="level-test-breakdown">
        <h3>Seviye Detayları</h3>
        <div class="level-test-breakdown-grid">
          ${Object.entries(levelTestState.levelScores).map(([lvl, s]) => {
            const lvlPct = Math.round((s.correct / s.total) * 100);
            const barColor = lvlPct >= 60 ? 'var(--success)' : 'var(--danger)';
            return `
              <div class="level-test-breakdown-item">
                <div class="level-test-breakdown-label">${lvl}</div>
                <div class="level-test-breakdown-bar">
                  <div class="level-test-breakdown-fill" style="width:${lvlPct}%;background:${barColor}"></div>
                </div>
                <div class="level-test-breakdown-pct">${s.correct}/${s.total}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // Review
  const reviewHtml = levelTestState.questions.map(q => {
    const icon = q.isCorrect ? '&#10004;' : '&#10008;';
    const cls = q.isCorrect ? 'quiz-review-correct' : 'quiz-review-wrong';
    return `
      <div class="quiz-review-item ${cls}">
        <span class="quiz-review-icon">${icon}</span>
        <div class="quiz-review-body">
          <div class="quiz-review-word"><span class="level-test-q-badge">${q.level}</span> ${q.word.tr} — ${q.word[levelTestState.lang] || q.word.en}</div>
          ${!q.isCorrect ? `<div class="quiz-review-answer">Senin cevabın: <strong>${q.userAnswer}</strong> &middot; Doğru: <strong>${q.correctAnswer}</strong></div>` : ''}
        </div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="quiz-page">
      <div class="quiz-results-card">
        ${headerHtml}
        <div class="quiz-results-stats">
          <div class="quiz-stat">
            <div class="quiz-stat-num" style="color:var(--success)">${levelTestState.score.correct}</div>
            <div class="quiz-stat-label">Doğru</div>
          </div>
          <div class="quiz-stat">
            <div class="quiz-stat-num" style="color:var(--danger)">${levelTestState.score.wrong}</div>
            <div class="quiz-stat-label">Yanlış</div>
          </div>
          <div class="quiz-stat">
            <div class="quiz-stat-num">%${pct}</div>
            <div class="quiz-stat-label">Başarı</div>
          </div>
        </div>
        ${breakdownHtml}
        <div class="quiz-results-actions">
          <button class="btn btn-outline" onclick="location.hash='#/quiz';renderQuiz(document.getElementById('app'))">Sınav Sayfası</button>
          <button class="btn btn-primary" onclick="startLevelTest('${levelTestState.mode}')">Tekrar Dene</button>
        </div>
      </div>

      <div class="quiz-review-section">
        <h3>Cevap Anahtarı</h3>
        <div class="quiz-review-list">${reviewHtml}</div>
      </div>
    </div>
  `;
}

function saveLevelTestResult() {
  const total = levelTestState.score.correct + levelTestState.score.wrong;
  const result = {
    date: new Date().toISOString(),
    mode: levelTestState.mode,
    score: { ...levelTestState.score, total },
    percentage: total > 0 ? Math.round((levelTestState.score.correct / total) * 100) : 0,
    determinedLevel: levelTestState.mode === 'placement' ? determinePlacementLevel() : null
  };
  localStorage.setItem('turkceai_level_test_last', JSON.stringify(result));
}

function showLastLevelTestResult() {
  const el = document.getElementById('levelTestLastResult');
  if (!el) return;
  try {
    const result = JSON.parse(localStorage.getItem('turkceai_level_test_last'));
    if (!result) return;
    const dateStr = new Date(result.date).toLocaleDateString('tr-TR');
    if (result.mode === 'placement' && result.determinedLevel) {
      el.innerHTML = `
        <div class="level-test-last">
          Son test sonucun: <strong>${result.determinedLevel}</strong> seviyesi &middot; %${result.percentage} başarı &middot; ${dateStr}
        </div>
      `;
    } else {
      el.innerHTML = `
        <div class="level-test-last">
          Son ${result.mode} testi: %${result.percentage} başarı (${result.score.correct}/${result.score.total}) &middot; ${dateStr}
        </div>
      `;
    }
  } catch(e) {}
}

// ===== STREAK =====
function getLocalStreak() {
  const today = new Date().toISOString().slice(0, 10);
  const stored = JSON.parse(localStorage.getItem('lingual_streak') || '{}');
  if (!stored.lastDate) return { current: 0, longest: 0, total: 0 };

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().slice(0, 10);

  if (stored.lastDate === today) return stored;
  if (stored.lastDate === yStr) {
    const updated = { ...stored, current: stored.current + 1, longest: Math.max(stored.current + 1, stored.longest), total: stored.total + 1, lastDate: today };
    localStorage.setItem('lingual_streak', JSON.stringify(updated));
    return updated;
  }
  const reset = { current: 1, longest: stored.longest || 1, total: (stored.total || 0) + 1, lastDate: today };
  localStorage.setItem('lingual_streak', JSON.stringify(reset));
  return reset;
}

function saveLocalStreakToday() {
  const today = new Date().toISOString().slice(0, 10);
  const stored = JSON.parse(localStorage.getItem('lingual_streak') || '{}');
  if (stored.lastDate === today) return stored;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().slice(0, 10);
  const continued = stored.lastDate === yStr;
  const current = continued ? (stored.current || 0) + 1 : 1;
  const updated = { current, longest: Math.max(current, stored.longest || 0), total: (stored.total || 0) + 1, lastDate: today };
  localStorage.setItem('lingual_streak', JSON.stringify(updated));
  return updated;
}

async function initStreak() {
  const widget = document.getElementById('streakWidget');
  if (!widget) return;

  const isLoggedIn = Auth.isLoggedIn();
  let streak;

  if (isLoggedIn) {
    const result = await API.streakCheckin();
    streak = result || { current_streak: 1, longest_streak: 1, total_days: 1 };
    const current = streak.current_streak;
    const longest = streak.longest_streak;
    const total = streak.total_days;
    const flame = current >= 30 ? '🔥' : current >= 7 ? '🔥' : '🔥';
    widget.innerHTML = `
      <div class="streak-inner">
        <div class="streak-main">
          <span class="streak-flame">${flame}</span>
          <span class="streak-count">${current}</span>
          <span class="streak-label">günlük seri</span>
        </div>
        <div class="streak-stats">
          <span>En uzun: <strong>${longest}</strong></span>
          <span>Toplam: <strong>${total}</strong> gün</span>
        </div>
        ${streak.streakReset ? '<div class="streak-reset">Serin sıfırlandı — bugün yeniden başladın 💪</div>' : ''}
        ${current >= 7 ? `<div class="streak-badge">🏅 ${current} günlük seri!</div>` : ''}
      </div>
    `;
  } else {
    const local = saveLocalStreakToday();
    const current = local.current;
    widget.innerHTML = `
      <div class="streak-inner">
        <div class="streak-main">
          <span class="streak-flame">🔥</span>
          <span class="streak-count">${current}</span>
          <span class="streak-label">günlük seri</span>
        </div>
        ${current >= 3 ? `
          <div class="streak-save-prompt">
            Serini kaybetme! <a href="#" onclick="Auth.showLoginModal();return false;">Üye ol → kaydet</a>
          </div>
        ` : '<div class="streak-guest">Her gün gir, serinii büyüt!</div>'}
      </div>
    `;
  }

  widget.style.display = 'block';
}
