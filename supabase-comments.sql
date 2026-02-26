-- ============================================
-- Comments Table for Articles
-- 在 Supabase SQL Editor 中执行
-- ============================================

-- 1. 创建 comments 表
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  article_type TEXT NOT NULL CHECK (article_type IN ('project', 'log')),
  article_id TEXT NOT NULL,
  author_name TEXT NOT NULL DEFAULT '匿名访客',
  content TEXT NOT NULL,
  parent_id TEXT DEFAULT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 启用 RLS
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 3. 公开读取评论
CREATE POLICY "Enable read access for all users" ON comments
  FOR SELECT USING (true);

-- 4. 公开创建评论（无需登录）
CREATE POLICY "Enable insert for all users" ON comments
  FOR INSERT WITH CHECK (true);

-- 5. 仅管理员可删除
CREATE POLICY "Enable delete for authenticated users" ON comments
  FOR DELETE USING (
    EXISTS (SELECT 1 FROM auth.users WHERE id = auth.uid())
  );

-- 6. 创建索引
CREATE INDEX IF NOT EXISTS idx_comments_article ON comments(article_type, article_id);
CREATE INDEX IF NOT EXISTS idx_comments_created_at ON comments(created_at DESC);
