function openModal(title, contentHtml, onClose) {
  closeModal();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.innerHTML = `<div class="modal"><h2>${title}</h2>${contentHtml}</div>`;
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeModal();
      if (onClose) onClose();
    }
  });
  document.body.appendChild(overlay);
  const firstInput = overlay.querySelector('input, textarea, select');
  if (firstInput) firstInput.focus();
  return overlay;
}

function closeModal() {
  const existing = document.querySelector('.modal-overlay');
  if (existing) existing.remove();
}
