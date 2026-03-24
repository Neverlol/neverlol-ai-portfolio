"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Activity, Target, Users, TrendingUp, Loader2, Eye, AlertTriangle, Package, AlertCircle, Database, Brain, Route, TrendingDown, CheckCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { getProjects } from "@/lib/db";
import type { Project } from "@/lib/database.types";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PipelineDemo } from "@/components/PipelineDemo";
import type { PipelineStep } from "@/components/PipelineDemo";

/** 每个 Skill 的痛点定义 */
const SKILL_PAIN_POINTS: Record<string, { problem: string; why: string }> = {
    "attribution": {
        problem: "跨部门互相推诿，永远找不到真正的问题",
        why: "没有数据的情况下，各部门都说是别人的问题。结果是：领导拍脑袋决策，基层背锅。"
    },
    "sales-enablement": {
        problem: "销售挑肥拣瘦，好客户被白白浪费",
        why: "没有强制分配规则，销售只会跟进容易成交的客户。结果是：难啃的客户永远没人管。"
    },
    "activation": {
        problem: "人效全靠天收，不知道谁在裸泳",
        why: "没有行为数据，只有结果数据。结果是：出了问题才知道，但已经晚了。"
    },
    "lead-scoring": {
        problem: "首签即放养，续费全靠客情",
        why: "没有生命周期意识，只管杀不管埋。结果是：客户用完就走，永远在获新客。"
    }
};

