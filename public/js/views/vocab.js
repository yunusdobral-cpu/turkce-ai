// Kelime / Vocabulary Page

const LANG_MAP = {
  en: 'English',
  es: 'Español',
  ar: 'العربية',
  ru: 'Русский',
  de: 'Deutsch',
  fr: 'Français'
};

const CAT_MAP = {
  isim: 'İsim / Noun',
  fiil: 'Fiil / Verb',
  sifat: 'Sıfat / Adj.',
  zarf: 'Zarf / Adv.'
};

const SECTION_NAMES = {
  A1: {
    isim: ['Aile & İnsanlar','Ev & Odalar','Yiyecekler & İçecekler','Giysiler & Vücut','Yerler & Ulaşım','Doğa & Hava','Zaman & Sayılar','Okul & İş','Duygular & Renkler','Günlük Eşyalar'],
    fiil: ['Temel Eylemler','Hareket & Yön','Günlük Rutinler','İletişim & Düşünce','Duygu & Durum','Ev İşleri & Bakım','Doğa & Hava Eylemleri','Sosyal & Günlük','Alışveriş & Para','Sağlık & Vücut Eylemleri'],
    sifat: ['Temel Sıfatlar','Kişilik & Görünüş','Miktar & Durum','Hava & Doğa Sıfatları','Renk & Şekil','Tat & Doku','Sayı & Sıra','Duygusal & Karakter','Zaman & Durum Sıfatları','Günlük Yaşam Sıfatları'],
    zarf: ['Temel Zarflar','Yer & Yön Zarfları','Sıklık & Tekrar','Miktar & Derece','Zaman (Geçmiş & Gelecek)','Bağlaç Zarfları','Hareket & Şekil Zarfları','Onaylama & Olumsuzlama','Karşılaştırma Zarfları','Günlük Konuşma Zarfları']
  },
  A2: {
    isim: ['Meslekler & Toplum','Sağlık & Vücut','Alışveriş & Ekonomi','Yemek & Mutfak','Eğitim & Kariyer','Teknoloji & İletişim','Duygular & İlişkiler','Seyahat & Konaklama','Ev & Yaşam','Spor & Hobiler'],
    fiil: ['Günlük Yaşam Fiilleri','İletişim & Sosyal','İş & Kariyer','Hareket & Fiziksel','Düşünce & Bilgi','Eğitim & Öğrenme','Duygusal & Psikolojik','Seyahat & Ulaşım','Spor & Eğlence','Ev & Günlük Yaşam'],
    sifat: ['Kişilik & Karakter','Durum & Nitelik','Tat, Doku & Görünüş','Yiyecek & Sağlık','Eğitim & İş','Teknoloji & Modern Yaşam','Duygusal İlişkiler','Seyahat & Mekan','Spor & Fiziksel','Toplum & Çevre'],
    zarf: ['Zaman & Sıklık','Yer & Konum','Miktar & Derece','Bağlaç & Geçiş','Şekil & Tarz','Onay & Değerlendirme','Zaman (İleri)','Karşılaştırma & Benzetme','Günlük Konuşma','Durum & Koşul']
  },
  B1: {
    isim: ['İş & Kariyer','Eğitim & Akademi','Sağlık & Tıp','Teknoloji & Bilişim','Medya & İletişim','Çevre & Doğa','Ekonomi & Finans','Toplum & Sosyal','Sanat & Kültür','Bilim & Keşif'],
    fiil: ['Tartışma & İletişim','İş & Organizasyon','Kayıt & Paylaşım','Teşvik & Analiz','Karar & Süreç','Bilgilendirme & Eğitim','Tanımlama & Betimleme','Eylem & Çaba','Dil & İfade','Sonuçlandırma & Değerlendirme'],
    sifat: ['Kişilik & Davranış','Akademik & İş','Durum & Değerlendirme','Toplum & Politika','Bilim & Teknoloji','Çevre & Doğa','Ekonomi & Finans','Medya & Sanat','Psikoloji & Sağlık','Eğitim & Gelişim'],
    zarf: ['Bağlama & Mantık Zarfları','Akademik & Yazım','Neden & Sonuç','Zaman & Süreç','Karşılaştırma & Derecelendirme','İfade & Üslup','Toplum & Politika','Bilim & Araştırma','Ekonomi & İş','Duygusal & Psikolojik']
  },
  B2: {
    isim: ['Siyaset & Hukuk','Bilim & Çevre','Ekonomi & Finans','Medya & Sanat','Psikoloji & Felsefe','Teknoloji & Dijital','Sağlık & Tıp','Eğitim & Akademi','Sosyoloji & Toplum','Edebiyat & Dil'],
    fiil: ['Akademik & Analitik','Sosyal & Politik','Düşünce & İfade','Bilim & Çevre','Hukuk & Yönetim'],
    sifat: ['İleri Düzey Sıfatlar','Toplum & İlişki Sıfatları'],
    zarf: ['İleri Bağlama Zarfları']
  },
  C1: {
    isim: ['Felsefe & Düşünce','Hukuk & Diplomasi','Bilim & Araştırma','Edebiyat & Kültür','Ekonomi & Strateji','Psikoloji & Davranış','Medya & İletişim'],
    fiil: ['Entelektüel & Akademik','Toplum & Değişim','Akademik Yazım & İfade'],
    sifat: ['Entelektüel Sıfatlar','Toplum & Siyaset Sıfatları'],
    zarf: ['Akademik & Felsefi Zarflar']
  },
  C2: {
    isim: ['Felsefe & Metafizik','Dilbilim & Semiyotik','Siyaset Felsefesi & Uluslararası İlişkiler','İleri Bilim & Teknoloji','Sanat Kuramı & Estetik','Psikoanaliz & Bilişsel Bilim'],
    fiil: ['Akademik & Felsefi','Edebi & Retorik'],
    sifat: ['Felsefi & Edebi'],
    zarf: ['Akademik & Felsefi']
  }
};

