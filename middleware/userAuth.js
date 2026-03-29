const { supabaseAdmin } = require('../lib/supabase');

async function userAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Giriş gerekli' });
  }
  const token = authHeader.slice(7);
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
  if (error || !user) {
    return res.status(401).json({ error: 'Geçersiz veya süresi dolmuş token' });
  }
  req.user = user;
  req.accessToken = token;
  next();
}

module.exports = userAuth;
