let currentSessionId = null;
let isStreaming = false;

async function renderChat(container, characterId, topicId) {
  container.innerHTML = '<div class="empty-state"><p>Yükleniyor... / Loading...</p></div>';

  try {
    const character = await API.getCharacter(characterId);
    const session = await API.newChatSession(characterId);
    currentSessionId = session.sessionId;

    // Find selected topic
    const topics = character.topics || [];
    const selectedTopic = topics.find(t => t.id === topicId);
    const topicLabel = selectedTopic ? selectedTopic.name : 'Serbest Sohbet / Free Chat';

    const [c1, c2] = getAvatarGradient(character.name);
    const initial = character.name.charAt(0).toUpperCase();
    const avatarContent = character.avatar
      ? `<img src="${character.avatar}" alt="${character.name}">`
      : initial;

    // Topic pills for sidebar
    const topicPills = topics.map(t =>
      `<a href="#/chat/${characterId}/${t.id}" class="sidebar-topic ${t.id === topicId ? 'active' : ''}">${t.icon} ${t.name.split(' / ')[0]}</a>`
    ).join('');

    container.innerHTML = `
      <div class="chat-container">
        <div class="chat-sidebar">
          <div class="chat-sidebar-avatar" style="background: linear-gradient(135deg, ${c1}, ${c2})">${avatarContent}</div>
          <h2>${character.name}</h2>
          <div class="chat-sidebar-role">${character.role || ''}</div>
          <div class="chat-topic-label">📘 ${topicLabel}</div>
          <div class="sidebar-topics-list">
            <div class="sidebar-topics-title">Konular / Topics</div>
            ${topicPills}
            <a href="#/chat/${characterId}/genel" class="sidebar-topic ${topicId === 'genel' ? 'active' : ''}">💬 Serbest Sohbet</a>
          </div>
          <div class="chat-sidebar-actions">
            <button class="btn btn-outline btn-block" onclick="resetChat('${characterId}', '${topicId}')">🔄 Yeni Ders / New Lesson</button>
            <a href="#/" class="btn btn-outline btn-block">← Öğretmenler / Teachers</a>
          </div>
        </div>
        <div class="chat-main">
          <div class="chat-messages" id="chatMessages"></div>
          <div class="chat-input-area">
            <textarea id="chatInput" placeholder="Mesajınızı yazın... / Type your message..." rows="1"></textarea>
            <button class="send-btn" id="sendBtn" onclick="sendMessage('${characterId}', '${character.name}', '${topicId}')">Gönder</button>
          </div>
        </div>
      </div>
    `;

    // Add greeting message
    const messagesDiv = document.getElementById('chatMessages');
    const greetingEl = createMessageElement('assistant', session.greeting, character.name);
    messagesDiv.appendChild(greetingEl);

    // Auto-resize textarea and enter key
    const textarea = document.getElementById('chatInput');
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    });

    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage(characterId, character.name, topicId);
      }
    });

    textarea.focus();

  } catch (err) {
    container.innerHTML = `<div class="empty-state"><div class="empty-icon">⚠️</div><p>Öğretmen yüklenemedi / Teacher could not be loaded</p><a href="#/" class="btn btn-primary" style="margin-top:1rem">Geri Dön / Go Back</a></div>`;
  }
}

async function sendMessage(characterId, charName, topicId) {
  if (isStreaming) return;

  const textarea = document.getElementById('chatInput');
  const message = textarea.value.trim();
  if (!message) return;

  const messagesDiv = document.getElementById('chatMessages');
  const sendBtn = document.getElementById('sendBtn');

  messagesDiv.appendChild(createMessageElement('user', message));
  textarea.value = '';
  textarea.style.height = 'auto';

  const botMsg = createStreamingMessage(charName);
  messagesDiv.appendChild(botMsg);
  const bubble = botMsg.querySelector('.message-bubble');
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  isStreaming = true;
  sendBtn.disabled = true;
  sendBtn.textContent = 'Yazıyor...';

  let fullText = '';

  API.sendMessage(
    currentSessionId,
    characterId,
    message,
    topicId,
    (text) => {
      if (bubble.querySelector('.typing-indicator')) {
        bubble.innerHTML = '';
      }
      fullText += text;
      bubble.innerHTML = escapeHtml(fullText);
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    },
    () => {
      isStreaming = false;
      sendBtn.disabled = false;
      sendBtn.textContent = 'Gönder';
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    },
    (error) => {
      if (bubble.querySelector('.typing-indicator')) {
        bubble.innerHTML = '';
      }
      bubble.innerHTML = `<em style="color:var(--danger)">${error}</em>`;
      isStreaming = false;
      sendBtn.disabled = false;
      sendBtn.textContent = 'Gönder';
    }
  );
}

async function resetChat(characterId, topicId) {
  if (currentSessionId) {
    fetch(`/api/chat/${currentSessionId}`, { method: 'DELETE' }).catch(() => {});
  }
  renderChat(document.getElementById('app'), characterId, topicId);
}