let vocabState = {
  level: 'A1',
  category: 'isim',
  section: 0,
  lang: 'en',
  index: 0,
  revealed: false
};

function updateSectionSelect() {
  const select = document.getElementById('vocabSectionSelect');
  if (!select) return;
  const names = (SECTION_NAMES[vocabState.level] && SECTION_NAMES[vocabState.level][vocabState.category]) || [];
  select.innerHTML = names.map((name, i) => `<option value="${i}">${name}</option>`).join('');
  vocabState.section = 0;
  select.value = '0';
}

function getVocabWords() {
  const data = window.VOCAB_DATA;
  if (!data || !data[vocabState.level]) return [];
  const levelData = data[vocabState.level];
  if (!levelData[vocabState.category]) return [];
  const sections = levelData[vocabState.category];
  if (!sections[vocabState.section]) return [];
  return sections[vocabState.section];
}

function getVocabWord() {
  const words = getVocabWords();
  if (words.length === 0) return { tr: '...', en: '...', es: '...', ar: '...', ru: '...', de: '...', fr: '...', ex: '...' };
  return words[vocabState.index % words.length];
}

function updateVocabDisplay() {
  const word = getVocabWord();
  const words = getVocabWords();
  const trEl = document.getElementById('vocabWordTr');
  const transEl = document.getElementById('vocabWordTrans');
  const exEl = document.getElementById('vocabWordExample');
  const showBtn = document.getElementById('vocabShowBtn');
  const counter = document.getElementById('vocabCounter');

  if (!trEl) return;

  trEl.textContent = word.tr;
  exEl.textContent = word.ex ? `"${word.ex}"` : '';

  if (vocabState.revealed) {
    transEl.textContent = word[vocabState.lang] || '—';
    transEl.classList.remove('hidden-answer');
    showBtn.innerHTML = '&#128065; Göster';
    showBtn.disabled = true;
    showBtn.style.opacity = '0.5';
  } else {
    transEl.textContent = 'Görmek için tıkla';
    transEl.classList.add('hidden-answer');
    showBtn.disabled = false;
    showBtn.style.opacity = '1';
    showBtn.innerHTML = '&#128065; Göster';
  }

  if (counter) {
    const total = words.length || 1;
    counter.textContent = `${(vocabState.index % total) + 1}/${total}`;
  }
}

