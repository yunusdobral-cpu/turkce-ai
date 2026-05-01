let adminActiveTab = 'home';

async function renderAdmin(container) {
  if (!sessionStorage.getItem('adminPassword')) {
    showLoginPrompt(container);
    return;
  }

  const tabs = [
    { id: 'home', label: 'Anasayfa' },
    { id: 'characters', label: 'Ogretmenler' },
    { id: 'users', label: 'Uyeler' },
    { id: 'vocab', label: 'Kelime' },
    { id: 'quiz', label: 'Sinav' },
    { id: 'cards', label: 'Kartlar' }
  ];

  container.innerHTML = `
    <div class="admin-tabs">
      ${tabs.map(t => `<button class="admin-tab ${adminActiveTab === t.id ? 'active' : ''}" onclick="switchAdminTab('${t.id}')">${t.label}</button>`).join('')}
      <button class="admin-tab-logout" onclick="adminLogout()">Cikis</button>
    </div>
    <div id="adminContent"></div>
  `;

  const renderers = {
    home: renderAdminHome,
    characters: renderAdminCharacters,
    users: renderAdminUsers,
    vocab: renderAdminVocab,
    quiz: renderAdminQuiz,
    cards: renderAdminCards
  };
  (renderers[adminActiveTab] || renderAdminHome)()
}

function switchAdminTab(tab) {
  adminActiveTab = tab;
  renderAdmin(document.getElementById('app'));
}

function adminLogout() {
  sessionStorage.removeItem('adminPassword');
  renderAdmin(document.getElementById('app'));
}

function showLoginPrompt(container) {
  container.innerHTML = `
    <div style="max-width:400px;margin:3rem auto;text-align:center">
      <h2 style="margin-bottom:1.5rem">Yonetim Paneli</h2>
      <div class="form-group">
        <input type="password" id="adminPassInput" placeholder="Yonetici sifresi" style="text-align:center">
      </div>
      <button class="btn btn-primary btn-block" onclick="adminLogin()">Giris Yap</button>
    </div>
  `;

  document.getElementById('adminPassInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') adminLogin();
  });

  document.getElementById('adminPassInput').focus();
}

function adminLogin() {
  const password = document.getElementById('adminPassInput').value;
  if (!password) return;
  sessionStorage.setItem('adminPassword', password);
  renderAdmin(document.getElementById('app'));
}

// ===================== HOME TAB =====================

function renderAdminHome() {
  renderAdminForum();
}

// ===================== CHARACTERS TAB =====================

function renderAdminCharacters() {
  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <div class="admin-header">
      <h1>Kisilik Yonetimi</h1>
      <button class="btn btn-primary" onclick="showCharacterForm()">+ Yeni Kisilik</button>
    </div>
    <div class="admin-list" id="adminList">
      <div class="empty-state"><p>Yukleniyor...</p></div>
    </div>
  `;
  loadAdminList();
}

async function loadAdminList() {
  const list = document.getElementById('adminList');
  try {
    const characters = await API.getCharacters();
    if (characters.length === 0) {
      list.innerHTML = `<div class="empty-state"><div class="empty-icon">📭</div><p>Henuz kisilik eklenmemis</p></div>`;
      return;
    }

    list.innerHTML = characters.map(c => {
      const [c1, c2] = getAvatarGradient(c.name);
      const initial = c.name.charAt(0).toUpperCase();
      return `
        <div class="admin-item">
          <div class="card-avatar" style="background:linear-gradient(135deg,${c1},${c2});width:42px;height:42px;font-size:1.2rem">${c.avatar ? `<img src="${c.avatar}" alt="">` : initial}</div>
          <div class="admin-item-info">
            <h3>${c.name}</h3>
            <p>${c.description || 'Aciklama yok'}</p>
          </div>
          <div class="admin-item-actions">
            <button class="btn btn-outline btn-sm" onclick="editCharacter('${c.id}')">Duzenle</button>
            <button class="btn btn-danger btn-sm" onclick="deleteCharacter('${c.id}', '${c.name}')">Sil</button>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    list.innerHTML = `<div class="empty-state"><p>Yuklenemedi. Sifrenizi kontrol edin.</p></div>`;
  }
}

