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

  sendMessage(sessionId, characterId, message, topicId, onChunk, onDone, onError) {
    fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
