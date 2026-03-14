// SPA Router
function navigateTo(hash) {
  const app = document.getElementById('app');
  const links = document.querySelectorAll('.nav-link');

  links.forEach(l => l.classList.remove('active'));

  if (hash.startsWith('#/chat/')) {
    const parts = hash.replace('#/chat/', '').split('/');
    const characterId = parts[0];
    const topicId = parts[1] || 'genel';
    renderChat(app, characterId, topicId);
  } else if (hash === '#/admin') {
    links.forEach(l => { if (l.dataset.route === 'admin') l.classList.add('active'); });
    renderAdmin(app);
  } else {
    links.forEach(l => { if (l.dataset.route === 'gallery') l.classList.add('active'); });
    renderGallery(app);
  }
}

window.addEventListener('hashchange', () => navigateTo(location.hash));

document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = link.getAttribute('href');
    if (location.hash === target) {
      e.preventDefault();
      navigateTo(target);
    }
  });
});

navigateTo(location.hash || '#/');
