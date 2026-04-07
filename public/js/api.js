const API = {
  async getCharacters() {
    const res = await fetch('/api/characters');
    return res.json();
  },

  async getCharacter(id) {
    const res = await fetch(`/api/characters/${id}`);
    return res.json();
  },

  async getCharacterFull(id) {
    const res = await fetch(`/api/characters/${id}/full`, {
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminPassword')}` }
    });
    return res.json();
  },

  async createCharacter(data) {
    const res = await fetch('/api/characters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('adminPassword')}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Create failed');
    return res.json();
  },

  async updateCharacter(id, data) {
    const res = await fetch(`/api/characters/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('adminPassword')}`
      },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Update failed');
    return res.json();
  },

  async deleteCharacter(id) {
    const res = await fetch(`/api/characters/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminPassword')}` }
    });
    if (!res.ok) throw new Error('Delete failed');
    return res.json();
  },

  async newChatSession(characterId) {
    const res = await fetch('/api/chat/new', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ characterId })
    });
    return res.json();
  },

  // Forum
  async getForumCategories() {
    const res = await fetch('/api/forum/categories');
    return res.json();
  },

  async createForumCategory(data) {
    const res = await fetch('/api/forum/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('adminPassword')}`
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteForumCategory(id) {
    const res = await fetch(`/api/forum/categories/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminPassword')}` }
    });
    return res.json();
  },

  async getForumThreads(catId) {
    const res = await fetch(`/api/forum/categories/${catId}/threads`);
    return res.json();
  },

  async createForumThread(data) {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('turkceai_token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch('/api/forum/threads', {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async getForumThread(id) {
    const res = await fetch(`/api/forum/threads/${id}`);
    return res.json();
  },

  async replyForumThread(threadId, data) {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('turkceai_token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const res = await fetch(`/api/forum/threads/${threadId}/posts`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async deleteForumThread(id) {
    const res = await fetch(`/api/forum/threads/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminPassword')}` }
    });
    return res.json();
  },

  async updateForumCategory(id, data) {
    const res = await fetch(`/api/forum/categories/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionStorage.getItem('adminPassword')}`
      },
      body: JSON.stringify(data)
    });
    return res.json();
  },

  async toggleForumPin(threadId) {
    const res = await fetch(`/api/forum/threads/${threadId}/pin`, {
      method: 'PATCH',
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminPassword')}` }
    });
    return res.json();
  },

  async deleteForumPost(postId) {
    const res = await fetch(`/api/forum/posts/${postId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminPassword')}` }
    });
    return res.json();
  },

  async getForumStats() {
    const res = await fetch('/api/forum/stats', {
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminPassword')}` }
    });
    return res.json();
  },

  // Auth
  async register(email, password, displayName) {
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, displayName })
    });
    return res.json();
  },

  async verify(email, code) {
    const res = await fetch('/api/auth/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code })
    });
    return res.json();
  },

  async resendCode(email) {
    const res = await fetch('/api/auth/resend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return res.json();
  },

  async login(email, password) {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return res.json();
  },

  async getUsers() {
    const res = await fetch('/api/auth/users', {
      headers: { 'Authorization': `Bearer ${sessionStorage.getItem('adminPassword')}` }
    });
    return res.json();
  },

  async getMe(token) {
    const res = await fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return res.json();
  },

  async correctText(text, sourceLang, intended) {
    const res = await fetch('/api/correction', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, sourceLang, intended })
    });
    if (!res.ok) throw new Error('Correction failed');
    return res.json();
  },

  sendMessage(sessionId, characterId, message, topicId, onChunk, onDone, onError) {
    const headers = { 'Content-Type': 'application/json' };
    const token = localStorage.getItem('turkceai_token');
    if (token) headers['Authorization'] = `Bearer ${token}`;
    fetch('/api/chat', {
      method: 'POST',
      headers,
      body: JSON.stringify({ sessionId, characterId, message, topicId })
    }).then(async response => {
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              if (data.type === 'text') onChunk(data.content);
              else if (data.type === 'done') onDone();
              else if (data.type === 'error') onError(data.content);
            } catch (e) {}
          }
        }
      }
    }).catch(err => onError('Bağlantı hatası / Connection error. Please try again.'));
  }
};

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