/** 每个 Skill 的 Pipeline 配置 */
const SKILL_PIPELINES: Record<string, { skillName: string; color: "blue" | "purple" | "red" | "amber"; steps: PipelineStep[] }> = {
    "activation": {
        skillName: "人效提升 Pipeline",
        color: "blue",
        steps: [
            {
                id: "behavior",
                label: "行为数据采集",
                description: "记录每个销售的动作",
                icon: Activity,
                annotation: "传统方式：只记录结果（打了多少电话）\n• 没有过程数据，只有结果数据\n• 出问题后才知道，但已经晚了\n\nSkill 替代：自动记录所有行为动作",
                highlight: true,
                code: `// 行为数据采集模块
const behaviors = await openclaw
  .track("sales_behavior")
  .filter({ team_id: "T001" })
  .fields([
    "call_duration",
    "connect_rate",
    "followup_count",
    "intent_confirm",
    "visit_record"
  ])
  .window("7d")
  .collect();
// 采集完成: 1,247 条销售行为记录`,
            },
            {
                id: "grading",
                label: "硬性分级卡点",
                description: "0%-100% 行为进阶",
                icon: TrendingUp,
                annotation: "传统方式：销售自己报意向\n• 主观性强，容易虚报\n• 领导无法核实\n\nSkill 替代：行为数据 = 意向等级",
                highlight: true,
                code: `// 行为驱动分级
const graded = await openclaw
  .score("intent_grade")
  .input(behaviors)
  .rules({
    "A": "3d内有有效动作",
    "B": "7d内有有效动作",
    "C": "7d+无动作 → 强制回收"
  })
  .classify();
// 分级完成: A类 234 | B类 567 | C类 446`,
            },
            {
                id: "intervention",
                label: "强制干预",
                description: "低于卡点自动触发",
                icon: Brain,
                annotation: "传统方式：经理发现问题了才去管\n• 滞后性严重\n• 销售已经错过了最佳跟进时机\n\nSkill 替代：自动触发干预流程",
                highlight: true,
                code: `// 强制干预触发
await openclaw
  .trigger("intervention")
  .condition({ grade: "C" })
  .actions([
    "释放公海",
    "发送预警给销售",
    "通知经理 coach"
  ])
  .execute();
// C类客户已释放: 446 条 → 公海池`,
            },
            {
                id: "result",
                label: "效率提升",
                description: "结果对比",
                icon: TrendingDown,
                annotation: "效果对比：\n\n传统方式\n• 10 个销售管 1000 客户\n• 人均管 100 客户，80% 在瞎忙\n\n使用 Skill 后\n• 3 个销售 + Skill 辅助\n• 人均管 300 客户",
                highlight: false,
                code: `// 人效提升报告
const report = {
  before: { sales: 10, per_capita: 100 },
  after:  { sales: 3,  per_capita: 300 },
  improvement: "+180% 有效跟进率"
};
// Pipeline 执行完成 ✓`,
            },
        ],
    },
    "attribution": {
        skillName: "大盘归因 Pipeline",
        color: "purple",
        steps: [
            {
                id: "data",
                label: "四级漏斗埋点",
                description: "曝光-点击-留联-成交",
                icon: Database,
                annotation: "传统方式：各说各话\n• 市场说：是销售转化不行\n• 销售说：是线索质量不行\n• 领导：到底谁的锅？\n\nSkill 替代：统一埋点口径",
                highlight: true,
                code: `// 四级漏斗埋点
const funnel = await openclaw
  .funnel("四级漏斗")
  .stages([
    { name: "曝光",    events: ["impression"] },
    { name: "点击",    events: ["click"] },
    { name: "留联",    events: ["form_submit"] },
    { name: "成交",    events: ["pay_success"] }
  ])
  .dateRange("2024-Q1")
  .groupBy("city")
  .collect();
// 数据对齐完成: 4城市 × 4阶段`,
            },
            {
                id: "compare",
                label: "横向对标",
                description: "城市/团队/个人",
                icon: Users,
                annotation: "传统方式：凭感觉对比\n• A 城市说我们城市特殊\n• B 团队说我们基数大\n\nSkill 替代：标准化对标",
                highlight: false,
                code: `// 横向对标分析
const benchmark = await openclaw
  .compare("city_performance")
  .control("北京")
  .treatment(["上海", "深圳", "广州"])
  .variables(["流量", "转化率", "客单价"])
  .method("DiD")
  .run();
// 对标完成: 深圳转化率异常 -12.3%`,
            },
            {
                id: "rootcause",
                label: "归因分析",
                description: "定位绝对死因",
                icon: Target,
                annotation: "传统方式：开会吵架\n• 吵一天也吵不出结果\n• 最后领导拍脑袋决定\n\nSkill 替代：物理级归因",
                highlight: true,
                code: `// 归因分析
const cause = await openclaw
  .analyze("root_cause")
  .focus({ city: "深圳", drop: -12.3 })
  .methods(["Shapley", "Funnel"])
  .findings([
    { factor: "渠道质量", weight: 0.45 },
    { factor: "销售能力", weight: 0.32 },
    { factor: "产品匹配", weight: 0.23 }
  ])
  .recommend([
    "替换低质量渠道",
    "销售培训重点: 需求挖掘"
  ]);
// 归因完成 ✓`,
            },
        ],
    },
    "sales-enablement": {
        skillName: "动能重构 Pipeline",
        color: "amber",
        steps: [
            {
                id: "bundling",
                label: "强制捆绑",
                description: "热门+冷门打包分配",
                icon: Package,
                annotation: "传统方式：销售挑肥拣瘦\n• 只跟进容易转化的\n• 难啃的永远没人管\n\nSkill 替代：强制捆绑规则",
                highlight: true,
                code: `// 强制捆绑分配
const allocation = await openclaw
  .allocate("smart_bundle")
  .rule({
    A: "1个A类 + 2个C类",
    B: "2个B类 + 1个C类"
  })
  .enforce("no_refuse")
  .execute();
// 分配完成: 规避挑肥拣瘦 ✓`,
            },
            {
                id: "incentive",
                label: "动态激励",
                description: "越难越奖，多劳多得",
                icon: TrendingUp,
                annotation: "传统方式：固定底薪+提成\n• 销售只挑客户，不挑难度\n• 热门赛道内卷，冷门赛道荒废\n\nSkill 替代：动态激励系数",
                highlight: true,
                code: `// 动态积分引擎
const points = await openclaw
  .calculate("dynamic_bonus")
  .rules({
    "C类成交":    "×2.0 积分",
    "冷门类目":    "×1.5 积分",
    "难啃客户":    "×1.8 积分"
  })
  .realtime()
  .leaderboard();
// 激励重算完成: TOP3 重新洗牌`,
            },
            {
                id: "expert",
                label: "专家养成",
                description: "垂直赛道深耕",
                icon: Brain,
                annotation: "传统方式：什么客户都接\n• 销售什么都会一点，但都不精\n• 客户感知不到专业价值\n\nSkill 替代：赛道分级认证",
                highlight: false,
                code: `// 赛道专家认证
const experts = await openclaw
  .certify("industry_expert")
  .tracks(["装修", "家政", "教育"])
  .criteria({
    "成交率 > 40%": true,
    "客户评分 > 4.5": true,
    "续费率 > 60%": true
  })
  .grant("expert_badge")
  .benefits(["优先配额", "高佣金"]);
// 认证完成: 7位赛道专家`,
            },
        ],
    },
    "lead-scoring": {
        skillName: "生命周期 Pipeline",
        color: "red",
        steps: [
            {
                id: "import",
                label: "CRM 录入",
                description: "客户信息结构化",
                icon: Database,
                annotation: "传统方式：销售懒得填\n• 太麻烦了，不如用脑子记\n• 结果是：客户跟着销售走了\n\nSkill 替代：自动补全",
                highlight: false,
                code: `// 自动补全 CRM
const enriched = await openclaw
  .enrich("customer_profile")
  .source("chat_history")
  .extract(["需求", "预算", "决策人", "Timeline"])
  .fill("crm_fields")
  .confirm(true)
  .execute();
// 补全完成: 1,247 条客户画像`,
            },
            {
                id: "lifecycle",
                label: "生命周期建模",
                description: "180 天全周期监控",
                icon: Activity,
                annotation: "传统方式：首签即放养\n• 签完合同就没人管了\n• 等客户不续费了才知道\n\nSkill 替代：180 天生命周期模型",
                highlight: true,
                code: `// 生命周期建模
const lifecycle = await openclaw
  .model("180d_lifecycle")
  .stages({
    "0-30d":   "萌芽期",
    "31-60d":  "体验期",
    "61-90d":  "破灭期",
    "91-180d": "成熟期"
  })
  .monitor("churn_risk")
  .alertAt(0.7)
  .execute();
// 建模完成: 23 个高风险客户预警`,
            },
            {
                id: "intervention",
                label: "强制教学干预",
                description: "破灭期自动触发",
                icon: AlertTriangle,
                annotation: "传统方式：等客户说不续费了再补救\n• 90% 的客户在破灭期已经决定离开\n• 续费前才联系？晚了\n\nSkill 替代：破灭期前移干预",
                highlight: true,
                code: `// 破灭期干预
await openclaw
  .trigger("intervention")
  .condition({ stage: "破灭期", risk: ">0.7" })
  .actions([
    "发送健康度检测",
    "安排主动服务",
    "触发 coach 流程"
  ])
  .deadline("48h")
  .execute();
// 干预触发: 23 个高风险客户`,
            },
            {
                id: "renewal",
                label: "续费驱动",
                description: "到期前 60 天启动",
                icon: CheckCircle,
                annotation: "传统方式：到期了再催\n• 客户早就找好下家了\n• 续费靠客情，等于等死\n\nSkill 替代：前置 60 天启动",
                highlight: false,
                code: `// 续费漏斗
const renewals = await openclaw
  .track("renewal_pipeline")
  .window("-90d to 0d")
  .milestones({
    "90d": "收集成功案例",
    "60d": "推送续费方案",
    "30d": "老板出面谈",
    "0d":  "续费 or 流失"
  })
  .predict("renewal_prob")
  .execute();
// 预测完成: 预期续费率 78.3%`,
            },
        ],
    },
};

