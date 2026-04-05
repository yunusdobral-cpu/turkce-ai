// Okuma / Reading Page

// Yardımcı: Türkçe metni çift dilli yap
function readingBi(trText) {
  const entry = READING_I18N[trText];
  if (!entry) return trText;
  const lang = I18N.getLang();
  const translated = entry[lang] || entry['en'] || '';
  if (!translated) return trText;
  return `${trText} / ${translated}`;
}

// i18n key'den çeviri al (sayfa başlıkları vb. için)
function readingT(key) {
  const entry = READING_I18N[key];
  if (!entry) return key;
  const lang = I18N.getLang();
  return entry[lang] || entry['en'] || key;
}

// İçerik HTML'indeki h3/h4 başlıklarını çift dilli yap
function translateReadingContent(html) {
  return html.replace(/<(h[34])([^>]*)>(.*?)<\/\1>/g, (match, tag, attrs, inner) => {
    const slashIdx = inner.indexOf(' / ');
    let trPart;
    if (slashIdx > -1) {
      trPart = inner.substring(0, slashIdx);
    } else {
      trPart = inner;
    }
    const entry = READING_I18N[trPart];
    if (entry) {
      const lang = I18N.getLang();
      const translated = entry[lang] || entry['en'] || '';
      return `<${tag}${attrs}>${trPart} / ${translated}</${tag}>`;
    }
    return match;
  });
}

function getReadingLevelLabel(meta) {
  const entry = READING_I18N[meta.i18nKey];
  if (!entry) return meta.tr;
  const lang = I18N.getLang();
  const translated = entry[lang] || entry['en'] || '';
  return `${meta.tr} / ${translated}`;
}

let readingState = { level: 'A1', topicIndex: 0, lang: 'en' };

const READING_LANGS = {
  en: 'English',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
  ar: 'العربية',
  ru: 'Русский'
};

// Seviyeye göre hedef kelimeleri topla (obje olarak: {tr, en, es, ...})
function getTargetWordsData(level) {
  const data = window.VOCAB_DATA && window.VOCAB_DATA[level];
  if (!data) return [];
  const items = [];
  const skip = new Set(['o','bu','şu','ne','de','da','ve','bir','var','yok','çok','ben','sen','biz','siz','iki','üç','dört','beş','altı','yedi','on','iyi','kız','her','az']);
  const seen = new Set();
  for (const category of Object.values(data)) {
    for (const section of category) {
      for (const item of section) {
        if (item.tr && item.tr.length >= 3 && !skip.has(item.tr) && !seen.has(item.tr)) {
          seen.add(item.tr);
          items.push(item);
        }
      }
    }
  }
  items.sort((a, b) => b.tr.length - a.tr.length);
  return items;
}

function getTargetWords(level) {
  return getTargetWordsData(level).map(item => item.tr);
}

// Metinde geçen hedef kelimeleri bul ve eşleştir
function findUsedTargetWords(html, level) {
  const allWords = getTargetWordsData(level);
  if (allWords.length === 0) return [];

  // Metinden sadece <p> içindeki düz metni çıkar
  const temp = document.createElement('div');
  temp.innerHTML = html;
  const paragraphs = temp.querySelectorAll('p');
  let plainText = '';
  paragraphs.forEach(p => { plainText += ' ' + p.textContent; });
  plainText = plainText.toLowerCase();

  const trLetters = 'a-zA-ZçÇğĞıİöÖşŞüÜ';
  const used = [];
  const seen = new Set();
  // Tüm vocab köklerini set olarak tut (uzun kelime kontrolü için)
  const allRoots = allWords.map(w => w.tr.toLowerCase());

  for (const item of allWords) {
    const escaped = item.tr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(
      `(?<![${trLetters}])(${escaped}[a-zçğıöşüÇĞİÖŞÜ]{0,10})(?![${trLetters}])`,
      'gi'
    );
    let match;
    let validMatch = null;
    while ((match = regex.exec(plainText)) !== null) {
      const fullMatch = match[1].toLowerCase();
      const root = item.tr.toLowerCase();
      // Eşleşen kelime başka daha uzun bir vocab kökü ile de başlıyorsa atla
      // Örn: "kardeşim" hem "kar" hem "kardeş" ile eşleşir, "kardeş" daha uzun → "kar"ı atla
      let coveredByLonger = false;
      for (const longerRoot of allRoots) {
        if (longerRoot.length > root.length && fullMatch.startsWith(longerRoot)) {
          coveredByLonger = true;
          break;
        }
      }
      if (!coveredByLonger) {
        validMatch = match;
        break;
      }
    }
    if (validMatch && !seen.has(item.tr)) {
      seen.add(item.tr);
      used.push({ ...item, _pos: validMatch.index });
    }
  }

  // Metindeki ilk geçiş sırasına göre sırala
  used.sort((a, b) => a._pos - b._pos);
  return used;
}

