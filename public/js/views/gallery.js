async function renderGallery(container) {
  container.innerHTML = `
    <div class="gallery-header">
      <h1>🇹🇷 Yapay Zeka ile Türkçe Öğren</h1>
      <p class="gallery-subtitle">Learn Turkish with AI Teachers</p>
      <p class="gallery-desc">Bir öğretmen ve konu seçerek dersinize başlayın<br>Choose a teacher and topic to start your lesson</p>
    </div>
    <div id="teacherList">
      <div class="empty-state"><p>Yükleniyor... / Loading...</p></div>
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
          <span class="topic-arrow">→</span>
        </a>
      `).join('');

      return `
        <div class="teacher-section">
          <div class="teacher-header">
            <div class="teacher-avatar" style="background: linear-gradient(135deg, ${c1}, ${c2})">${avatarContent}</div>
            <div class="teacher-info">
              <h2 class="teacher-name">${c.name}</h2>
              <div class="teacher-role">${c.role || ''}</div>
              <p class="teacher-desc">${c.descriptionEn || c.description}</p>
            </div>
            <a href="#/chat/${c.id}/genel" class="btn btn-primary btn-free-chat">💬 Free Chat</a>
          </div>
          <div class="topics-grid">${topicsHtml}</div>
        </div>
      `;
    }).join('');

  } catch (err) {
    document.getElementById('teacherList').innerHTML =
      `<div class="empty-state"><div class="empty-icon">⚠️</div><p>Öğretmenler yüklenemedi / Teachers could not be loaded</p></div>`;
  }
}