/** 每个 Skill 的执行逻辑（3步以内） */
const SKILL_EXECUTION_LOGIC: Record<string, { summary: string; steps: { label: string; detail: string }[] }> = {
    "attribution": {
        summary: "打破跨部门互相推诿，用数据定位真正的问题",
        steps: [
            { label: "统一数据口径", detail: "打通市场-销售-运营的数据，所有人用同一套数据说话" },
            { label: "横向对标找异常", detail: "城市对比城市、团队对比团队、个人对比个人，标准化对标" },
            { label: "定位问题根因", detail: "用数据分析定位真正的问题出在哪个环节，不再吵架" },
        ],
    },
    "sales-enablement": {
        summary: "用机制替代自觉，让最难啃的客户也被认真对待",
        steps: [
            { label: "强制捆绑分配", detail: "高意向客户必须搭配难啃客户，禁止挑肥拣瘦" },
            { label: "动态积分激励", detail: "越难成交的客户积分越高，多劳多得不再是口号" },
            { label: "赛道专家认证", detail: "深耕垂直类目，培养真正懂行业的销售" },
        ],
    },
    "activation": {
        summary: "用行为数据替代主观汇报，让每个销售的贡献可量化",
        steps: [
            { label: "全链路行为采集", detail: "记录所有业务动作（打电话、发微信、上门拜访）" },
            { label: "行为驱动分级", detail: "0%-100% 硬性卡点，3天无动作自动降级" },
            { label: "自动触发干预", detail: "低于卡点立即释放公海，同时触发 coach 流程" },
        ],
    },
    "lead-scoring": {
        summary: "用180天生命周期模型替代首签即放养，大幅提升续费率",
        steps: [
            { label: "CRM 自动补全", detail: "从聊天记录自动提取需求、预算、决策人等字段" },
            { label: "180天生命周期建模", detail: "萌芽→体验→破灭→成熟→续费，每个阶段有对应策略" },
            { label: "破灭期前置干预", detail: "在客户决定离开之前主动触发教学干预" },
        ],
    },
};

