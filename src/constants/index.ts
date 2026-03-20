// Simple local storage key for cases
export const STORAGE_KEY = "ai-portfolio-cases";

// Default cases (can be overwritten by admin)
export const DEFAULT_CASES = [
  {
    id: "dynamic-rfm",
    title: "Dynamic RFM 2.0 Agent",
    subtitle: "从 RFM 到动态意向识别",
    tags: ["RFM", "Real-time", "Claude API"],
    metrics: "T+0 分层 | 识别速度 ↑30x",
    icon: "Zap",
    colSpan: "col-span-1 lg:col-span-2",
    sections: {
      problem: { title: "业务痛点", content: "传统 RFM 模型是静态的，每月跑一次表，无法实时捕捉「重要挽留客户」或「重要价值客户」的瞬时行为变化。" },
      traditional: { title: "传统方案", content: "每月利用 Excel 对充值近度、频次、值进行分层，制定固定的维护策略。" },
      ai: { title: "AI 重构", content: "升级为 Dynamic Intent Tracker。Agent 实时感知客户余额消耗速度与登录频次，当「重要保持客户」出现异常停耗时，自动触发 Agent 生成个性化分析报告并推送给销售跟进。" },
      impact: { title: "商业价值", content: "实现「T+0」的分层自动更新，流失风险客户的识别速度提升 30 倍以上。" }
    }
  },
  {
    id: "rag-copilot",
    title: "Industrial Coaching Copilot",
    subtitle: "行业专家 RAG 知识库与话术",
    tags: ["RAG", "Vector DB", "LangChain"],
    metrics: "知识沉淀: 月级 → 天级",
    icon: "BookOpen",
    colSpan: "col-span-1",
    sections: {
      problem: { title: "业务痛点", content: "销售在开发新行业（如家装、建材）时，缺乏专业领域知识，培训端产出行业手册周期长，经验萃取慢。" },
      traditional: { title: "传统方案", content: "培训部进行经验萃取调研，历经数周产出思维导图和课程，再进行内部试讲。" },
      ai: { title: "AI 重构", content: "构建基于 RAG 的行业百科。利用 Agent 自动抓取 Top 销售的成功案例和通话文本，自动生成各行业 FAQ 和异议处理话术，销售可在通话前实时检索。" },
      impact: { title: "商业价值", content: "知识沉淀周期从「月级」降为「天级」，缩短新员工的「开单周期」。" }
    }
  },
  {
    id: "bi-diagnoser",
    title: "Agentic BI Diagnoser",
    subtitle: "全天候业务波动归因诊断",
    tags: ["BI", "Real-time", "Automation"],
    metrics: "T+1 → 实时",
    icon: "Activity",
    colSpan: "col-span-1",
    sections: {
      problem: { title: "业务痛点", content: "运营经理每周/月需花费大量时间对业绩波动进行原因挖掘（如 ARPU 波动、破零率低），报告多为「事后总结」。" },
      traditional: { title: "传统方案", content: "基于运营工作流，通过 Dashboard 手动通过不同切面（部门、城市、行业）进行层层分析并提出改进建议。" },
      ai: { title: "AI 重构", content: "打造 Autonomous BI Assistant。Agent 实时监听核心经营指标，当出现环比偏差时，自动执行多维下钻分析，直接输出包含原因归因与改进动作建议的文字报告。" },
      impact: { title: "商业价值", content: "从「T+1 做报表出报告」进化为「实时输出策略」。" }
    }
  },
  {
    id: "coaching-agent",
    title: "Personalized Coaching Agent",
    subtitle: "员工全生命周期自适应 AI 教练",
    tags: ["Personalization", "CRM", "Coaching"],
    metrics: "督办 → 赋能",
    icon: "GraduationCap",
    colSpan: "col-span-1 lg:col-span-3",
    sections: {
      problem: { title: "业务痛点", content: "不同司龄和职级的销售在商机开发上的盲点不同，传统的「大班课」培训针对性弱，主管难以做到一对一精准指导。" },
      traditional: { title: "传统方案", content: "运营部预警转化异常，主管针对个人进行问题挖掘和奖惩。" },
      ai: { title: "AI 重构", content: "开发 AI Mentor Agent。Agent 为每位销售建立「能力画像」，通过分析其个人在商机流转 5 个阶段的转化率表现，自动识别其「短板阶段」，并精准推送该环节的优秀案例和模拟演练。" },
      impact: { title: "商业价值", content: "将主管的「督办型管理」转化为「赋能型管理」，预计大幅提升人效。" }
    }
  },
  {
    id: "sales-broadcaster",
    title: "Sales Activity Auto-Broadcaster",
    subtitle: "电销团队实时销售动作数字看板自动化",
    tags: ["Automation", "Python", "Webhook"],
    metrics: "1小时 → 15分钟",
    icon: "Radio",
    colSpan: "col-span-1 lg:col-span-2",
    sections: {
      problem: { title: "业务痛点", content: "城市运营经理每小时需手动执行「导出-清洗-汇总-发布」，这种高频次、碎片化的任务导致管理带宽被严重占用，且数据更新存在 1 小时的滞后，无法实现真正的实时督办。" },
      traditional: { title: "传统方案", content: "依靠人工在各个系统间切屏操作，运营人员每隔一小时手动从呼叫中心后台导出 CSV，在 Excel 中按团队/个人维度透视后，再将文字或截图发至微信群公示。" },
      ai: { title: "AI 重构", content: "利用 Vibe Coding (Python + Playwright/API) 编写 Data-Bridge Agent。该脚本每 15 分钟自动登录外呼系统获取增量数据，由 AI 自动生成包含「今日标兵」与「落后提醒」的排版文案，并通过 Webhook 自动推送到企微/微信群。" },
      impact: { title: "商业价值", content: "消除 100% 的人工重复劳动，将管理响应周期从 1 小时缩短至 15 分钟以内，让运营经理从「报表搬运工」转型为能根据实时波动进行瞬间干预的「业务指挥官」。" }
    }
  },
];

