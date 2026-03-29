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
}
