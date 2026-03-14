function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Yetkilendirme gerekli' });
  }
  const token = authHeader.slice(7);
  if (token !== process.env.ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'Geçersiz şifre' });
  }
  next();
}

module.exports = adminAuth;