export const HERO_CONTENT = {
  headline: "Neverlol | 懂业务的 Vibe Coder",
  subheadline: "大厂运营经验 × 数学专业思维 × Build in Public，一起探索用 AI 解决生活 & 工作中的痛点。",
  ctaPrimary: "观看 AI 续费 Agent 演示",
  ctaSecondary: "阅读我的 AI 重构实验",
};

export const HAND_DRAWN_ANNOTATIONS = [
  { id: "ltv-calculation", text: "这里注入了实战阈值", x: "left-[60%]", y: "top-[50%]" },
  { id: "region-config", text: "高级运营的策略输出", x: "left-[20%]", y: "top-[70%]" },
];

export const AGENT_THOUGHTS = [
  { step: "Monitor", content: "检测到 T+10 个月关键节点，商户 ID: SH-201605 余额预警", color: "text-blue-400" },
  { step: "Analyze", content: "检索该商户历史登录频次下降 30%，判定为「高风险流失」", color: "text-yellow-400" },
  { step: "Knowledge Retrieval", content: "调用行业 RAG 库：大连地区保洁行业 3 月处于淡季，需政策刺激", color: "text-purple-400" },
  { step: "Action", content: "自动生成《个性化续费激励方案》及销售话术", color: "text-green-400" },
];

export const DEMO_SCENARIO = {
  merchant: "沈阳XX搬家公司",
  merchantId: "SY-20210823",
  issues: [
    { icon: "AlertCircle", text: "账户余额 ¥198 < ¥200 预警线", color: "text-red-400" },
    { icon: "TrendingDown", text: "近 3 天点击率下降 15%", color: "text-yellow-400" },
    { icon: "Clock", text: "距续费到期还有 12 天", color: "text-orange-400" },
  ],
};

export const DEMO_NODES = [
  { id: "start", label: "检测异常" },
  { id: "scan", label: "数据扫描" },
  { id: "classify", label: "风险分类" },
  { id: "retrieve", label: "知识检索" },
  { id: "generate", label: "策略生成" },
  { id: "action", label: "执行动作" },
];

export const DEMO_CODE_SNIPPET = `
// LangGraph Agent 核心路由逻辑
def should_retain(state: AgentState) -> str:
    risk_score = calculate_risk_score(state)
    if risk_score >= 80:
        return "high_priority"
    elif risk_score >= 50:
        return "medium_priority"
    return "low_priority"

HIGH_RISK_THRESHOLD = {
    "balance": 200,
    "ctr_drop": 15,
    "days_to_expire": 14,
}`;

export const DEMO_STEPS = [
  { id: "idle", label: "等待触发", icon: "Play", message: "点击「开始诊断」触发智能体" },
  { id: "scan", label: "数据扫描", icon: "Scan", message: "正在获取商户 SY-20210823 实时数据...", delay: 1200 },
  { id: "classify", label: "风险分类", icon: "Tag", message: "AI 判定：重要挽留 (P1) | 东北大区 | 搬家行业", delay: 1500 },
  { id: "retrieve", label: "知识检索", icon: "BookSearch", message: "匹配案例：沈阳地区搬家行业 Q1 续费率仅 35%", delay: 1200 },
  { id: "generate", label: "策略生成", icon: "Wand2", message: "生成话术模板 + CRM 状态自动更新", delay: 1500 },
  { id: "complete", label: "执行完成", icon: "CheckCircle2", message: "已自动录入 CRM | 预计提升续费率 8%", delay: 0 },
];

// Evolution Log entries
export const EVOLUTION_LOGS = [
  { date: "2025-11-29", title: "重构 RFM 逻辑为多智能体协作", tags: ["AI", "RFM"], type: "milestone" },
  { date: "2025-11-25", title: "跑量累计突破 5000 公里，思考如何将耐力转化为代码质量", tags: ["Life", "思考"], type: "insight" },
  { date: "2025-11-20", title: "在 YouTube 发布了第一期 Vibe Coding 实战", tags: ["YouTube", "分享"], type: "achievement" },
  { date: "2025-11-15", title: "完成 LangGraph 核心路由学习", tags: ["AI", "学习"], type: "learn" },
  { date: "2025-11-10", title: "搭建个人 AI 知识库 RAG 原型", tags: ["RAG", "原型"], type: "project" },
  { date: "2025-11-05", title: "开始 Build in Public 之旅", tags: ["里程碑"], type: "milestone" },
];

export const NAV_ITEMS = [
  { label: "核心战役", href: "/#portfolio" },
  { label: "能力引擎", href: "/#about" },
  { label: "Build in Public", href: "/build-in-public" },
];

export const ABOUT_CONTENT = {
  title: "关于我",
  subtitle: "数学背景 / 管科硕士 / 前 58 同城 8 级运营 / Vibe Coder",
  philosophy: "任何一个现象背后一定有数据，任何数据的变动背后一定有道理。而 AI，是让道理自动跑通的最后一块拼图。",
  keywords: ["数学建模", "运营增长", "AI 全栈", "自动化"],
};
