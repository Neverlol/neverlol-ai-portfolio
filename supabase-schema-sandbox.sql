-- ============================================
-- 添加沙盘配置表 (仅执行这一部分即可)
-- ============================================

-- 11. 创建沙盘配置表 (Sandbox Configs)
CREATE TABLE IF NOT EXISTS sandbox_configs (
  id TEXT PRIMARY KEY,  -- 'campaigns' 或 'capability'
  name TEXT NOT NULL,
  nodes_json JSONB DEFAULT '[]'::jsonb,
  edges_json JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. 启用 RLS
ALTER TABLE sandbox_configs ENABLE ROW LEVEL SECURITY;

-- 13. 创建策略 (使用 OR REPLACE 避免重复创建错误)
DROP POLICY IF EXISTS "Enable read access for all users_sandbox" ON sandbox_configs;
CREATE POLICY "Enable read access for all users_sandbox" ON sandbox_configs
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Enable insert for authenticated users_sandbox" ON sandbox_configs;
CREATE POLICY "Enable insert for authenticated users_sandbox" ON sandbox_configs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Enable update for authenticated users_sandbox" ON sandbox_configs;
CREATE POLICY "Enable update for authenticated users_sandbox" ON sandbox_configs
  FOR UPDATE USING (auth.role() = 'authenticated');

-- 14. 添加自动更新触发器
DROP TRIGGER IF EXISTS update_sandbox_configs_updated_at ON sandbox_configs;
CREATE TRIGGER update_sandbox_configs_updated_at BEFORE UPDATE ON sandbox_configs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