function showCharacterForm(existing = null) {
  const isEdit = !!existing;
  const title = isEdit ? 'Kisiligi Duzenle' : 'Yeni Kisilik Ekle';

  const html = `
    <form id="charForm">
      <div class="form-group">
        <label>Ad *</label>
        <input type="text" name="name" value="${existing?.name || ''}" required>
      </div>
      <div class="form-group">
        <label>Rol / Role</label>
        <input type="text" name="role" value="${existing?.role || ''}" placeholder="Orn: Dilbilgisi Ogretmeni / Grammar Teacher">
        <div class="help-text">Ogretmenin uzmanlik alani (Turkce / Ingilizce)</div>
      </div>
      <div class="form-group">
        <label>Avatar URL</label>
        <input type="text" name="avatar" value="${existing?.avatar || ''}" placeholder="https://...">
        <div class="help-text">Bos birakilirsa otomatik avatar olusturulur</div>
      </div>
      <div class="form-group">
        <label>Aciklama (Turkce)</label>
        <textarea name="description" rows="2">${existing?.description || ''}</textarea>
      </div>
      <div class="form-group">
        <label>Aciklama (Ingilizce)</label>
        <textarea name="descriptionEn" rows="2">${existing?.descriptionEn || ''}</textarea>
        <div class="help-text">Ana sayfada ogrencilere gosterilen Ingilizce aciklama</div>
      </div>
      <div class="form-group">
        <label>Karsilama Mesaji</label>
        <textarea name="greeting" rows="2">${existing?.greeting || ''}</textarea>
        <div class="help-text">Sohbet basladiginda gosterilecek ilk mesaj</div>
      </div>
      <div class="form-group">
        <label>Kisilik Ozellikleri *</label>
        <textarea name="personality" rows="3" required>${existing?.personality || ''}</textarea>
        <div class="help-text">Karakterin nasil davranacagini aciklayin</div>
      </div>
      <div class="form-group">
        <label>Ton</label>
        <select name="tone">
          <option value="casual" ${existing?.tone === 'casual' ? 'selected' : ''}>Samimi</option>
          <option value="formal" ${existing?.tone === 'formal' ? 'selected' : ''}>Resmi</option>
          <option value="humorous" ${existing?.tone === 'humorous' ? 'selected' : ''}>Esprili</option>
          <option value="dramatic" ${existing?.tone === 'dramatic' ? 'selected' : ''}>Dramatik</option>
          <option value="poetic" ${existing?.tone === 'poetic' ? 'selected' : ''}>Siirsel</option>
        </select>
      </div>
      <div class="form-group">
        <label>Sistem Istemi</label>
        <textarea name="systemPrompt" rows="4">${existing?.systemPrompt || ''}</textarea>
        <div class="help-text">AI'ya dogrudan verilecek talimatlar (opsiyonel, gelismis)</div>
      </div>
      <div class="form-group">
        <label>Konular / Topics</label>
        <div id="topicsContainer">
          ${(existing?.topics || []).map((t, i) => `
            <div class="topic-entry" data-index="${i}">
              <input type="text" placeholder="ID (orn: ekler)" value="${t.id}" class="topic-id">
              <input type="text" placeholder="Ad (orn: Ekler / Suffixes)" value="${t.name}" class="topic-name-input">
              <input type="text" placeholder="Icon (orn: 🔗)" value="${t.icon}" class="topic-icon-input" style="width:60px">
              <input type="text" placeholder="Aciklama (Ingilizce)" value="${t.description}" class="topic-desc-input">
              <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove()">x</button>
            </div>
          `).join('')}
        </div>
        <button type="button" class="btn btn-outline btn-sm" onclick="addTopicEntry()" style="margin-top:0.5rem">+ Konu Ekle</button>
        <div class="help-text">Ana sayfada ogretmenin altinda gosterilen konu kartlari</div>
      </div>
      <div class="form-group">
        <label>Etiketler</label>
        <input type="text" name="tags" value="${(existing?.tags || []).join(', ')}" placeholder="etiket1, etiket2, ...">
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-outline" onclick="closeModal()">Iptal</button>
        <button type="submit" class="btn btn-primary">${isEdit ? 'Guncelle' : 'Olustur'}</button>
      </div>
    </form>
  `;

  openModal(title, html);

  document.getElementById('charForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const el = (n) => form.elements.namedItem(n);
    const topicEntries = document.querySelectorAll('.topic-entry');
    const topics = [];
    topicEntries.forEach(entry => {
      const id = entry.querySelector('.topic-id').value.trim();
      const name = entry.querySelector('.topic-name-input').value.trim();
      const icon = entry.querySelector('.topic-icon-input').value.trim();
      const description = entry.querySelector('.topic-desc-input').value.trim();
      if (id && name) topics.push({ id, name, icon: icon || '📌', description });
    });

    const data = {
      name: el('name').value.trim(),
      role: el('role').value.trim(),
      avatar: el('avatar').value.trim(),
      description: el('description').value.trim(),
      descriptionEn: el('descriptionEn').value.trim(),
      greeting: el('greeting').value.trim(),
      personality: el('personality').value.trim(),
      tone: el('tone').value,
      systemPrompt: el('systemPrompt').value.trim(),
      topics,
      tags: el('tags').value.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (isEdit) {
        await API.updateCharacter(existing.id, data);
        showToast('Kisilik guncellendi');
      } else {
        await API.createCharacter(data);
        showToast('Kisilik olusturuldu');
      }
      closeModal();
      await loadAdminList();
    } catch (err) {
      showToast('Islem basarisiz. Sifrenizi kontrol edin.', 'error');
    }
  });
}

