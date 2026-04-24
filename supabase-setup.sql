-- =============================================
-- TürkçeAI Supabase Veritabanı Kurulumu
-- Bu SQL'i Supabase Dashboard > SQL Editor'da çalıştırın
-- =============================================

-- 1. Profiller tablosu (Auth kullanıcılarını genişletir)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL DEFAULT 'User',
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles readable by all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Kayıt olunca otomatik profil oluştur
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'displayName', 'User'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 2. Kullanıcı Serileri (Streak)
CREATE TABLE public.user_streaks (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_streak INT DEFAULT 1,
  longest_streak INT DEFAULT 1,
  last_activity_date DATE DEFAULT CURRENT_DATE,
  total_days INT DEFAULT 1,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Streaks readable by owner" ON public.user_streaks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Streaks insertable by service" ON public.user_streaks FOR INSERT WITH CHECK (true);
CREATE POLICY "Streaks updatable by service" ON public.user_streaks FOR UPDATE USING (true);

-- 3. Forum Kategorileri
CREATE TABLE public.forum_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  icon TEXT DEFAULT '📁',
  "order" INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.forum_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories readable by all" ON public.forum_categories FOR SELECT USING (true);
CREATE POLICY "Categories insertable by service" ON public.forum_categories FOR INSERT WITH CHECK (true);
CREATE POLICY "Categories updatable by service" ON public.forum_categories FOR UPDATE USING (true);
CREATE POLICY "Categories deletable by service" ON public.forum_categories FOR DELETE USING (true);

-- 3. Forum Konuları
CREATE TABLE public.forum_threads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID NOT NULL REFERENCES public.forum_categories(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL DEFAULT 'Anonim',
  title TEXT NOT NULL,
  pinned BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.forum_threads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Threads readable by all" ON public.forum_threads FOR SELECT USING (true);
CREATE POLICY "Threads insertable" ON public.forum_threads FOR INSERT WITH CHECK (true);
CREATE POLICY "Threads updatable" ON public.forum_threads FOR UPDATE USING (true);
CREATE POLICY "Threads deletable" ON public.forum_threads FOR DELETE USING (true);

CREATE INDEX idx_threads_category ON public.forum_threads(category_id);

-- 4. Forum Gönderileri
CREATE TABLE public.forum_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  thread_id UUID NOT NULL REFERENCES public.forum_threads(id) ON DELETE CASCADE,
  author_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name TEXT NOT NULL DEFAULT 'Anonim',
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.forum_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Posts readable by all" ON public.forum_posts FOR SELECT USING (true);
CREATE POLICY "Posts insertable" ON public.forum_posts FOR INSERT WITH CHECK (true);
CREATE POLICY "Posts deletable" ON public.forum_posts FOR DELETE USING (true);

CREATE INDEX idx_posts_thread ON public.forum_posts(thread_id);

-- 5. Varsayılan Kategoriler
INSERT INTO public.forum_categories (name, description, icon, "order") VALUES
  ('Genel Tartışma', 'Türkçe öğrenme ile ilgili her türlü konu', '💬', 0),
  ('Dilbilgisi / Grammar', 'Dilbilgisi soruları ve kurallar', '📐', 1),
  ('Kelime & Deyimler', 'Kelime soruları, deyimler, atasözleri', '📝', 2);