function initVocabBot() {
  const levelChips = document.querySelectorAll('.vocab-chip');
  const catChips = document.querySelectorAll('.vocab-cat-chip');
  const sectionSelect = document.getElementById('vocabSectionSelect');
  const langSelect = document.getElementById('vocabLangSelect');
  const showBtn = document.getElementById('vocabShowBtn');
  const nextBtn = document.getElementById('vocabNextBtn');
  const prevBtn = document.getElementById('vocabPrevBtn');
  const transEl = document.getElementById('vocabWordTrans');

  if (!showBtn) return;

  levelChips.forEach(chip => {
    chip.addEventListener('click', () => {
      levelChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      vocabState.level = chip.dataset.level;
      vocabState.index = 0;
      vocabState.revealed = false;
      updateSectionSelect();
      updateVocabDisplay();
    });
  });

  catChips.forEach(chip => {
    chip.addEventListener('click', () => {
      catChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      vocabState.category = chip.dataset.cat;
      vocabState.index = 0;
      vocabState.revealed = false;
      updateSectionSelect();
      updateVocabDisplay();
    });
  });

  sectionSelect.addEventListener('change', () => {
    vocabState.section = parseInt(sectionSelect.value);
    vocabState.index = 0;
    vocabState.revealed = false;
    updateVocabDisplay();
  });

  langSelect.addEventListener('change', () => {
    vocabState.lang = langSelect.value;
    if (vocabState.revealed) updateVocabDisplay();
  });

  function revealAnswer() {
    vocabState.revealed = true;
    updateVocabDisplay();
  }

  showBtn.addEventListener('click', revealAnswer);
  transEl.addEventListener('click', () => {
    if (!vocabState.revealed) revealAnswer();
  });

  nextBtn.addEventListener('click', () => {
    vocabState.index++;
    vocabState.revealed = false;
    updateVocabDisplay();
  });

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const words = getVocabWords();
      const total = words.length || 1;
      vocabState.index = (vocabState.index - 1 + total) % total;
      vocabState.revealed = false;
      updateVocabDisplay();
    });
  }

  updateVocabDisplay();
}