async function editCharacter(id) {
  try {
    const char = await API.getCharacterFull(id);
    if (char.error) {
      showToast(char.error, 'error');
      return;
    }
    showCharacterForm(char);
  } catch (err) {
    showToast('Kisilik yuklenemedi', 'error');
  }
}

function addTopicEntry() {
  const container = document.getElementById('topicsContainer');
  const div = document.createElement('div');
  div.className = 'topic-entry';
  div.innerHTML = `
    <input type="text" placeholder="ID (orn: ekler)" class="topic-id">
    <input type="text" placeholder="Ad (orn: Ekler / Suffixes)" class="topic-name-input">
    <input type="text" placeholder="Icon (orn: 🔗)" class="topic-icon-input" style="width:60px">
    <input type="text" placeholder="Aciklama (Ingilizce)" class="topic-desc-input">
    <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove()">x</button>
  `;
  container.appendChild(div);
}

async function deleteCharacter(id, name) {
  if (!confirm(`"${name}" kisiligini silmek istediginize emin misiniz?`)) return;
  try {
    await API.deleteCharacter(id);
    showToast('Kisilik silindi');
    await loadAdminList();
  } catch (err) {
    showToast('Silme islemi basarisiz', 'error');
  }
}

// ===================== USERS TAB =====================