// Türkçe yaygın ek kalıpları
const TR_SUFFIX = '(?:ler|lar|ım|im|um|üm|ın|in|un|ün|ımız|imiz|umuz|ümüz|ınız|iniz|unuz|ünüz|ları|leri|ya|ye|da|de|ta|te|dan|den|tan|ten|ı|i|u|ü|a|e|nı|ni|nu|nü|na|ne|nda|nde|ndan|nden|sı|si|su|sü|m|n|mız|miz|muz|müz|nız|niz|nuz|nüz|dır|dir|dur|dür|dı|di|du|dü|yor|yorum|yorsun|yoruz|yorsunuz|yorlar|acak|ecek|mış|miş|muş|müş)?';

// Parça içindeki hedef kelimeleri vurgula
function highlightTargetWords(html, level) {
  const words = getTargetWords(level);
  if (words.length === 0) return html;

  const trLetters = 'a-zA-ZçÇğĞıİöÖşŞüÜ';
  const wordsLower = words.map(w => w.toLowerCase());
  const escapedWords = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const pattern = new RegExp(
    `(?<![${trLetters}])((?:${escapedWords.join('|')})${TR_SUFFIX})(?![${trLetters}])`,
    'gi'
  );

  // Sadece <p> taglarının içindeki metni işle
  return html.replace(/<p>([\s\S]*?)<\/p>/gi, (match, inner) => {
    const result = inner.replace(pattern, (fullMatch, group1) => {
      const lower = group1.toLowerCase();
      // Hangi kök kelimeyle eşleştiğini bul
      let matchedRoot = '';
      for (const root of wordsLower) {
        if (lower.startsWith(root) && root.length > matchedRoot.length) {
          matchedRoot = root;
        }
      }
      // Daha uzun bir kök bu eşleşmeyi kapsıyorsa, kısa kökle vurgulamayı atla
      // (en uzun kök zaten matchedRoot olarak seçildi, sorun yok)
      // Ama eşleşen kök, eşleşen metnin tamamını kapsamıyorsa
      // ve daha uzun bir kök varsa vurgulamayı atla
      for (const longerRoot of wordsLower) {
        if (longerRoot.length > matchedRoot.length && lower.startsWith(longerRoot)) {
          matchedRoot = longerRoot;
        }
      }
      // matchedRoot zaten en uzun eşleşen kök, vurgula
      return `<strong class="reading-target-word">${group1}</strong>`;
    });
    return `<p>${result}</p>`;
  });
}

