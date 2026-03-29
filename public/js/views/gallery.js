// Öğretmenler / Teachers Page

// Çeviri haritası: Türkçe rol/açıklama → {en, es, ar, ru, de, fr}
const TEACHER_I18N = {
  // === Öğretmen rolleri ===
  'Dilbilgisi Öğretmeni':         { en: 'Grammar Teacher', es: 'Profesora de gramática', ar: 'معلمة القواعد', ru: 'Преподаватель грамматики', de: 'Grammatiklehrerin', fr: 'Professeure de grammaire' },
  'Konuşma Öğretmeni':            { en: 'Conversation Teacher', es: 'Profesor de conversación', ar: 'معلم المحادثة', ru: 'Преподаватель разговорного', de: 'Konversationslehrer', fr: 'Professeur de conversation' },
  'Kelime & Yazma Öğretmeni':     { en: 'Vocabulary & Writing Teacher', es: 'Profesora de vocabulario y escritura', ar: 'معلمة المفردات والكتابة', ru: 'Преподаватель лексики и письма', de: 'Wortschatz- & Schreiblehrerin', fr: 'Professeure de vocabulaire et d\'écriture' },
  'Kültür & Edebiyat Öğretmeni':  { en: 'Culture & Literature Teacher', es: 'Profesor de cultura y literatura', ar: 'معلم الثقافة والأدب', ru: 'Преподаватель культуры и литературы', de: 'Kultur- & Literaturlehrer', fr: 'Professeur de culture et littérature' },
  'Sohbet arkadaşı':              { en: 'Chat Buddy', es: 'Compañero de charla', ar: 'رفيق الدردشة', ru: 'Собеседник', de: 'Gesprächspartner', fr: 'Partenaire de discussion' },

  // === Öğretmen açıklamaları ===
  'Türkçe dilbilgisi konularında uzman. Kuralları basit ve anlaşılır şekilde açıklar.':
    { en: 'Expert in Turkish grammar. Explains rules in a simple and clear way.', es: 'Experta en gramática turca. Explica las reglas de forma simple y clara.', ar: 'خبيرة في القواعد التركية. تشرح القواعد بطريقة بسيطة وواضحة.', ru: 'Эксперт по турецкой грамматике. Объясняет правила просто и понятно.', de: 'Expertin für türkische Grammatik. Erklärt Regeln einfach und verständlich.', fr: 'Experte en grammaire turque. Explique les règles simplement et clairement.' },
  'Günlük Türkçe konuşma pratiği yapar. Gerçek hayat diyaloglarıyla öğretir.':
    { en: 'Practices daily Turkish conversation. Teaches through real-life dialogues.', es: 'Practica conversación turca diaria. Enseña con diálogos de la vida real.', ar: 'يمارس المحادثة التركية اليومية. يعلّم من خلال حوارات واقعية.', ru: 'Практикует повседневный турецкий. Обучает через реальные диалоги.', de: 'Übt tägliche türkische Konversation. Lehrt mit Dialogen aus dem echten Leben.', fr: 'Pratique la conversation turque quotidienne. Enseigne par des dialogues réels.' },
  'Kelime dağarcığını genişletir, yazma becerilerini geliştirir.':
    { en: 'Expands vocabulary, develops writing skills with exercises.', es: 'Amplía el vocabulario, desarrolla habilidades de escritura.', ar: 'يوسّع المفردات، ويطوّر مهارات الكتابة.', ru: 'Расширяет словарный запас, развивает навыки письма.', de: 'Erweitert den Wortschatz, entwickelt Schreibfähigkeiten.', fr: 'Enrichit le vocabulaire, développe les compétences en écriture.' },
  'Türk kültürü, tarihi ve edebiyatı üzerinden dil öğretir.':
    { en: 'Teaches language through Turkish culture, history, and literature.', es: 'Enseña el idioma a través de la cultura, historia y literatura turca.', ar: 'يعلّم اللغة من خلال الثقافة والتاريخ والأدب التركي.', ru: 'Обучает языку через турецкую культуру, историю и литературу.', de: 'Lehrt Sprache durch türkische Kultur, Geschichte und Literatur.', fr: 'Enseigne la langue à travers la culture, l\'histoire et la littérature turques.' },
};

function teacherBi(trText) {
  const entry = TEACHER_I18N[trText];
  if (!entry) return trText;
  const lang = I18N.getLang();
  const translated = entry[lang] || entry['en'] || '';
  if (!translated) return trText;
  return `${trText} / ${translated}`;
}

function getTeacherDesc(description) {
  const entry = TEACHER_I18N[description];
  if (!entry) return description;
  const lang = I18N.getLang();
  return entry[lang] || entry['en'] || description;
}

function getTeacherRole(role) {
  // role zaten "Türkçe / English" formatında olabilir
  const slashIdx = role.indexOf(' / ');
  const trPart = slashIdx > -1 ? role.substring(0, slashIdx) : role;
  const entry = TEACHER_I18N[trPart];
  if (entry) {
    const lang = I18N.getLang();
    const translated = entry[lang] || entry['en'] || '';
    return `${trPart} / ${translated}`;
  }
  return role;
}

async function renderGallery(container) {
  container.innerHTML = `
    <div class="gallery-header">
      <h1>${I18N.bi('Öğretmenler', 'teachers_title')}</h1>
      <p class="gallery-subtitle">${I18N.bi('Bir öğretmen ve konu seçerek dersinize başlayın', 'teachers_subtitle')}</p>
    </div>
    <div id="teacherList">
      <div class="empty-state"><p>${I18N.bi('Yükleniyor...', 'teachers_loading')}</p></div>
    </div>
  `;

  try {
    const characters = await API.getCharacters();
    const list = document.getElementById('teacherList');

    list.innerHTML = characters.map(c => {
      const [c1, c2] = getAvatarGradient(c.name);
      const initial = c.name.charAt(0).toUpperCase();
      const avatarContent = c.avatar
        ? `<img src="${c.avatar}" alt="${c.name}">`
        : initial;

      const topics = (c.topics || []);
      const topicsHtml = topics.map(t => `
        <a href="#/chat/${c.id}/${t.id}" class="topic-card">
          <span class="topic-icon">${t.icon}</span>
          <div class="topic-info">
            <div class="topic-name">${t.name}</div>
            <div class="topic-desc">${t.description}</div>
          </div>
          <span class="topic-arrow">&#8594;</span>
        </a>
      `).join('');

      const role = c.role ? getTeacherRole(c.role) : '';
      const desc = getTeacherDesc(c.description);

      return `
        <div class="teacher-section">
          <div class="teacher-header">
            <div class="teacher-avatar" style="background: linear-gradient(135deg, ${c1}, ${c2})">${avatarContent}</div>
            <div class="teacher-info">
              <h2 class="teacher-name">${c.name}</h2>
              <div class="teacher-role">${role}</div>
              <p class="teacher-desc">${desc}</p>
            </div>
            <a href="#/chat/${c.id}/genel" class="btn btn-primary btn-free-chat">&#128172; ${I18N.t('teachers_free_chat')}</a>
          </div>
          <div class="topics-grid">${topicsHtml}</div>
        </div>
      `;
    }).join('');

  } catch (err) {
    document.getElementById('teacherList').innerHTML =
      `<div class="empty-state"><div class="empty-icon">&#9888;</div><p>${I18N.bi('Öğretmenler yüklenemedi', 'teachers_error')}</p></div>`;
  }
}
