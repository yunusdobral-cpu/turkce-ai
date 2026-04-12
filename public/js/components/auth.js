// Auth Component - Kayit, Giris, Email Dogrulama
const Auth = {
  _token: localStorage.getItem('turkceai_token') || null,
  _user: JSON.parse(localStorage.getItem('turkceai_user') || 'null'),

  isLoggedIn() {
    return !!(this._token && this._user);
  },

  getToken() {
    return this._token;
  },

  getUser() {
    return this._user;
  },

  _save(token, user, refreshToken) {
    this._token = token;
    this._user = user;
    localStorage.setItem('turkceai_token', token);
    localStorage.setItem('turkceai_user', JSON.stringify(user));
    if (refreshToken) localStorage.setItem('turkceai_refresh', refreshToken);
  },

  _clear() {
    this._token = null;
    this._user = null;
    localStorage.removeItem('turkceai_token');
    localStorage.removeItem('turkceai_user');
    localStorage.removeItem('turkceai_refresh');
  },

  async init() {
    if (this._token) {
      try {
        const data = await API.getMe(this._token);
        if (data.error) {
          this._clear();
        } else {
          this._user = data;
          localStorage.setItem('turkceai_user', JSON.stringify(data));
        }
      } catch (e) {
        this._clear();
      }
    }
    this.updateNavbar();
  },

  updateNavbar() {
    const container = document.getElementById('navAuth');
    if (!container) return;

    if (this.isLoggedIn()) {
      const hello = I18N.bi('Merhaba', 'auth_hello');
      const logoutText = I18N.bi('Çıkış', 'auth_logout');
      container.innerHTML = `
        <span class="nav-user-info">${hello}, <strong>${this._user.displayName}</strong></span>
        <button class="nav-auth-btn nav-auth-logout" id="btnLogout">${logoutText}</button>
      `;
      document.getElementById('btnLogout').addEventListener('click', () => this.logout());
    } else {
      const loginText = I18N.bi('Giriş Yap', 'auth_login');
      const registerText = I18N.bi('Kayıt Ol', 'auth_register');
      container.innerHTML = `
        <button class="nav-auth-btn" id="btnLogin">${loginText}</button>
        <button class="nav-auth-btn nav-auth-register" id="btnRegister">${registerText}</button>
      `;
      document.getElementById('btnLogin').addEventListener('click', () => this.showLoginModal());
      document.getElementById('btnRegister').addEventListener('click', () => this.showRegisterModal());
    }
  },

  showLoginModal() {
    const emailLabel = I18N.bi('Email', 'auth_email');
    const passwordLabel = I18N.bi('Şifre', 'auth_password');
    const loginBtn = I18N.bi('Giriş Yap', 'auth_login');
    const cancelBtn = I18N.bi('İptal', 'auth_cancel');
    const noAccount = I18N.bi('Hesabınız yok mu?', 'auth_no_account');
    const registerLink = I18N.bi('Kayıt Ol', 'auth_register');

    openModal(I18N.bi('Giriş Yap', 'auth_login'), `
      <form id="loginForm" class="auth-form">
        <div class="form-group">
          <label>${emailLabel}</label>
          <input type="email" name="email" required placeholder="ornek@email.com">
        </div>
        <div class="form-group">
          <label>${passwordLabel}</label>
          <input type="password" name="password" required minlength="6">
        </div>
        <div class="auth-forgot-link">
          <a href="#" class="auth-switch-link" id="switchToForgot">${I18N.bi('Şifremi Unuttum', 'auth_forgot_password')}</a>
        </div>
        <div id="loginError" class="auth-error" style="display:none;"></div>
        <div class="form-actions">
          <button type="button" class="btn btn-outline" onclick="closeModal()">${cancelBtn}</button>
          <button type="submit" class="btn btn-primary">${loginBtn}</button>
        </div>
        <div class="auth-divider">
          <span>${noAccount} <a href="#" class="auth-switch-link" id="switchToRegister">${registerLink}</a></span>
        </div>
      </form>
    `);

    document.getElementById('switchToForgot').addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
      this.showForgotPasswordModal();
    });

    document.getElementById('switchToRegister').addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
      this.showRegisterModal();
    });

    document.getElementById('loginForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value.trim();
      const password = form.password.value;
      const errDiv = document.getElementById('loginError');
      const submitBtn = form.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.textContent = '...';
      errDiv.style.display = 'none';

      try {
        const data = await API.login(email, password);
        if (data.error) {
          errDiv.textContent = data.error;
          errDiv.style.display = 'block';
          if (data.needsVerification) {
            setTimeout(() => {
              closeModal();
              this.showVerifyModal(data.email);
            }, 1500);
          }
        } else {
          this._save(data.token, data.user, data.refreshToken);
          closeModal();
          this.updateNavbar();
          showToast('Giriş başarılı! / Login successful!', 'success');
        }
      } catch (err) {
        errDiv.textContent = 'Bağlantı hatası / Connection error';
        errDiv.style.display = 'block';
      }
      submitBtn.disabled = false;
      submitBtn.textContent = I18N.bi('Giriş Yap', 'auth_login');
    });
  },

  showRegisterModal() {
    const nameLabel = I18N.bi('Görünen İsim', 'auth_display_name');
    const emailLabel = I18N.bi('Email', 'auth_email');
    const passwordLabel = I18N.bi('Şifre', 'auth_password');
    const passwordHint = I18N.bi('En az 6 karakter', 'auth_password_min');
    const registerBtn = I18N.bi('Kayıt Ol', 'auth_register');
    const cancelBtn = I18N.bi('İptal', 'auth_cancel');
    const hasAccount = I18N.bi('Zaten hesabınız var mı?', 'auth_has_account');
    const loginLink = I18N.bi('Giriş Yap', 'auth_login');

    openModal(I18N.bi('Kayıt Ol', 'auth_register'), `
      <form id="registerForm" class="auth-form">
        <div class="form-group">
          <label>${nameLabel}</label>
          <input type="text" name="displayName" required placeholder="Adınız">
        </div>
        <div class="form-group">
          <label>${emailLabel}</label>
          <input type="email" name="email" required placeholder="ornek@email.com">
        </div>
        <div class="form-group">
          <label>${passwordLabel}</label>
          <input type="password" name="password" required minlength="6" placeholder="******">
          <div class="help-text">${passwordHint}</div>
        </div>
        <div id="registerError" class="auth-error" style="display:none;"></div>
        <div class="form-actions">
          <button type="button" class="btn btn-outline" onclick="closeModal()">${cancelBtn}</button>
          <button type="submit" class="btn btn-primary">${registerBtn}</button>
        </div>
        <div class="auth-divider">
          <span>${hasAccount} <a href="#" class="auth-switch-link" id="switchToLogin">${loginLink}</a></span>
        </div>
      </form>
    `);

    document.getElementById('switchToLogin').addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
      this.showLoginModal();
    });

    document.getElementById('registerForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const displayName = form.displayName.value.trim();
      const email = form.email.value.trim();
      const password = form.password.value;
      const errDiv = document.getElementById('registerError');
      const submitBtn = form.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.textContent = '...';
      errDiv.style.display = 'none';

      try {
        const data = await API.register(email, password, displayName);
        if (data.error) {
          errDiv.textContent = data.error;
          errDiv.style.display = 'block';
        } else {
          closeModal();
          this.showEmailSentModal(data.email);
        }
      } catch (err) {
        errDiv.textContent = 'Bağlantı hatası / Connection error';
        errDiv.style.display = 'block';
      }
      submitBtn.disabled = false;
      submitBtn.textContent = I18N.bi('Kayıt Ol', 'auth_register');
    });
  },

  showEmailSentModal(email) {
    const title = I18N.bi('Email Doğrulama', 'auth_verify_title');
    const loginBtn = I18N.bi('Giriş Yap', 'auth_login');
    const resendBtn = I18N.bi('Tekrar Gönder', 'auth_resend');

    openModal(title, `
      <div class="auth-form">
        <p class="auth-verify-desc">Doğrulama bağlantısı gönderildi.<br>Lütfen emailinizi kontrol edin.</p>
        <p class="auth-verify-email"><strong>${email}</strong></p>
        <p class="auth-verify-desc" style="font-size:13px;color:#78716c;">Email'deki bağlantıya tıkladıktan sonra giriş yapabilirsiniz.</p>
        <div class="form-actions">
          <button type="button" class="btn btn-outline" id="btnResendEmail">${resendBtn}</button>
          <button type="button" class="btn btn-primary" id="btnGoLogin">${loginBtn}</button>
        </div>
      </div>
    `);

    document.getElementById('btnGoLogin').addEventListener('click', () => {
      closeModal();
      this.showLoginModal();
    });

    document.getElementById('btnResendEmail').addEventListener('click', async () => {
      const btn = document.getElementById('btnResendEmail');
      btn.disabled = true;
      btn.textContent = '...';
      try {
        const data = await API.resendCode(email);
        if (data.error) {
          showToast(data.error, 'error');
        } else {
          showToast('Email tekrar gönderildi! / Email resent!', 'success');
        }
      } catch (err) {
        showToast('Bağlantı hatası', 'error');
      }
      btn.disabled = false;
      btn.textContent = I18N.bi('Tekrar Gönder', 'auth_resend');
    });
  },

  showForgotPasswordModal() {
    const emailLabel = I18N.bi('Email', 'auth_email');
    const sendBtn = I18N.bi('Gönder', 'auth_send');
    const cancelBtn = I18N.bi('İptal', 'auth_cancel');
    const backToLogin = I18N.bi('Giriş Yap', 'auth_login');

    openModal(I18N.bi('Şifremi Unuttum', 'auth_forgot_password'), `
      <form id="forgotForm" class="auth-form">
        <p class="auth-verify-desc">${I18N.bi('Email adresinizi girin, şifre sıfırlama bağlantısı göndereceğiz.', 'auth_forgot_desc')}</p>
        <div class="form-group">
          <label>${emailLabel}</label>
          <input type="email" name="email" required placeholder="ornek@email.com">
        </div>
        <div id="forgotError" class="auth-error" style="display:none;"></div>
        <div id="forgotSuccess" class="auth-success" style="display:none;"></div>
        <div class="form-actions">
          <button type="button" class="btn btn-outline" onclick="closeModal()">${cancelBtn}</button>
          <button type="submit" class="btn btn-primary">${sendBtn}</button>
        </div>
        <div class="auth-divider">
          <span><a href="#" class="auth-switch-link" id="switchBackToLogin">${backToLogin}</a></span>
        </div>
      </form>
    `);

    document.getElementById('switchBackToLogin').addEventListener('click', (e) => {
      e.preventDefault();
      closeModal();
      this.showLoginModal();
    });

    document.getElementById('forgotForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const email = form.email.value.trim();
      const errDiv = document.getElementById('forgotError');
      const successDiv = document.getElementById('forgotSuccess');
      const submitBtn = form.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.textContent = '...';
      errDiv.style.display = 'none';
      successDiv.style.display = 'none';

      try {
        const data = await API.forgotPassword(email);
        if (data.error) {
          errDiv.textContent = data.error;
          errDiv.style.display = 'block';
        } else {
          successDiv.textContent = I18N.bi(
            'Şifre sıfırlama bağlantısı gönderildi. Lütfen emailinizi kontrol edin.',
            'auth_forgot_success'
          );
          successDiv.style.display = 'block';
          form.email.disabled = true;
          submitBtn.style.display = 'none';
        }
      } catch (err) {
        errDiv.textContent = 'Bağlantı hatası / Connection error';
        errDiv.style.display = 'block';
      }
      submitBtn.disabled = false;
      submitBtn.textContent = I18N.bi('Gönder', 'auth_send');
    });
  },

  showResetPasswordModal(accessToken) {
    const newPassLabel = I18N.bi('Yeni Şifre', 'auth_new_password');
    const confirmLabel = I18N.bi('Şifre Tekrar', 'auth_confirm_password');
    const resetBtn = I18N.bi('Şifreyi Güncelle', 'auth_reset_btn');
    const passwordHint = I18N.bi('En az 6 karakter', 'auth_password_min');

    openModal(I18N.bi('Yeni Şifre Belirle', 'auth_reset_title'), `
      <form id="resetForm" class="auth-form">
        <div class="form-group">
          <label>${newPassLabel}</label>
          <input type="password" name="newPassword" required minlength="6" placeholder="******">
          <div class="help-text">${passwordHint}</div>
        </div>
        <div class="form-group">
          <label>${confirmLabel}</label>
          <input type="password" name="confirmPassword" required minlength="6" placeholder="******">
        </div>
        <div id="resetError" class="auth-error" style="display:none;"></div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary btn-block">${resetBtn}</button>
        </div>
      </form>
    `);

    document.getElementById('resetForm').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const newPassword = form.newPassword.value;
      const confirmPassword = form.confirmPassword.value;
      const errDiv = document.getElementById('resetError');
      const submitBtn = form.querySelector('button[type="submit"]');

      errDiv.style.display = 'none';

      if (newPassword !== confirmPassword) {
        errDiv.textContent = I18N.bi('Şifreler eşleşmiyor', 'auth_password_mismatch');
        errDiv.style.display = 'block';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = '...';

      try {
        const data = await API.updatePassword(accessToken, newPassword);
        if (data.error) {
          errDiv.textContent = data.error;
          errDiv.style.display = 'block';
        } else {
          closeModal();
          showToast(I18N.bi('Şifre güncellendi! Giriş yapabilirsiniz.', 'auth_reset_success'), 'success');
          this.showLoginModal();
        }
      } catch (err) {
        errDiv.textContent = 'Bağlantı hatası / Connection error';
        errDiv.style.display = 'block';
      }
      submitBtn.disabled = false;
      submitBtn.textContent = I18N.bi('Şifreyi Güncelle', 'auth_reset_btn');
    });
  },

  logout() {
    this._clear();
    this.updateNavbar();
    showToast('Çıkış yapıldı / Logged out', 'success');
  }
};
