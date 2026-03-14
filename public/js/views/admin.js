async function renderAdmin(container) {
  if (!sessionStorage.getItem('adminPassword')) {
    showLoginPrompt(container);
    return;
  }

  container.innerHTML = `
    <div class="admin-header">
      <h1>Kişilik Yönetimi</h1>
      <button class="btn btn-primary" onclick="showCharacterForm()">+ Yeni Kişilik</button>
    </div>
    <div class="admin-list" id="adminList">
      <div class="empty-state"><p>Yükleniyor...</p></div>
    </div>
  `;

  await loadAdminList();
}

function showLoginPrompt(container) {
  container.innerHTML = `
    <div style="max-width:400px;margin:3rem auto;text-align:center">
      <h2 style="margin-bottom:1.5rem">Yönetim Paneli</h2>
      <div class="form-group">
        <input type="password" id="adminPassInput" placeholder="Yönetici şifresi" style="text-align:center">
      </div>
      <button class="btn btn-primary btn-block" onclick="adminLogin()">Giriş Yap</button>
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

async function loadAdminList() {
  const list = document.getElementById('adminList');
  try {
    const characters = await API.getCharacters();
    if (characters.length === 0) {
      list.innerHTML = `<div class="empty-state"><div class="empty-icon">📭</div><p>Henüz kişilik eklenmemiş</p></div>`;
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
            <p>${c.description || 'Açıklama yok'}</p>
          </div>
          <div class="admin-item-actions">
            <button class="btn btn-outline btn-sm" onclick="editCharacter('${c.id}')">Düzenle</button>
            <button class="btn btn-danger btn-sm" onclick="deleteCharacter('${c.id}', '${c.name}')">Sil</button>
          </div>
        </div>
      `;
    }).join('');
  } catch (err) {
    list.innerHTML = `<div class="empty-state"><p>Yüklenemedi. Şifrenizi kontrol edin.</p></div>`;
  }
}

function showCharacterForm(existing = null) {
  const isEdit = !!existing;
  const title = isEdit ? 'Kişiliği Düzenle' : 'Yeni Kişilik Ekle';

  const html = `
    <form id="charForm">
      <div class="form-group">
        <label>Ad *</label>
        <input type="text" name="name" value="${existing?.name || ''}" required>
      </div>
      <div class="form-group">
        <label>Rol / Role</label>
        <input type="text" name="role" value="${existing?.role || ''}" placeholder="Örn: Dilbilgisi Öğretmeni / Grammar Teacher">
        <div class="help-text">Öğretmenin uzmanlık alanı (Türkçe / İngilizce)</div>
      </div>
      <div class="form-group">
        <label>Avatar URL</label>
        <input type="text" name="avatar" value="${existing?.avatar || ''}" placeholder="https://...">
        <div class="help-text">Boş bırakılırsa otomatik avatar oluşturulur</div>
      </div>
      <div class="form-group">
        <label>Açıklama (Türkçe)</label>
        <textarea name="description" rows="2">${existing?.description || ''}</textarea>
      </div>
      <div class="form-group">
        <label>Açıklama (İngilizce)</label>
        <textarea name="descriptionEn" rows="2">${existing?.descriptionEn || ''}</textarea>
        <div class="help-text">Ana sayfada öğrencilere gösterilen İngilizce açıklama</div>
      </div>
      <div class="form-group">
        <label>Karşılama Mesajı</label>
        <textarea name="greeting" rows="2">${existing?.greeting || ''}</textarea>
        <div class="help-text">Sohbet başladığında gösterilecek ilk mesaj</div>
      </div>
      <div class="form-group">
        <label>Kişilik Özellikleri *</label>
        <textarea name="personality" rows="3" required>${existing?.personality || ''}</textarea>
        <div class="help-text">Karakterin nasıl davranacağını açıklayın</div>
      </div>
      <div class="form-group">
        <label>Ton</label>
        <select name="tone">
          <option value="casual" ${existing?.tone === 'casual' ? 'selected' : ''}>Samimi</option>
          <option value="formal" ${existing?.tone === 'formal' ? 'selected' : ''}>Resmi</option>
          <option value="humorous" ${existing?.tone === 'humorous' ? 'selected' : ''}>Esprili</option>
          <option value="dramatic" ${existing?.tone === 'dramatic' ? 'selected' : ''}>Dramatik</option>
          <option value="poetic" ${existing?.tone === 'poetic' ? 'selected' : ''}>Şiirsel</option>
        </select>
      </div>
      <div class="form-group">
        <label>Sistem İstemi</label>
        <textarea name="systemPrompt" rows="4">${existing?.systemPrompt || ''}</textarea>
        <div class="help-text">AI'ya doğrudan verilecek talimatlar (opsiyonel, gelişmiş)</div>
      </div>
      <div class="form-group">
        <label>Konular / Topics</label>
        <div id="topicsContainer">
          ${(existing?.topics || []).map((t, i) => `
            <div class="topic-entry" data-index="${i}">
              <input type="text" placeholder="ID (örn: ekler)" value="${t.id}" class="topic-id">
              <input type="text" placeholder="Ad (örn: Ekler / Suffixes)" value="${t.name}" class="topic-name-input">
              <input type="text" placeholder="Icon (örn: 🔗)" value="${t.icon}" class="topic-icon-input" style="width:60px">
              <input type="text" placeholder="Açıklama (İngilizce)" value="${t.description}" class="topic-desc-input">
              <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove()">×</button>
            </div>
          `).join('')}
        </div>
        <button type="button" class="btn btn-outline btn-sm" onclick="addTopicEntry()" style="margin-top:0.5rem">+ Konu Ekle</button>
        <div class="help-text">Ana sayfada öğretmenin altında gösterilen konu kartları</div>
      </div>
      <div class="form-group">
        <label>Etiketler</label>
        <input type="text" name="tags" value="${(existing?.tags || []).join(', ')}" placeholder="etiket1, etiket2, ...">
      </div>
      <div class="form-actions">
        <button type="button" class="btn btn-outline" onclick="closeModal()">İptal</button>
        <button type="submit" class="btn btn-primary">${isEdit ? 'Güncelle' : 'Oluştur'}</button>
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
        showToast('Kişilik güncellendi');
      } else {
        await API.createCharacter(data);
        showToast('Kişilik oluşturuldu');
      }
      closeModal();
      await loadAdminList();
    } catch (err) {
      showToast('İşlem başarısız. Şifrenizi kontrol edin.', 'error');
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
    showToast('Kişilik yüklenemedi', 'error');
  }
}

function addTopicEntry() {
  const container = document.getElementById('topicsContainer');
  const div = document.createElement('div');
  div.className = 'topic-entry';
  div.innerHTML = `
    <input type="text" placeholder="ID (örn: ekler)" class="topic-id">
    <input type="text" placeholder="Ad (örn: Ekler / Suffixes)" class="topic-name-input">
    <input type="text" placeholder="Icon (örn: 🔗)" class="topic-icon-input" style="width:60px">
    <input type="text" placeholder="Açıklama (İngilizce)" class="topic-desc-input">
    <button type="button" class="btn btn-danger btn-sm" onclick="this.parentElement.remove()">×</button>
  `;
  container.appendChild(div);
}

async function deleteCharacter(id, name) {
  if (!confirm(`"${name}" kişiliğini silmek istediğinize emin misiniz?`)) return;
  try {
    await API.deleteCharacter(id);
    showToast('Kişilik silindi');
    await loadAdminList();
  } catch (err) {
    showToast('Silme işlemi başarısız', 'error');
  }
}
