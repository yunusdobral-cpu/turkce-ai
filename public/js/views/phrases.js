// Günlük İfadeler / Daily Phrases Page

function phrasesBi(trText) {
  const entry = PHRASES_I18N[trText];
  if (!entry) return trText;
  const lang = I18N.getLang();
  const translated = entry[lang] || entry['en'] || '';
  if (!translated) return trText;
  return `${trText} / ${translated}`;
}

let phrasesState = { categoryIndex: 0 };

function renderPhrases(container) {
  const categories = PHRASES_DATA;
  const lang = I18N.getLang();
  const showTranslation = lang !== 'tr';

  const sidebarHtml = categories.map((cat, i) => `
    <div class="phrases-cat-item${i === phrasesState.categoryIndex ? ' active' : ''}" data-index="${i}">
      <span class="phrases-cat-icon">${cat.icon}</span>
      <span class="phrases-cat-name">${phrasesBi(cat.category)}</span>
      <span class="phrases-cat-count">${cat.phrases.length}</span>
    </div>
  `).join('');

  const currentCat = categories[phrasesState.categoryIndex];
  const phrasesHtml = currentCat ? currentCat.phrases.map((p, i) => {
    const trans = p[lang] || p.en || {};
    const phraseTrans = showTranslation ? (trans.phrase || '') : '';
    const exampleTrans = showTranslation ? (trans.example || '') : '';
    const noteTrans = showTranslation ? (trans.note || '') : '';
    return `
    <div class="phrases-card">
      <div class="phrases-card-header">
        <span class="phrases-card-num">${i + 1}</span>
        <div class="phrases-card-text">
          <span class="phrases-card-tr">${p.tr}</span>
          ${phraseTrans ? `<span class="phrases-card-en">${phraseTrans}</span>` : ''}
        </div>
      </div>
      <div class="phrases-card-pronunciation">${p.pronunciation}</div>
      <div class="phrases-card-example">
        <div class="phrases-card-example-tr">
          <span class="phrases-card-example-label">${I18N.bi('Örnek', 'phrases_example')}:</span>
          ${p.example}
        </div>
        ${exampleTrans ? `<div class="phrases-card-example-en">${exampleTrans}</div>` : ''}
      </div>
      ${p.note ? `<div class="phrases-card-note">${p.note}${noteTrans ? ` <span class="phrases-card-note-en">/ ${noteTrans}</span>` : ''}</div>` : ''}
    </div>`;
  }).join('') : '';

  const isAdmin = !!sessionStorage.getItem('adminPassword');
  const shareBtns = (currentCat && isAdmin) ? `
    <div class="phrases-share-actions">
      <button class="phrases-share-btn phrases-share-story" data-mode="story">
        <span>▭</span> Story İndir
      </button>
      <button class="phrases-share-btn phrases-share-post" data-mode="post">
        <span>▣</span> Post İndir
      </button>
    </div>` : '';

  const contentHtml = currentCat
    ? `<div class="phrases-content-header">
        <span class="phrases-content-icon">${currentCat.icon}</span>
        <h2>${phrasesBi(currentCat.category)}</h2>
        <span class="phrases-content-count">${currentCat.phrases.length} ${I18N.bi('ifade', 'phrases_count')}</span>
      </div>
      ${shareBtns}
      <div class="phrases-grid">${phrasesHtml}</div>`
    : `<div class="grammar-placeholder"><span>💬</span><p>${I18N.bi('Bir kategori seçin', 'phrases_select')}</p></div>`;

  container.innerHTML = `
    <div class="vocab-page">
      <div class="gallery-header">
        <h1>${I18N.bi('Günlük İfadeler', 'phrases_title')}</h1>
        <p class="gallery-subtitle">${I18N.bi('Günlük hayatta en çok kullanılan Türkçe ifadeler', 'phrases_subtitle')}</p>
      </div>

      <div class="vocab-full">
        <div class="vocab-full-sidebar phrases-sidebar">
          ${sidebarHtml}
        </div>
        <div class="vocab-full-main phrases-main">
          ${contentHtml}
        </div>
      </div>
    </div>
  `;

  container.querySelectorAll('.phrases-cat-item').forEach(item => {
    item.addEventListener('click', () => {
      phrasesState.categoryIndex = parseInt(item.dataset.index);
      renderPhrases(container);
    });
  });

  container.querySelectorAll('.phrases-share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      generatePhraseCards(phrasesState.categoryIndex, btn.dataset.mode);
    });
  });
}

// ========== Instagram Card Generator for Phrases ==========
const PHRASES_BRAND_NAME = 'Lingual.work';
const PHRASES_BRAND_HANDLE = '@lingual.work';
const PHRASES_BRAND_URL = 'lingual.work';

