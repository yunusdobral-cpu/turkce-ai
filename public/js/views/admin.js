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

function getCardWords() {
  const d = window.VOCAB_DATA;
  return ((d[cardLevel.toUpperCase()] || {})[cardCategory] || []).flat();
}

function renderAdminCards() {
  const words = getCardWords();
  const word = words[cardCurrentIndex];
  const catLabel = cardCategory === 'fiil' ? 'Fiil' : cardCategory === 'sifat' ? 'Sıfat' : 'İsim';
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
        </div>
        <div class="card-format-tabs">
          <button class="card-fmt-btn ${cardCategory === 'isim' ? 'active' : ''}" onclick="setCardCategory('isim')">İsim</button>
          <button class="card-fmt-btn ${cardCategory === 'fiil' ? 'active' : ''}" onclick="setCardCategory('fiil')">Fiil</button>
          <button class="card-fmt-btn ${cardCategory === 'sifat' ? 'active' : ''}" onclick="setCardCategory('sifat')">Sıfat</button>
        </div>
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
  "tatlı":"This cake is very sweet.","acı":"This pepper is very spicy.","ekşi":"Lemon is very sour.","tuzlu":"The soup is very salty.","lezzetli":"The food is very delicious.","tatsız":"This food is tasteless.","sert":"This bread is very hard.","yumuşak":"The pillow is very soft.","ıslak":"The floor is wet, be careful.","kuru":"The towel is dry.","kaygan":"The road is slippery.","yapışkan":"Honey is sticky.","kokulu":"The flowers are very fragrant.","renkli":"A very colorful pattern.","parlak":"A shiny surface.","mat":"A matte finish.",
  "hızlı":"The train is very fast.","yavaş":"Please drive slowly.","uzun":"It was a very long journey.","kısa":"The meeting was very short.","geniş":"A spacious living room.","dar":"A very narrow street.","derin":"The lake is very deep.","hafif":"A very light suitcase.","ağır":"This stone is very heavy.","doğru":"Your answer is correct.","yanlış":"This calculation is wrong.","açık":"The window is open.","kapalı":"The store is closed.","temiz":"The hotel room is very clean.","kirli":"The street is very dirty.",
  "heyecanlı":"She is very excited.","sakin":"A calm person.","yorgun":"I am very tired after work.","mutlu":"I am very happy today.","üzgün":"Why are you so sad?","kızgın":"He is very angry.","şaşkın":"I am very surprised.","meşgul":"I am very busy.","hazır":"I am ready to go.","serbest":"I am free on Friday.",
  "yakın":"The bus stop is very close.","uzak":"The airport is very far.","erken":"It is still early.","geç":"It is too late now.","günlük":"Daily exercise is important.","haftalık":"We have a weekly review.","aylık":"Monthly payment.","yıllık":"Annual subscription.",
  "zengin":"A very rich neighborhood.","fakir":"A poor but happy family.","meşhur":"A very famous chef.","önemli":"This is a very important matter.","ilginç":"A very interesting documentary.","garip":"A strange coincidence.","normal":"Everything seems normal.","tehlikeli":"A dangerous chemical.","güvenli":"This neighborhood is very safe.","rahat":"A very comfortable chair.",
  "başarılı":"A very successful student.","başarısız":"He failed the first attempt.","zeki":"A very intelligent engineer.","yaratıcı":"A very creative designer.","pratik":"A very practical solution.","teorik":"A theoretical approach.","akademik":"An academic publication.","profesyonel":"A very professional attitude.","amatör":"An amateur photographer.","deneyimli":"An experienced manager."
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

function buildCardHTML(word, index, total) {
  const isStory = cardFormat === 'story';
  const cls = isStory ? 'wcard-story' : 'wcard-post';
  const catLabel = cardCategory === 'fiil' ? 'Fiil' : cardCategory === 'sifat' ? 'Sıfat' : 'İsim';
  const exEnMaps = { a1: { isim: A1_ISIM_EXEN, fiil: A1_FIIL_EXEN, sifat: A1_SIFAT_EXEN }, a2: { isim: A2_ISIM_EXEN, fiil: A2_FIIL_EXEN, sifat: A2_SIFAT_EXEN } };
  const exEn = ((exEnMaps[cardLevel] || {})[cardCategory] || {})[word.tr] || '';
  const badge = `${cardLevel.toUpperCase()} · ${catLabel}`;
  const penDeco = isStory
    ? `<div style="position:absolute;right:22px;top:50%;transform:translateY(-50%);z-index:0;opacity:0.55">${WCARD_SVG_PEN}</div>`
    : '';
  return `
    <div class="wcard ${cls}" id="wordCard">
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
