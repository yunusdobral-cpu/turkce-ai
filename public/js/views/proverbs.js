// Atasözleri ve Deyimler sayfası

let proverbsState = { categoryIndex: 0 };

function renderProverbs(container) {
  const lang = I18N.getLang();
  const categories = PROVERBS_DATA;
  const currentCat = categories[proverbsState.categoryIndex];

  const sidebarHtml = categories.map((cat, i) => `
    <div class="phrases-cat-item${i === proverbsState.categoryIndex ? ' active' : ''}" data-index="${i}">
      <span class="phrases-cat-icon">${cat.icon}</span>
      <span class="phrases-cat-name">${cat.category.tr}${lang !== 'tr' && cat.category[lang] ? ' / ' + cat.category[lang] : ''}</span>
      <span class="phrases-cat-count">${cat.items.length}</span>
    </div>
  `).join('');

  const itemsHtml = currentCat ? currentCat.items.map((item, i) => {
    const translation = item[lang] || item.en || '';
    const hasDetail = !!item.detailEn;
    return `
      <div class="phrases-card proverbs-card${hasDetail ? ' proverbs-card-clickable' : ''}"${hasDetail ? ` data-index="${i}"` : ''}>
        <div class="phrases-card-header">
          <span class="phrases-card-num">${i + 1}</span>
          <div class="phrases-card-text">
            <span class="phrases-card-tr">${item.tr}</span>
            ${translation ? `<span class="phrases-card-en">${translation}</span>` : ''}
          </div>
          ${hasDetail ? '<span class="proverbs-detail-hint">→</span>' : ''}
        </div>
        <div class="proverbs-meaning">${item.meaning}</div>
      </div>`;
  }).join('') : '';

  const contentHtml = currentCat
    ? `<div class="phrases-content-header">
        <span class="phrases-content-icon">${currentCat.icon}</span>
        <h2>${currentCat.category.tr}${lang !== 'tr' && currentCat.category[lang] ? ' / ' + currentCat.category[lang] : ''}</h2>
        <span class="phrases-content-count">${currentCat.items.length} ${currentCat.id === 'atasozleri' ? (lang !== 'tr' ? 'proverbs' : 'atasözü') : (lang !== 'tr' ? 'idioms' : 'deyim')}</span>
      </div>
      <div class="phrases-grid">${itemsHtml}</div>`
    : '';

  const pageTitleTr = 'Atasözleri ve Deyimler';
  const pageTitleMap = { en: 'Proverbs & Idioms', es: 'Refranes y Modismos', ar: 'أمثال وتعابير', ru: 'Пословицы и идиомы', de: 'Sprichwörter & Redewendungen', fr: 'Proverbes & Expressions' };
  const pageSubTr = 'Türkçe atasözleri ve deyimler — anlamları ve çevirileriyle';
  const pageSubMap = { en: 'Turkish proverbs and idioms with meanings and translations', es: 'Refranes y modismos turcos con significados y traducciones', ar: 'أمثال وتعابير تركية مع معانيها وترجماتها', ru: 'Турецкие пословицы и идиомы со значениями и переводами', de: 'Türkische Sprichwörter und Redewendungen mit Bedeutungen', fr: 'Proverbes et expressions turcs avec significations et traductions' };

  const pageTitle = lang !== 'tr' && pageTitleMap[lang] ? `${pageTitleTr} / ${pageTitleMap[lang]}` : pageTitleTr;
  const pageSub = lang !== 'tr' && pageSubMap[lang] ? pageSubMap[lang] : pageSubTr;

  container.innerHTML = `
    <div class="vocab-page">
      <div class="gallery-header">
        <h1>${pageTitle}</h1>
        <p class="gallery-subtitle">${pageSub}</p>
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
      proverbsState.categoryIndex = parseInt(item.dataset.index);
      renderProverbs(container);
    });
  });

  container.querySelectorAll('.proverbs-card-clickable').forEach(card => {
    card.addEventListener('click', () => {
      location.hash = `#/proverbs/${currentCat.id}/${card.dataset.index}`;
    });
  });
}

function renderProverbDetail(container, catId, itemIndex) {
  const lang = I18N.getLang();
  const cat = PROVERBS_DATA.find(c => c.id === catId);
  if (!cat) { location.hash = '#/proverbs'; return; }
  const item = cat.items[itemIndex];
  if (!item) { location.hash = '#/proverbs'; return; }

  const translation = (lang !== 'tr' && item[lang]) ? item[lang] : item.en || '';
  const prevIndex = itemIndex > 0 ? itemIndex - 1 : null;
  const nextIndex = itemIndex < cat.items.length - 1 ? itemIndex + 1 : null;

  const otherProverbs = cat.items
    .map((p, i) => ({ p, i }))
    .filter(({ i }) => i !== itemIndex)
    .slice(0, 4);

  const otherHtml = otherProverbs.map(({ p, i }) => `
    <a href="#/proverbs/${catId}/${i}" class="proverb-related-item">
      <span class="proverb-related-tr">${p.tr}</span>
      <span class="proverb-related-en">${p.en}</span>
    </a>`).join('');

  container.innerHTML = `
    <div class="proverb-detail-page">
      <div class="proverb-detail-topbar">
        <a href="#/proverbs" class="proverb-detail-back">← ${cat.category.tr}</a>
        <span class="proverb-detail-counter">${itemIndex + 1} / ${cat.items.length}</span>
      </div>

      <div class="proverb-detail-hero">
        <div class="proverb-detail-icon">${cat.icon}</div>
        <h1 class="proverb-detail-tr">${item.tr}</h1>
        ${translation ? `<p class="proverb-detail-en">${translation}</p>` : ''}
      </div>

      <div class="proverb-detail-body-card">
        <div class="proverb-detail-meaning-label">Anlamı</div>
        <p class="proverb-detail-meaning">${item.meaning}</p>
        ${item.detailEn ? `
          <hr class="proverb-detail-divider">
          <div class="proverb-detail-explanation">${item.detailEn}</div>` : ''}
      </div>

      <div class="proverb-detail-nav">
        ${prevIndex !== null
          ? `<a href="#/proverbs/${catId}/${prevIndex}" class="proverb-nav-btn">← Önceki</a>`
          : '<span></span>'}
        ${nextIndex !== null
          ? `<a href="#/proverbs/${catId}/${nextIndex}" class="proverb-nav-btn">Sonraki →</a>`
          : '<span></span>'}
      </div>

      ${otherHtml ? `
        <div class="proverb-related">
          <h3 class="proverb-related-title">Diğer Atasözleri</h3>
          <div class="proverb-related-list">${otherHtml}</div>
        </div>` : ''}
    </div>
  `;
}