function renderVocab(container) {
  const levelChipsHtml = ['A1','A2','B1','B2','C1','C2'].map(lvl => `
    <button class="vocab-chip${lvl === 'A1' ? ' active' : ''}" data-level="${lvl}">${lvl}</button>
  `).join('');

  const catChipsHtml = Object.entries(CAT_MAP).map(([key, name], i) => `
    <button class="vocab-cat-chip${i === 0 ? ' active' : ''}" data-cat="${key}">${name}</button>
  `).join('');

  const defaultSectionNames = (SECTION_NAMES['A1'] && SECTION_NAMES['A1']['isim']) || [];
  const sectionOptionsHtml = defaultSectionNames.map((name, i) => `
    <option value="${i}">${name}</option>
  `).join('');

  const langOptionsHtml = Object.entries(LANG_MAP).map(([code, name]) => `
    <option value="${code}">${name}</option>
  `).join('');

  const isAdmin = !!sessionStorage.getItem('adminPassword');
  const shareBtns = isAdmin ? `
    <div class="vocab-sidebar-section">
      <div class="vocab-sidebar-label">Instagram Kartı</div>
      <div class="phrases-share-actions">
        <button class="phrases-share-btn phrases-share-story" id="vocabShareStory">▭ Story</button>
        <button class="phrases-share-btn phrases-share-post" id="vocabSharePost">▣ Post</button>
      </div>
    </div>` : '';

  container.innerHTML = `
    <div class="vocab-page">
      <div class="gallery-header">
        <h1>Kelime Robotu / Vocab Bot</h1>
        <p class="gallery-subtitle">Seviyene göre kelime öğren / Learn words by level</p>
      </div>

      <div class="vocab-full">
        <div class="vocab-full-sidebar">
          <div class="vocab-sidebar-section">
            <div class="vocab-sidebar-label">Seviye / Level</div>
            <div class="vocab-level-chips">
              ${levelChipsHtml}
            </div>
          </div>
          <div class="vocab-sidebar-section">
            <div class="vocab-sidebar-label">Kategori / Category</div>
            <div class="vocab-category-chips">
              ${catChipsHtml}
            </div>
          </div>
          <div class="vocab-sidebar-section">
            <div class="vocab-sidebar-label">Kısım / Section</div>
            <select class="vocab-select vocab-select-full" id="vocabSectionSelect">
              ${sectionOptionsHtml}
            </select>
          </div>
          <div class="vocab-sidebar-section">
            <div class="vocab-sidebar-label">Dil / Language</div>
            <select class="vocab-select vocab-select-full" id="vocabLangSelect">
              ${langOptionsHtml}
            </select>
          </div>
          ${shareBtns}
        </div>

        <div class="vocab-full-main">
          <div class="vocab-full-counter" id="vocabCounter">1/20</div>
          <div class="vocab-full-display">
            <div class="vocab-word-tr" id="vocabWordTr">...</div>
            <div class="vocab-word-trans hidden-answer" id="vocabWordTrans">Görmek için tıkla</div>
            <div class="vocab-word-example" id="vocabWordExample"></div>
          </div>
          <div class="vocab-full-actions">
            <button class="vocab-btn vocab-btn-prev" id="vocabPrevBtn">&#8592; Önceki</button>
            <button class="vocab-btn vocab-btn-show" id="vocabShowBtn">&#128065; Göster</button>
            <button class="vocab-btn vocab-btn-next" id="vocabNextBtn">Sonraki &#8594;</button>
          </div>
        </div>
      </div>
    </div>
  `;

  initVocabBot();

  if (isAdmin) {
    document.getElementById('vocabShareStory').addEventListener('click', () => {
      generateVocabCards(vocabState.level, vocabState.category, vocabState.section, 'story');
    });
    document.getElementById('vocabSharePost').addEventListener('click', () => {
      generateVocabCards(vocabState.level, vocabState.category, vocabState.section, 'post');
    });
  }
}

// ========== Instagram Card Generator for Vocab ==========

