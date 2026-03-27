"use client";

import { useState, useEffect, useCallback, type ElementType } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Activity, Target, Users, TrendingUp, Loader2, Eye, AlertTriangle, Package, AlertCircle, Database, Brain, Route, CheckCircle } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { getProjects } from "@/lib/db";
import type { Project } from "@/lib/database.types";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PipelineDemo } from "@/components/PipelineDemo";
import type { PipelineStep } from "@/components/PipelineDemo";

/** 每个 Skill 的痛点定义 */
const SKILL_PAIN_POINTS: Record<string, { problem: string; why: string }> = {
    "crm-auto-fill": {
        problem: "销售聊完不记、记了也不全，CRM 永远是脏的",
        why: "对财税代理团队来说，客户常在微信里临时问做账、报税、注销、工商变更。关键信息散落在聊天记录和销售脑子里，后续所有判断都建立在脏输入上。"
    },
    "funnel-doctor": {
        problem: "商机推进卡在哪，只能靠主管挨个追问",
        why: "比如客户已经问到套餐价格，但预算、决策人、交付周期一个都没确认。没有统一判断标准时，主管只能反复追问，过程永远不可视。"
    },
    "customer-profiler": {
        problem: "客户谁该重点维护、谁该降频，全靠老员工感觉",
        why: "在代账、工商、社保、注销等服务并存时，哪些客户值得重点维护、哪些适合交叉销售、哪些该暂时降频，如果不沉成规则，就只能依赖熟手经验。"
    },
    "renewal-watch": {
        problem: "快流失了才知道，续费全靠感觉抢救",
        why: "财税代理服务往往有明确账期和申报节奏。一旦客户在续费窗口前静默、余额下降或服务投诉上升，如果没有预警，只能等销售临时救火。"
    }
};

