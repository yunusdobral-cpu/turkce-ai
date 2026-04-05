// Dilbilgisi / Grammar Page

// Yardımcı: Türkçe metni çift dilli yap
function grammarBi(trText) {
  const entry = GRAMMAR_I18N[trText];
  if (!entry) return trText;
  const lang = I18N.getLang();
  const translated = entry[lang] || entry['en'] || '';
  if (!translated) return trText;
  return `${trText} / ${translated}`;
}

// İçerik HTML'indeki h3/h4 başlıklarını çift dilli yap
function translateGrammarContent(html) {
  // h3 ve h4 başlıklarındaki "Türkçe / English" kalıbını bul ve seçili dile çevir
  return html.replace(/<(h[34])([^>]*)>(.*?)<\/\1>/g, (match, tag, attrs, inner) => {
    // Emoji prefix'leri koru (✅, ❌, ❓)
    const emojiMatch = inner.match(/^([✅❌❓]\s*)/);
    const emoji = emojiMatch ? emojiMatch[1] : '';
    let text = emojiMatch ? inner.slice(emojiMatch[0].length) : inner;

    // "Türkçe / English" formatını ayır
    const slashIdx = text.indexOf(' / ');
    let trPart;
    if (slashIdx > -1) {
      trPart = text.substring(0, slashIdx);
    } else {
      trPart = text;
    }

    // Parantez içindeki ekstra bilgiyi koru: "Ünlüler / Vowels (8)" → trPart="Ünlüler", extra=" (8)"
    let extra = '';
    const parenMatch = text.match(/(\s*\(\d+\))$/);
    if (parenMatch) {
      extra = parenMatch[1];
      if (slashIdx > -1) {
        // extra zaten İngilizce kısımda, trPart doğru
      }
    }

    const entry = GRAMMAR_I18N[trPart];
    if (entry) {
      const lang = I18N.getLang();
      const translated = entry[lang] || entry['en'] || '';
      return `<${tag}${attrs}>${emoji}${trPart} / ${translated}${extra}</${tag}>`;
    }
    return match;
  });
}

function getGrammarLevelLabel(meta) {
  return I18N.bi(meta.tr, meta.i18nKey);
}

let grammarState = { level: 'A1', topicIndex: 0 };

function renderGrammar(container) {
  const levelsHtml = ['A1','A2','B1','B2','C1','C2'].map(lvl => {
    const meta = GRAMMAR_LEVEL_META[lvl];
    const isOpen = grammarState.level === lvl;
    const topics = GRAMMAR_LEVELS[lvl] || [];
    const topicsHtml = isOpen ? topics.map((t, i) => `
      <div class="grammar-topic-item${i === grammarState.topicIndex ? ' active' : ''}" data-level="${lvl}" data-index="${i}">
        <div class="grammar-topic-title"><span class="grammar-topic-num" style="background:${meta.color}">${i + 1}</span>${grammarBi(t.title)}</div>
        <div class="grammar-topic-desc">${grammarBi(t.desc)}</div>
      </div>
    `).join('') : '';

    return `
      <div class="grammar-level-row${isOpen ? ' open' : ''}" data-level="${lvl}">
        <div class="grammar-level-header" data-level="${lvl}">
          <span class="grammar-level-badge" style="background:${meta.color}">${lvl}</span>
          <span class="grammar-level-label">${getGrammarLevelLabel(meta)}</span>
          <span class="grammar-level-count">${(GRAMMAR_LEVELS[lvl] || []).length} ${I18N.bi('konu', 'grammar_topic_count')}</span>
          <span class="grammar-level-arrow">${isOpen ? '&#9650;' : '&#9660;'}</span>
        </div>
        ${isOpen ? `<div class="grammar-topic-list">${topicsHtml}</div>` : ''}
      </div>
    `;
  }).join('');

  const topics = grammarState.level ? (GRAMMAR_LEVELS[grammarState.level] || []) : [];
  const currentTopic = topics[grammarState.topicIndex] || null;
  const isAdmin = !!sessionStorage.getItem('adminPassword');
  const shareBtn = (currentTopic && isAdmin) ? `<div class="grammar-share-actions">
    <button class="grammar-share-btn grammar-share-story" data-mode="story">
      <span>&#9641;</span> ${I18N.bi('Story İndir', 'grammar_story_dl')}
    </button>
    <button class="grammar-share-btn grammar-share-post" data-mode="post">
      <span>&#9635;</span> ${I18N.bi('Post İndir', 'grammar_post_dl')}
    </button>
  </div>` : '';
  const contentHtml = currentTopic ? (shareBtn + translateGrammarContent(currentTopic.content)) : `<div class="grammar-placeholder"><span>&#128218;</span><p>${I18N.bi('Bir seviye ve konu seçin', 'grammar_select_topic')}</p></div>`;

  container.innerHTML = `
    <div class="vocab-page">
      <div class="gallery-header">
        <h1>${I18N.bi('Dilbilgisi', 'grammar_title')}</h1>
        <p class="gallery-subtitle">${I18N.bi('Seviyene uygun dilbilgisi konularını keşfet', 'grammar_subtitle')}</p>
      </div>

      <div class="vocab-full">
        <div class="vocab-full-sidebar grammar-sidebar">
          ${levelsHtml}
        </div>

        <div class="vocab-full-main grammar-content-area">
          ${contentHtml}
        </div>
      </div>
    </div>
  `;

  // Level headers (accordion toggle)
  container.querySelectorAll('.grammar-level-header').forEach(header => {
    header.addEventListener('click', () => {
      const lvl = header.dataset.level;
      if (grammarState.level === lvl) {
        grammarState.level = null;
      } else {
        grammarState.level = lvl;
        grammarState.topicIndex = 0;
      }
      renderGrammar(container);
    });
  });

  // Topic items
  container.querySelectorAll('.grammar-topic-item').forEach(item => {
    item.addEventListener('click', () => {
      grammarState.topicIndex = parseInt(item.dataset.index);
      renderGrammar(container);
    });
  });

  // Instagram share buttons (admin only)
  container.querySelectorAll('.grammar-share-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      generateGrammarCards(grammarState.level, grammarState.topicIndex, mode);
    });
  });
}

