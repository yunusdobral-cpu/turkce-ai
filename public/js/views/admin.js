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
let cardLevel = 'a2';
let cardCategory = 'isim';
let cardBatchMode = false;
let cardBatchDownloaded = new Set();

function getCardWords() {
  const d = window.VOCAB_DATA;
  return ((d[cardLevel.toUpperCase()] || {})[cardCategory] || []).flat();
}

function renderAdminCards() {
  if (cardBatchMode) { renderAdminCardsBatch(); return; }
  const words = getCardWords();
  const word = words[cardCurrentIndex];
  const catLabel = cardCategory === 'fiil' ? 'Fiil' : cardCategory === 'sifat' ? 'Sıfat' : cardCategory === 'zarf' ? 'Zarf' : 'İsim';
  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <div class="card-studio">
      <div class="card-studio-header">
        <h2>Kelime Kartları</h2>
        <p>${cardLevel.toUpperCase()} · ${catLabel} — ${words.length} kelime</p>
      </div>
      <div class="card-studio-controls" style="gap:0.75rem;flex-wrap:wrap">
        <div class="card-format-tabs">
          <button class="card-fmt-btn ${cardLevel === 'a1' ? 'active' : ''}" onclick="setCardLevel('a1')">A1</button>
          <button class="card-fmt-btn ${cardLevel === 'a2' ? 'active' : ''}" onclick="setCardLevel('a2')">A2</button>
          <button class="card-fmt-btn ${cardLevel === 'b1' ? 'active' : ''}" onclick="setCardLevel('b1')">B1</button>
        </div>
        <div class="card-format-tabs">
          <button class="card-fmt-btn ${cardCategory === 'isim' ? 'active' : ''}" onclick="setCardCategory('isim')">İsim</button>
          <button class="card-fmt-btn ${cardCategory === 'fiil' ? 'active' : ''}" onclick="setCardCategory('fiil')">Fiil</button>
          <button class="card-fmt-btn ${cardCategory === 'sifat' ? 'active' : ''}" onclick="setCardCategory('sifat')">Sıfat</button>
          <button class="card-fmt-btn ${cardCategory === 'zarf' ? 'active' : ''}" onclick="setCardCategory('zarf')">Zarf</button>
        </div>
        <div class="card-format-tabs">
          <button class="card-fmt-btn ${cardFormat === 'post' ? 'active' : ''}" onclick="setCardFormat('post')">◻ Post (1:1)</button>
          <button class="card-fmt-btn ${cardFormat === 'story' ? 'active' : ''}" onclick="setCardFormat('story')">▯ Story (9:16)</button>
        </div>
        <button class="btn btn-outline" onclick="toggleBatchMode()" style="white-space:nowrap">⊞ Toplu İndir</button>
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

const A1_ISIM_EXEN = {
  "anne":"My mother cooks very delicious food.","baba":"My father is going to work.","kardeş":"I have two siblings.","abla":"My older sister studies at university.","ağabey":"My older brother is a doctor.","çocuk":"Children are playing in the park.","bebek":"The baby is sleeping.","arkadaş":"My best friend is Ali.","öğretmen":"The teacher started the lesson.","öğrenci":"There are twenty students in the class.",
  "kadın":"That woman is very beautiful.","erkek":"That man is very tall.","kız":"The girl is singing.","oğlan":"The boy is playing ball.","aile":"My family lives in Istanbul.","dede":"My grandfather is eighty years old.","nine":"My grandmother lives in the village.","komşu":"Our neighbors are very nice people.","doktor":"I need to go to the doctor.","insan":"He is a very good person.",
  "ev":"Our house is big.","oda":"My room is very nice.","mutfak":"I am cooking in the kitchen.","banyo":"The bathroom is clean.","salon":"There is a television in the living room.","yatak":"My bed is very comfortable.","masa":"There are books on the table.","sandalye":"Please sit on the chair.","kapı":"Close the door.","pencere":"Please open the window.",
  "duvar":"There is a picture on the wall.","balkon":"I can see the sea from the balcony.","merdiven":"Go up the stairs.","anahtar":"Where is my key?","dolap":"The clothes are in the wardrobe.","buzdolabı":"The milk is in the refrigerator.","lamba":"Turn on the lamp.","ayna":"I looked in the mirror.","halı":"We bought a new carpet.","bahçe":"There are flowers in the garden.",
  "su":"I would like a glass of water.","ekmek":"The bread is fresh.","çay":"Would you like some tea?","kahve":"Turkish coffee is very nice.","süt":"The children are drinking milk.","peynir":"We eat cheese at breakfast.","yumurta":"I boiled two eggs.","pilav":"I love rice very much.","et":"We will eat meat tonight.","tavuk":"I had chicken soup.",
  "balık":"The fish is very fresh.","sebze":"Vegetable dishes are healthy.","meyve":"I eat fruit every day.","elma":"I want a red apple.","portakal":"I drank orange juice.","domates":"I put tomato in the salad.","salata":"The salad is very fresh.","çorba":"Lentil soup, please.","şeker":"Don't put sugar in my tea.","tuz":"Add a little salt.",
  "baş":"My head hurts.","göz":"Your eyes are very beautiful.","kulak":"My ears are cold.","burun":"My nose is blocked.","ağız":"Open your mouth.","el":"Wash your hands.","ayak":"My foot hurts.","saç":"Your hair is very long.","yüz":"Wash your face.","diş":"Brush your teeth.",
  "gömlek":"He wore a white shirt.","pantolon":"These trousers are tight.","etek":"She wore a red skirt.","ayakkabı":"I bought new shoes.","çorap":"Where are my socks?","şapka":"Wear a hat in the sun.","ceket":"It is cold, put on your jacket.","elbise":"This dress is very nice.","mont":"I bought a new coat for winter.","çanta":"My bag is very heavy.",
  "okul":"School starts at eight o'clock.","hastane":"Where is the hospital?","market":"I am going to the supermarket.","park":"We are walking in the park.","restoran":"This restaurant is very nice.","cadde":"Istiklal Avenue is very crowded.","sokak":"I live on this street.","köprü":"We crossed the bridge.","deniz":"The sea is very beautiful.","dağ":"We climbed the mountain.",
  "otobüs":"The bus was late.","araba":"We bought a new car.","taksi":"I called a taxi.","uçak":"The plane takes off at five o'clock.","tren":"We went to Ankara by train.","havalimanı":"We are going to the airport.","durak":"Where is the stop?","cami":"The mosque is very old.","eczane":"Where is the nearest pharmacy?","otel":"We stayed at the hotel for two nights.",
  "güneş":"The sun is shining very brightly.","yıldız":"There are stars in the sky.","yağmur":"It is raining today.","kar":"It is snowing outside.","rüzgar":"The wind is blowing very hard.","bulut":"There are clouds in the sky.","ağaç":"There is a big tree in the garden.","çiçek":"The flowers smell very nice.","hayvan":"I love animals very much.",
  "kedi":"My cat is very cute.","köpek":"The dog is barking.","kuş":"The birds are singing.","göl":"The lake is very calm.","nehir":"We swam in the river.","orman":"We went hiking in the forest.","toprak":"The soil is wet.","taş":"There are big stones on the road.","hava":"The weather is very nice today.","gök":"The sky is blue.",
  "gün":"Today is a beautiful day.","gece":"Good night!","sabah":"I woke up early in the morning.","akşam":"What are you doing this evening?","hafta":"I am very busy this week.","yıl":"This year passed very nicely.","saat":"What time is it?","dakika":"Wait five minutes.","saniye":"One second, please.",
  "bugün":"Today is Monday.","yarın":"Let's meet tomorrow.","dün":"I went to the cinema yesterday.","pazartesi":"I start work on Monday.","salı":"I have a lesson on Tuesday.","çarşamba":"Let's go to the cinema on Wednesday.","perşembe":"There is a meeting on Thursday.","cuma":"Friday is a holiday!","cumartesi":"We will go shopping on Saturday.","pazar":"I rest on Sunday.",
  "kitap":"This book is very nice.","kalem":"I lost my pen.","defter":"Please write in the notebook.","sınıf":"There are thirty students in the classroom.","ders":"The lesson starts at nine o'clock.","sınav":"I have an exam tomorrow.","ödev":"I did my homework.","bilgisayar":"My computer broke down.","telefon":"My phone is ringing.","iş":"I was late for work.",
  "para":"I have no money.","kağıt":"Please give me a piece of paper.","silgi":"Can I borrow an eraser?","tahta":"The teacher is writing on the board.","soru":"I have a question.","cevap":"I don't know the answer.","kelime":"What does this word mean?","cümle":"Make a sentence.","dil":"Turkish is a beautiful language.","not":"I got a good grade on the exam.",
  "renk":"My favorite color is blue.","kırmızı":"The red car is very nice.","mavi":"The sky is blue.","yeşil":"The trees are green.","sarı":"I bought yellow flowers.","beyaz":"He wore a white shirt.","siyah":"I saw a black cat.","turuncu":"I love the color orange.","mor":"Purple flowers are very beautiful.","pembe":"She bought a pink dress.",
  "mutlu":"I am very happy today.","üzgün":"Why are you sad?","kızgın":"My father is very angry.","korku":"I am afraid of the dark.","sevgi":"Love is the most beautiful feeling.","mutluluk":"Happiness is within us.","acı":"There is pain in my arm.","sevinç":"She cried with joy.","umut":"Don't lose hope.","güven":"I trust you.",
  "gözlük":"I cannot find my glasses.","cüzdan":"Where is my wallet?","şemsiye":"It is raining, take your umbrella.","fotoğraf":"I took a beautiful photo.","hediye":"I bought a birthday present.","bardak":"Give me a glass of water.","tabak":"I washed the plates.","kaşık":"Eat the soup with a spoon.","çatal":"The fork is on the table.","bıçak":"Where is the bread knife?",
  "havlu":"Is there a clean towel?","sabun":"Wash your hands with soap.","diş fırçası":"I forgot my toothbrush.","pil":"The remote control battery is dead.","mum":"Blow out the birthday candles.","çikolata":"I want to eat chocolate.","gazete":"My father is reading the newspaper.","bilet":"Two tickets, please.","harita":"Let's look at the map."
};

const A2_ISIM_EXEN = {
  "avukat":"My lawyer is going to court tomorrow.","mühendis":"My older brother became an engineer.","hemşire":"The nurse gave me a shot.","polis":"The police officer is directing traffic.","şoför":"The taxi driver is going very fast.","müdür":"The director is in a meeting.","gazeteci":"The journalist is reporting the news.","sanatçı":"A famous artist came.","aşçı":"The chef cooks very delicious food.","berber":"I got my hair cut at the barber.","vatandaş":"Every citizen has rights.","toplum":"We work for society.","kültür":"Turkish culture is very rich.","gelenek":"This is a beautiful tradition.","bayram":"We visit family during the holiday.","düğün":"The wedding went very beautifully.","tören":"The graduation ceremony is tomorrow.","misafir":"Guests are coming tonight.","nüfus":"Istanbul has a very large population.","vatandaşlık":"I applied for citizenship.",
  "hastalık":"This illness is contagious.","ilaç":"Don't forget to take your medicine.","ateş":"The child has a fever.","ameliyat":"The surgery went well.","muayene":"The doctor examined me.","reçete":"The doctor wrote a prescription.","kan":"I had a blood test done.","kalp":"My heart is beating very fast.","mide":"My stomach hurts.","akciğer":"Smoking damages the lungs.","omuz":"My shoulder hurts.","diz":"My knee hurts a lot.","parmak":"I cut my finger.","bel":"My back hurts.","boyun":"My neck stiffened up.","cilt":"My skin is very dry.","grip":"I got the flu, I'll stay home.","alerji":"I have a pollen allergy.","diyet":"I'm on a diet.","egzersiz":"I exercise every day.",
  "fiyat":"How much does this product cost?","indirim":"There is a big sale.","mağaza":"The store opens at ten o'clock.","kasa":"There is a queue at the cashier.","fiş":"Please keep the receipt.","kredi kartı":"Can I pay with a credit card?","banka":"I deposited money at the bank.","hesap":"Please bring the bill.","maaş":"My salary was deposited late this month.","borç":"I paid my debt.","vergi":"It's time to pay taxes.","fatura":"The electricity bill is very high.","ürün":"This product is very high quality.","marka":"Which brand do you prefer?","beden":"This size is too small for me.","numara":"My shoe size is 42.","müşteri":"The customer is always right.","sipariş":"When will my order arrive?","kargo":"The package arrived in two days.","pazarlık":"I enjoy bargaining.",
  "tarif":"I made it with my mother's recipe.","malzeme":"I bought all the ingredients.","baharat":"Add spice to the food.","soğan":"I chopped the onion.","sarımsak":"Garlic is very healthy.","biber":"I added green pepper.","makarna":"The pasta turned out very delicious.","sos":"I prepared tomato sauce.","tatlı":"There is baklava for dessert.","dondurma":"I want chocolate ice cream.","börek":"My mother made börek.","kek":"I bought a birthday cake.","un":"You need flour to make bread.","tereyağı":"I cooked it with butter.","zeytinyağı":"I put olive oil in the salad.","bal":"I ate honey at breakfast.","reçel":"Strawberry jam is very nice.","zeytin":"There are olives at breakfast.","salatalık":"I put cucumber in the salad.","havuç":"I had carrot soup.",
  "üniversite":"I study law at university.","bölüm":"What department are you studying in?","diploma":"I received my diploma.","mezuniyet":"The graduation ceremony was very beautiful.","başvuru":"I applied for a job.","mülakat":"I have an interview tomorrow.","deneyim":"I have two years of experience.","proje":"We started a new project.","sunum":"The presentation went very well.","toplantı":"We have a meeting at three o'clock.","rapor":"I will submit the report tomorrow.","sertifika":"I got a language certificate.","burs":"I won a scholarship!","staj":"I will do an internship in the summer.","sözleşme":"I signed the contract.","terfi":"I got a promotion, I am very happy.","emekli":"My father retired.","özgeçmiş":"I updated my resume.","hedef":"My goal is to study abroad.","başarı":"I wish you continued success.",
  "internet":"There is no internet connection.","şifre":"I forgot my password.","ekran":"The screen is very bright.","tuş":"Press this button.","mesaj":"I sent you a message.","e-posta":"What is your email address?","uygulama":"Download this application.","dosya":"I sent the file.","yazıcı":"I printed from the printer.","şarj":"Your phone's battery is dead.","kamera":"This camera has very good resolution.","hoparlör":"The speaker's volume is very loud.","kulaklık":"I lost my headphones.","televizyon":"There is a nice movie on television.","haber":"Did you watch the news?","reklam":"This advertisement is very funny.","program":"This program is very useful.","site":"I use this website frequently.","video":"I watched a nice video.","çeviri":"Is this translation correct?",
  "dostluk":"Our friendship is very precious.","aşk":"Love is everywhere.","saygı":"Show respect to elders.","özgürlük":"Freedom is very important.","adalet":"Justice should be for everyone.","barış":"We want peace in the world.","sabır":"You must be patient.","cesaret":"Thank you for your courage.","merak":"Don't worry, everything is fine.","kıskançlık":"Jealousy damages relationships.","nişan":"They got engaged last week.","evlilik":"Their marriage is going very well.","boşanma":"Divorce is a difficult process.","nefret":"Hatred solves nothing.","heyecan":"The excitement of the holiday has begun.","endişe":"Don't worry, we'll handle it.","pişmanlık":"I feel great regret.","şükür":"Gratitude for everything.","hayal":"My dreams are big.","özlem":"I am longing for my hometown.",
  "pasaport":"I renewed my passport.","vize":"I applied for a visa.","bavul":"I packed my suitcase.","rezervasyon":"I made a hotel reservation.","tur":"We joined a city tour.","rehber":"The guide is very knowledgeable.","müze":"We visited the museum.","saray":"We saw Topkapı Palace.","kale":"The castle is very impressive.","plaj":"We sunbathed on the beach.","tatil":"Where are you going for vacation?","gezi":"We will go on a trip this weekend.","liman":"The ship docked at the port.","gümrük":"We passed through customs.","acenta":"I went to the travel agency.","harita":"Show the location on the map.","yön":"Which direction should I go?","güzergah":"Let's choose the shortest route.","anıt":"This monument is very old.","çeşme":"We drank water from the fountain.",
  "kiracı":"A new tenant arrived.","ev sahibi":"The landlord raised the rent.","kira":"The rent is very expensive.","taşınmak":"We moved to a new house.","kombi":"The boiler broke down.","klima":"Turn on the air conditioning, it's very hot.","asansör":"The elevator is broken, let's take the stairs.","garaj":"I parked the car in the garage.","çamaşır":"I need to do laundry.","bulaşık":"I washed the dishes.","süpürge":"I cleaned with the vacuum cleaner.","çöp":"Take the trash out.","perde":"I closed the curtains.","yastık":"My pillow is very comfortable.","yorgan":"I folded the quilt.","çarşaf":"I changed the bed sheets.","musluk":"The faucet is dripping.","priz":"Is there an outlet here?","ampul":"The light bulb is burned out, let's change it.","kat":"We live on the third floor.",
  "futbol":"We watched the football match.","basketbol":"I love playing basketball.","yüzme":"I am taking swimming lessons.","koşu":"I go for a morning run.","bisiklet":"I go to work by bicycle.","maç":"The match was very exciting.","takım":"Our team became the champion.","antrenman":"There is training three days a week.","salon":"I go to the gym.","müzik":"I love listening to music.","şarkı":"I love this song very much.","enstrüman":"I am learning to play guitar.","resim":"She drew a beautiful picture.","sergi":"We went to an art exhibition.","tiyatro":"We bought tickets for the theater.","sinema":"There is a new movie at the cinema.","roman":"I finished this novel in one day.","dergi":"I am reading a fashion magazine.","yürüyüş":"We went hiking in the forest.","kamp":"We will go camping in the summer."
};

const A1_FIIL_EXEN = {
  "gelmek":"Come here tomorrow.","gitmek":"I am going to school.","yapmak":"What are you doing?","yemek":"I had breakfast.","içmek":"I want to drink water.","uyumak":"I went to sleep early.","kalkmak":"I got up early in the morning.","konuşmak":"Can you speak Turkish?","dinlemek":"I am listening to music.","görmek":"I want to see you.","bilmek":"I don't know this word.","istemek":"Do you want tea?","sevmek":"I love Turkish very much.","almak":"I bought a coffee.","vermek":"Give me water please.","okumak":"I am reading a book.","yazmak":"I am writing a letter.","çalışmak":"I am working hard.","öğrenmek":"I am learning Turkish.","anlamak":"I understood, thank you.",
  "yürümek":"We are walking in the park.","koşmak":"I run every morning.","oturmak":"Please sit here.","durmak":"Stop here.","binmek":"I got on the bus.","inmek":"I am getting off at the next stop.","dönmek":"Turn right.","geçmek":"We passed the bridge.","girmek":"I entered the house.","çıkmak":"I am going outside.","taşımak":"Carry this box.","düşmek":"The leaves are falling.","atlamak":"The children are jumping.","uçmak":"The birds are flying.","yüzmek":"We are swimming in the sea.","tırmanmak":"We are climbing the mountain.","kaçmak":"The cat ran away.","yaklaşmak":"Don't come near me.","uzaklaşmak":"She slowly moved away.",
  "yıkamak":"Wash your hands.","temizlemek":"I am cleaning the house.","pişirmek":"I am cooking food.","giymek":"Put on your jacket.","çıkarmak":"Take off your shoes.","açmak":"Open the door.","kapatmak":"Close the window.","başlamak":"The lesson started.","bitirmek":"I finished my homework.","beklemek":"Wait five minutes.","aramak":"I called you.","bulmak":"I found my key.","unutmak":"I forgot my password.","hatırlamak":"I don't remember the name.","kullanmak":"Can I use this phone?","denemek":"Try once more.","ödemek":"I paid the bill.","satmak":"I sold my old car.","toplamak":"We picked flowers.","hazırlamak":"I prepared breakfast.",
  "söylemek":"Tell me something.","sormak":"Can I ask you something?","cevaplamak":"Answer my question.","düşünmek":"What do you think?","inanmak":"I believe you.","anlatmak":"Tell me.","göstermek":"Show me.","yardım etmek":"Can you help me?","kabul etmek":"I accepted the offer.","reddetmek":"He refused the offer.","seçmek":"Choose one.","karar vermek":"When will you decide?","şikayet etmek":"She complained about the food.","teşekkür etmek":"Thank you very much.","özür dilemek":"I am sorry, I am late.","davet etmek":"I am inviting you to the party.","tebrik etmek":"Congratulations!","şaka yapmak":"I am joking.","gülmek":"We laughed a lot.","ağlamak":"The child is crying.",
  "beğenmek":"I liked this movie.","nefret etmek":"I hate lies.","korkmak":"I am afraid of the dark.","merak etmek":"Don't worry, everything will be fine.","özlemek":"I miss my family very much.","hissetmek":"I feel good.","üzmek":"This news made me sad.","kızmak":"Don't be angry with me.","şaşırmak":"I was very surprised.","endişelenmek":"I am worried about him.","rahatlamak":"I relaxed on vacation.","hayal kırmak":"He disappointed me.","gurur duymak":"I am proud of you.","utanmak":"I was very ashamed.","acıkmak":"I am very hungry.","susamak":"Give me water, I am so thirsty.","yorulmak":"I am very tired.","hastalanmak":"I got sick last week.","iyileşmek":"Get well soon!",
  "süpürmek":"I swept the floor.","silmek":"I wiped the table.","ütülemek":"I ironed the shirt.","dikmek":"I sewed the button.","boyamak":"We painted the walls.","tamir etmek":"My father repaired the car.","değiştirmek":"I changed my clothes.","asmak":"I hung the laundry.","katlamak":"I folded the clothes.","doldurmak":"Fill the glass.","boşaltmak":"Empty the trash can.","kesmek":"I cut the bread.","karıştırmak":"Stir the soup.","kaynatmak":"Boil the water.","kızartmak":"I fried eggs.","dondurmak":"I froze the meat.","ısıtmak":"I heated the food.","soymak":"I peeled the potatoes.","dökmek":"I poured tea into the glass.","kurutmak":"I dried the laundry.",
  "yağmak":"It is raining outside.","esmek":"The wind is blowing hard.","parlamak":"The sun is shining.","büyümek":"The flowers are growing.","çiçek açmak":"Flowers bloomed in the garden.","sulamak":"I watered the flowers.","ekmek":"We planted seeds.","doğmak":"The sun rose.","batmak":"The sun is setting.","ısınmak":"The weather is warming up.","soğumak":"The tea cooled down.","donmak":"Hands froze from the cold.","erimek":"The snow is melting.","akmak":"The river is flowing.","kaynamak":"The water is boiling.","yanmak":"The fire is burning.","söndürmek":"Extinguish the fire.","ıslak olmak":"I got wet in the rain.","kurumak":"The laundry dried.",
  "tanışmak":"Nice to meet you.","buluşmak":"Let's meet at five o'clock.","vedalaşmak":"We said goodbye at the airport.","paylaşmak":"We shared the meal.","kutlamak":"We celebrated my birthday.","ziyaret etmek":"We visited grandparents.","hediye vermek":"We gave mom a gift.","sarılmak":"I hugged my friend.","el sıkmak":"I shook hands with everyone.","gülümsemek":"She smiled at me.","selam vermek":"I greeted the neighbor.","izin istemek":"I asked permission to go out.","rica etmek":"Can I ask you a favor?","söz vermek":"I promise I won't be late.","randevu almak":"I made a doctor's appointment.","sipariş vermek":"I ordered a tea.","teklif etmek":"She offered me tea.","sohbet etmek":"We chatted with friends.","eğlenmek":"We had a lot of fun in the park.",
  "satın almak":"I bought new shoes.","harcamak":"I spent a lot of money.","biriktirmek":"I am saving money.","borç almak":"I borrowed money from a friend.","borç vermek":"I lent him money.","iade etmek":"I returned the product.","indirim yapmak":"He gave us a discount.","pazarlık etmek":"We bargained at the market.","tartmak":"She weighed the fruits.","saymak":"I counted the money.","kontrol etmek":"I checked the bill.","imzalamak":"I signed the document.","fatura ödemek":"I paid the electricity bill.","para çekmek":"I withdrew money from the ATM.","para yatırmak":"I deposited money at the bank.","kiralamak":"We rented a car.","sigorta yaptırmak":"I insured the car.","karşılaştırmak":"I compared the prices.","hesaplamak":"I calculated the total amount.","teslim etmek":"The package was delivered.",
  "nefes almak":"Take a deep breath.","hapşırmak":"I am sneezing a lot.","öksürmek":"I coughed at night.","esnmek":"You are yawning so much, go to sleep.","ağrımak":"My head hurts.","kanmak":"My finger is bleeding.","yaralanmak":"I got injured playing football.","kırılmak":"His arm broke.","şişmek":"My foot swelled.","ilaç içmek":"Take your medicine.","dinlenmek":"Rest a little.","terlemek":"I sweated a lot.","titremek":"I am shivering from the cold.","çarpmak":"I bumped into the door.","kaşımak":"I am scratching my arm.","yutmak":"I swallowed the pill.","çiğnemek":"Chew your food well.","sarmak":"I bandaged the wound.","egzersiz yapmak":"I exercise every morning."
};

const A1_SIFAT_EXEN = {
  "büyük":"This house is very big.","küçük":"I saw a small cat.","güzel":"The weather is very beautiful.","çirkin":"This building is very ugly.","yeni":"I bought a new phone.","eski":"This car is very old.","iyi":"This restaurant is very good.","kötü":"The weather is very bad.","uzun":"This road is very long.","kısa":"The film was very short.","sıcak":"The weather is very hot today.","soğuk":"The water is very cold.","hızlı":"This car is very fast.","yavaş":"Please speak slowly.","kolay":"This question is very easy.","zor":"Is Turkish difficult?","pahalı":"This bag is very expensive.","ucuz":"This market is cheap.","temiz":"The room is very clean.","kirli":"My hands are dirty.",
  "akıllı":"A very smart child.","tembel":"I am so lazy today.","çalışkan":"A very hardworking student.","nazik":"A very kind person.","kaba":"He spoke very rudely.","sessiz":"Be quiet in the library.","gürültülü":"The street is very noisy.","genç":"A young teacher.","yaşlı":"I saw an elderly man.","şişman":"The cat is a bit fat.","zayıf":"He lost so much weight.","güçlü":"A very strong man.","hasta":"I am sick today.","sağlıklı":"Eating vegetables is healthy.","mutlu":"I am very happy.","üzgün":"Why are you sad?","yorgun":"I am very tired.","aç":"I am very hungry.","tok":"Thank you, I am very full.","susuz":"I am very thirsty.",
  "çok":"Thank you very much.","az":"Add a little sugar.","boş":"The glass is empty.","dolu":"The bus is full.","ağır":"This bag is very heavy.","hafif":"This box is very light.","doğru":"The answer is correct.","yanlış":"This is wrong.","açık":"The door is open.","kapalı":"The market is closed.","yakın":"The school is near the house.","uzak":"The airport is very far.","erken":"I woke up early.","geç":"I was late.","hazır":"The food is ready.","meşgul":"I am very busy now.","serbest":"Are you free tomorrow?","önemli":"This is very important.","ilginç":"This book is very interesting.","sıkıcı":"The movie was very boring.",
  "güneşli":"The weather is sunny today.","bulutlu":"The weather is cloudy.","yağmurlu":"A rainy day.","karlı":"A snowy winter.","rüzgarlı":"It is very windy today.","sisli":"It is foggy in the morning.","nemli":"The weather is very humid.","kuru":"The soil is very dry.","ılık":"The water is warm.","serin":"Evenings are cool.","karanlık":"The room is very dark.","aydınlık":"This room is very bright.","geniş":"The living room is very spacious.","dar":"This street is very narrow.","derin":"The sea is very deep.","sığ":"The water is shallow here.","düz":"The road is flat.","eğik":"The road is sloped.","taze":"This bread is very fresh.","bayat":"The bread is stale.",
  "kırmızı":"I saw a red car.","mavi":"The sky is blue.","yeşil":"The grass is green.","sarı":"I bought yellow flowers.","beyaz":"Snow is white.","siyah":"A black cat.","turuncu":"An orange sunset.","mor":"Purple flowers are very beautiful.","pembe":"She wore a pink dress.","kahverengi":"She has brown eyes.","gri":"A gray cloud.","renkli":"A very colorful painting.","yuvarlak":"The table is round.","kare":"The box is square shaped.","üçgen":"A triangular sign.","ince":"A thin rope.","kalın":"A thick book.","sivri":"The knife is very sharp.","küt":"The pencil is blunt.","parlak":"A shiny ring.",
  "tatlı":"This cake is very sweet.","acı":"This pepper is very spicy.","ekşi":"Lemon is very sour.","tuzlu":"The soup is very salty.","lezzetli":"The food is very delicious.","tatsız":"This food is tasteless.","sert":"This bread is very hard.","yumuşak":"The pillow is very soft.","pürüzsüz":"The table is smooth.","pürüzlü":"The wall is rough.","ıslak":"The floor is wet, be careful.","kaygan":"The road is slippery.","yapışkan":"Honey is sticky.","kokulu":"The flowers are very fragrant.","kokusuz":"Water has no odor.","keskin":"The knife is very sharp.","mat":"A matte colored wall.",
  "birinci":"I am sitting in the first row.","ikinci":"We live on the second floor.","üçüncü":"She is in the third grade.","son":"I missed the last bus.","sonraki":"I am getting off at the next stop.","önceki":"I understood the previous lesson.","tek":"I have one question.","çift":"I want a double room.","yarım":"I waited half an hour.","tam":"I arrived right on time.","bütün":"I worked all day.","bazı":"Some people came late.","her":"I exercise every day.","hiçbir":"There is no problem.","birkaç":"Wait a few minutes.","fazla":"Don't add too much sugar.","yeterli":"My money is enough.","eksik":"A piece is missing.","eşit":"Both sides are equal.","farklı":"The two are very different.",
  "sevimli":"A very cute baby.","komik":"A very funny movie.","ciddi":"This is a very serious topic.","sakin":"Calm down.","sinirli":"You look very nervous.","korkak":"Don't be a coward.","cesur":"A very brave child.","sabırlı":"Be a little patient.","sabırsız":"You are so impatient.","cömert":"A very generous person.","cimri":"He is a bit stingy.","dürüst":"A very honest person.","yalancı":"I don't like dishonest people.","kibar":"A very polite waiter.","utangaç":"A slightly shy girl.","meraklı":"A very curious child.","yaramaz":"A naughty cat.","uslu":"The children are very well-behaved.","neşeli":"A cheerful day.","somurtkan":"You are very grumpy today.",
  "günlük":"I read my daily newspaper.","haftalık":"We have a weekly meeting.","aylık":"I paid the monthly rent.","yıllık":"I used my annual leave.","sabahki":"The morning lesson is difficult.","akşamki":"The evening movie was good.","geçici":"This is a temporary solution.","kalıcı":"I am looking for a permanent job.","ani":"He made a sudden decision.","normal":"Everything is normal.","garip":"I heard a strange sound.","mümkün":"Everything is possible.","imkansız":"This is not impossible.","gerekli":"This document is necessary.","gereksiz":"Don't waste unnecessarily.","uygun":"The price is suitable.","tehlikeli":"This road is dangerous.","güvenli":"This place is safe.","rahat":"This armchair is very comfortable.",
  "bedava":"This event is free.","meşhur":"A famous restaurant.","popüler":"This song is very popular.","zengin":"A rich family.","fakir":"Poor but happy.","şanslı":"A very lucky man.","şanssız":"Today is my unlucky day.","haklı":"You are right.","haksız":"This is very unjust.","aynı":"We go to the same school.","başka":"Is there another color?","benzer":"The two are very similar.","özel":"This is a very special day.","ortak":"We have a mutual friend.","kalabalık":"The bus is very crowded.","modern":"A modern building.","eski moda":"This dress is old-fashioned.","kullanışlı":"A very useful application.","gerçek":"This is a true story."
};

const A2_FIIL_EXEN = {
  "taşınmak":"We moved to a new house.","kiralamak":"We rented a summer house.","onarmak":"We repaired the car.","boyamak":"We painted the walls.","düzenlemek":"I organized my room.","planlamak":"We planned the vacation.","dayanmak":"I can't stand this heat.","alışmak":"I got used to the new city.","şikayet etmek":"She complained about the noise.","tartışmak":"Let's discuss this topic.","paylaşmak":"I shared my photos.","karşılaşmak":"I ran into an old friend.","katılmak":"I participated in the meeting.","devam etmek":"Let's continue the lesson.","vazgeçmek":"Never give up!","ertelemek":"We postponed the meeting.","iptal etmek":"The flight was cancelled.","tamamlamak":"We completed the project.","kontrol etmek":"I checked my emails.","kaydetmek":"I saved the file.",
  "tanışmak":"Nice to meet you.","buluşmak":"Shall we meet tomorrow?","vedalaşmak":"We said goodbye at the airport.","kutlamak":"We celebrated her birthday.","teklif etmek":"They offered me a job.","önermek":"I recommend this restaurant.","ikna etmek":"I convinced him.","eleştirmek":"Don't criticize everyone.","takdir etmek":"I appreciate your help.","itiraz etmek":"I object to this decision.","uyarmak":"I am warning you, be careful.","sözleşmek":"We agreed that he would come tomorrow.","şüphelenmek":"I suspect something.","güvenmek":"I trust you.","aldatmak":"Don't deceive me.","destek olmak":"You always support me.","kırmak":"You broke my heart.","barışmak":"We finally made up.","ayrılmak":"They separated two years ago.",
  "başvurmak":"I applied for a job.","işe almak":"The company is hiring new employees.","kovmak":"He was fired.","istifa etmek":"He resigned from his job.","yönetmek":"I am managing the project.","üretmek":"The factory produces cars.","geliştirmek":"We are developing a new app.","araştırmak":"I am researching this topic.","sunmak":"I will present the report tomorrow.","imzalamak":"We signed the contract.","kazanmak":"We won the competition.","harcamak":"I spent a lot of money.","biriktirmek":"I am saving money for vacation.","yatırım yapmak":"She invested in real estate.","ihraç etmek":"Turkey exports many products.","ithal etmek":"We import electronic products.","teslim etmek":"I delivered the report on time.","değerlendirmek":"We will evaluate the results.","ödüllendirmek":"Successful employees were rewarded.","emekli olmak":"My father will retire next year.",
  "kaldırmak":"Raise your hand.","indirmek":"I downloaded the app.","itmek":"Push the door.","çekmek":"Pull the door toward you.","fırlatmak":"He threw the ball.","yakalamak":"I caught the ball.","sarılmak":"I hugged my mom.","dokunmak":"Please don't touch.","sallamak":"She shook her head.","eğilmek":"He leaned forward.","uzanmak":"I lay down on the sofa.","sürüklemek":"She dragged the bag.","dökmek":"I spilled the tea.","karıştırmak":"Stir the soup.","kesmek":"I cut the bread.","yapıştırmak":"I sealed the envelope.","bağlamak":"Tie your shoelaces.","çözmek":"We solved the problem.","saklamak":"I hid the present.","aramak":"I searched everywhere but couldn't find it.",
  "fark etmek":"She noticed her mistake.","karşılaştırmak":"I compared two products.","çevirmek":"Translate this text into Turkish.","açıklamak":"Can you explain it to me?","özetlemek":"Summarize the topic.","tahmin etmek":"Guess the result.","keşfetmek":"We discovered a new restaurant.","kanıtlamak":"She proved her innocence.","tanımlamak":"Define this word.","uygulamak":"We implemented the new rules.","ölçmek":"I measured the room.","hesaplamak":"I calculated the total cost.","tekrarlamak":"Please repeat.","çalıştırmak":"I operated the machine.","bağlanmak":"I connected to the Wi-Fi.","güncellemek":"I updated the program.","yüklemek":"I uploaded the photos.","silmek":"I deleted the old files.",
  "ezberlemek":"I memorized the poem.","not almak":"I took notes in class.","sınav olmak":"We will have a math exam tomorrow.","mezun olmak":"I graduated last year.","kayıt olmak":"I enrolled in the course.","alıştırma yapmak":"I do exercises every day.","tercüme etmek":"I translated the text into English.","telaffuz etmek":"Pronounce this word correctly.","hecelemek":"Can you spell your name?","soru sormak":"Can I ask a question?","yanıtlamak":"I answered the questions.","ders çalışmak":"I will study in the evening.","diploma almak":"I finally got my diploma.","başarılı olmak":"I succeeded in the exam.","başarısız olmak":"I failed the first attempt.",
  "heyecanlanmak":"I got so excited about the vacation.","sakinleşmek":"Calm down a little.","özür dilemek":"She apologized immediately.","affetmek":"I forgave him.","pişman olmak":"I regret what I said.","umut etmek":"I hope for a good result.","hayal kurmak":"I am always daydreaming.","cesaret etmek":"I couldn't dare to say it.","sinirlenmek":"I got very angry at him.","ağlamak":"I cried during the movie.","gülmek":"I laughed at his joke.","kıskanmak":"I am jealous of him.","üzülmek":"I was very sad about this news.","sevinmek":"I was glad to see you.","endişelenmek":"I am worried about you.","mutlu olmak":"I became very happy here.",
  "seyahat etmek":"We travel every year.","rezervasyon yapmak":"I made a hotel reservation.","check-in yapmak":"We checked in at the airport.","bavul hazırlamak":"I packed my suitcase.","yol sormak":"We asked someone for directions.","aktarma yapmak":"We transferred in Istanbul.","gümrükten geçmek":"We passed customs without problems.","bilet almak":"I bought a plane ticket.","yolculuk etmek":"We journeyed by train.","konaklamak":"We stayed at the hotel for three nights.","rehber tutmak":"We hired a guide for the city tour.","fotoğraf çekmek":"I took a photo of the scenery.","kaybolmak":"I got lost in the city.","park etmek":"I parked the car here.","taksi çağırmak":"I called a taxi.","vize almak":"I need to get a visa.","pasaport göstermek":"Please show your passport.","uçağa binmek":"I boarded a plane for the first time.","dönüş yapmak":"We will return on Sunday.",
  "antrenman yapmak":"I train every day.","maç yapmak":"We played a match with friends.","kaybetmek":"We lost the match.","berabere kalmak":"The match ended in a draw.","bisiklet sürmek":"I rode a bike in the park.","dans etmek":"We danced at the wedding.","şarkı söylemek":"I sing in the shower.","enstrüman çalmak":"I play guitar.","resim yapmak":"I paint as a hobby.","film izlemek":"We watched a movie in the evening.","oyun oynamak":"We played games with the kids.","kamp yapmak":"We went camping in the forest.","balık tutmak":"We fished by the lake.","piknik yapmak":"We had a family picnic.","yürüyüş yapmak":"We went hiking in the mountains.","gol atmak":"We scored a goal in the last minute.","tezahürat yapmak":"We cheered in the stands.","spor yapmak":"I do sports three days a week.",
  "kira ödemek":"I pay rent every month.","tadilat yapmak":"We are renovating the kitchen.","mobilya almak":"We bought new furniture.","bulaşık yıkamak":"I washed the dishes.","çamaşır yıkamak":"I did the laundry.","ütü yapmak":"I did the ironing.","alışveriş yapmak":"I went shopping at the market.","misafir ağırlamak":"We will host guests this weekend.","bahçe işi yapmak":"I did gardening last weekend.","market listesi yapmak":"I made a shopping list.","yemek sipariş etmek":"We ordered food from outside.","komşu ziyaret etmek":"We visited the new neighbor.","çöp atmak":"I took out the trash.","evcil hayvan beslemek":"We keep a cat.","fatura kontrol etmek":"I checked the bills.","kapıyı kilitlemek":"Don't forget to lock the door.","alarm kurmak":"I set an alarm for the morning.","bitki sulamak":"I watered the balcony plants.","sofra kurmak":"I set the table for dinner."
};

const A2_SIFAT_EXEN = {
  "dürüst":"He is a very honest person.","yalancı":"I don't like dishonest people.","cömert":"A very generous man.","cimri":"He is a bit stingy.","sabırlı":"A very patient teacher.","sinirli":"She is very nervous today.","utangaç":"A very shy child.","cesur":"A very brave decision.","korkak":"Don't be a coward, try it!","kibar":"A very polite gentleman.","kurnaz":"A very sly fox.","meraklı":"Children are very curious.","sorumluluk sahibi":"A responsible employee.","neşeli":"Always a cheerful person.","karamsar":"Don't be so pessimistic.","iyimser":"Always stay optimistic.","alçakgönüllü":"A very humble person.","gururlu":"Proud of her success.","sadık":"A very loyal friend.","samimi":"A very sincere atmosphere.",
  "mümkün":"Is this possible?","imkansız":"Nothing is impossible.","gerekli":"Is a passport required?","gereksiz":"This expense is unnecessary.","uygun":"The price is very reasonable.","resmi":"Please wear formal attire.","özel":"Today is a very special day.","ortak":"We have a common point.","karmaşık":"This topic is very complex.","basit":"The answer is very simple.","modern":"A very modern building.","geleneksel":"Traditional Turkish cuisine.","popüler":"This song is very popular.","nadir":"This flower is very rare.","yaygın":"This disease is widespread.","etkili":"A very effective medicine.","zararlı":"Smoking is harmful to health.","faydalı":"This app is very useful.","değerli":"A very precious ring.","tehlikeli":"This road is dangerous.",
  "tatlı":"This cake is very sweet.","acı":"This pepper is very spicy.","ekşi":"Lemon is very sour.","tuzlu":"The soup is very salty.","baharatlı":"I love spicy food.","lezzetli":"The food is very delicious.","tatsız":"This food is tasteless.","sert":"This bread is very hard.","yumuşak":"The pillow is very soft.","pürüzsüz":"The table is very smooth.","kuru":"The towel is dry.","ıslak":"The floor is wet, be careful.","parlak":"A shiny surface.","mat":"I prefer a matte finish.","şeffaf":"A transparent glass.","kalın":"This book is very thick.","ince":"A very fine fabric.","geniş":"The living room is very spacious.","dar":"This street is very narrow.","derin":"The lake is very deep.",
  "taze":"I bought fresh fruit.","bayat":"The bread is stale.","olgun":"This fruit is ripe.","çiğ":"Raw vegetables are healthy.","pişmiş":"The meat is well cooked.","yanmış":"The bread got burnt.","besleyici":"Vegetables are nutritious.","kalorili":"Sweets are high in calories.","organik":"Organic products are expensive.","alerjik":"I am allergic to peanuts.","bulaşıcı":"This illness is contagious.","ağrılı":"A very painful wound.","iyileşmiş":"I have fully recovered.","acil":"There is an urgent situation.","kronik":"A chronic pain.","hafif":"A mild cold.","şiddetli":"A severe headache.","sağlıklı":"Healthy eating is important.",
  "başarılı":"A very successful student.","başarısız":"He failed the first attempt.","deneyimli":"An experienced doctor.","yetenekli":"A very talented child.","sorumlu":"A very responsible employee.","profesyonel":"A very professional attitude.","yaratıcı":"A very creative solution.","verimli":"A very productive day.","verimsiz":"Today was an unproductive day.","nitelikli":"We need qualified staff.","zorunlu":"This course is mandatory.","seçmeli":"I chose two elective courses.","pratik":"A very practical solution.","teorik":"Theoretical knowledge alone is not enough.","gayri resmi":"An informal chat.","yarı zamanlı":"I work part-time.","tam zamanlı":"I found a full-time job.","gönüllü":"I do voluntary work.","rekabetçi":"A very competitive sector.",
  "dijital":"We live in a digital age.","kablosuz":"There is wireless internet.","şarjlı":"I bought a rechargeable battery.","otomatik":"There is an automatic door.","manuel":"I drive a manual car.","taşınabilir":"A portable charger.","su geçirmez":"This watch is waterproof.","dayanıklı":"This material is very durable.","kırılgan":"Be careful, it is fragile!","ekonomik":"This car is very economical.","lüks":"A luxury hotel.","sade":"A plain design.","şık":"A very stylish dress.","modaya uygun":"Fashionable clothes.","uyumlu":"This device is compatible.","güvenilir":"A reliable brand.","kaliteli":"A high-quality product.","kalitesiz":"They used low-quality material.",
  "anlayışlı":"A very understanding partner.","ilgili":"A very caring teacher.","ilgisiz":"He is very indifferent to the topic.","fedakar":"A self-sacrificing mother.","bencil":"A very selfish behavior.","kibirli":"An arrogant attitude.","hassas":"A very sensitive subject.","duygusal":"An emotional movie.","mantıklı":"A rational decision.","sahte":"A fake smile.","hoşgörülü":"A tolerant society.","kıskançlık":"A jealous partner.","minnettar":"I am very grateful to you.","nankör":"Don't be ungrateful.","merhametli":"A compassionate person.",
  "turistik":"A touristic area.","tarihi":"A historical building.","doğal":"A natural beauty.","yapay":"An artificial lake.","kalabalık":"The beach is very crowded.","tenha":"A secluded village.","merkezi":"A central location.","kenar":"The outskirts of the city.","deniz kenarı":"A seaside hotel.","dağ başı":"A restaurant on the mountaintop.","konforlu":"A very comfortable hotel.","bakımlı":"A well-maintained garden.","bakımsız":"A neglected building.","huzurlu":"A peaceful environment.","gürültülü":"A very noisy street.","ferah":"A spacious apartment.","sıkışık":"A cramped room.","manzaralı":"I want a room with a scenic view.","sessiz":"A quiet neighborhood.","canlı":"A lively street.",
  "atletik":"An athletic body.","formda":"I am trying to stay in shape.","esnek":"A very flexible body.","dinç":"I feel energetic in the mornings.","bitkin":"I am exhausted after training.","çevik":"An agile player.","hantal":"I feel a bit sluggish today.","amatör":"An amateur team.","galip":"The winning team.","mağlup":"The losing team.","heyecanlı":"An exciting match.","sıkıcı":"A boring game.","adil":"A fair decision.","haksız":"An unfair penalty.","bireysel":"I do individual sports.","takım":"I love team sports.","olimpik":"An Olympic swimming pool.","rekor":"A record-breaking time.",
  "çevreci":"An environmentalist approach.","sürdürülebilir":"Sustainable energy.","yenilenebilir":"Renewable energy sources.","kirli":"The air is very polluted.","temiz":"A clean environment.","geri dönüştürülebilir":"This packaging is recyclable.","toplumsal":"A social problem.","kültürel":"A cultural event.","çağdaş":"A contemporary art museum.","küresel":"Global warming is serious.","yerel":"Local products are fresh.","ulusal":"We celebrated the national holiday.","uluslararası":"An international company.","demokratik":"A democratic society.","eşit":"Equal rights.","barışçıl":"A peaceful demonstration.","dayanışma":"We live in solidarity."
};

const A1_ZARF_EXEN = {
  "şimdi":"What are you doing now?","sonra":"Let's talk later.","önce":"Wash your hands before eating.","hep":"You are always late.","hiç":"Have you ever been to Turkey?","bazen":"Sometimes I am late.","sık sık":"We often go to the cinema.","hemen":"Come immediately!","yavaşça":"We walked slowly.","hızla":"She ran quickly.","burada":"Sit here.","orada":"There is a market there.","yukarı":"Look up.","aşağı":"Go downstairs.","belki":"Maybe I will come tomorrow.","evet":"Yes, I understand.","hayır":"No, I don't want it.","birlikte":"Let's go together.","yalnız":"I live alone.","tekrar":"Please say it again.",
  "içeride":"Is there anyone inside?","dışarıda":"It is raining outside.","ileri":"Go forward.","geri":"Turn back.","sağda":"The market is on the right.","solda":"The school is on the left.","karşıda":"The pharmacy is across the street.","yanında":"The school is next to the house.","altında":"The cat is under the table.","üstünde":"The book is on top of the table.","arasında":"It is between two buildings.","etrafında":"There are trees around the house.","arkasında":"The car is behind the house.","önünde":"Stand in front of the door.","ortada":"The table is in the middle of the room.","köşede":"The lamp is in the corner.","uzakta":"The mountains look far away.","yakında":"There is a market nearby.","her yerde":"There are flowers everywhere.","hiçbir yerde":"My key is nowhere to be found.",
  "her zaman":"Always tell the truth.","genellikle":"I usually get up early.","çoğunlukla":"I mostly work from home.","ara sıra":"We occasionally go to the cinema.","nadiren":"We rarely eat out.","asla":"I will never lie.","bir daha":"Try one more time.","sürekli":"She is constantly talking.","devamlı":"He works continuously.","zaman zaman":"I see him from time to time.","her gün":"I go for a walk every day.","her hafta":"We go shopping every week.","her ay":"We pay the bill every month.","her yıl":"We go on vacation every year.","bir kez":"I tried it once.","iki kez":"I called twice.","birçok kez":"I tried many times.","ilk kez":"I boarded a plane for the first time.","son kez":"I am asking for the last time.","artık":"I am no longer late.",
  "çok":"What a beautiful day.","biraz":"I am a little tired.","oldukça":"Quite a good idea.","tamamen":"You are completely right.","neredeyse":"It is almost done.","en çok":"I love her the most.","en az":"Work at least two hours.","daha çok":"You should work more.","daha az":"Add less sugar.","yeterince":"I have rested enough.","fazlasıyla":"I got excessively tired.","epey":"We waited quite a bit.","ancak":"I barely made it.","sadece":"Only one is left.","bile":"I don't even know your name.","kadar":"As beautiful as you.","aşırı":"It is extremely hot.","gayet":"Pretty good.","pek":"I am not very well.",
  "dün":"I went to the cinema yesterday.","bugün":"The weather is nice today.","yarın":"Tomorrow is a holiday.","geçen hafta":"I went to Istanbul last week.","gelecek hafta":"There is an exam next week.","geçen ay":"We moved last month.","gelecek ay":"We will go on vacation next month.","geçen yıl":"I graduated last year.","gelecek yıl":"We will get married next year.","önceden":"Let me know in advance.","sonradan":"He regretted it afterwards.","henüz":"I haven't arrived yet.","çoktan":"It finished long ago.","hala":"She is still working.","az önce":"She just arrived.","birazdan":"I am coming in a moment.","yakında":"See you soon.","uzun süre":"I waited for a long time.","kısa süre":"We stayed for a short time.","aniden":"It suddenly started raining.",
  "ama":"Beautiful but expensive.","ve":"Mom and dad came.","veya":"Do you want tea or coffee?","çünkü":"I was late because there was traffic.","bu yüzden":"I got sick, so I didn't come.","ayrıca":"I have one more question.","hem de":"Both beautiful and cheap.","yine de":"It is difficult but I will try anyway.","mesela":"For example, this color is nice.","yani":"So you won't come?","özellikle":"Pay attention especially to this.","aslında":"Actually you are right.","tabii ki":"Of course I will come.","maalesef":"Unfortunately I can't come.","neyse ki":"Fortunately we made it on time.","kesinlikle":"I definitely agree.","muhtemelen":"She will probably come tomorrow.","sanırım":"I think you are right.","herhalde":"She will probably be late.",
  "dikkatle":"Listen carefully.","hızlıca":"I finished it quickly.","sessizce":"I entered the room quietly.","yüksek sesle":"Read it aloud.","güzelce":"Write it nicely.","kolayca":"I learned it easily.","zorla":"I finished it with difficulty.","doğrudan":"I went home directly.","yanlışlıkla":"I deleted it accidentally.","bilerek":"I didn't do it intentionally.","aceleyle":"I left in a hurry.","rahatça":"You can sit comfortably.","düzgünce":"Write it properly.","usulca":"She gently closed the door.","sırayla":"Come one by one.","beraber":"Let's work together.","ayrı ayrı":"Sit separately.","gizlice":"I secretly bought a gift.","açıkça":"She said it openly.",
  "tabii":"Of course I will help.","tamam":"Okay, we agreed.","peki":"Alright, when?","olur":"Sure, let's meet tomorrow.","olmaz":"This won't do.","elbette":"Certainly I can do it.","hiç de değil":"Not at all, it is very beautiful.","aynen":"Exactly so.","doğru":"You are speaking the truth.","yanlış":"You misunderstood.","haklısın":"You are right, I am sorry.","tabi canım":"Sure thing, come in.","gerek yok":"No need, thank you.","hiç şüphesiz":"Undoubtedly this is the best.","ne yazık ki":"Unfortunately it is too late.",
  "daha":"Run faster.","en":"Istanbul is the most beautiful city.","gibi":"As beautiful as a flower.","daha iyi":"I feel better today.","daha kötü":"The weather got worse.","en iyi":"My best friend.","en kötü":"My worst day.","öyle":"Don't say that.","böyle":"Don't do it like this.","şöyle":"Come this way.","nasıl":"How are you?","neden":"Why aren't you coming?","ne zaman":"When will you come?","nereye":"Where are you going?","nereden":"Where are you coming from?","ne kadar":"How much is this?","hangi":"Which color do you want?","niçin":"Why are you doing this?","acaba":"I wonder if she will come.",
  "lütfen":"Please sit down.","teşekkürler":"Thank you so much.","merhaba":"Hello, how are you?","güle güle":"Goodbye, have a good day.","hoş geldin":"Welcome, please sit down.","iyi geceler":"Good night, see you tomorrow.","günaydın":"Good morning, breakfast is ready.","iyi akşamlar":"Good evening everyone.","haydi":"Come on, let's go.","hadi bakalım":"Let's see, let's get started.","aferin":"Well done!","dikkat":"Watch out, a car is coming!","maşallah":"How wonderful, it turned out beautiful.","inşallah":"Hopefully everything will be fine.","kolay gelsin":"May it come easy, good work.","geçmiş olsun":"Get well soon, take care.","afiyet olsun":"Enjoy your meal!","eyvallah":"Thanks, see you.","yok artık":"No way, I can't believe it!"
};

const A2_ZARF_EXEN = {
  "genellikle":"I usually get up early.","nadiren":"We rarely eat out.","sürekli":"She is constantly on her phone.","henüz":"She hasn't arrived yet.","artık":"I no longer live here.","sonunda":"It is finally over!","aniden":"It suddenly started raining.","yavaş yavaş":"I am gradually learning Turkish.","aynı zamanda":"I am doing two jobs at the same time.","derhal":"Come here immediately!","bir süre":"I waited for a while.","neredeyse":"I almost finished it.","tam olarak":"What exactly do you want?","özellikle":"Pay attention especially to this.","kesinlikle":"You are absolutely right.","muhtemelen":"I will probably be late.","maalesef":"Unfortunately I can't come.","neyse ki":"Fortunately nothing happened.","ayrıca":"You should also know this.","ancak":"I want to come, but I have no time.",
  "burada":"It is very nice here.","orada":"There is a park there.","şurada":"I saw a café over there.","yakınlarda":"Is there a pharmacy nearby?","uzakta":"The airport is far away.","etrafta":"There is no one around.","yukarıda":"The office is upstairs.","aşağıda":"The market is downstairs.","dışarıda":"Wait outside.","içeride":"It is warm inside.","ileride":"The gas station is ahead.","geride":"The vehicle was left behind.","karşıda":"The bank is across the street.","yanda":"There is a shop beside it.","ortada":"The flowers are in the middle of the table.","her yerde":"There is a sale everywhere.","hiçbir yerde":"I couldn't find the key anywhere.","bir yerde":"I saw it somewhere.","doğuda":"The sun rises in the east.","batıda":"The sun sets in the west.",
  "oldukça":"Quite a beautiful day.","epey":"We waited quite a long time.","fazlasıyla":"I got excessively tired.","yeterince":"I have worked enough.","tamamen":"I completely agree.","kısmen":"You are partially right.","aşırı":"It is extremely hot.","biraz":"I am a little tired.","gayet":"Pretty good.","son derece":"Extremely important.","en azından":"Work at least two hours.","en fazla":"We will stay at most two days.","hemen hemen":"Almost everyone came.","sadece":"Only five minutes left.","bile":"I don't even know your name.","yaklaşık":"It took approximately two hours.","pek":"I'm not very happy.","hayli":"I got quite tired.",
  "öncelikle":"Let's do this first.","sonra":"Let's go to the market afterwards.","bunun yanı sıra":"In addition, I also exercise.","öte yandan":"On the other hand, it could be risky.","buna rağmen":"Despite this, I'll try.","sonuç olarak":"As a result, we won.","kısacası":"In short, everything is fine.","örneğin":"For example, this color is nice.","aksine":"On the contrary, I'm very happy.","dolayısıyla":"Consequently, the plan changed.","ne var ki":"However, there was no time left.","her şeye rağmen":"Despite everything, we succeeded.","bundan dolayı":"Because of this, I was late.","hatta":"Moreover, there is an even better one.","üstelik":"Furthermore, it is cheap too.","yoksa":"Hurry up, otherwise we'll be late.","yine":"Same mistake again.","böylece":"Thus the problem was solved.","nitekim":"Indeed, that is what happened.","zaten":"I already knew it.",
  "dikkatle":"Read carefully.","dikkatsizce":"I dropped it carelessly.","hızla":"We finished it quickly.","yavaşça":"She approached slowly.","sessizce":"She entered the room quietly.","açıkça":"She said it openly.","gizlice":"They prepared it secretly.","zorla":"I convinced him with difficulty.","kolayca":"I solved it easily.","güzelce":"We decorated it nicely.","doğru düzgün":"Write it properly.","iyice":"Think it through.","usulca":"She gently touched it.","sert bir şekilde":"He spoke harshly.","özgürce":"You can speak freely.","rahatça":"Sit comfortably.","aceleyle":"She left in a hurry.","sabırla":"She waited patiently.","merakla":"She asked curiously.","coşkuyla":"They welcomed us enthusiastically.",
  "belki de":"Maybe you are right.","açıkçası":"Frankly, I didn't like it.","doğrusu":"To be honest, I'm not sure.","tabii ki":"Of course I'll help.","hiç şüphesiz":"This is undoubtedly the best.","gerçekten":"It really turned out beautiful.","ciddi olarak":"I'm saying this seriously.","şahsen":"Personally, I disagree.","genelde":"In general, I get up early.","normalde":"Normally I sleep at this hour.","ilk bakışta":"At first glance it looks easy.","sonuçta":"After all, everyone makes mistakes.","ne mutlu ki":"Happily, we made it on time.","ne yazık ki":"Unfortunately it is too late.","itiraf etmek gerekirse":"To be frank, I struggled.","bence":"In my opinion, this is wrong.","sanırım":"I think you are right.",
  "önceden":"Please let me know beforehand.","sonradan":"She learned about it later.","o sırada":"I wasn't home at that time.","bir süreliğine":"I am going away for a while.","o zamandan beri":"We haven't talked since then.","bir an önce":"Finish it as soon as possible.","geç saatlerde":"I work late at night.","erken saatlerde":"I got up early in the morning.","arada bir":"We meet up once in a while.","zamanla":"You will get used to it over time.","şu anda":"I am busy right now.","ilk başta":"At first I found it difficult.","en sonunda":"We finally succeeded.","yıllardır":"I have been living here for years.","aylardır":"I have been looking for him for months.","haftalardır":"It has been raining for weeks.","günlerdir":"I haven't slept for days.","hala":"She still hasn't finished.",
  "daha çok":"You should work more.","daha az":"Eat less.","en çok":"I love this the most.","en az":"You spoke the least.","gibi":"As beautiful as an angel.","kadar":"As fast as you.","daha iyi":"I feel better today.","daha kötü":"The weather got worse.","benzer şekilde":"I think similarly.","tam tersi":"The opposite happened.","farklı olarak":"I think differently.","aynı şekilde":"Do it the same way.","genel olarak":"I am generally satisfied.","karşılaştırıldığında":"Compared to last year, it is good.","tersine":"Conversely, it is very beautiful.","orantılı olarak":"It increased proportionally.","göreceli olarak":"It is relatively cheap.","misliyle":"The profit multiplied manifold.","kat kat":"Many times better.",
  "hadi":"Come on, let's go!","işte":"That's it!","yahu":"Hey, what are you doing?","vallahi":"I swear I'm telling the truth.","meğer":"It turns out she was right.","üzgünüm":"I'm sorry, I was late.","inşallah":"Hopefully it will be sunny tomorrow.","maşallah":"How wonderful it turned out!","eyvallah":"Thanks, take care.","estağfurullah":"Don't mention it.","kolay gelsin":"May it come easy!","geçmiş olsun":"Get well soon.","hayırlı olsun":"Congratulations on your new job.","afiyet olsun":"Enjoy your meal!","güle güle kullan":"Enjoy your new car.","sağ ol":"Thanks, you were very helpful.","bir dakika":"Wait one moment.","tabi canım":"Sure thing, come in.","yok artık":"No way, I can't believe it!","bakalım":"Let's see what happens.",
  "eğer":"I'd be very happy if you come.","şayet":"In case we are late, we'll let you know.","ne olursa olsun":"I will continue no matter what.","her halükarda":"I will come in any case.","şu şartla":"I accept on this condition.","aksi halde":"Study, otherwise you'll fail.","bu durumda":"In that case, we'll postpone it.","her ne kadar":"Although it is difficult, we'll succeed.","ne de olsa":"After all, he is my friend.","olsa olsa":"At most it will take half an hour.","ancak ve ancak":"I'll go only if you come too.","sırf":"I asked merely out of curiosity.","boşuna":"I struggled in vain.","mecburen":"I had to accept it.","gönüllü olarak":"I participated voluntarily.","bizzat":"I went there personally.","resmen":"It was officially announced.","adeta":"She was practically flying."
};

const B1_ISIM_EXEN = {
  "toplantı":"Are you ready for tomorrow's meeting?","proje":"This project is very important.","başvuru":"I applied for the job.","mülakat":"The interview went very well.","maaş":"I receive my salary at the start of each month.","kariyer":"I took a new step in my career.","deneyim":"I have five years of experience in this field.","sorumluluk":"This responsibility is very heavy.","terfi":"I got a promotion last month.","sözleşme":"Read the contract carefully.","hedef":"I reached my goal this year.","bütçe":"Our budget is very limited.","müşteri":"Customer satisfaction is very important.","görev":"This task must be done by tomorrow.","performans":"Your performance this month is very good.","rapor":"Prepare the report by Monday.","süreç":"This process is taking very long.","strateji":"We need to determine a new strategy.","yönetim":"The management team changed.","şirket":"The company is growing rapidly.",
  "üniversite":"I study law at university.","bölüm":"Which department do you study in?","sınav":"I studied very hard for the exam.","diploma":"I received my diploma last year.","araştırma":"This research is very valuable.","ödev":"I need to finish my homework.","burs":"I won a scholarship.","müfredat":"The curriculum changed this year.","akademisyen":"My father is an academician.","kütüphane":"I study at the library.","seminer":"There is a seminar tomorrow.","tez":"I am writing my thesis.","not":"My grades are very good this semester.","kayıt":"Registration dates are approaching.","konferans":"I attended an international conference.","laboratuvar":"We do experiments in the laboratory.","fakülte":"She studies at the medical faculty.","eğitmen":"The instructor is very experienced.","sunum":"My presentation is tomorrow morning.","öğrenci":"There are thirty students in this class.",
  "hastane":"I need to go to the hospital.","tedavi":"The treatment process took a long time.","hastalık":"This disease is contagious.","ameliyat":"The surgery was successful.","reçete":"The doctor wrote a prescription.","muayene":"My appointment is at three.","belirtiler":"The symptoms have continued for two days.","aşı":"Don't forget to get vaccinated.","tanı":"The doctor made the diagnosis.","eczane":"I got the medicine from the pharmacy.","sağlık":"Health is more important than anything.","bağışıklık":"The immune system is strong.","beslenme":"Healthy nutrition is very important.","ilaç":"Take the medicine three times a day.","doktor":"I made an appointment with the doctor.","hemşire":"The nurse was very attentive.","acil":"We went to the emergency room.","diyet":"I am on a strict diet.","egzersiz":"I exercise every day.","terapi":"Physical therapy was very beneficial.",
  "bilgisayar":"My computer broke down.","yazılım":"Who developed this software?","donanım":"A hardware update is needed.","uygulama":"This application is very useful.","veritabanı":"The database has been updated.","ağ":"The network connection was cut.","sunucu":"The server crashed.","şifre":"Don't share your password with anyone.","güncelleme":"There is a system update.","algoritma":"This algorithm works very fast.","veri":"Have you backed up the data?","yapay zeka":"Artificial intelligence is developing rapidly.","bulut":"I uploaded the files to the cloud.","siber güvenlik":"Cybersecurity is very critical.","arayüz":"The interface is very user-friendly.","tarayıcı":"Which browser do you use?","dosya":"Can you send the file?","bağlantı":"The internet connection is very slow.","program":"How do I install this program?","teknoloji":"Technology is changing our lives.",
  "haber":"I watch the news every morning.","gazete":"I love reading newspapers.","dergi":"I subscribed to this magazine.","yayın":"The live broadcast has started.","muhabir":"The reporter is reporting from the scene.","röportaj":"We interviewed a famous writer.","reklam":"This advertisement is very effective.","sosyal medya":"I spend a lot of time on social media.","basın":"A press conference was held.","kanal":"This channel's news is reliable.","manşet":"This headline is very eye-catching.","belgesel":"I watched a great documentary last night.","yorum":"The comments are very positive.","köşe yazısı":"I write a column every week.","izleyici":"The program's viewership increased.","editör":"The editor approved the news.","yayıncı":"The publisher released a new book.","dizi":"This TV series is very popular.","podcast":"I listen to podcasts every day.","abone":"The channel has one million subscribers.",
  "çevre":"Protecting the environment is everyone's duty.","kirlilik":"Air pollution is increasing.","iklim":"Climate change is a serious problem.","geri dönüşüm":"Throw it in the recycling bin.","orman":"Forests are disappearing rapidly.","enerji":"We must use renewable energy.","atık":"We must separate our waste.","doğa":"We must protect nature.","küresel ısınma":"Global warming is melting glaciers.","ekosistem":"We must not disturb the ecosystem balance.","tür":"Many species are facing extinction.","sera gazı":"We must reduce greenhouse gas emissions.","kuraklık":"Drought is affecting agriculture.","sel":"The flood caused great damage.","deprem":"We must be prepared for earthquakes.","karbon ayak izi":"We must reduce our carbon footprint.","sürdürülebilirlik":"Sustainability is very important for the future.","yenilenebilir":"We should turn to renewable energy sources.","biyoçeşitlilik":"Biodiversity needs to be protected.","erozyon":"Soil erosion is a serious problem.",
  "ekonomi":"The economy is growing rapidly.","enflasyon":"The inflation rate dropped.","yatırım":"I invested in this company.","ihracat":"Export figures increased.","ithalat":"Import costs rose.","vergi":"I submitted my tax return.","faiz":"Interest rates dropped.","borsa":"The stock market rose today.","döviz":"The exchange rate changed.","işsizlik":"The unemployment rate rose.","gelir":"My monthly income is not enough.","gider":"Our expenses exceeded our income.","ticaret":"International trade is growing.","piyasa":"Markets are very volatile.","kriz":"The economic crisis affected every sector.","büyüme":"Economic growth gained speed.","tüketici":"Consumer rights must be protected.","üretim":"Production capacity increased.","rekabet":"Competition is very intense.","sermaye":"We don't have enough capital.",
  "toplum":"Society is changing rapidly.","eşitlik":"Gender equality is important.","adalet":"Justice must be for everyone.","özgürlük":"Freedom is the most basic right.","demokrasi":"Democracy is everyone's voice.","ayrımcılık":"We must fight against discrimination.","göç":"The migration wave continues.","mülteci":"We must help refugees.","yoksulluk":"The fight against poverty continues.","gönüllü":"I work as a volunteer.","dernek":"We founded a charity association.","vatandaş":"Every citizen has rights.","hak":"Human rights are universal.","kültür":"Culture is our wealth.","gelenek":"This tradition has continued for centuries.","bilinç":"Social awareness is growing.","dayanışma":"Solidarity is very strong.","önyargı":"We must break down our prejudices.","sivil toplum":"Civil society must be strengthened.","kamuoyu":"Public opinion is sensitive about this issue.",
  "sergi":"I want to visit the exhibition.","heykel":"This sculpture is very impressive.","müze":"Let's go to the museum on the weekend.","tiyatro":"I bought a theater ticket.","orkestra":"The orchestra played magnificently.","resim":"This painting is very valuable.","sanatçı":"The artist won an award.","eser":"This work of art belongs to the 19th century.","roman":"I finished this novel in one night.","şiir":"I wrote a beautiful poem.","festival":"I will attend the film festival.","konser":"I found a concert ticket.","mimari":"The architecture of this city is very beautiful.","el sanatı":"We went to the handicrafts market.","yönetmen":"The director won an award.","sahne":"The stage design is very beautiful.","seyirci":"The audience gave a standing ovation.","bale":"The ballet performance was wonderful.","opera":"I love watching opera.","galeri":"A new gallery opened.",
  "deney":"The experiment was successful.","keşif":"This discovery is very important.","buluş":"This invention changed our lives.","fizik":"I like physics class.","kimya":"I work in the chemistry laboratory.","biyoloji":"I am studying for the biology exam.","matematik":"Mathematics is necessary in every field.","teori":"This theory has not yet been proven.","hipotez":"I tested my hypothesis.","formül":"Memorize this formula.","atom":"An atom is a very small particle.","hücre":"The human body consists of trillions of cells.","gen":"Genes determine hereditary traits.","evrim":"The theory of evolution is important.","gezegen":"Mars is a red planet.","galaksi":"The Milky Way is a galaxy.","mikroskop":"We examined cells with a microscope.","teleskop":"We observed stars with a telescope.","bilim insanı":"Scientists discovered a new species.","kanıt":"Sufficient evidence could not be found."
};

const B1_FIIL_EXEN = {
  "tartışmak":"We need to discuss this issue.","önermek":"I want to suggest a new plan.","geliştirmek":"Developing the software took time.","değerlendirmek":"We need to evaluate the results.","araştırmak":"I want to research this topic.","uygulamak":"The plan needs to be implemented immediately.","organize etmek":"Organizing the event is very difficult.","katılmak":"I have to attend the meeting.","desteklemek":"I want to support this project.","karşılaştırmak":"We need to compare the two products.","planlamak":"We should plan the vacation early.","yönetmek":"Managing a team is not easy.","temsil etmek":"It is an honor to represent the company.","analiz etmek":"We need to analyze the data.","tasarlamak":"We want to design a new product.","sunmak":"Presenting the report is my duty.","etkilemek":"This decision will affect everyone.","çözmek":"Let's work together to solve the problem.","iletişim kurmak":"Effective communication is important.","koordine etmek":"Coordinating teams is difficult.",
  "tamamlamak":"We must complete the project on time.","düzenlemek":"Arranging the meeting is my job.","sağlamak":"We must provide the necessary resources.","belirlemek":"Determining goals is the first step.","elde etmek":"Obtaining permission took a long time.","onaylamak":"The manager approved the plan.","reddetmek":"I don't want to reject the offer.","ertelemek":"We had to postpone the meeting.","uyarlamak":"The plan needs to be adapted.","garanti etmek":"We want to guarantee quality.","hesaplamak":"We need to calculate the cost.","gerçekleştirmek":"I want to realize my dreams.","korumak":"Protecting the environment is everyone's duty.","denetlemek":"Supervising the work is the manager's duty.","üretmek":"The factory produces a thousand units a day.","yayınlamak":"I want to publish the article.","raporlamak":"You must report the situation.","finanse etmek":"We are looking for investors to finance the project.","müzakere etmek":"Negotiating the contract took a long time.","motive etmek":"Motivating employees is important.",
  "kaydetmek":"I want to record the meeting.","paylaşmak":"We must share the knowledge with everyone.","keşfetmek":"We discovered a new method.","danışmak":"Consulting an expert is the best option.","aktarmak":"Transferring knowledge is an important skill.","dönüştürmek":"It is possible to transform energy.","incelemek":"We must carefully examine the documents.","yorumlamak":"Correctly interpreting data is important.","sorgulamak":"Questioning everything is healthy.","izlemek":"We need to closely monitor developments.","denemek":"I want to try a new method.","ölçmek":"We used a thermometer to measure the temperature.","katkıda bulunmak":"I want to contribute to the project.","doğrulamak":"It is essential to verify the information.","birleştirmek":"We need to combine the two teams.","ilham vermek":"This story inspires everyone.","fark etmek":"I immediately noticed the change.","tercih etmek":"I prefer tea.","şikayet etmek":"They complained about the service.","ikna etmek":"It was hard to convince him.",
  "teşvik etmek":"Young people need to be encouraged.","tahmin etmek":"Predicting the weather is difficult.","itiraz etmek":"I object to this decision.","savunmak":"We must defend our rights.","eleştirmek":"Criticizing constructively is important.","övmek":"Praising children makes them happy.","kınamak":"Violence must be condemned.","talep etmek":"We are demanding our rights.","vurgulamak":"I want to emphasize this point.","varsaymak":"We cannot assume it is correct.","kanıtlamak":"I want to prove my theory.","hayal etmek":"Imagining the future is wonderful.","uyum sağlamak":"I adapted to the new environment.","odaklanmak":"I want to focus on my goals.","özür dilemek":"You should apologize for your mistake.","başarmak":"I want to achieve my goals.","vazgeçmek":"I will not give up on my dreams.","farkında olmak":"You must be aware of the danger.","risk almak":"Sometimes it is necessary to take risks.","söz vermek":"I promised to finish it on time.",
  "karar vermek":"A quick decision is needed.","devam etmek":"We must continue working.","yararlanmak":"We must utilize technology.","endişelenmek":"I am worried about the future.","merak etmek":"I wonder about the result.","pişman olmak":"I don't want to regret my decision.","gurur duymak":"I am proud of you.","benzemek":"She resembles her mother a lot.","engellemek":"It is possible to prevent accidents.","hızlandırmak":"We want to speed up the process.","güçlendirmek":"Exercise to strengthen your immunity.","genişletmek":"We want to expand our business.","arttırmak":"We want to increase sales.","azaltmak":"We must reduce expenses.","kolaylaştırmak":"We can simplify life with technology.","basitleştirmek":"The system needs to be simplified.","modernleştirmek":"The infrastructure must be modernized.","iyileştirmek":"We want to improve the service.","yönlendirmek":"We must guide students correctly.","uyarmak":"I warned about the danger.",
  "bilgilendirmek":"We must inform everyone.","eğitmek":"Educating generations is important.","gözden geçirmek":"We need to review the report.","oluşturmak":"We need to create a new team.","sürdürmek":"Our goal is to sustain growth.","soruşturmak":"A team was set up to investigate the incident.","müdahale etmek":"It was necessary to intervene in the situation.","ayırmak":"We must separate work from personal life.","özetlemek":"Can you briefly summarize the topic?","netleştirmek":"I want to clarify the situation.","tanıtmak":"We want to introduce the new product.","hatırlatmak":"I sent a message to remind about the meeting.","teslim etmek":"We delivered the order on time.","güncellemek":"It is important to update the system.","yedeklemek":"You should regularly back up your data.","programlamak":"I am learning computer programming.","optimize etmek":"We optimized the website.","çevirmek":"I translated the text into English.","ezberlemek":"I memorized this poem.","açıklamak":"Explaining the topic is not easy.",
  "tanımlamak":"It is difficult to define this concept.","betimlemek":"Describing the scenery is a nice exercise.","derlemek":"Compiling the information took a long time.","düzeltmek":"The errors need to be corrected.","gözlemlemek":"Observing nature is relaxing.","yürütmek":"It is time to execute the plan.","benimsemek":"We adopted a new strategy.","çabalamak":"I am striving for better.","dağıtmak":"We are working to distribute aid.","toplamak":"We launched a campaign to collect donations.","israf etmek":"We must not waste water.","tasarruf etmek":"Saving energy is important.","yatırım yapmak":"Investing in education is the most correct choice.","kiralamak":"Renting a house has become expensive.","satın almak":"I bought a new car.","pazarlık etmek":"Bargaining at the market is a tradition.","ihraç etmek":"We export our products abroad.","ithal etmek":"We have to import raw materials.","rekabet etmek":"We compete in the global market.","büyümek":"The company is growing rapidly.",
  "kurtarmak":"Firefighters rescued people.","emek vermek":"We put a lot of effort into this project.","karşılamak":"We welcomed the guests at the door.","nefret etmek":"I hate injustice.","hayran olmak":"I admire his courage.","yansıtmak":"This report reflects the truth.","zayıflatmak":"Stress weakens the body.","daraltmak":"The options need to be narrowed.","zorlaştırmak":"Bureaucratic processes complicate things.","kötüleştirmek":"I don't want to worsen the situation.","özelleştirmek":"It is possible to customize the service.","standartlaştırmak":"Standardizing processes improves efficiency.","saklamak":"Keep documents in a safe place.","sipariş etmek":"I ordered online.","iade etmek":"I returned the product.","yüklemek":"I uploaded the file to the cloud.","indirmek":"I downloaded the application.","taramak":"I scanned the document.","filtrelemek":"We filtered the results.","senkronize etmek":"I synchronized the devices.",
  "telaffuz etmek":"Pronounce this word correctly.","alıntılamak":"I want to quote this sentence.","pratik yapmak":"Daily practice is necessary.","tekrarlamak":"Repeating words strengthens memory.","anlatmak":"Telling the story is very enjoyable.","önemsemek":"Caring about details improves quality.","sigortalamak":"It is mandatory to insure your car.","vergilendirmek":"Taxing luxury goods is common.","borçlanmak":"Borrowing too much is dangerous.","pazarlamak":"We are marketing our products to the world.","ihmal etmek":"We must not neglect our health.","şarj etmek":"I need to charge my phone.","bağlanmak":"I connected to the WiFi network.","şifrelemek":"Encrypting data is important for security.","not almak":"Taking notes in class is useful.","icat etmek":"They invented a new device.","taahhüt etmek":"We commit to quality.","göz ardı etmek":"We cannot overlook this problem.","minnettarlık duymak":"I feel grateful for your help.","sonuçlandırmak":"We concluded the agreement."
};

const B1_SIFAT_EXEN = {
  "güvenilir":"He is a very reliable person.","sorumsuz":"Don't be so irresponsible.","anlayışlı":"She is a very understanding manager.","hoşgörülü":"We need a tolerant society.","bencil":"Please don't be selfish.","fedakar":"Mothers are very selfless.","tutucu":"A conservative family.","açık fikirli":"Being open-minded is important.","dikkatli":"Be careful, the road is slippery.","dikkatsiz":"Careless drivers cause accidents.","yaratıcı":"She generates very creative ideas.","başarılı":"A successful entrepreneur.","hırslı":"A very ambitious student.","mütevazı":"Despite his success, he is modest.","kararlı":"She is moving forward with determined steps.","kararsız":"Stop being indecisive.","duygusal":"A very emotional film.","mantıklı":"She made a logical decision.","vicdanlı":"A conscientious person always does the right thing.","kıskanç":"Stop behaving jealously.",
  "nitelikli":"We are looking for qualified staff.","verimli":"We had a productive day.","verimsiz":"The meeting was unproductive.","profesyonel":"A very professional approach.","deneyimli":"We are looking for an experienced engineer.","yetkin":"She is very competent in this field.","kapsamlı":"We prepared a comprehensive report.","stratejik":"A strategic plan is needed.","rekabetçi":"The market is very competitive.","sürdürülebilir":"Sustainable energy sources.","yenilikçi":"We are producing innovative solutions.","güncek":"We must work with current information.","çağdaş":"A contemporary art museum.","sistematik":"We adopted a systematic approach.","nesnel":"We must make an objective evaluation.","öznel":"This is a completely subjective interpretation.","somut":"Give concrete examples.","soyut":"The ability to think abstractly.","eleştirel":"Critical thinking is very important.","analitik":"She has an analytical mind.",
  "kaçınılmaz":"This result was inevitable.","olağanüstü":"An extraordinary performance.","sıradan":"It was not an ordinary day.","şüpheli":"There is a suspicious situation.","kesin":"I want a definite answer.","belirsiz":"The future is uncertain.","yeterli":"We gathered sufficient information.","yetersiz":"The evidence is insufficient.","aşırı":"Excessive heat is painful.","ılımlı":"A moderate climate.","çarpıcı":"There is a striking resemblance.","dikkat çekici":"A noteworthy development.","tartışmalı":"They made a controversial decision.","güvenli":"This neighborhood is very safe.","riskli":"A risky investment.","kalıcı":"We found a permanent solution.","geçici":"This is a temporary situation.","zorunlu":"Education is compulsory.","gönüllü":"We are doing volunteer work.",
  "demokratik":"A democratic election.","otoriter":"An authoritarian government.","laik":"A secular state structure.","muhafazakar":"A conservative approach.","liberal":"A liberal economic policy.","sosyal":"Social justice is important.","ekonomik":"The economic crisis is deepening.","siyasi":"Political views differ.","hukuki":"The legal process has started.","yasal":"This is a legal right.","yasadışı":"An illegal activity.","adil":"A fair decision.","tarafsız":"A neutral observer.","taraflı":"A biased comment.","bağımsız":"An independent organization.","bağımlı":"An import-dependent economy.","şeffaf":"Transparent governance.","gizli":"A confidential document.","kamusal":"Public space regulation.","özel":"She works in the private sector.",
  "bilimsel":"A scientific study.","teknolojik":"Technological advances are accelerating.","yapay":"Artificial intelligence is developing.","doğal":"Natural resources are diminishing.","geleneksel":"Traditional methods.","deneysel":"An experimental study.","kanıtlanmış":"A proven method.","karmaşık":"A complex problem.","basit":"A simple solution.","hassas":"A precise measurement.","ölçülebilir":"Measurable results.","otomatik":"Automatic update.","analog":"I use an analog watch.","dijital":"Digital transformation.",
  "ekolojik":"The ecological balance is disrupted.","iklimsel":"Climatic changes are increasing.","biyolojik":"Biological diversity.","kimyasal":"Chemical waste is dangerous.","toksik":"Toxic substances are dangerous.","organik":"We practice organic farming.","nesli tükenen":"An endangered animal.","koruma altında":"A protected area.","çorak":"Barren land.","ormanlık":"A forested region.","kurak":"A dry summer.","nemli":"A humid climate.","tropik":"Tropical forests.","kutupsal":"Polar ice is melting.","volkanik":"A volcanic island.","depreme dayanıklı":"Earthquake-resistant buildings.","geri dönüştürülebilir":"This material is recyclable.","çevre dostu":"Eco-friendly products.",
  "finansal":"A financial crisis.","ticari":"A commercial agreement.","karlı":"A profitable investment.","zararlı":"A loss-making business.","tekelci":"A monopolistic market.","istikrarlı":"Stable growth.","istikrarsız":"An unstable period.","enflasyonist":"Inflationary pressures.","ithal":"Imported products are expensive.","yerli":"Domestic production.","vergisel":"Tax regulations.","mali":"Year-end financial report.","girişimci":"An entrepreneurial spirit.","kurumsal":"Corporate culture.","küresel":"Global markets.",
  "görsel":"Visual arts.","işitsel":"Auditory learning.","edebi":"A literary work.","sanatsal":"Artistically valuable.","kurgusal":"A fictional character.","özgün":"An original approach.","klasik":"Classical music.","popüler":"Popular culture.","estetik":"An aesthetic design.","dramatik":"A dramatic scene.","komik":"A funny play.","trajik":"A tragic ending.","lirik":"A lyrical poem.","epik":"An epic story.",
  "psikolojik":"Psychological support.","bilişsel":"Cognitive development.","davranışsal":"Behavioral problems.","bilinçaltı":"Subconscious effects.","stresli":"A stressful period.","rahatlatıcı":"Relaxing music.","motivasyonel":"A motivational speech.","travmatik":"A traumatic experience.","terapötik":"A therapeutic approach.","kronik":"A chronic illness.","akut":"An acute pain.","klinik":"Clinical research.","koruyucu":"Preventive health services.","iyileştirici":"A healing environment.","bağımlılık yapan":"Addictive substances.","besleyici":"Nutritious foods.","hijyenik":"Hygienic conditions.","genetik":"Genetic factors.","bulaşıcı":"Contagious diseases.",
  "akademik":"Academic achievement.","pedagojik":"Pedagogical methods.","müfredatla ilgili":"Curricular changes.","disiplinli":"A disciplined study.","disiplinler arası":"An interdisciplinary project.","uygulamalı":"Applied sciences.","kuramsal":"A theoretical framework.","özerk":"An autonomous university.","öğretici":"An instructive experience.","etkileşimli":"An interactive lesson.","bireysel":"Individual learning.","kolektif":"Collective work.","kapsayıcı":"Inclusive education.","seçici":"A selective approach.","ilham verici":"An inspiring speech.","dönüştürücü":"A transformative experience."
};

const B1_ZARF_EXEN = {
  "dolayısıyla":"I was late, therefore I missed the meeting.","buna rağmen":"I was tired, nevertheless I worked.","aslında":"Actually you were right.","görünüşe göre":"Apparently the plan has changed.","açıkça":"Clearly a mistake was made.","tamamen":"I completely agree.","kısmen":"You are partially right.","doğrudan":"Speak directly with the manager.","dolaylı olarak":"We were indirectly affected.","giderek":"The weather is gradually getting colder.","oldukça":"A quite successful presentation.","son derece":"An extremely important topic.","büyük ölçüde":"Success largely depends on effort.","önceden":"You should have let me know beforehand.","sonradan":"She regretted it afterwards.","eş zamanlı":"Two projects are running simultaneously.","bilinçli olarak":"I made this decision consciously.","rastgele":"I opened a random page.","karşılıklı":"Mutual respect is very important.","temelde":"We basically agree.",
  "özellikle":"Pay attention especially to this topic.","genellikle":"I generally get up early in the morning.","kesinlikle":"I definitely agree.","muhtemelen":"She will probably come tomorrow.","neredeyse":"I almost finished it.","yaklaşık":"It took approximately two hours.","hâlihazırda":"We are currently running three projects.","esasen":"You are essentially saying the same thing.","örtük olarak":"It was implicitly accepted.","açık bir şekilde":"It should be stated explicitly.","sistematik olarak":"We analyzed it systematically.","kapsamlı biçimde":"We examined the topic comprehensively.","ayrıntılı olarak":"Can you explain in detail?","özetle":"In summary, the project was successful.","somut olarak":"What do you concretely suggest?","soyut olarak":"One needs to think abstractly.","tutarlı bir şekilde":"She works consistently.","nesnel olarak":"Let's evaluate objectively.","öznel olarak":"I found it subjectively beautiful.","belirgin biçimde":"It improved notably.",
  "bu nedenle":"For this reason I left early.","bunun sonucunda":"As a result of this, things improved.","böylece":"Thus the problem was solved.","bu yüzden":"That's why I was late.","sonuç olarak":"As a result we achieved success.","bu sayede":"Thanks to this I learned a lot.","aksine":"On the contrary, the situation worsened.","bununla birlikte":"However, there are also risks.","öte yandan":"On the other hand, the cost is high.","bundan dolayı":"Because of this the plan changed.","üstelik":"Moreover, prices also increased.","buna karşın":"Despite this, she continued.","ayrıca":"Additionally there is a budget problem.","dahası":"What's more, time is also running out.","hatta":"She even won an award.","zira":"Because there is no other option.","nitekim":"Indeed, our prediction was correct.","yoksa":"Hurry up, otherwise we'll be late.","ne var ki":"However, the budget was not enough.",
  "gittikçe":"The weather is getting warmer and warmer.","zamanla":"You will get used to it over time.","derhal":"We took action immediately.","nihayet":"The project was finally completed.","sürekli olarak":"It is continuously developing.","ara sıra":"We meet occasionally.","sık sık":"He travels frequently.","nadiren":"She rarely makes mistakes.","henüz":"It is not ready yet.","artık":"I am now more conscious about this.","bir süre önce":"They called a while ago.","uzun süredir":"We have been waiting for a long time.","kısa sürede":"She progressed in a short time.","aşamalı olarak":"The transition will be made gradually.","eş anlı olarak":"Two tasks were carried out simultaneously.","durmaksızın":"She worked nonstop.","geçici olarak":"It was temporarily closed.","kalıcı olarak":"She moved permanently.","peyderpey":"She is recovering little by little.","aniden":"The weather suddenly changed.",
  "nispeten":"A relatively easy exam.","oranla":"Better compared to last year.","önemli ölçüde":"It increased significantly.","büyük oranda":"It was largely successful.","kat kat":"It became many times better.","benzer şekilde":"It should be evaluated similarly.","farklı olarak":"Unlike others, I disagree.","fazlasıyla":"She more than deserved it.","yeterince":"You have worked enough.","yetersiz biçimde":"It was insufficiently prepared.","aşırı derecede":"I got excessively tired.","minimum düzeyde":"We took minimum risk.","maksimum düzeyde":"Maximum efficiency was achieved.","eşit derecede":"Equally important.","çok daha":"A much more complex situation.","en azından":"At least let's try.","en çok":"I liked this the most.","gözle görülür biçimde":"It visibly changed.","kayda değer ölçüde":"It improved to a noteworthy degree.","kıyasla":"We are doing well in comparison to last year.",
  "samimi bir şekilde":"She sincerely thanked him.","resmi olarak":"It was officially announced.","gayri resmi olarak":"It was informally communicated.","kibar bir şekilde":"She politely declined.","sert bir şekilde":"She harshly criticized.","yumuşak bir şekilde":"He gently warned.","ısrarla":"He insistently asked the same question.","kararlı bir şekilde":"She moved forward determinedly.","tereddütle":"He hesitantly accepted.","cesurca":"She bravely opposed it.","dikkatle":"She examined it carefully.","dikkatsizce":"He moved carelessly.","gönüllü olarak":"She participated voluntarily.","zorla":"He forced his acceptance.","nazikçe":"She kindly showed the way.","alaycı bir şekilde":"She laughed sarcastically.","içtenlikle":"I sincerely congratulate you.","alçakgönüllülükle":"He humbly accepted.","gururla":"She told it proudly.","özgüvenle":"She stepped on stage confidently.",
  "demokratik olarak":"She was democratically elected.","yasal olarak":"It is legally binding.","etik olarak":"Is it ethically correct?","toplumsal olarak":"It was not socially accepted.","kültürel olarak":"A culturally rich region.","ekonomik olarak":"An economically strong country.","politik olarak":"A politically sensitive topic.","tarihsel olarak":"A historically important place.","küresel olarak":"She is globally recognized.","yerel olarak":"It is locally produced.","ulusal olarak":"It is nationally supported.","uluslararası olarak":"It was internationally accepted.","bireysel olarak":"We are individually responsible.","kolektif olarak":"We collectively made the decision.","özgürce":"You can express yourself freely.","adil bir şekilde":"It was fairly distributed.","eşit biçimde":"It was equally distributed.","barışçıl bir şekilde":"It was peacefully resolved.","şeffaf biçimde":"It should be managed transparently.","sorumlu bir şekilde":"We must behave responsibly.",
  "deneysel olarak":"It was experimentally proven.","istatistiksel olarak":"It is statistically significant.","ampirik olarak":"It was empirically confirmed.","hipotez olarak":"Let's think hypothetically.","mantıksal olarak":"It is logically inconsistent.","bilimsel olarak":"It has not been scientifically proven.","metodolojik olarak":"It is methodologically sound.","teorik olarak":"It is theoretically possible.","pratik olarak":"It is practically inapplicable.","olgusal olarak":"It is factually incorrect.","kanıtlanmış biçimde":"It is demonstrably effective.","doğru bir şekilde":"It was accurately measured.","hatalı biçimde":"It was erroneously interpreted.","tahminen":"It will presumably take three days.","kesin olarak":"It is not precisely known.","tekrarlanabilir biçimde":"It was reproducibly tested.","nicel olarak":"It was quantitatively analyzed.","nitel olarak":"It was qualitatively evaluated.","karşılaştırmalı olarak":"It was comparatively examined.","bağımsız olarak":"It was independently confirmed.",
  "ticari olarak":"A commercially successful product.","mali olarak":"It is financially supported.","stratejik olarak":"A strategically important move.","verimli bir şekilde":"It is operating efficiently.","kârlı bir şekilde":"It is managed profitably.","rekabetçi biçimde":"We competitively priced it.","sürdürülebilir biçimde":"We produce sustainably.","maliyet etkin biçimde":"It was solved cost-effectively.","kurumsal olarak":"It was corporately restructured.","profesyonel olarak":"It is professionally managed.","işlevsel olarak":"It is functionally appropriate.","yapısal olarak":"It is structurally sound.","operasyonel olarak":"It is operationally ready.","bürokratik olarak":"A bureaucratically challenging process.","yatırım açısından":"It is attractive in terms of investment.","piyasa açısından":"Market-wise it is positive.","üretken biçimde":"We are working productively.","sistematik bir şekilde":"It was analyzed in a systematic way.","planlı bir şekilde":"It is progressing in a planned manner.","organik olarak":"A company growing organically.",
  "duygusal olarak":"An emotionally difficult period.","psikolojik olarak":"Are you psychologically ready?","bilinçaltında":"You subconsciously want this.","içgüdüsel olarak":"She instinctively felt the danger.","empati ile":"You should listen empathetically.","sabırla":"She patiently waited.","kaygıyla":"We are anxiously waiting for the result.","hevesle":"She eagerly started working.","umutla":"We look to the future hopefully.","umutsuzca":"She desperately asked for help.","güvenle":"You can contact us with confidence.","şüpheyle":"She looked with suspicion.","hayranlıkla":"He watched with admiration.","endişeyle":"We are following it with concern.","merakla":"She curiously asked.","öfkeyle":"She reacted angrily.","minnetle":"She gratefully welcomed it.","sevgiyle":"A meal prepared with love.","korkuyla":"He retreated fearfully.","hüzünle":"She left sadly."
};

const WCARD_SVG_COFFEE = `<svg xmlns="http://www.w3.org/2000/svg" width="108" height="118" viewBox="0 0 108 118" style="transform:rotate(-14deg);display:block">
  <ellipse cx="54" cy="110" rx="40" ry="7.5" fill="#c0ad90" opacity="0.18"/>
  <ellipse cx="54" cy="106" rx="43" ry="11" fill="#e8dcc6"/>
  <ellipse cx="54" cy="103" rx="38" ry="9.5" fill="#f0e6d2"/>
  <ellipse cx="54" cy="103" rx="33" ry="8" fill="#ece1cc" stroke="#e0d4b8" stroke-width="0.6"/>
  <path d="M30,50 Q30,86 54,86 Q78,86 78,50" fill="#e6d9bc"/>
  <ellipse cx="54" cy="50" rx="24" ry="8" fill="#d8c8a4"/>
  <ellipse cx="54" cy="50" rx="19.5" ry="6.5" fill="#18090200"/>
  <ellipse cx="54" cy="50" rx="19.5" ry="6.5" fill="#1a0e04"/>
  <ellipse cx="50" cy="48" rx="6" ry="3.5" fill="#5c3018" opacity="0.45"/>
  <path d="M46,49 Q50,47 54,49 Q58,51 62,49" stroke="#8b5530" stroke-width="1.4" fill="none" stroke-linecap="round" opacity="0.6"/>
  <path d="M78,60 Q96,60 96,71 Q96,82 78,82" fill="none" stroke="#d8c8a4" stroke-width="5.5" stroke-linecap="round"/>
</svg>`;

const WCARD_SVG_PLANT = `<svg xmlns="http://www.w3.org/2000/svg" width="88" height="96" viewBox="0 0 88 96" style="display:block">
  <path d="M44,92 Q39,68 29,42 Q21,18 44,7" stroke="#6b8c5a" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <path d="M33,72 Q11,62 15,45 Q33,47 33,72Z" fill="#8aac76" opacity="0.82"/>
  <path d="M33,72 Q21,58 16,46" stroke="#527041" stroke-width="0.8" fill="none" opacity="0.35"/>
  <path d="M29,52 Q52,40 48,25 Q30,27 29,52Z" fill="#7da06c" opacity="0.85"/>
  <path d="M29,52 Q41,38 47,26" stroke="#527041" stroke-width="0.8" fill="none" opacity="0.35"/>
  <path d="M25,36 Q5,29 9,14 Q25,17 25,36Z" fill="#8aac76" opacity="0.78"/>
  <path d="M25,36 Q13,25 10,15" stroke="#527041" stroke-width="0.8" fill="none" opacity="0.35"/>
  <path d="M23,27 Q46,15 42,4 Q26,6 23,27Z" fill="#6a9460" opacity="0.82"/>
</svg>`;

const WCARD_SVG_PEN = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="92" viewBox="0 0 18 92" style="transform:rotate(8deg);display:block">
  <rect x="3" y="0" width="12" height="18" rx="6" fill="#b83232"/>
  <rect x="4" y="15" width="10" height="3.5" fill="#8e1e1e"/>
  <rect x="3" y="18" width="12" height="58" fill="#1a2744"/>
  <rect x="13.5" y="4" width="2.5" height="30" rx="1.25" fill="#c83030"/>
  <path d="M3,76 L9,92 L15,76Z" fill="#d4c8a8"/>
  <rect x="5.5" y="20" width="3" height="52" rx="1.5" fill="rgba(255,255,255,0.07)"/>
</svg>`;

function buildCardHTML(word, index, total, overrideCat, noId) {
  const isStory = cardFormat === 'story';
  const cls = isStory ? 'wcard-story' : 'wcard-post';
  const cat = overrideCat || cardCategory;
  const catLabel = cat === 'fiil' ? 'Fiil' : cat === 'sifat' ? 'Sıfat' : cat === 'zarf' ? 'Zarf' : 'İsim';
  const exEnMaps = { a1: { isim: A1_ISIM_EXEN, fiil: A1_FIIL_EXEN, sifat: A1_SIFAT_EXEN, zarf: A1_ZARF_EXEN }, a2: { isim: A2_ISIM_EXEN, fiil: A2_FIIL_EXEN, sifat: A2_SIFAT_EXEN, zarf: A2_ZARF_EXEN }, b1: { isim: B1_ISIM_EXEN, fiil: B1_FIIL_EXEN, sifat: B1_SIFAT_EXEN, zarf: B1_ZARF_EXEN } };
  const exEn = ((exEnMaps[cardLevel] || {})[cat] || {})[word.tr] || '';
  const badge = `${cardLevel.toUpperCase()} · ${catLabel}`;
  const penDeco = isStory
    ? `<div style="position:absolute;right:22px;top:50%;transform:translateY(-50%);z-index:0;opacity:0.55">${WCARD_SVG_PEN}</div>`
    : '';
  return `
    <div class="wcard ${cls}"${noId ? '' : ' id="wordCard"'}>
      <div class="wcard-deco-bl">${WCARD_SVG_COFFEE}</div>
      <div class="wcard-deco-br">${WCARD_SVG_PLANT}</div>
      ${penDeco}
      <div class="wcard-topbar">
        <span class="wcard-badge">${badge}</span>
        <span class="wcard-brand">lingual.work</span>
      </div>
      <div class="wcard-body">
        <div class="wcard-content-frame">
          <div class="wcard-word">${word.tr}</div>
          <div class="wcard-line"></div>
          <div class="wcard-en">${word.en}</div>
          <div class="wcard-ex">"${word.ex}"</div>
          ${exEn ? `<div class="wcard-exen">"${exEn}"</div>` : ''}
        </div>
        <div class="wcard-cta">
          <p class="wcard-cta-tr">Sen nasıl kullanırdın? Yorumda göster!</p>
          <p class="wcard-cta-en">How would you use it? Show us in the comments!</p>
          <div class="wcard-cta-arrow">↓</div>
        </div>
      </div>
      <div class="wcard-num">${index + 1} / ${total}</div>
    </div>
  `;
}

function setCardLevel(level) {
  cardLevel = level;
  cardCurrentIndex = 0;
  cardBatchDownloaded = new Set();
  renderAdminCards();
}

function setCardFormat(fmt) {
  cardFormat = fmt;
  renderAdminCards();
}

function setCardCategory(cat) {
  cardCategory = cat;
  cardCurrentIndex = 0;
  renderAdminCards();
}

function cardNav(dir) {
  const words = getCardWords();
  cardCurrentIndex = (cardCurrentIndex + dir + words.length) % words.length;
  renderAdminCards();
}

async function downloadCard() {
  const card = document.getElementById('wordCard');
  if (!card || typeof html2canvas === 'undefined') {
    alert('html2canvas yüklenemedi.');
    return;
  }
  const words = getCardWords();
  const word = words[cardCurrentIndex];
  try {
    const canvas = await html2canvas(card, {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
      logging: false
    });
    const link = document.createElement('a');
    link.download = `lingual-${cardLevel}-${cardCategory}-${word.tr}-${cardFormat}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (err) {
    alert('İndirme hatası: ' + err.message);
  }
}

