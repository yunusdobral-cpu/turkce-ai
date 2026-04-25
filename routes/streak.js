const express = require('express');
const { supabaseAdmin } = require('../lib/supabase');
const userAuth = require('../middleware/userAuth');

const router = express.Router();

// GET /api/streak — kullanıcının mevcut serisi
router.get('/', userAuth, async (req, res) => {
  try {
    const { data, error } = await supabaseAdmin
      .from('user_streaks')
      .select('*')
      .eq('user_id', req.user.id)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    res.json(data || { current_streak: 0, longest_streak: 0, total_days: 0 });
  } catch (err) {
    res.status(500).json({ error: 'Seri bilgisi alınamadı' });
  }
});

// POST /api/streak/checkin — günlük giriş
router.post('/checkin', userAuth, async (req, res) => {
  try {
    const today = new Date().toISOString().slice(0, 10);
    const userId = req.user.id;

    const { data: existing } = await supabaseAdmin
      .from('user_streaks')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!existing) {
      const { data } = await supabaseAdmin
        .from('user_streaks')
        .insert({ user_id: userId, current_streak: 1, longest_streak: 1, last_activity_date: today, total_days: 1 })
        .select()
        .single();
      return res.json({ ...data, isNew: true });
    }

    if (existing.last_activity_date === today) {
      return res.json({ ...existing, alreadyCheckedIn: true });
    }

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().slice(0, 10);

    const continued = existing.last_activity_date === yesterdayStr;
    const newStreak = continued ? existing.current_streak + 1 : 1;
    const newLongest = Math.max(newStreak, existing.longest_streak);

    const { data } = await supabaseAdmin
      .from('user_streaks')
      .update({
        current_streak: newStreak,
        longest_streak: newLongest,
        last_activity_date: today,
        total_days: existing.total_days + 1,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();

    res.json({ ...data, streakIncreased: continued, streakReset: !continued });
  } catch (err) {
    res.status(500).json({ error: 'Check-in başarısız' });
  }
});

// POST /api/streak/import — yerel seriyi Supabase'e aktar (giriş sonrası)
router.post('/import', userAuth, async (req, res) => {
  try {
    const { current, longest, total } = req.body;
    const today = new Date().toISOString().slice(0, 10);
    const userId = req.user.id;

    const { data: existing } = await supabaseAdmin
      .from('user_streaks')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (!existing) {
      const { data } = await supabaseAdmin
        .from('user_streaks')
        .insert({
          user_id: userId,
          current_streak: current || 1,
          longest_streak: Math.max(longest || 1, current || 1),
          last_activity_date: today,
          total_days: total || current || 1
        })
        .select()
        .single();
      return res.json({ ...data, imported: true });
    }

    const newCurrent = Math.max(existing.current_streak, current || 1);
    const newLongest = Math.max(existing.longest_streak, longest || 1, newCurrent);
    const newTotal = Math.max(existing.total_days, total || 1);

    const { data } = await supabaseAdmin
      .from('user_streaks')
      .update({
        current_streak: newCurrent,
        longest_streak: newLongest,
        last_activity_date: today,
        total_days: newTotal,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId)
      .select()
      .single();

    res.json({ ...data, imported: true });
  } catch (err) {
    res.status(500).json({ error: 'Import başarısız' });
  }
});

module.exports = router;