// ========== Instagram Card Generator ==========
const GRAMMAR_BRAND_NAME = 'Lingual.work';
const GRAMMAR_BRAND_HANDLE = '@lingualwork';

function generateGrammarCards(level, topicIndex, mode) {
  const topic = GRAMMAR_LEVELS[level][topicIndex];
  if (!topic) return;
  const meta = GRAMMAR_LEVEL_META[level];

  // Parse the HTML content into logical slides
  const slides = parseTopicIntoSlides(topic, level, meta);

  // Show overlay with carousel
  showCardCarousel(slides, mode, topic.title, level, meta);
}

function parseTopicIntoSlides(topic, level, meta) {
  const temp = document.createElement('div');
  temp.innerHTML = topic.content;

  const slides = [];
  // First slide: title card
  slides.push({
    type: 'title',
    title: topic.title,
    desc: topic.desc,
    level: level,
    label: meta.tr
  });

  // Walk through child nodes and split aggressively — each element gets its own slide
  let currentHeading = '';
  const children = Array.from(temp.children);

  for (let i = 0; i < children.length; i++) {
    const el = children[i];
    const tag = el.tagName.toLowerCase();

    if (tag === 'h3') continue;

    if (tag === 'h4') {
      currentHeading = el.innerHTML;
      continue;
    }

    // Each table, example, tip, or paragraph group = new slide
    const isTable = el.classList.contains('grammar-table-wrap') || tag === 'table';
    const isTip = el.classList.contains('grammar-tip');
    const isExample = el.classList.contains('grammar-example');

    if (isTable || isTip || isExample) {
      slides.push({ type: 'content', heading: currentHeading, elements: [el.outerHTML] });
    } else {
      // Group consecutive p tags together (max 3)
      const group = [el.outerHTML];
      while (i + 1 < children.length) {
        const next = children[i + 1];
        const nextTag = next.tagName.toLowerCase();
        if (nextTag === 'p' && group.length < 3) {
          group.push(next.outerHTML);
          i++;
        } else {
          break;
        }
      }
      slides.push({ type: 'content', heading: currentHeading, elements: group });
    }
  }

  return slides;
}

