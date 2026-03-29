const express = require('express');
const { supabaseAdmin } = require('../lib/supabase');
const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/auth');

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ error: 'Geçerli bir email adresi giriniz' });
    }
    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'Şifre en az 6 karakter olmalıdır' });
    }
    if (!displayName || !displayName.trim()) {
      return res.status(400).json({ error: 'Görünen isim gereklidir' });
    }

    const { data, error } = await supabaseAdmin.auth.signUp({
      email: email.toLowerCase().trim(),
      password,
      options: {
        data: { displayName: displayName.trim() }
      }
    });

    if (error) {
      if (error.message.includes('already registered')) {
        return res.status(409).json({ error: 'Bu email zaten kayıtlı' });
      }
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true, message: 'Kayıt başarılı. Email doğrulama bağlantısı gönderildi.', email: data.user.email });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email ve şifre gereklidir' });
    }

    const { data, error } = await supabaseAdmin.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password
    });

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        return res.status(403).json({ error: 'Lütfen önce emailinizi doğrulayın', needsVerification: true, email });
      }
      return res.status(401).json({ error: 'Geçersiz email veya şifre' });
    }

    const displayName = data.user.user_metadata?.displayName || 'User';

    res.json({
      success: true,
      token: data.session.access_token,
      refreshToken: data.session.refresh_token,
      user: { id: data.user.id, email: data.user.email, displayName }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// POST /api/auth/refresh
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token gerekli' });
    }

    const { data, error } = await supabaseAdmin.auth.refreshSession({ refresh_token: refreshToken });
    if (error) {
      return res.status(401).json({ error: 'Geçersiz refresh token' });
    }

    res.json({
      token: data.session.access_token,
      refreshToken: data.session.refresh_token
    });
  } catch (err) {
    console.error('Refresh error:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// POST /api/auth/resend
router.post('/resend', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email gereklidir' });
    }

    const { error } = await supabaseAdmin.auth.resend({
      type: 'signup',
      email: email.toLowerCase().trim()
    });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ success: true, message: 'Doğrulama emaili tekrar gönderildi' });
  } catch (err) {
    console.error('Resend error:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// GET /api/auth/me
router.get('/me', userAuth, async (req, res) => {
  const displayName = req.user.user_metadata?.displayName || 'User';
  res.json({
    id: req.user.id,
    email: req.user.email,
    displayName,
    verified: !!req.user.email_confirmed_at
  });
});

// GET /api/auth/users (admin)
router.get('/users', adminAuth, async (req, res) => {
  try {
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers();
    if (error) throw error;

    const userList = users.map(u => ({
      id: u.id,
      email: u.email,
      displayName: u.user_metadata?.displayName || 'User',
      verified: !!u.email_confirmed_at,
      createdAt: u.created_at,
      lastSignIn: u.last_sign_in_at
    }));

    res.json(userList);
  } catch (err) {
    console.error('List users error:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

module.exports = router;
