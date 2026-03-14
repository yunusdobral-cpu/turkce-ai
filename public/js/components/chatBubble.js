function createMessageElement(role, content, charName) {
  const msg = document.createElement('div');
  msg.className = `message ${role}`;

  let avatarContent;
  if (role === 'user') {
    avatarContent = '👤';
  } else {
    avatarContent = charName ? charName.charAt(0).toUpperCase() : '🤖';
  }

  msg.innerHTML = `
    <div class="message-avatar">${avatarContent}</div>
    <div class="message-bubble">${escapeHtml(content)}</div>
  `;
  return msg;
}

function createStreamingMessage(charName) {
  const msg = document.createElement('div');
  msg.className = 'message assistant';

  const initial = charName ? charName.charAt(0).toUpperCase() : '🤖';

  msg.innerHTML = `
    <div class="message-avatar">${initial}</div>
    <div class="message-bubble">
      <div class="typing-indicator">
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
      </div>
    </div>
  `;
  return msg;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML.replace(/\n/g, '<br>');
}