/** 每个 Skill 的 Pipeline 配置 */
const SKILL_PIPELINES: Record<string, { skillName: string; color: "blue" | "purple" | "red" | "amber"; steps: PipelineStep[] }> = {
    "crm-auto-fill": {
        skillName: "crm-auto-fill",
        color: "blue",
        steps: [
            {
                id: "collect",
                label: "读取原始沟通记录",
                description: "微信 / 电话 / 拜访统一输入",
                icon: Database,
                annotation: "传统方式：销售聊完之后靠脑子记，或者回头补 CRM。\n• 字段经常漏\n• 记录口径不统一\n\nSkill 替代：先把原始记录统一收进一个结构化入口。",
                highlight: true,
                code: `// crm-auto-fill.input
{
  "record_id": "WX-20260327-001",
  "source_type": "wechat_chat",
  "raw_text": "客户是代账公司，老板本人决策，预算 2-3 万...",
  "owner": "sales_A",
  "run_date": "2026-03-27"
}`,
            },
            {
                id: "extract",
                label: "抽取关键字段",
                description: "需求 / 预算 / 决策人 / Timeline",
                icon: Brain,
                annotation: "传统方式：CRM 填写依赖销售自觉。\n• 愿不愿填、填得全不全，全看个人习惯\n\nSkill 替代：自动抽取关键字段，并识别哪些字段是推断得来的。",
                highlight: true,
                code: `// crm-auto-fill.output
{
  "structured_fields": {
    "company_name": "祈福财税",
    "contact_role": "老板",
    "budget_range": "2-3万",
    "timeline": "本月内"
  },
  "inferred_fields": ["need_summary"],
  "missing_required_fields": ["phone"],
  "confidence": "medium"
}`,
            },
            {
                id: "confirm",
                label: "回写 CRM 与缺失提醒",
                description: "生成干净输入",
                icon: CheckCircle,
                annotation: "传统方式：后续所有人都在脏数据上继续工作。\n\nSkill 替代：回写结构化字段，并明确缺失项，让后续诊断、分层、续费判断建立在干净输入上。",
                highlight: true,
                code: `await openclaw.crm.upsert({
  record_id: "WX-20260327-001",
  current_stage: "首次触达",
  next_step: "补齐电话并安排二次沟通",
  missing_required_fields: ["phone"]
});
// 结果：后续模块拿到的是干净字段，不再依赖销售记忆`,
            },
        ],
    },
    "funnel-doctor": {
        skillName: "funnel-doctor",
        color: "purple",
        steps: [
            {
                id: "read-stage",
                label: "读取当前阶段",
                description: "拿到商机状态与推进记录",
                icon: Route,
                annotation: "传统方式：主管只能看一个模糊状态，比如“跟进中”。\n• 具体卡在哪不知道\n• 缺什么字段也不知道\n\nSkill 替代：读取当前阶段、阶段历史和触达记录。",
                highlight: true,
                code: `// funnel-doctor.input
{
  "opportunity_id": "OPP-321",
  "owner": "sales_A",
  "current_stage": "已沟通待报价",
  "valid_contact_count": 2,
  "budget_range": "",
  "recent_note": "客户有兴趣，但一直没推进"
}`,
            },
            {
                id: "diagnose",
                label: "识别卡点与缺失字段",
                description: "把主管脑内规则显性化",
                icon: Brain,
                annotation: "传统方式：主管靠经验追问“预算问没问”“决策人见没见”。\n\nSkill 替代：自动诊断当前卡点，并输出缺失字段与责任归属。",
                highlight: true,
                code: `// funnel-doctor.output
{
  "diagnosis": "停留在待报价阶段过久",
  "missing_fields": ["budget_range", "decision_maker_confirmed"],
  "next_action": "补齐预算并确认拍板人",
  "manager_action": "经理跟一次关键沟通",
  "human_required": true
}`,
            },
            {
                id: "action",
                label: "输出下一步动作",
                description: "销售动作 + 经理动作并行",
                icon: CheckCircle,
                annotation: "传统方式：问题看到了，但没人知道下一步谁来做。\n\nSkill 替代：直接输出销售动作与经理动作，让推进从盯结果变成盯过程。",
                highlight: true,
                code: `await openclaw.tasks.create([
  "sales_A: 今天补问预算范围",
  "manager_B: 明天跟一次关键沟通"
]);
// 结果：不是只知道“有问题”，而是知道“谁下一步做什么”`,
            },
        ],
    },
    "customer-profiler": {
        skillName: "customer-profiler",
        color: "amber",
        steps: [
            {
                id: "ingest",
                label: "读取客户行为与联系记录",
                description: "行为 + 价值等级 + 最近联系",
                icon: Database,
                annotation: "传统方式：谁该重点维护，全靠老员工凭经验。\n\nSkill 替代：统一读取客户行为、价值等级和最近联系记录，形成可判断输入。",
                highlight: true,
                code: `// customer-profiler.input
{
  "customer_id": "C-991",
  "latest_contact_date": "2026-03-18",
  "recharge_frequency_90d": "low",
  "usage_status": "declining",
  "value_level_input": "high"
}`,
            },
            {
                id: "segment",
                label: "客户分层与优先级判断",
                description: "价值等级显性化",
                icon: Users,
                annotation: "传统方式：维护节奏跟着销售忙闲走，不跟着客户价值走。\n\nSkill 替代：自动输出 segment、value level 和 priority reason。",
                highlight: true,
                code: `// customer-profiler.output
{
  "segment": "需关怀",
  "value_level": "高价值",
  "priority_reason": [
    "近 90 天充值频次下降",
    "最近联系间隔偏长"
  ],
  "confidence": "high"
}`,
            },
            {
                id: "cadence",
                label: "生成跟进节奏与动作",
                description: "owner cadence + recommended action",
                icon: CheckCircle,
                annotation: "传统方式：谁先跟、多久跟一次，没有统一标准。\n\nSkill 替代：直接输出 owner cadence 和 recommended action，让存量维护有稳定节奏。",
                highlight: true,
                code: `await openclaw.cadence.assign({
  customer_id: "C-991",
  owner_cadence: "每周一次重点触达",
  recommended_action: "由负责人做一次价值复盘"
});
// 结果：客户维护从“想起来再联系”变成可执行节奏`,
            },
        ],
    },
    "renewal-watch": {
        skillName: "renewal-watch",
        color: "red",
        steps: [
            {
                id: "window",
                label: "读取续费窗口客户",
                description: "续费时间 + 行为异常一起看",
                icon: Database,
                annotation: "传统方式：等快到期了才想起来找客户。\n\nSkill 替代：把续费日期、余额、使用和服务异常一起纳入判断。",
                highlight: true,
                code: `// renewal-watch.input
{
  "customer_id": "R-227",
  "renewal_date": "2026-04-20",
  "latest_contact_date": "2026-03-01",
  "balance_status": "low",
  "usage_status": "declining",
  "service_issue_flag": true
}`,
            },
            {
                id: "score",
                label: "风险分级与窗口判断",
                description: "P1 / P2 / P3 优先级",
                icon: Activity,
                annotation: "传统方式：谁先救，全靠感觉拍。\n\nSkill 替代：输出风险等级、生命周期阶段和续费窗口，让优先级不再含糊。",
                highlight: true,
                code: `// renewal-watch.output
{
  "risk_level": "P1",
  "lifecycle_stage": "续费窗口期",
  "renewal_window": "30d",
  "primary_signals": ["余额低", "最近联系中断", "服务异常"],
  "human_required": true
}`,
            },
            {
                id: "prioritize",
                label: "输出挽回优先级",
                description: "先救谁、怎么救",
                icon: CheckCircle,
                annotation: "传统方式：销售各自凭感觉去追，容易把最危险的客户漏掉。\n\nSkill 替代：直接给出优先级名单和推荐动作，让人工干预有先后顺序。",
                highlight: true,
                code: `await openclaw.retention.prioritize([
  { customer_id: "R-227", risk_level: "P1", owner_role: "负责人" }
]);
// 结果：知道“谁最危险、谁先介入、先做什么”`,
            },
        ],
    },
};