const VOCAB_LEVEL_GRADS = {
  A1: { bg: 'linear-gradient(135deg, #14532d 0%, #16a34a 50%, #4ade80 100%)' },
  A2: { bg: 'linear-gradient(135deg, #365314 0%, #65a30d 50%, #a3e635 100%)' },
  B1: { bg: 'linear-gradient(135deg, #92400e 0%, #d97706 50%, #fbbf24 100%)' },
  B2: { bg: 'linear-gradient(135deg, #7c2d12 0%, #ea580c 50%, #fb923c 100%)' },
  C1: { bg: 'linear-gradient(135deg, #991b1b 0%, #dc2626 50%, #f87171 100%)' },
  C2: { bg: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 50%, #a78bfa 100%)' },
};

const VOCAB_LANG_LABELS = { en: 'EN', es: 'ES', ar: 'AR', ru: 'RU', de: 'DE', fr: 'FR' };

function generateVocabCards(level, cat, sectionIdx, mode) {
  const data = window.VOCAB_DATA;
  if (!data || !data[level] || !data[level][cat] || !data[level][cat][sectionIdx]) return;
  const words = data[level][cat][sectionIdx];
  const sectionName = (SECTION_NAMES[level] && SECTION_NAMES[level][cat] && SECTION_NAMES[level][cat][sectionIdx]) || '';
  const catLabel = CAT_MAP[cat] || cat;
  const grad = VOCAB_LEVEL_GRADS[level] || VOCAB_LEVEL_GRADS.A1;

  const slides = [];
  slides.push({ type: 'cover', level, sectionName, catLabel });
  words.forEach((w, i) => {
    slides.push({ type: 'word', word: w, index: i + 1, total: words.length, level, sectionName });
  });
  slides.push({ type: 'cta' });

  showVocabCardCarousel(slides, mode, grad, level, sectionName);
}

function showVocabCardCarousel(slides, mode, grad, level, sectionName) {
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
              <div class="ph-cover-brand">Kelime Kartları</div>
              <div class="ph-cover-brand-en">Turkish Vocabulary</div>
            </div>
            <div class="ph-cover-center">
              <div class="vc-cover-level">${slide.level}</div>
              <div class="ph-cover-title">${slide.sectionName}</div>
              <div class="ph-cover-title-en">${slide.catLabel}</div>
            </div>
            <div class="ph-cover-bottom">
              <div class="ph-swipe">${slides.length - 1} ${isStory ? '⇡ Yukarı kaydır' : '→ Kaydırarak devam et'}</div>
              <div class="ph-watermark">
                <span class="ph-wm-link">${LINK_SVG(36)}<span>lingual.work</span></span>
                <span class="ph-wm-ig">${IG_SVG(44)}<span>@lingual.work</span></span>
              </div>
            </div>
          </div>
        </div>`;
    } else if (slide.type === 'word') {
      const w = slide.word;
      const transGrid = Object.entries(VOCAB_LANG_LABELS).map(([code, label]) =>
        w[code] ? `<div class="vc-trans-item"><span class="vc-trans-code">${label}</span><span class="vc-trans-val">${w[code]}</span></div>` : ''
      ).join('');
      renderZone.innerHTML = `
        <div class="${cardClass}" style="width:${cardW}px;height:${cardH}px;background:${grad.bg};">
          <div class="${frameClass}">
            <div class="ph-phrase-header">
              <div class="ph-phrase-cat">${slide.sectionName}</div>
              <div class="ph-phrase-num">${slide.index} / ${slide.total}</div>
            </div>
            <div class="vc-word-main">
              <div class="vc-level-badge">${slide.level}</div>
              <div class="vc-word-tr">${w.tr}</div>
            </div>
            <div class="vc-trans-grid">${transGrid}</div>
            ${w.ex ? `<div class="vc-example">
              <div class="vc-ex-label">ÖRNEK / EXAMPLE</div>
              <div class="vc-ex-text">${w.ex}</div>
            </div>` : ''}
            <div class="ph-watermark">
              <span class="ph-wm-link">${LINK_SVG(32)}<span>lingual.work</span></span>
              <span class="ph-wm-ig">${IG_SVG(40)}<span>@lingual.work</span></span>
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
                <span class="ph-cta-link">lingual.work</span>
              </div>
              <div class="ph-cta-link-row">
                <span class="ph-cta-icon">${IG_SVG(68)}</span>
                <span class="ph-cta-link">@lingual.work</span>
              </div>
            </div>
            <div class="ph-cta-actions">
              <div class="ph-cta-act"><span class="ph-cta-act-icon">${HEART_SVG(72)}</span><span>Beğen</span></div>
              <div class="ph-cta-act"><span class="ph-cta-act-icon">${COMMENT_SVG(72)}</span><span>Yorum</span></div>
              <div class="ph-cta-act"><span class="ph-cta-act-icon">${SHARE_SVG(72)}</span><span>Paylaş</span></div>
              <div class="ph-cta-act"><span class="ph-cta-act-icon">${BOOKMARK_SVG(72)}</span><span>Kaydet</span></div>
            </div>
            <div class="ph-cta-footer">Lingual.work</div>
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

  const safeSection = sectionName.replace(/[^\w]/g, '_');

  overlay.querySelector('.ig-card-dl').addEventListener('click', async () => {
    const btn = overlay.querySelector('.ig-card-dl');
    btn.textContent = 'Hazırlanıyor...';
    btn.disabled = true;
    try {
      const canvas = await captureSlide(currentIndex);
      if (canvas) downloadCanvas(canvas, `${level}_${safeSection}_${currentIndex + 1}.png`);
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
        if (canvas) downloadCanvas(canvas, `${level}_${safeSection}_${i + 1}.png`);
      } catch (err) { console.error('Download error:', err); }
      await new Promise(r => setTimeout(r, 300));
    }
    btn.textContent = 'Tümünü İndir';
    btn.disabled = false;
  });
}