function showCardCarousel(slides, mode, topicTitle, level, meta) {
  // Remove existing overlay
  const existing = document.querySelector('.ig-card-overlay');
  if (existing) existing.remove();

  const isStory = mode === 'story';
  const cardW = isStory ? 1080 : 1080;
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
        <button class="ig-card-prev">&larr; Onceki</button>
        <button class="ig-card-dl">PNG Indir</button>
        <button class="ig-card-dl-all">Tumunu Indir</button>
        <button class="ig-card-next">Sonraki &rarr;</button>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const renderZone = overlay.querySelector('.ig-card-render-zone');
  const counter = overlay.querySelector('.ig-card-counter');

  // Level-specific gradient backgrounds
  const levelGradients = {
    A1: { bg: 'linear-gradient(135deg, #065f46 0%, #059669 50%, #34d399 100%)', accent: '#6ee7b7' },
    A2: { bg: 'linear-gradient(135deg, #3f6212 0%, #65a30d 50%, #a3e635 100%)', accent: '#d9f99d' },
    B1: { bg: 'linear-gradient(135deg, #92400e 0%, #d97706 50%, #fbbf24 100%)', accent: '#fde68a' },
    B2: { bg: 'linear-gradient(135deg, #9a3412 0%, #ea580c 50%, #fb923c 100%)', accent: '#fed7aa' },
    C1: { bg: 'linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #f87171 100%)', accent: '#fecaca' },
    C2: { bg: 'linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #a78bfa 100%)', accent: '#ddd6fe' }
  };

  function renderSlide(idx) {
    currentIndex = idx;
    counter.textContent = `${idx + 1} / ${slides.length}`;
    const slide = slides[idx];
    const levelColor = meta.color;
    const grad = levelGradients[level] || levelGradients.A1;
    const gradientBg = grad.bg;

    const cardClass = isStory ? 'ig-card' : 'ig-card ig-card-post';
    if (slide.type === 'title') {
      renderZone.innerHTML = `
        <div class="${cardClass}" style="width:${cardW}px;height:${cardH}px;background:${gradientBg};">
          <div class="ig-card-header">
            <div class="ig-card-badge" style="background:rgba(255,255,255,0.25);backdrop-filter:blur(8px)">${slide.level}</div>
            <div class="ig-card-level-text">${slide.label}</div>
          </div>
          <div class="ig-card-title-area ${isStory ? 'ig-story' : 'ig-post'}">
            <div class="ig-card-emoji">&#128214;</div>
            <h2 class="ig-card-title">${slide.title}</h2>
            <p class="ig-card-desc">${slide.desc}</p>
          </div>
          <div class="ig-card-swipe">${slides.length > 1 ? (isStory ? '&#8593; Yukari kaydir' : '&#8592; Kaydirarak devam et &bull; ${slides.length} sayfa') : ''}</div>
          <div class="ig-card-watermark">
            <div class="ig-card-wm-name">${GRAMMAR_BRAND_NAME}</div>
            <div class="ig-card-wm-handle">${GRAMMAR_BRAND_HANDLE}</div>
          </div>
        </div>`;
    } else {
      const heading = slide.heading ? `<div class="ig-card-content-heading">${slide.heading}</div>` : '';
      renderZone.innerHTML = `
        <div class="${cardClass}" style="width:${cardW}px;height:${cardH}px;background:${gradientBg};">
          <div class="ig-card-header">
            <div class="ig-card-badge" style="background:rgba(255,255,255,0.25)">${level}</div>
            <div class="ig-card-header-title">${topicTitle}</div>
            <div class="ig-card-page-num">${idx + 1}/${slides.length}</div>
          </div>
          <div class="ig-card-body ${isStory ? 'ig-story' : 'ig-post'}">
            ${heading}
            <div class="ig-card-content">${slide.elements.join('')}</div>
          </div>
          <div class="ig-card-watermark">
            <div class="ig-card-wm-name">${GRAMMAR_BRAND_NAME}</div>
            <div class="ig-card-wm-handle">${GRAMMAR_BRAND_HANDLE}</div>
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

  // Capture a slide at full resolution off-screen
  async function captureSlide(idx) {
    // Save current, render target slide
    const prevIdx = currentIndex;
    renderSlide(idx);

    // Clone the card into a full-size off-screen container
    const card = renderZone.querySelector('.ig-card');
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
        scale: 1,
        width: cardW,
        height: cardH,
        useCORS: true,
        backgroundColor: null,
        windowWidth: cardW,
        windowHeight: cardH
      });
      return canvas;
    } finally {
      offscreen.remove();
    }
  }

  // Download current slide
  overlay.querySelector('.ig-card-dl').addEventListener('click', async () => {
    const btn = overlay.querySelector('.ig-card-dl');
    btn.textContent = I18N.bi('Hazırlanıyor...', 'grammar_preparing');
    btn.disabled = true;
    try {
      const canvas = await captureSlide(currentIndex);
      if (canvas) downloadCanvas(canvas, `${level}_${topicTitle.replace(/\s+/g, '_')}_${currentIndex + 1}.png`);
    } catch (err) { console.error('Download error:', err); }
    btn.textContent = I18N.bi('PNG İndir', 'grammar_dl_png');
    btn.disabled = false;
  });

  // Download all slides
  overlay.querySelector('.ig-card-dl-all').addEventListener('click', async () => {
    const btn = overlay.querySelector('.ig-card-dl-all');
    btn.disabled = true;
    for (let i = 0; i < slides.length; i++) {
      btn.textContent = `${i + 1}/${slides.length}...`;
      try {
        const canvas = await captureSlide(i);
        if (canvas) downloadCanvas(canvas, `${level}_${topicTitle.replace(/\s+/g, '_')}_${i + 1}.png`);
      } catch (err) { console.error('Download error:', err); }
      await new Promise(r => setTimeout(r, 300));
    }
    btn.textContent = I18N.bi('Tümünü İndir', 'grammar_dl_all');
    btn.disabled = false;
  });
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