/** 每个 Skill 的执行逻辑（3步以内） */
const SKILL_EXECUTION_LOGIC: Record<string, { summary: string; steps: { label: string; detail: string }[] }> = {
    "crm-auto-fill": {
        summary: "让后续所有判断都建立在干净输入上，而不是建立在销售的记忆和补填习惯上。",
        steps: [
            { label: "统一原始沟通入口", detail: "把微信、电话、拜访记录收进同一个结构化入口" },
            { label: "自动抽取关键字段", detail: "提取需求、预算、决策人、Timeline、当前阶段与下一步动作" },
            { label: "输出缺失提醒", detail: "明确哪些字段还没拿到，避免脏输入继续向下游扩散" },
        ],
    },
    "funnel-doctor": {
        summary: "把主管脑中的推进标准显性化，让商机推进从盯结果变成盯过程。",
        steps: [
            { label: "读取商机阶段", detail: "把当前阶段、触达记录、阶段历史和备注统一读取进来" },
            { label: "诊断卡点与缺失", detail: "识别阶段停滞的原因，并指出缺少哪些关键信息" },
            { label: "输出动作建议", detail: "同时生成销售动作和经理动作，让推进责任清晰可执行" },
        ],
    },
    "customer-profiler": {
        summary: "把客户分层和维护节奏从老员工经验，变成可复用、可移交、可持续优化的规则。",
        steps: [
            { label: "读取行为与联系记录", detail: "把充值频次、使用状态、最近联系和价值等级统一纳入判断" },
            { label: "做分层与优先级判断", detail: "输出 segment、value level 和 priority reason" },
            { label: "生成跟进节奏", detail: "把 owner cadence 和 recommended action 直接发给执行人" },
        ],
    },
    "renewal-watch": {
        summary: "把续费挽回从“快流失了再救”前移到窗口期内，并且明确谁先介入、先做什么。",
        steps: [
            { label: "读取续费窗口客户", detail: "把续费时间、余额、使用和服务异常统一纳入输入" },
            { label: "做风险分级", detail: "输出 P1 / P2 / P3 风险等级、生命周期阶段和续费窗口" },
            { label: "生成优先级名单", detail: "把人工干预从“谁有空谁跟”变成“谁最危险先救谁”" },
        ],
    },
};