const CATEGORY_MAP: Record<string, { title: string, description: string, icon: any, mappedTags?: string[], fallbackIds: string[] }> = {
    "attribution": {
        title: "大盘归因诊断：打破互相推诿",
        description: "摒弃吵架，祭出「业务拆解」。从「全靠销售一张嘴」进化到「用数据分析定位问题」，用客观数据定位异常波动的真正原因。",
        icon: Eye,
        fallbackIds: ["bi-diagnoser", "tableau-bi", "fake-leads-audit"],
    },
    "sales-enablement": {
        title: "动能重构：让难啃的客户也被认真对待",
        description: "专治销售「挑肥拣瘦」。将固定分配变为动态抢单，用高意向客户强行捆绑难啃客户，用积分机制培养深耕垂直类目的行业销售。",
        icon: Package,
        fallbackIds: ["dynamic-rfm", "unicorn-upsell"],
    },
    "activation": {
        title: "人效提升：让每个销售的贡献可量化",
        description: "专治「业绩全靠天收」。废除销售自己报意向，建立 0% 到 100% 的硬性行为进阶卡点，将大班式管理转变为精准跟进赋能。",
        icon: Activity,
        fallbackIds: ["coaching-agent", "high-pressure-elimination", "rookie-ramp-up"],
    },
    "lead-scoring": {
        title: "生命周期：让客户持续回头买",
        description: "摒弃「签完合同就不管了」的售后。建立 180 天客户跟踪模型（萌芽-体验-快要流失-成熟-续费），针对快要流失的客户实施强制干预，大幅提升续费率。",
        icon: AlertTriangle,
        fallbackIds: ["sales-broadcaster", "t90-churn-prevention", "apollo-handover-crisis"],
    }
};

const iconMap: Record<string, any> = {
    Zap, Activity, Target, Users, TrendingUp, Eye, AlertTriangle, Package
};