// SVG icons (unique IDs per call to avoid conflicts)
let _svgCounter = 0;
function IG_SVG(size) {
  const gid = 'igGrad_' + (++_svgCounter);
  return `<svg class="ph-svg ph-svg-ig" viewBox="0 0 512 512" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="${gid}" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#feda75"/>
        <stop offset="25%" stop-color="#fa7e1e"/>
        <stop offset="50%" stop-color="#d62976"/>
        <stop offset="75%" stop-color="#962fbf"/>
        <stop offset="100%" stop-color="#4f5bd5"/>
      </linearGradient>
    </defs>
    <rect x="16" y="16" width="480" height="480" rx="112" fill="url(#${gid})"/>
    <rect x="108" y="108" width="296" height="296" rx="72" fill="none" stroke="white" stroke-width="30"/>
    <circle cx="256" cy="256" r="76" fill="none" stroke="white" stroke-width="30"/>
    <circle cx="378" cy="134" r="22" fill="white"/>
  </svg>`;
}
const LINK_SVG = (size) => `<svg class="ph-svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;
const HEART_SVG = (size) => `<svg class="ph-svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
const COMMENT_SVG = (size) => `<svg class="ph-svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>`;
const SHARE_SVG = (size) => `<svg class="ph-svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>`;
const BOOKMARK_SVG = (size) => `<svg class="ph-svg" viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>`;

