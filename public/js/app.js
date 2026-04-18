// SPA Router
function requireAuth(hash) {
  // Anasayfa ve admin hariç tüm sayfalar üyelik gerektirir
  if (hash === '#/' || hash === '' || !hash || hash === '#/admin' || hash === '#/privacy' || hash === '#/terms' || hash === '#/contact') return true;
  // Admin girişi yapılmışsa serbest gezinebilir
  if (sessionStorage.getItem('adminPassword')) return true;
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
    links.forEach(l => { if (l.dataset.route === 'grammar') l.classList.add('active'); });
    renderGrammar(app);
  } else if (hash === '#/reading') {
    links.forEach(l => { if (l.dataset.route === 'reading') l.classList.add('active'); });
    renderReading(app);
  } else if (hash === '#/teachers') {
    if (!requireAuth(hash)) return;
    links.forEach(l => { if (l.dataset.route === 'teachers') l.classList.add('active'); });
    renderGallery(app);
  } else if (hash === '#/vocab') {
    links.forEach(l => { if (l.dataset.route === 'vocab') l.classList.add('active'); });
    renderVocab(app);
  } else if (hash === '#/privacy') {
    renderPrivacy(app);
  } else if (hash === '#/terms') {
    renderTerms(app);
  } else if (hash === '#/contact') {
    renderContact(app);
  } else if (hash === '#/millionaire') {
    renderMillionaireMenu(app);
  } else if (hash.startsWith('#/quiz')) {
    links.forEach(l => { if (l.dataset.route === 'quiz') l.classList.add('active'); });
    const params = new URLSearchParams(hash.split('?')[1] || '');
    const mode = params.get('mode');
    renderQuiz(app, mode);
  } else if (hash.startsWith('#/forum/thread/')) {
    links.forEach(l => { if (l.dataset.route === 'home') l.classList.add('active'); });
    const threadId = hash.replace('#/forum/thread/', '');
    renderForumThread(app, threadId);
  } else if (hash.startsWith('#/forum/')) {
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
    // Close mobile menu on navigation
    document.querySelector('.nav-links').classList.remove('open');
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

// Supabase password reset callback: #access_token=...&type=recovery
(function checkPasswordReset() {
  const hash = location.hash;
  if (hash.includes('access_token=') && hash.includes('type=recovery')) {
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get('access_token');
    if (accessToken) {
      location.hash = '#/';
      setTimeout(() => Auth.showResetPasswordModal(accessToken), 500);
      return;
    }
  }
  navigateTo(hash || '#/');
})();