export default function CategoryDetailPage() {
    const params = useParams();
    const router = useRouter();
    const categoryId = params.id as string;
    const categoryNode = CATEGORY_MAP[categoryId];

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (categoryNode) {
            loadProjects();
        } else {
            setLoading(false);
        }
    }, [categoryNode]);

    const loadProjects = async () => {
        try {
            const allProjects = await getProjects();
            // 筛选属于当前 Category 的项目
            const filtered = allProjects.filter(p => categoryNode?.fallbackIds.includes(p.id));
            setProjects(filtered);
        } catch (error) {
            console.error("Failed to load category projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const TopIcon = categoryNode?.icon || Zap;

    return (
        <div className="min-h-screen bg-[#000000] text-white flex flex-col">
            <Header />

            <main className="flex-1 pt-24 pb-16 px-6">
                <div className="max-w-4xl mx-auto">
                    {!categoryNode ? (
                        <div className="text-center py-20 text-[#8b949e]">类别不存在</div>
                    ) : (
                        <>
                            {/* Category Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-14 border-b border-white/10 pb-10 relative overflow-hidden"
                            >
                                <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#245fff] rounded-full blur-[100px] opacity-10 pointer-events-none" />

                                {/* Skill Icon + Title */}
                                <div className="flex items-center gap-4 mb-8 relative z-10">
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                        <TopIcon className="w-8 h-8 text-[#245fff]" />
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">{categoryNode.title}</h1>
                                </div>

                                {/* Pain Point Block */}
                                {SKILL_PAIN_POINTS[categoryId] && (
                                    <div className="mb-8 p-5 rounded-xl border border-red-500/30 bg-red-500/5 relative z-10">
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                            <div>
                                                <div className="text-white font-medium mb-1">
                                                    {SKILL_PAIN_POINTS[categoryId].problem}
                                                </div>
                                                <div className="text-gray-400 text-sm leading-relaxed">
                                                    {SKILL_PAIN_POINTS[categoryId].why}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Original Description */}
                                <p className="text-[#8b949e] text-base md:text-lg leading-relaxed max-w-2xl relative z-10">
                                    {categoryNode.description}
                                </p>
                            </motion.div>

                            {/* Demo 区域 */}
                            {SKILL_PIPELINES[categoryId] && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="mb-14"
                                >
                                    <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                                        <span className="w-2 h-6 bg-[#245fff] rounded-sm inline-block"></span>
                                        Skill 演示
                                    </h2>
                                    <PipelineDemo
                                        skillName={SKILL_PIPELINES[categoryId].skillName}
                                        steps={SKILL_PIPELINES[categoryId].steps}
                                        color={SKILL_PIPELINES[categoryId].color}
                                    />
                                </motion.div>
                            )}

                            {/* 执行逻辑区域 */}
                            {SKILL_EXECUTION_LOGIC[categoryId] && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="mb-14"
                                >
                                    <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                                        <span className="w-2 h-6 bg-emerald-500 rounded-sm inline-block"></span>
                                        执行逻辑（3步以内）
                                    </h2>
                                    <div className="p-6 rounded-xl border border-white/10 bg-white/[0.02]">
                                        <p className="text-gray-400 text-sm mb-6">
                                            {SKILL_EXECUTION_LOGIC[categoryId].summary}
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            {SKILL_EXECUTION_LOGIC[categoryId].steps.map((step, index) => (
                                                <div key={index} className="relative p-4 rounded-lg bg-black/40 border border-white/5">
                                                    <div className="absolute -top-3 left-4 px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/30 rounded text-xs font-medium text-emerald-400">
                                                        STEP {index + 1}
                                                    </div>
                                                    <h4 className="text-white font-medium mt-2 mb-2">{step.label}</h4>
                                                    <p className="text-gray-500 text-sm leading-relaxed">{step.detail}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {/* Cases List */}
                            <div className="space-y-6">
                                <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                                    <span className="w-2 h-6 bg-[#245fff] rounded-sm inline-block"></span>
                                    适用场景 ({projects.length})
                                </h2>

                                {loading ? (
                                    <div className="flex items-center justify-center py-20">
                                        <Loader2 className="w-6 h-6 text-[#245fff] animate-spin" />
                                    </div>
                                ) : projects.length === 0 ? (
                                    <div className="p-8 border border-white/5 rounded-2xl bg-white/[0.02] text-center text-[#8b949e]">
                                        该板块下的精选项目正在沉淀中，敬请期待...
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                        {projects.map((project, index) => {
                                            const ProjIcon = iconMap[project.icon] || Zap;
                                            return (
                                                <motion.button
                                                    key={project.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    onClick={() => router.push(`/case/${project.id}`)}
                                                    className="w-full text-left p-6 rounded-2xl bg-black border border-white/10 hover:border-[#245fff]/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(36,95,255,0.1)] transition-all duration-300 group flex flex-col justify-between"
                                                >
                                                    <div>
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#245fff]/20 group-hover:text-[#245fff] transition-all">
                                                                <ProjIcon className="w-5 h-5" />
                                                            </div>
                                                            <ArrowRight className="w-5 h-5 text-[#8b949e] group-hover:text-white group-hover:translate-x-1 transition-all" />
                                                        </div>
                                                        <h3 className="text-xl font-medium text-white mb-2">{project.title}</h3>
                                                        <p className="text-[#8b949e] text-sm line-clamp-2 mb-4">{project.subtitle}</p>
                                                    </div>

                                                    <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2 items-center justify-between">
                                                        <div className="flex gap-2 flex-wrap">
                                                            {(project.tags || []).slice(0, 2).map((tag) => (
                                                                <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-[#a3a3a3]">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <span className="text-[#245fff] font-medium text-xs bg-[#245fff]/10 px-2 py-1 rounded">
                                                            {project.metrics}
                                                        </span>
                                                    </div>
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