type CategoryConfig = {
    title: string;
    description: string;
    icon: ElementType;
    mappedTags?: string[];
    fallbackIds: string[];
};

type ProjectWithCategory = Project & { category?: string };

const CATEGORY_MAP: Record<string, CategoryConfig> = {
    "crm-auto-fill": {
        title: "crm-auto-fill：把聊天记录变成干净输入",
        description: "适合财税代理、代账和工商服务团队。这个 Skill 负责把散落在微信、电话、拜访记录里的关键信息，转成后续模块真正可用的结构化字段。",
        icon: Database,
        fallbackIds: ["sales-broadcaster", "rag-copilot"],
    },
    "funnel-doctor": {
        title: "funnel-doctor：把商机卡点显性化",
        description: "适合销售主管需要盯过程的团队。这个 Skill 负责诊断商机当前卡在哪、缺什么字段、下一步该由谁做什么，让主管从事后追责转向过程管理。",
        icon: Route,
        fallbackIds: ["bi-diagnoser", "dynamic-rfm", "fake-leads-audit"],
    },
    "customer-profiler": {
        title: "customer-profiler：把维护经验沉成规则",
        description: "适合有存量客户池和交叉销售需求的团队。这个 Skill 负责把客户价值等级、联系频率和维护优先级经验，沉淀成可复用、可移交、可持续优化的分层规则。",
        icon: Users,
        fallbackIds: ["dynamic-rfm", "coaching-agent"],
    },
    "renewal-watch": {
        title: "renewal-watch：把续费挽回前移到窗口期",
        description: "适合存在账期、续费节点和客户流失风险的团队。这个 Skill 负责给出风险等级、续费窗口和优先级名单，让续费不再靠最后时刻的临时抢救。",
        icon: AlertTriangle,
        fallbackIds: ["sales-broadcaster", "t90-churn-prevention", "apollo-handover-crisis", "coaching-agent"],
    }
};

const CATEGORY_ALIASES: Record<string, string> = {
    "activation": "funnel-doctor",
    "lead-scoring": "renewal-watch",
    "attribution": "customer-profiler",
    "sales-enablement": "crm-auto-fill",
};

const iconMap: Record<string, ElementType> = {
    Zap, Activity, Target, Users, TrendingUp, Eye, AlertTriangle, Package
};

export default function CategoryDetailPage() {
    const params = useParams();
    const router = useRouter();
    const rawCategoryId = params.id as string;
    const categoryId = CATEGORY_ALIASES[rawCategoryId] ?? rawCategoryId;
    const categoryNode = CATEGORY_MAP[categoryId];

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    const loadProjects = useCallback(async () => {
        try {
            const allProjects = await getProjects();
            // 筛选属于当前 Category 的项目：优先匹配 category 字段，其次匹配 fallbackIds
            const filtered = allProjects.filter(p => 
                (p as ProjectWithCategory).category === categoryId || categoryNode?.fallbackIds.includes(p.id)
            );
            setProjects(filtered);
        } catch (error) {
            console.error("Failed to load category projects:", error);
        } finally {
            setLoading(false);
        }
    }, [categoryId, categoryNode]);

    useEffect(() => {
        if (categoryNode) {
            loadProjects();
        } else {
            setLoading(false);
        }
    }, [categoryNode, loadProjects]);

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
                                    <div>
                                        <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
                                            <div className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                                            首批已封装节点
                                        </div>
                                        <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">{categoryNode.title}</h1>
                                    </div>
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
                                        封装原型演示
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
                                        封装逻辑（3步以内）
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