async function renderAdminUsers() {
  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <div class="admin-header">
      <h1>Kayitli Uyeler</h1>
    </div>
    <div id="adminUsersList">
      <div class="empty-state"><p>Yukleniyor...</p></div>
    </div>
  `;

  try {
    const users = await API.getUsers();
    const list = document.getElementById('adminUsersList');

    if (!users || users.length === 0) {
      list.innerHTML = `<div class="empty-state"><p>Henuz kayitli uye yok</p></div>`;
      return;
    }

    list.innerHTML = `
      <div class="admin-users-count">${users.length} kayitli uye</div>
      <table class="admin-users-table">
        <thead>
          <tr>
            <th>Isim</th>
            <th>Email</th>
            <th>Durum</th>
            <th>Kayit Tarihi</th>
            <th>Son Giris</th>
          </tr>
        </thead>
        <tbody>
          ${users.map(u => `
            <tr>
              <td><strong>${u.displayName}</strong></td>
              <td>${u.email}</td>
              <td>${u.verified ? '<span class="badge badge-success">Dogrulanmis</span>' : '<span class="badge badge-warning">Beklemede</span>'}</td>
              <td>${u.createdAt ? new Date(u.createdAt).toLocaleDateString('tr-TR') : '-'}</td>
              <td>${u.lastSignIn ? new Date(u.lastSignIn).toLocaleDateString('tr-TR') : '-'}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  } catch (err) {
    document.getElementById('adminUsersList').innerHTML = `<div class="empty-state"><p>Uye listesi yuklenemedi</p></div>`;
  }
}

// ===================== VOCAB TAB =====================

function renderAdminVocab() {
  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <div class="admin-placeholder">
      <div class="admin-placeholder-icon">📖</div>
      <h2>Kelime Yonetimi</h2>
      <p>Bu bolum yakin zamanda eklenecek.</p>
    </div>
  `;
}

// ===================== QUIZ TAB =====================

function renderAdminQuiz() {
  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <div class="admin-placeholder">
      <div class="admin-placeholder-icon">📝</div>
      <h2>Sinav Yonetimi</h2>
      <p>Bu bolum yakin zamanda eklenecek.</p>
    </div>
  `;
}

// ===================== FORUM TAB =====================

async function renderAdminForum() {
  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <div class="admin-forum-stats" id="forumStats">
      <div class="empty-state"><p>Yukleniyor...</p></div>
    </div>
    <div class="admin-forum-section">
      <div class="admin-header">
        <h2>Kategori Yonetimi</h2>
        <button class="btn btn-primary" onclick="showForumCategoryForm()">+ Yeni Kategori</button>
      </div>
      <div class="admin-list" id="forumCatList">
        <div class="empty-state"><p>Yukleniyor...</p></div>
      </div>
    </div>
    <div class="admin-forum-section">
      <div class="admin-header">
        <h2>Konu Yonetimi</h2>
      </div>
      <div class="admin-list" id="forumThreadList">
        <div class="empty-state"><p>Yukleniyor...</p></div>
      </div>
    </div>
  `;

  loadForumStats();
  loadForumCategories();
  loadForumThreads();
}

async function loadForumStats() {
  const el = document.getElementById('forumStats');
  try {
    const stats = await API.getForumStats();
    el.innerHTML = `
      <div class="admin-stat-card">
        <div class="admin-stat-icon">📁</div>
        <div class="admin-stat-value">${stats.categoryCount}</div>
        <div class="admin-stat-label">Kategori</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-icon">💬</div>
        <div class="admin-stat-value">${stats.threadCount}</div>
        <div class="admin-stat-label">Konu</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-icon">📝</div>
        <div class="admin-stat-value">${stats.postCount}</div>
        <div class="admin-stat-label">Gonderi</div>
      </div>
      <div class="admin-stat-card">
        <div class="admin-stat-icon">👥</div>
        <div class="admin-stat-value">${stats.authorCount}</div>
        <div class="admin-stat-label">Yazar</div>
      </div>
    `;
  } catch (err) {
    el.innerHTML = `<div class="empty-state"><p>Istatistikler yuklenemedi</p></div>`;
  }
}

async function loadForumCategories() {
  const list = document.getElementById('forumCatList');
  try {
    const cats = await API.getForumCategories();
    if (cats.length === 0) {
      list.innerHTML = `<div class="empty-state"><p>Henuz kategori yok</p></div>`;
      return;
    }
    list.innerHTML = cats.map(c => `
      <div class="admin-item">
        <div class="admin-forum-icon">${c.icon}</div>
        <div class="admin-item-info">
          <h3>${c.name}</h3>
          <p>${c.description || ''} &mdash; ${c.threadCount || 0} konu, ${c.postCount || 0} gonderi</p>
        </div>
        <div class="admin-item-actions">
          <button class="btn btn-outline btn-sm" onclick="showForumCategoryForm('${c.id}', '${c.name.replace(/'/g, "\\'")}', '${(c.description || '').replace(/'/g, "\\'")}', '${c.icon}')">Duzenle</button>
          <button class="btn btn-danger btn-sm" onclick="deleteForumCat('${c.id}', '${c.name.replace(/'/g, "\\'")}')">Sil</button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    list.innerHTML = `<div class="empty-state"><p>Kategoriler yuklenemedi</p></div>`;
  }
}

async function loadForumThreads() {
  const list = document.getElementById('forumThreadList');
  try {
    const cats = await API.getForumCategories();
    let allThreads = [];
    for (const cat of cats) {
      const threads = await API.getForumThreads(cat.id);
      allThreads.push(...threads.map(t => ({ ...t, categoryName: cat.name })));
    }

    if (allThreads.length === 0) {
      list.innerHTML = `<div class="empty-state"><p>Henuz konu yok</p></div>`;
      return;
    }

    allThreads.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    list.innerHTML = allThreads.map(t => `
      <div class="admin-item">
        <div class="admin-forum-icon">${t.pinned ? '📌' : '💬'}</div>
        <div class="admin-item-info">
          <h3>${t.title}</h3>
          <p>${t.categoryName} &mdash; ${t.author} &mdash; ${t.postCount || 0} gonderi &mdash; ${new Date(t.updatedAt).toLocaleDateString('tr-TR')}</p>
        </div>
        <div class="admin-item-actions">
          <button class="btn btn-outline btn-sm" onclick="togglePin('${t.id}')" title="${t.pinned ? 'Sabitlemeyi kaldir' : 'Sabitle'}">${t.pinned ? '📌 Kaldir' : '📌 Sabitle'}</button>
          <button class="btn btn-outline btn-sm" onclick="showThreadPosts('${t.id}', '${t.title.replace(/'/g, "\\'")}')">Gonderiler</button>
          <button class="btn btn-danger btn-sm" onclick="deleteForumThreadAdmin('${t.id}', '${t.title.replace(/'/g, "\\'")}')">Sil</button>
        </div>
      </div>
    `).join('');
  } catch (err) {
    list.innerHTML = `<div class="empty-state"><p>Konular yuklenemedi</p></div>`;
  }
}

function showForumCategoryForm(id, name, description, icon) {
  const isEdit = !!id;
  const title = isEdit ? 'Kategoriyi Duzenle' : 'Yeni Kategori Ekle';

  const html = `
    <form id="forumCatForm">
      <div class="form-group">
        <label>Kategori Adi *</label>
        <input type="text" name="name" value="${name || ''}" required>
      </div>
      <div class="form-group">
        <label>Aciklama</label>
        <input type="text" name="description" value="${description || ''}">
      </div>
      <div class="form-group">
        <label>Ikon</label>
        <input type="text" name="icon" value="${icon || ''}" placeholder="📁" style="width:80px">
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-outline" onclick="closeModal()">Iptal</button>
        <button type="submit" class="btn btn-primary">${isEdit ? 'Guncelle' : 'Olustur'}</button>
      </div>
    </form>
  `;

  openModal(title, html);

  document.getElementById('forumCatForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.elements.namedItem('name').value.trim(),
      description: form.elements.namedItem('description').value.trim(),
      icon: form.elements.namedItem('icon').value.trim() || '📁'
    };

    try {
      if (isEdit) {
        await API.updateForumCategory(id, data);
        showToast('Kategori guncellendi');
      } else {
        await API.createForumCategory(data);
        showToast('Kategori olusturuldu');
      }
      closeModal();
      loadForumCategories();
      loadForumStats();
    } catch (err) {
      showToast('Islem basarisiz', 'error');
    }
  });
}

async function deleteForumCat(id, name) {
  if (!confirm(`"${name}" kategorisini ve tum konularini silmek istediginize emin misiniz?`)) return;
  try {
    await API.deleteForumCategory(id);
    showToast('Kategori silindi');
    loadForumCategories();
    loadForumThreads();
    loadForumStats();
  } catch (err) {
    showToast('Silme basarisiz', 'error');
  }
}

async function togglePin(threadId) {
  try {
    await API.toggleForumPin(threadId);
    showToast('Sabitleme durumu degistirildi');
    loadForumThreads();
  } catch (err) {
    showToast('Islem basarisiz', 'error');
  }
}

async function deleteForumThreadAdmin(id, title) {
  if (!confirm(`"${title}" konusunu silmek istediginize emin misiniz?`)) return;
  try {
    await API.deleteForumThread(id);
    showToast('Konu silindi');
    loadForumThreads();
    loadForumStats();
  } catch (err) {
    showToast('Silme basarisiz', 'error');
  }
}

async function showThreadPosts(threadId, threadTitle) {
  try {
    const data = await API.getForumThread(threadId);
    if (!data.posts || data.posts.length === 0) {
      showToast('Bu konuda gonderi yok', 'error');
      return;
    }

    const html = `
      <div class="admin-posts-list">
        ${data.posts.map(p => `
          <div class="admin-post-item">
            <div class="admin-post-info">
              <strong>${p.author}</strong>
              <span class="admin-post-date">${new Date(p.createdAt).toLocaleString('tr-TR')}</span>
              <p class="admin-post-content">${p.content.length > 200 ? p.content.substring(0, 200) + '...' : p.content}</p>
            </div>
            <div class="admin-item-actions">
              <button class="btn btn-danger btn-sm" onclick="deleteForumPostAdmin('${p.id}', '${threadId}', '${threadTitle.replace(/'/g, "\\'")}')">Sil</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    openModal(`Gonderiler: ${threadTitle}`, html);
  } catch (err) {
    showToast('Gonderiler yuklenemedi', 'error');
  }
}

async function deleteForumPostAdmin(postId, threadId, threadTitle) {
  if (!confirm('Bu gonderiyi silmek istediginize emin misiniz?')) return;
  try {
    await API.deleteForumPost(postId);
    showToast('Gonderi silindi');
    closeModal();
    showThreadPosts(threadId, threadTitle);
    loadForumStats();
  } catch (err) {
    showToast('Silme basarisiz', 'error');
  }
}

// ===================== CARDS TAB =====================

let cardCurrentIndex = 0;
let cardFormat = 'post';

function getA2Nouns() {
  return (window.VOCAB_DATA.A2.isim || []).flat();
}

function renderAdminCards() {
  const words = getA2Nouns();
  const word = words[cardCurrentIndex];
  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <div class="card-studio">
      <div class="card-studio-header">
        <h2>Kelime Kartları</h2>
        <p>A2 · İsim — ${words.length} kelime</p>
      </div>
      <div class="card-studio-controls">
        <div class="card-format-tabs">
          <button class="card-fmt-btn ${cardFormat === 'post' ? 'active' : ''}" onclick="setCardFormat('post')">◻ Post (1:1)</button>
          <button class="card-fmt-btn ${cardFormat === 'story' ? 'active' : ''}" onclick="setCardFormat('story')">▯ Story (9:16)</button>
        </div>
      </div>
      <div class="card-studio-nav">
        <button class="btn btn-outline" onclick="cardNav(-1)">← Önceki</button>
        <span class="card-counter">${cardCurrentIndex + 1} / ${words.length}</span>
        <button class="btn btn-outline" onclick="cardNav(1)">Sonraki →</button>
      </div>
      <div class="card-preview-wrap">
        ${buildCardHTML(word, cardCurrentIndex, words.length)}
      </div>
      <div class="card-studio-actions">
        <button class="btn btn-primary" onclick="downloadCard()">⬇ PNG İndir</button>
      </div>
    </div>
  `;
}

function buildCardHTML(word, index, total) {
  const cls = cardFormat === 'story' ? 'wcard-story' : 'wcard-post';
  return `
    <div class="wcard ${cls}" id="wordCard">
      <div class="wcard-deco"></div>
      <div class="wcard-topbar">
        <span class="wcard-badge">A2 · İsim</span>
        <span class="wcard-brand">lingual.work</span>
      </div>
      <div class="wcard-body">
        <div class="wcard-word">${word.tr}</div>
        <div class="wcard-divider"></div>
        <div class="wcard-en">${word.en}</div>
        <div class="wcard-ex">"${word.ex}"</div>
      </div>
      <div class="wcard-num">${index + 1} / ${total}</div>
    </div>
  `;
}

function setCardFormat(fmt) {
  cardFormat = fmt;
  renderAdminCards();
}

function cardNav(dir) {
  const words = getA2Nouns();
  cardCurrentIndex = (cardCurrentIndex + dir + words.length) % words.length;
  renderAdminCards();
}

async function downloadCard() {
  const card = document.getElementById('wordCard');
  if (!card || typeof html2canvas === 'undefined') {
    alert('html2canvas yüklenemedi.');
    return;
  }
  const words = getA2Nouns();
  const word = words[cardCurrentIndex];
  try {
    const canvas = await html2canvas(card, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
      logging: false
    });
    const link = document.createElement('a');
    link.download = `lingual-a2-${word.tr}-${cardFormat}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    alert('İndirme hatası: ' + err.message);
  }
}
