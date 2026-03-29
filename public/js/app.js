// SPA Router
function requireAuth(hash) {
  // Anasayfa ve admin hariç tüm sayfalar üyelik gerektirir
  if (hash === '#/' || hash === '' || !hash || hash === '#/admin') return true;
  if (!Auth.isLoggedIn()) {
    Auth.showLoginModal();
    return false;
  }
  return true;
}

function navigateTo(hash) {
  const app = document.getElementById('app');
  const links = document.querySelectorAll('.nav-link');

  links.forEach(l => l.classList.remove('active'));

  if (hash.startsWith('#/chat/')) {
    if (!requireAuth(hash)) return;
    const parts = hash.replace('#/chat/', '').split('/');
    const characterId = parts[0];
    const topicId = parts[1] || 'genel';
    renderChat(app, characterId, topicId);
  } else if (hash === '#/admin') {
    links.forEach(l => { if (l.dataset.route === 'admin') l.classList.add('active'); });
    renderAdmin(app);
  } else if (hash === '#/grammar') {
    if (!requireAuth(hash)) return;
    links.forEach(l => { if (l.dataset.route === 'grammar') l.classList.add('active'); });
    renderGrammar(app);
  } else if (hash === '#/reading') {
    if (!requireAuth(hash)) return;
    links.forEach(l => { if (l.dataset.route === 'reading') l.classList.add('active'); });
    renderReading(app);
  } else if (hash === '#/teachers') {
    if (!requireAuth(hash)) return;
    links.forEach(l => { if (l.dataset.route === 'teachers') l.classList.add('active'); });
    renderGallery(app);
  } else if (hash === '#/vocab') {
    if (!requireAuth(hash)) return;
    links.forEach(l => { if (l.dataset.route === 'vocab') l.classList.add('active'); });
    renderVocab(app);
  } else if (hash.startsWith('#/quiz')) {
    if (!requireAuth(hash)) return;
    links.forEach(l => { if (l.dataset.route === 'quiz') l.classList.add('active'); });
    const params = new URLSearchParams(hash.split('?')[1] || '');
    const mode = params.get('mode');
    renderQuiz(app, mode);
  } else if (hash.startsWith('#/forum/thread/')) {
    if (!requireAuth(hash)) return;
    links.forEach(l => { if (l.dataset.route === 'home') l.classList.add('active'); });
    const threadId = hash.replace('#/forum/thread/', '');
    renderForumThread(app, threadId);
  } else if (hash.startsWith('#/forum/')) {
    if (!requireAuth(hash)) return;
    links.forEach(l => { if (l.dataset.route === 'home') l.classList.add('active'); });
    const catId = hash.replace('#/forum/', '');
    renderForumCategory(app, catId);
  } else {
    links.forEach(l => { if (l.dataset.route === 'home') l.classList.add('active'); });
    renderHome(app);
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

document.querySelector('.nav-brand').addEventListener('click', (e) => {
  e.preventDefault();
  location.hash = '#/';
  navigateTo('#/');
});

I18N.init();
Auth.init();
navigateTo(location.hash || '#/');