function renderReading(container) {
  const levelsHtml = ['A1','A2','B1','B2','C1','C2'].map(lvl => {
    const meta = READING_LEVEL_META[lvl];
    const isOpen = readingState.level === lvl;
    const topics = READING_LEVELS[lvl] || [];
    const topicsHtml = isOpen ? topics.map((t, i) => `
      <div class="grammar-topic-item${i === readingState.topicIndex ? ' active' : ''}" data-level="${lvl}" data-index="${i}">
        <div class="grammar-topic-title"><span class="grammar-topic-num" style="background:${meta.color}">${i + 1}</span>${readingBi(t.title)}</div>
        <div class="grammar-topic-desc">${readingBi(t.desc)}</div>
      </div>
    `).join('') : '';

    return `
      <div class="grammar-level-row${isOpen ? ' open' : ''}" data-level="${lvl}">
        <div class="grammar-level-header" data-level="${lvl}">
          <span class="grammar-level-badge" style="background:${meta.color}">${lvl}</span>
          <span class="grammar-level-label">${getReadingLevelLabel(meta)}</span>
          <span class="grammar-level-count">${topics.length} ${I18N.bi('metin', 'reading_text_count')}</span>
          <span class="grammar-level-arrow">${isOpen ? '&#9650;' : '&#9660;'}</span>
        </div>
        ${isOpen ? `<div class="grammar-topic-list">${topicsHtml}</div>` : ''}
      </div>
    `;
  }).join('');

  const topics = readingState.level ? (READING_LEVELS[readingState.level] || []) : [];
  const currentTopic = topics[readingState.topicIndex] || null;

  let contentHtml;
  let wordListHtml = '';
  let translationHtml = '';
  const lang = readingState.lang || 'en';

  if (!currentTopic) {
    contentHtml = `<div class="grammar-placeholder"><span>📖</span><p>${I18N.bi('Bir seviye ve metin seçin', 'reading_select')}</p></div>`;
  } else if (!currentTopic.content) {
    contentHtml = `<div class="grammar-placeholder"><span>📚</span><h3>${readingBi(currentTopic.title)}</h3><p>${I18N.bi('Bu metin yakında eklenecek', 'reading_coming')}</p></div>`;
  } else {
    contentHtml = translateReadingContent(highlightTargetWords(currentTopic.content, readingState.level));

    // Metinde geçen hedef kelimeleri bul
    const usedWords = findUsedTargetWords(currentTopic.content, readingState.level);

    if (usedWords.length > 0) {
      // Eş anlamlı Türkçe kelimeler: aynı çeviriye sahip olanları grupla
      const synonymMap = {};
      const allWordsData = getTargetWordsData(readingState.level);
      for (const item of allWordsData) {
        const meaning = item.en.toLowerCase().replace(/^to\s+/, '');
        if (!synonymMap[meaning]) synonymMap[meaning] = [];
        synonymMap[meaning].push(item.tr);
      }

      const langOptions = Object.entries(READING_LANGS).map(([code, label]) =>
        `<button class="reading-lang-btn${code === lang ? ' active' : ''}" data-lang="${code}">${label}</button>`
      ).join('');

      const rows = usedWords.map(item => {
        const meaning = item.en.toLowerCase().replace(/^to\s+/, '');
        const synonyms = (synonymMap[meaning] || []).filter(w => w !== item.tr);
        return `<tr>
          <td class="reading-wl-tr">${item.tr}</td>
          <td class="reading-wl-meaning">${item[lang] || ''}</td>
          <td class="reading-wl-syn">${synonyms.length > 0 ? synonyms.join(', ') : ''}</td>
        </tr>`;
      }).join('');

      wordListHtml = `
        <div class="reading-wordlist-section">
          <div class="reading-lang-filter">
            ${langOptions}
          </div>
          <div class="grammar-table-wrap">
            <table class="grammar-table reading-wordlist-table">
              <thead>
                <tr>
                  <th>${I18N.bi('Kelime', 'reading_word')}</th>
                  <th>${I18N.bi('Anlam', 'reading_meaning')}</th>
                  <th>${I18N.bi('Eş Anlam', 'reading_synonym')}</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>`;
    }

    // Çeviri sekmesi
    const translations = window.READING_TRANSLATIONS &&
      window.READING_TRANSLATIONS[readingState.level] &&
      window.READING_TRANSLATIONS[readingState.level][readingState.topicIndex];

    if (translations && translations.length > 0) {
      const langOptions2 = Object.entries(READING_LANGS).map(([code, label]) =>
        `<button class="reading-lang-btn${code === lang ? ' active' : ''}" data-lang="${code}">${label}</button>`
      ).join('');

      const sentenceRows = translations.map((s, i) =>
        `<div class="translation-sentence">
          <div class="translation-tr">${s.tr}</div>
          <div class="translation-target">${s[lang] || ''}</div>
        </div>`
      ).join('');

      translationHtml = `
        <div class="reading-translation-section">
          <div class="reading-lang-filter">
            ${langOptions2}
          </div>
          <div class="translation-list">
            ${sentenceRows}
          </div>
        </div>`;
    } else {
      translationHtml = `<div class="grammar-placeholder"><span>🔄</span><p>${I18N.bi('Bu metin için çeviri yakında eklenecek', 'reading_no_trans')}</p></div>`;
    }
  }

  const hasContent = currentTopic && currentTopic.content;
  const readingTab = readingState.tab || 'text';
  const validTab = ['text', 'words', 'translation'].includes(readingTab) ? readingTab : 'text';

  let activeTabContent = contentHtml;
  if (validTab === 'words') activeTabContent = wordListHtml;
  else if (validTab === 'translation') activeTabContent = translationHtml;

  container.innerHTML = `
    <div class="vocab-page">
      <div class="gallery-header">
        <h1>${I18N.bi('Okuma', 'reading_title')}</h1>
        <p class="gallery-subtitle">${I18N.bi('Seviyene uygun metinler ile okuma pratiği yap', 'reading_subtitle')}</p>
      </div>

      <div class="vocab-full">
        <div class="vocab-full-sidebar grammar-sidebar">
          ${levelsHtml}
        </div>

        <div class="vocab-full-main grammar-content-area">
          ${hasContent ? `
            <div class="reading-tabs">
              <button class="reading-tab-btn${validTab === 'text' ? ' active' : ''}" data-tab="text">${I18N.bi('Metin', 'reading_tab_text')}</button>
              <button class="reading-tab-btn${validTab === 'words' ? ' active' : ''}" data-tab="words">${I18N.bi('Hedef Kelimeler', 'reading_tab_words')}</button>
              <button class="reading-tab-btn${validTab === 'translation' ? ' active' : ''}" data-tab="translation">${I18N.bi('Çeviri', 'reading_tab_trans')}</button>
            </div>
          ` : ''}
          <div class="reading-tab-content">
            ${activeTabContent}
          </div>
        </div>
      </div>
    </div>
  `;

  // Tab switching
  container.querySelectorAll('.reading-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      readingState.tab = btn.dataset.tab;
      renderReading(container);
    });
  });

  // Language filter
  container.querySelectorAll('.reading-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      readingState.lang = btn.dataset.lang;
      renderReading(container);
    });
  });

  // Level headers (accordion toggle)
  container.querySelectorAll('.grammar-level-header').forEach(header => {
    header.addEventListener('click', () => {
      const lvl = header.dataset.level;
      if (readingState.level === lvl) {
        readingState.level = null;
      } else {
        readingState.level = lvl;
        readingState.topicIndex = 0;
        readingState.tab = 'text';
      }
      renderReading(container);
    });
  });

  // Topic items
  container.querySelectorAll('.grammar-topic-item').forEach(item => {
    item.addEventListener('click', () => {
      readingState.topicIndex = parseInt(item.dataset.index);
      readingState.tab = 'text';
      renderReading(container);
    });
  });
}
