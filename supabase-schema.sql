-- ============================================
-- Supabase Database Schema for AI Portfolio
-- 执行方法：在 Supabase 控制台 > SQL Editor 中粘贴执行
-- ============================================

-- 1. 创建 projects 表 (AI 重构案例)
CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  title TEXT NOT NULL,
  subtitle TEXT DEFAULT '',
  tags TEXT[] DEFAULT '{}',
  metrics TEXT DEFAULT '',
  icon TEXT DEFAULT 'Zap',
  col_span TEXT DEFAULT 'col-span-1 lg:col-span-2',
  sections JSONB DEFAULT '{"problem": {"title": "业务痛点", "content": ""}, "traditional": {"title": "传统方案", "content": ""}, "ai": {"title": "AI 重构", "content": ""}, "impact": {"title": "商业价值", "content": ""}}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. 创建 evolution_logs 表 (进化日志)
CREATE TABLE IF NOT EXISTS evolution_logs (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  date DATE NOT NULL,
  title TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  type TEXT NOT NULL CHECK (type IN ('milestone', 'insight', 'achievement', 'learn', 'project')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 启用 RLS (Row Level Security)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE evolution_logs ENABLE ROW LEVEL SECURITY;

-- 4. 创建策略：公开读取（网站前端需要读取）
CREATE POLICY "Enable read access for all users" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON evolution_logs
  FOR SELECT USING (true);

-- 5. 创建策略：仅管理员可写入（需要认证）
CREATE POLICY "Enable insert for authenticated users" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable insert for authenticated users" ON evolution_logs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON evolution_logs
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON evolution_logs
  FOR DELETE USING (auth.role() = 'authenticated');

-- 6. 插入默认数据 (Projects)
INSERT INTO projects (id, title, subtitle, tags, metrics, icon, col_span, sections) VALUES
('dynamic-rfm', 'Dynamic RFM 2.0 Agent', '从 RFM 到动态意向识别', ARRAY['RFM', 'Real-time', 'Claude API'], 'T+0 分层 | 识别速度 ↑30x', 'Zap', 'col-span-1 lg:col-span-2',
 '{"problem": {"title": "业务痛点", "content": "传统 RFM 模型是静态的，每月跑一次表，无法实时捕捉「重要挽留客户」或「重要价值客户」的瞬时行为变化。"}, "traditional": {"title": "传统方案", "content": "每月利用 Excel 对充值近度、频次、值进行分层，制定固定的维护策略。"}, "ai": {"title": "AI 重构", "content": "升级为 Dynamic Intent Tracker。Agent 实时感知客户余额消耗速度与登录频次，当「重要保持客户」出现异常停耗时，自动触发 Agent 生成个性化分析报告并推送给销售跟进。"}, "impact": {"title": "商业价值", "content": "实现「T+0」的分层自动更新，流失风险客户的识别速度提升 30 倍以上。"}}'::jsonb),
('rag-copilot', 'Industrial Coaching Copilot', '行业专家 RAG 知识库与话术', ARRAY['RAG', 'Vector DB', 'LangChain'], '知识沉淀: 月级 → 天级', 'BookOpen', 'col-span-1',
 '{"problem": {"title": "业务痛点", "content": "销售在开发新行业（如家装、建材）时，缺乏专业领域知识，培训端产出行业手册周期长，经验萃取慢。"}, "traditional": {"title": "传统方案", "content": "培训部进行经验萃取调研，历经数周产出思维导图和课程，再进行内部试讲。"}, "ai": {"title": "AI 重构", "content": "构建基于 RAG 的行业百科。利用 Agent 自动抓取 Top 销售的成功案例和通话文本，自动生成各行业 FAQ 和异议处理话术，销售可在通话前实时检索。"}, "impact": {"title": "商业价值", "content": "知识沉淀周期从「月级」降为「天级」，缩短新员工的「开单周期」。"}}'::jsonb),
('bi-diagnoser', 'Agentic BI Diagnoser', '全天候业务波动归因诊断', ARRAY['BI', 'Real-time', 'Automation'], 'T+1 → 实时', 'Activity', 'col-span-1',
 '{"problem": {"title": "业务痛点", "content": "运营经理每周/月需花费大量时间对业绩波动进行原因挖掘（如 ARPU 波动、破零率低），报告多为「事后总结」。"}, "traditional": {"title": "传统方案", "content": "基于运营工作流，通过 Dashboard 手动通过不同切面（部门、城市、行业）进行层层分析并提出改进建议。"}, "ai": {"title": "AI 重构", "content": "打造 Autonomous BI Assistant。Agent 实时监听核心经营指标，当出现环比偏差时，自动执行多维下钻分析，直接输出包含原因归因与改进动作建议的文字报告。"}, "impact": {"title": "商业价值", "content": "从「T+1 做报表出报告」进化为「实时输出策略」。"}}'::jsonb),
('coaching-agent', 'Personalized Coaching Agent', '员工全生命周期自适应 AI 教练', ARRAY['Personalization', 'CRM', 'Coaching'], '督办 → 赋能', 'GraduationCap', 'col-span-1 lg:col-span-3',
 '{"problem": {"title": "业务痛点", "content": "不同司龄和职级的销售在商机开发上的盲点不同，传统的「大班课」培训针对性弱，主管难以做到一对一精准指导。"}, "traditional": {"title": "传统方案", "content": "运营部预警转化异常，主管针对个人进行问题挖掘和奖惩。"}, "ai": {"title": "AI 重构", "content": "开发 AI Mentor Agent。Agent 为每位销售建立「能力画像」，通过分析其个人在商机流转 5 个阶段的转化率表现，自动识别其「短板阶段」，并精准推送该环节的优秀案例和模拟演练。"}, "impact": {"title": "商业价值", "content": "将主管的「督办型管理」转化为「赋能型管理」，预计大幅提升人效。"}}'::jsonb),
('sales-broadcaster', 'Sales Activity Auto-Broadcaster', '电销团队实时销售动作数字看板自动化', ARRAY['Automation', 'Python', 'Webhook'], '1小时 → 15分钟', 'Radio', 'col-span-1 lg:col-span-2',
 '{"problem": {"title": "业务痛点", "content": "城市运营经理每小时需手动执行「导出-清洗-汇总-发布」，这种高频次、碎片化的任务导致管理带宽被严重占用，且数据更新存在 1 小时的滞后，无法实现真正的实时督办。"}, "traditional": {"title": "传统方案", "content": "依靠人工在各个系统间切屏操作，运营人员每隔一小时手动从呼叫中心后台导出 CSV，在 Excel 中按团队/个人维度透视后，再将文字或截图发至微信群公示。"}, "ai": {"title": "AI 重构", "content": "利用 Vibe Coding (Python + Playwright/API) 编写 Data-Bridge Agent。该脚本每 15 分钟自动登录外呼系统获取增量数据，由 AI 自动生成包含「今日标兵」与「落后提醒」的排版文案，并通过 Webhook 自动推送到企微/微信群。"}, "impact": {"title": "商业价值", "content": "消除 100% 的人工重复劳动，将管理响应周期从 1 小时缩短至 15 分钟以内，让运营经理从「报表搬运工」转型为能根据实时波动进行瞬间干预的「业务指挥官」。"}}'::jsonb);

-- 7. 插入默认数据 (Evolution Logs)
INSERT INTO evolution_logs (date, title, tags, type) VALUES
('2025-11-29', '重构 RFM 逻辑为多智能体协作', ARRAY['AI', 'RFM'], 'milestone'),
('2025-11-25', '跑量累计突破 5000 公里，思考如何将耐力转化为代码质量', ARRAY['Life', '思考'], 'insight'),
('2025-11-20', '在 YouTube 发布了第一期 Vibe Coding 实战', ARRAY['YouTube', '分享'], 'achievement'),
('2025-11-15', '完成 LangGraph 核心路由学习', ARRAY['AI', '学习'], 'learn'),
('2025-11-10', '搭建个人 AI 知识库 RAG 原型', ARRAY['RAG', '原型'], 'project'),
('2025-11-05', '开始 Build in Public 之旅', ARRAY['里程碑'], 'milestone');

-- 8. 创建自动更新 updated_at 的触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- 9. 为两个表添加自动更新触发器
DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_evolution_logs_updated_at ON evolution_logs;
CREATE TRIGGER update_evolution_logs_updated_at BEFORE UPDATE ON evolution_logs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 10. 创建索引以提升查询性能
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_evolution_logs_date ON evolution_logs(date DESC);