function getBatchQueue() {
  const cats = ['isim', 'fiil', 'sifat', 'zarf'];
  const d = window.VOCAB_DATA;
  const maxLen = Math.min(...cats.map(c => ((d[cardLevel.toUpperCase()] || {})[c] || []).flat().length));
  const undone = [];
  const done = [];
  for (let i = 0; i < maxLen; i++) {
    (cardBatchDownloaded.has(i) ? done : undone).push(i);
  }
  return [...undone, ...done];
}

function toggleBatchMode() {
  cardBatchMode = !cardBatchMode;
  cardBatchDownloaded = new Set();
  if (cardBatchMode) {
    cardCurrentIndex = getBatchQueue()[0] || 0;
  } else {
    cardCurrentIndex = 0;
  }
  renderAdminCards();
}

function batchNav(dir) {
  const queue = getBatchQueue();
  const pos = queue.indexOf(cardCurrentIndex);
  const newPos = ((pos < 0 ? 0 : pos) + dir + queue.length) % queue.length;
  cardCurrentIndex = queue[newPos];
  renderAdminCards();
}

function renderAdminCardsBatch() {
  const cats = ['isim', 'fiil', 'sifat', 'zarf'];
  const d = window.VOCAB_DATA;
  const isStory = cardFormat === 'story';
  const groupIdx = cardCurrentIndex;
  const queue = getBatchQueue();
  const maxLen = queue.length;
  const downloaded = cardBatchDownloaded.size;
  const queuePos = queue.indexOf(groupIdx);
  const isDownloaded = cardBatchDownloaded.has(groupIdx);

  const cardW = isStory ? 405 : 540;
  const cardH = isStory ? 720 : 540;
  const gridW = cardW * 2;
  const gridH = cardH * 2;
  const previewW = Math.round(gridW * 0.5);
  const previewH = Math.round(gridH * 0.5);

  let gridHTML = '';
  for (const cat of cats) {
    const words = ((d[cardLevel.toUpperCase()] || {})[cat] || []).flat();
    const word = words[groupIdx] || words[0];
    if (word) gridHTML += buildCardHTML(word, groupIdx, words.length, cat, true);
  }

  const content = document.getElementById('adminContent');
  content.innerHTML = `
    <div class="card-studio">
      <div class="card-studio-header">
        <h2>Kelime Kartları — Toplu İndir</h2>
        <p>${cardLevel.toUpperCase()} · ${downloaded} / ${maxLen} grup indirildi</p>
      </div>
      <div class="card-studio-controls" style="gap:0.75rem;flex-wrap:wrap">
        <div class="card-format-tabs">
          <button class="card-fmt-btn ${cardLevel === 'a1' ? 'active' : ''}" onclick="setCardLevel('a1')">A1</button>
          <button class="card-fmt-btn ${cardLevel === 'a2' ? 'active' : ''}" onclick="setCardLevel('a2')">A2</button>
          <button class="card-fmt-btn ${cardLevel === 'b1' ? 'active' : ''}" onclick="setCardLevel('b1')">B1</button>
        </div>
        <div class="card-format-tabs">
          <button class="card-fmt-btn ${cardFormat === 'post' ? 'active' : ''}" onclick="setCardFormat('post')">◻ Post (1:1)</button>
          <button class="card-fmt-btn ${cardFormat === 'story' ? 'active' : ''}" onclick="setCardFormat('story')">▯ Story (9:16)</button>
        </div>
        <button class="btn btn-outline" onclick="toggleBatchMode()" style="white-space:nowrap">← Tekli Moda Dön</button>
      </div>
      <div class="card-studio-nav">
        <button class="btn btn-outline" onclick="batchNav(-1)">← Önceki</button>
        <span class="card-counter">Grup ${groupIdx + 1} · ${queuePos + 1} / ${maxLen}${isDownloaded ? ' ✓' : ''}</span>
        <button class="btn btn-outline" onclick="batchNav(1)">Sonraki →</button>
      </div>
      <div class="card-preview-wrap" style="overflow:hidden;width:${previewW}px;height:${previewH}px;margin:0 auto;">
        <div style="transform:scale(0.5);transform-origin:top left;width:${gridW}px;height:${gridH}px;display:grid;grid-template-columns:1fr 1fr;">
          ${gridHTML}
        </div>
      </div>
      <div class="card-studio-actions">
        <button class="btn btn-primary" onclick="downloadBatch()">⬇ Grubu İndir (PNG)</button>
      </div>
    </div>
  `;
}

