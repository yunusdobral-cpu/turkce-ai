const express = require('express');
const adminAuth = require('../middleware/auth');
const userAuth = require('../middleware/userAuth');
const { supabaseAdmin } = require('../lib/supabase');

const router = express.Router();

// Get all categories with thread/post counts
router.get('/categories', async (req, res) => {
  try {
    const { data: categories, error } = await supabaseAdmin
      .from('forum_categories')
      .select('*')
      .order('order');

    if (error) throw error;

    const result = [];
    for (const cat of categories) {
      const { count: threadCount } = await supabaseAdmin
        .from('forum_threads')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', cat.id);

      const { data: threads } = await supabaseAdmin
        .from('forum_threads')
        .select('id')
        .eq('category_id', cat.id);

      const threadIds = (threads || []).map(t => t.id);
      let postCount = 0;
      if (threadIds.length > 0) {
        const { count } = await supabaseAdmin
          .from('forum_posts')
          .select('*', { count: 'exact', head: true })
          .in('thread_id', threadIds);
        postCount = count || 0;
      }

      const { data: lastThreadArr } = await supabaseAdmin
        .from('forum_threads')
        .select('id, title, updated_at')
        .eq('category_id', cat.id)
        .order('updated_at', { ascending: false })
        .limit(1);

      const lastThread = lastThreadArr && lastThreadArr[0]
        ? { id: lastThreadArr[0].id, title: lastThreadArr[0].title, updatedAt: lastThreadArr[0].updated_at }
        : null;

      result.push({
        id: cat.id,
        name: cat.name,
        description: cat.description,
        icon: cat.icon,
        order: cat.order,
        createdAt: cat.created_at,
        threadCount: threadCount || 0,
        postCount,
        lastThread
      });
    }

    res.json(result);
  } catch (err) {
    console.error('Get categories error:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Create category (admin)
router.post('/categories', adminAuth, async (req, res) => {
  try {
    const { name, description, icon } = req.body;
    if (!name) return res.status(400).json({ error: 'Kategori adı zorunlu' });

    const { data: allCats } = await supabaseAdmin.from('forum_categories').select('order').order('order', { ascending: false }).limit(1);
    const nextOrder = allCats && allCats[0] ? allCats[0].order + 1 : 0;

    const { data, error } = await supabaseAdmin
      .from('forum_categories')
      .insert({ name, description: description || '', icon: icon || '📁', order: nextOrder })
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ id: data.id, name: data.name, description: data.description, icon: data.icon, order: data.order, createdAt: data.created_at });
  } catch (err) {
    console.error('Create category error:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Update category (admin)
router.put('/categories/:id', adminAuth, async (req, res) => {
  try {
    const { name, description, icon, order } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (description !== undefined) updates.description = description;
    if (icon) updates.icon = icon;
    if (order !== undefined) updates.order = order;

    const { data, error } = await supabaseAdmin
      .from('forum_categories')
      .update(updates)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Kategori bulunamadı' });
    res.json(data);
  } catch (err) {
    console.error('Update category error:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Delete category (admin)
router.delete('/categories/:id', adminAuth, async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('forum_categories')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    console.error('Delete category error:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Get threads in a category
router.get('/categories/:catId/threads', async (req, res) => {
  try {
    const { data: threads, error } = await supabaseAdmin
      .from('forum_threads')
      .select('*')
      .eq('category_id', req.params.catId)
      .order('pinned', { ascending: false })
      .order('updated_at', { ascending: false });

    if (error) throw error;

    const result = [];
    for (const t of (threads || [])) {
      const { count: postCount } = await supabaseAdmin
        .from('forum_posts')
        .select('*', { count: 'exact', head: true })
        .eq('thread_id', t.id);

      const { data: lastPostArr } = await supabaseAdmin
        .from('forum_posts')
        .select('author_name, created_at')
        .eq('thread_id', t.id)
        .order('created_at', { ascending: false })
        .limit(1);

      const lastPost = lastPostArr && lastPostArr[0]
        ? { author: lastPostArr[0].author_name, createdAt: lastPostArr[0].created_at }
        : null;

      result.push({
        id: t.id,
        categoryId: t.category_id,
        author: t.author_name,
        title: t.title,
        pinned: t.pinned,
        createdAt: t.created_at,
        updatedAt: t.updated_at,
        postCount: postCount || 0,
        lastPost
      });
    }

    res.json(result);
  } catch (err) {
    console.error('Get threads error:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Create thread (authenticated)
router.post('/threads', userAuth, async (req, res) => {
  try {
    const { categoryId, title, content } = req.body;
    if (!categoryId || !title || !content) {
      return res.status(400).json({ error: 'Kategori, başlık ve içerik zorunlu' });
    }

    const authorName = req.user.user_metadata?.displayName || 'Anonim';

    const { data: thread, error: tErr } = await supabaseAdmin
      .from('forum_threads')
      .insert({
        category_id: categoryId,
        author_id: req.user.id,
        author_name: authorName,
        title
      })
      .select()
      .single();

    if (tErr) throw tErr;

    const { data: post, error: pErr } = await supabaseAdmin
      .from('forum_posts')
      .insert({
        thread_id: thread.id,
        author_id: req.user.id,
        author_name: authorName,
        content
      })
      .select()
      .single();

    if (pErr) throw pErr;

    res.status(201).json({
      thread: { id: thread.id, categoryId: thread.category_id, author: thread.author_name, title: thread.title, pinned: thread.pinned, createdAt: thread.created_at, updatedAt: thread.updated_at },
      post: { id: post.id, threadId: post.thread_id, author: post.author_name, content: post.content, createdAt: post.created_at }
    });
  } catch (err) {
    console.error('Create thread error:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Get thread with posts
router.get('/threads/:id', async (req, res) => {
  try {
    const { data: thread, error: tErr } = await supabaseAdmin
      .from('forum_threads')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (tErr || !thread) return res.status(404).json({ error: 'Konu bulunamadı' });

    const { data: category } = await supabaseAdmin
      .from('forum_categories')
      .select('*')
      .eq('id', thread.category_id)
      .single();

    const { data: posts } = await supabaseAdmin
      .from('forum_posts')
      .select('*')
      .eq('thread_id', thread.id)
      .order('created_at');

    res.json({
      thread: { id: thread.id, categoryId: thread.category_id, author: thread.author_name, title: thread.title, pinned: thread.pinned, createdAt: thread.created_at, updatedAt: thread.updated_at },
      category: category ? { id: category.id, name: category.name, icon: category.icon } : null,
      posts: (posts || []).map(p => ({ id: p.id, threadId: p.thread_id, author: p.author_name, content: p.content, createdAt: p.created_at }))
    });
  } catch (err) {
    console.error('Get thread error:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Add post to thread (authenticated)
router.post('/threads/:id/posts', userAuth, async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ error: 'İçerik zorunlu' });

    const authorName = req.user.user_metadata?.displayName || 'Anonim';

    const { data: post, error: pErr } = await supabaseAdmin
      .from('forum_posts')
      .insert({
        thread_id: req.params.id,
        author_id: req.user.id,
        author_name: authorName,
        content
      })
      .select()
      .single();

    if (pErr) throw pErr;

    // Update thread's updated_at
    await supabaseAdmin
      .from('forum_threads')
      .update({ updated_at: new Date().toISOString() })
      .eq('id', req.params.id);

    res.status(201).json({ id: post.id, threadId: post.thread_id, author: post.author_name, content: post.content, createdAt: post.created_at });
  } catch (err) {
    console.error('Create post error:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Toggle pin thread (admin)
router.patch('/threads/:id/pin', adminAuth, async (req, res) => {
  try {
    const { data: thread } = await supabaseAdmin
      .from('forum_threads')
      .select('pinned')
      .eq('id', req.params.id)
      .single();

    if (!thread) return res.status(404).json({ error: 'Konu bulunamadı' });

    const { data, error } = await supabaseAdmin
      .from('forum_threads')
      .update({ pinned: !thread.pinned })
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json({ id: data.id, pinned: data.pinned });
  } catch (err) {
    console.error('Pin thread error:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Delete post (admin)
router.delete('/posts/:id', adminAuth, async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('forum_posts')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    console.error('Delete post error:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Delete thread (admin)
router.delete('/threads/:id', adminAuth, async (req, res) => {
  try {
    const { error } = await supabaseAdmin
      .from('forum_threads')
      .delete()
      .eq('id', req.params.id);

    if (error) throw error;
    res.json({ success: true });
  } catch (err) {
    console.error('Delete thread error:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

// Forum stats (admin)
router.get('/stats', adminAuth, async (req, res) => {
  try {
    const { count: categoryCount } = await supabaseAdmin.from('forum_categories').select('*', { count: 'exact', head: true });
    const { count: threadCount } = await supabaseAdmin.from('forum_threads').select('*', { count: 'exact', head: true });
    const { count: postCount } = await supabaseAdmin.from('forum_posts').select('*', { count: 'exact', head: true });

    res.json({ categoryCount, threadCount, postCount, authorCount: 0 });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

module.exports = router;
