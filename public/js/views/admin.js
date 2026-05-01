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
  const exEn = A2_ISIM_EXEN[word.tr] || '';
  const penDeco = isStory
    ? `<div style="position:absolute;right:22px;top:50%;transform:translateY(-50%);z-index:0;opacity:0.55">${WCARD_SVG_PEN}</div>`
    : '';
  return `
    <div class="wcard ${cls}" id="wordCard">
      <div class="wcard-deco-bl">${WCARD_SVG_COFFEE}</div>
      <div class="wcard-deco-br">${WCARD_SVG_PLANT}</div>
      ${penDeco}
      <div class="wcard-topbar">
        <span class="wcard-badge">A2 · İsim</span>
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