async function downloadBatch() {
  if (typeof html2canvas === 'undefined') {
    alert('html2canvas yüklenemedi.');
    return;
  }
  const cats = ['isim', 'fiil', 'sifat', 'zarf'];
  const d = window.VOCAB_DATA;
  const isStory = cardFormat === 'story';
  const groupIdx = cardCurrentIndex;
  const cardW = isStory ? 405 : 540;
  const cardH = isStory ? 720 : 540;

  for (const cat of cats) {
    const words = ((d[cardLevel.toUpperCase()] || {})[cat] || []).flat();
    const word = words[groupIdx] || words[0];
    if (!word) continue;

    const container = document.createElement('div');
    container.style.cssText = `position:fixed;left:-9999px;top:0;width:${cardW}px;height:${cardH}px;`;
    container.innerHTML = buildCardHTML(word, groupIdx, words.length, cat, true);
    document.body.appendChild(container);

    try {
      const canvas = await html2canvas(container, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
        logging: false,
        width: cardW,
        height: cardH
      });
      const link = document.createElement('a');
      link.download = `lingual-${cardLevel}-${cat}-grup${groupIdx + 1}-${cardFormat}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      await new Promise(r => setTimeout(r, 250));
    } catch (err) {
      alert('İndirme hatası: ' + err.message);
      document.body.removeChild(container);
      return;
    }
    document.body.removeChild(container);
  }

  cardBatchDownloaded.add(groupIdx);
  const newQueue = getBatchQueue();
  const nextUndone = newQueue.find(i => !cardBatchDownloaded.has(i));
  cardCurrentIndex = nextUndone !== undefined ? nextUndone : (newQueue[0] !== undefined ? newQueue[0] : 0);
  renderAdminCards();
}