const PHRASE_GRADIENTS = [
  { bg: 'linear-gradient(135deg, #0f766e 0%, #14b8a6 50%, #5eead4 100%)', accent: '#99f6e4' },
  { bg: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 50%, #fb923c 100%)', accent: '#fed7aa' },
  { bg: 'linear-gradient(135deg, #831843 0%, #db2777 50%, #f472b6 100%)', accent: '#fbcfe8' },
  { bg: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)', accent: '#bfdbfe' },
  { bg: 'linear-gradient(135deg, #365314 0%, #65a30d 50%, #a3e635 100%)', accent: '#d9f99d' },
  { bg: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #a78bfa 100%)', accent: '#ddd6fe' },
  { bg: 'linear-gradient(135deg, #92400e 0%, #d97706 50%, #fbbf24 100%)', accent: '#fde68a' },
  { bg: 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 50%, #38bdf8 100%)', accent: '#bae6fd' },
  { bg: 'linear-gradient(135deg, #701a75 0%, #a21caf 50%, #e879f9 100%)', accent: '#f5d0fe' },
  { bg: 'linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #f87171 100%)', accent: '#fecaca' },
  { bg: 'linear-gradient(135deg, #134e4a 0%, #0d9488 50%, #2dd4bf 100%)', accent: '#ccfbf1' },
  { bg: 'linear-gradient(135deg, #1e40af 0%, #6366f1 50%, #a5b4fc 100%)', accent: '#c7d2fe' },
  { bg: 'linear-gradient(135deg, #3f3f46 0%, #71717a 50%, #a1a1aa 100%)', accent: '#e4e4e7' },
  { bg: 'linear-gradient(135deg, #14532d 0%, #16a34a 50%, #4ade80 100%)', accent: '#bbf7d0' },
  { bg: 'linear-gradient(135deg, #881337 0%, #e11d48 50%, #fb7185 100%)', accent: '#fecdd3' },
  { bg: 'linear-gradient(135deg, #422006 0%, #854d0e 50%, #ca8a04 100%)', accent: '#fef08a' },
];

function generatePhraseCards(categoryIndex, mode) {
  const cat = PHRASES_DATA[categoryIndex];
  if (!cat) return;
  const catLabel = phrasesBi(cat.category);
  const grad = PHRASE_GRADIENTS[categoryIndex % PHRASE_GRADIENTS.length];
  const lang = I18N.getLang();

  const slides = [];
  // Cover
  slides.push({ type: 'cover', category: cat.category, categoryEn: (PHRASES_I18N[cat.category] || {}).en || '', icon: cat.icon });

  // Each phrase
  cat.phrases.forEach((p, i) => {
    const trans = p[lang] || p.en || {};
    slides.push({
      type: 'phrase',
      index: i + 1,
      total: cat.phrases.length,
      tr: p.tr,
      en: trans.phrase || p.en?.phrase || '',
      pronunciation: p.pronunciation,
      example: p.example,
      exampleEn: trans.example || p.en?.example || '',
      note: p.note,
      noteEn: trans.note || p.en?.note || '',
    });
  });

  // CTA
  slides.push({ type: 'cta' });

  showPhraseCardCarousel(slides, mode, catLabel, grad, cat.icon);
}

function showPhraseCardCarousel(slides, mode, catLabel, grad, catIcon) {
  const existing = document.querySelector('.ig-card-overlay');
  if (existing) existing.remove();

  const isStory = mode === 'story';
  const cardW = 1080;
  const cardH = isStory ? 1920 : 1080;
  const previewW = isStory ? 270 : 300;
  const previewH = isStory ? 480 : 300;
  const scaleRatio = previewW / cardW;

  let currentIndex = 0;

  const overlay = document.createElement('div');
  overlay.className = 'ig-card-overlay';
  overlay.innerHTML = `
    <div class="ig-card-modal">
      <div class="ig-card-topbar">
        <span class="ig-card-counter">1 / ${slides.length}</span>
        <span class="ig-card-mode-label">${isStory ? 'Story (9:16)' : 'Post (1:1)'}</span>
        <button class="ig-card-close">&times;</button>
      </div>
      <div class="ig-card-preview-wrap" style="width:${previewW}px;height:${previewH}px;">
        <div class="ig-card-render-zone" style="width:${cardW}px;height:${cardH}px;transform:scale(${scaleRatio});transform-origin:top left;"></div>
      </div>
      <div class="ig-card-nav">
        <button class="ig-card-prev">&larr; Önceki</button>
        <button class="ig-card-dl">PNG İndir</button>
        <button class="ig-card-dl-all">Tümünü İndir</button>
        <button class="ig-card-next">Sonraki &rarr;</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const renderZone = overlay.querySelector('.ig-card-render-zone');
  const counter = overlay.querySelector('.ig-card-counter');

  function renderSlide(idx) {
    currentIndex = idx;
    counter.textContent = `${idx + 1} / ${slides.length}`;
    const slide = slides[idx];
    const cardClass = isStory ? 'ph-card ph-card-story' : 'ph-card ph-card-post';
    const frameClass = isStory ? 'ph-frame ph-frame-story' : 'ph-frame ph-frame-post';

    if (slide.type === 'cover') {
      renderZone.innerHTML = `
        <div class="${cardClass}" style="width:${cardW}px;height:${cardH}px;background:${grad.bg};">
          <div class="${frameClass}">
            <div class="ph-cover-top">
              <div class="ph-cover-brand">Günlük İfadeler</div>
              <div class="ph-cover-brand-en">Daily Turkish Phrases</div>
            </div>
            <div class="ph-cover-center">
              <div class="ph-cover-icon">${slide.icon}</div>
              <div class="ph-cover-title">${slide.category}</div>
              ${slide.categoryEn ? `<div class="ph-cover-title-en">${slide.categoryEn}</div>` : ''}
            </div>
            <div class="ph-cover-bottom">
              <div class="ph-swipe">${slides.length - 1} ${isStory ? '⇡ Yukarı kaydır' : '→ Kaydırarak devam et'}</div>
              <div class="ph-watermark">
                <span class="ph-wm-link">${LINK_SVG(36)}<span>${PHRASES_BRAND_URL}</span></span>
                <span class="ph-wm-ig">${IG_SVG(44)}<span>${PHRASES_BRAND_HANDLE}</span></span>
              </div>
            </div>
          </div>
        </div>`;
    } else if (slide.type === 'phrase') {
      renderZone.innerHTML = `
        <div class="${cardClass}" style="width:${cardW}px;height:${cardH}px;background:${grad.bg};">
          <div class="${frameClass}">
            <div class="ph-phrase-header">
              <div class="ph-phrase-cat">${catIcon} ${catLabel}</div>
              <div class="ph-phrase-num">${slide.index} / ${slide.total}</div>
            </div>
            <div class="ph-phrase-main">
              <div class="ph-phrase-tr">${slide.tr}</div>
              ${slide.en ? `<div class="ph-phrase-en">${slide.en}</div>` : ''}
              <div class="ph-phrase-pron">🔊 ${slide.pronunciation}</div>
            </div>
            <div class="ph-phrase-example">
              <div class="ph-ex-label">ÖRNEK / EXAMPLE</div>
              <div class="ph-ex-tr">${slide.example}</div>
              ${slide.exampleEn ? `<div class="ph-ex-en">${slide.exampleEn}</div>` : ''}
            </div>
            ${slide.note ? `<div class="ph-phrase-note">
              <div class="ph-phrase-note-tr">💡 ${slide.note}</div>
              ${slide.noteEn ? `<div class="ph-phrase-note-en">${slide.noteEn}</div>` : ''}
            </div>` : ''}
            <div class="ph-watermark">
              <span class="ph-wm-link">${LINK_SVG(32)}<span>${PHRASES_BRAND_URL}</span></span>
              <span class="ph-wm-ig">${IG_SVG(40)}<span>${PHRASES_BRAND_HANDLE}</span></span>
            </div>
          </div>
        </div>`;
    } else if (slide.type === 'cta') {
      renderZone.innerHTML = `
        <div class="${cardClass}" style="width:${cardW}px;height:${cardH}px;background:${grad.bg};">
          <div class="${frameClass}">
            <div class="ph-cta-top">
              <img class="ph-cta-logo" src="/logo.png" alt="lingual.work" crossorigin="anonymous">
            </div>
            <div class="ph-cta-center">
              <div class="ph-cta-link-row">
                <span class="ph-cta-icon">${LINK_SVG(56)}</span>
                <span class="ph-cta-link">${PHRASES_BRAND_URL}</span>
              </div>
              <div class="ph-cta-link-row">
                <span class="ph-cta-icon">${IG_SVG(68)}</span>
                <span class="ph-cta-link">${PHRASES_BRAND_HANDLE}</span>
              </div>
            </div>
            <div class="ph-cta-actions">
              <div class="ph-cta-act"><span class="ph-cta-act-icon">${HEART_SVG(72)}</span><span>Beğen</span></div>
              <div class="ph-cta-act"><span class="ph-cta-act-icon">${COMMENT_SVG(72)}</span><span>Yorum</span></div>
              <div class="ph-cta-act"><span class="ph-cta-act-icon">${SHARE_SVG(72)}</span><span>Paylaş</span></div>
              <div class="ph-cta-act"><span class="ph-cta-act-icon">${BOOKMARK_SVG(72)}</span><span>Kaydet</span></div>
            </div>
            <div class="ph-cta-footer">${PHRASES_BRAND_NAME}</div>
          </div>
        </div>`;
    }
  }

  renderSlide(0);

  overlay.querySelector('.ig-card-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
  overlay.querySelector('.ig-card-prev').addEventListener('click', () => {
    if (currentIndex > 0) renderSlide(currentIndex - 1);
  });
  overlay.querySelector('.ig-card-next').addEventListener('click', () => {
    if (currentIndex < slides.length - 1) renderSlide(currentIndex + 1);
  });

  async function captureSlide(idx) {
    renderSlide(idx);
    const card = renderZone.querySelector('.ph-card');
    if (!card) return null;
    const offscreen = document.createElement('div');
    offscreen.style.cssText = `position:fixed;left:-9999px;top:0;width:${cardW}px;height:${cardH}px;z-index:-1;overflow:hidden;`;
    const clone = card.cloneNode(true);
    clone.style.transform = 'none';
    clone.style.width = cardW + 'px';
    clone.style.height = cardH + 'px';
    offscreen.appendChild(clone);
    document.body.appendChild(offscreen);
    await new Promise(r => setTimeout(r, 100));
    try {
      const canvas = await html2canvas(clone, {
        scale: 1, width: cardW, height: cardH,
        useCORS: true, backgroundColor: null,
        windowWidth: cardW, windowHeight: cardH
      });
      return canvas;
    } finally {
      offscreen.remove();
    }
  }

  function downloadCanvas(canvas, filename) {
    canvas.toBlob(function(blob) {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = filename;
      link.href = url;
      link.click();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    }, 'image/png');
  }

  const safeCatName = catLabel.replace(/[^\w]/g, '_');

  overlay.querySelector('.ig-card-dl').addEventListener('click', async () => {
    const btn = overlay.querySelector('.ig-card-dl');
    btn.textContent = 'Hazırlanıyor...';
    btn.disabled = true;
    try {
      const canvas = await captureSlide(currentIndex);
      if (canvas) downloadCanvas(canvas, `${safeCatName}_${currentIndex + 1}.png`);
    } catch (err) { console.error('Download error:', err); }
    btn.textContent = 'PNG İndir';
    btn.disabled = false;
  });

  overlay.querySelector('.ig-card-dl-all').addEventListener('click', async () => {
    const btn = overlay.querySelector('.ig-card-dl-all');
    btn.disabled = true;
    for (let i = 0; i < slides.length; i++) {
      btn.textContent = `${i + 1}/${slides.length}...`;
      try {
        const canvas = await captureSlide(i);
        if (canvas) downloadCanvas(canvas, `${safeCatName}_${i + 1}.png`);
      } catch (err) { console.error('Download error:', err); }
      await new Promise(r => setTimeout(r, 300));
    }
    btn.textContent = 'Tümünü İndir';
    btn.disabled = false;
  });
}

