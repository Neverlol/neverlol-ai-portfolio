import { Header } from "@/components/Header";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronsRight,
  Handshake,
  Radar,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";

const stages = [
  {
    id: "01",
    title: "线索进入与整理",
    mode: "AI 可完全承担",
    modeClass: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
    ai: "自动导入、去重、标准化、补全字段，并完成首轮线索标签与优先级排序。",
    human: "只处理异常样本、特殊渠道和少量高价值例外客户。",
  },
  {
    id: "02",
    title: "线索分层与分发",
    mode: "建议人机协同",
    modeClass: "text-blue-300 border-blue-500/30 bg-blue-500/10",
    ai: "根据客户画像、历史转化和分配规则，给出推荐分发对象和跟进优先级。",
    human: "确认特殊客户归属，处理跨团队资源分配和重点客户保护。",
  },
  {
    id: "03",
    title: "首次触达与需求确认",
    mode: "必须人工主导",
    modeClass: "text-amber-300 border-amber-500/30 bg-amber-500/10",
    ai: "生成客户摘要、通话前 briefing、异议预案和需要补采的信息清单。",
    human: "打首电、加微信、建立信任、判断客户真实意图。",
  },
  {
    id: "04",
    title: "商机推进与漏斗质检",
    mode: "建议人机协同",
    modeClass: "text-blue-300 border-blue-500/30 bg-blue-500/10",
    ai: "识别卡点、提示缺失字段、输出下一步动作建议，帮助主管看清过程。",
    human: "补充信息、推进拜访、协调资源，并对关键节点做管理动作。",
  },
  {
    id: "05",
    title: "方案、报价与成交",
    mode: "必须人工主导",
    modeClass: "text-amber-300 border-amber-500/30 bg-amber-500/10",
    ai: "提供报价草稿、异议处理参考和风险提示，减少准备时间。",
    human: "拜访、谈判、价格博弈、合同承诺和最终签约拍板。",
  },
  {
    id: "06",
    title: "客户生命周期监控",
    mode: "AI 可完全承担",
    modeClass: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
    ai: "持续监控余额、消耗、投放、登录、联系频率等异动，并自动生成预警。",
    human: "只在系统预警后介入重点客户，节省日常巡检时间。",
  },
  {
    id: "07",
    title: "流失预警与续费拦截",
    mode: "建议人机协同",
    modeClass: "text-blue-300 border-blue-500/30 bg-blue-500/10",
    ai: "给出风险评分、续费窗口、优先级名单和干预建议。",
    human: "决定先救谁、怎么谈、是否投入额外资源挽回客户。",
  },
  {
    id: "08",
    title: "复盘与规则迭代",
    mode: "建议人机协同",
    modeClass: "text-blue-300 border-blue-500/30 bg-blue-500/10",
    ai: "汇总数据变化、提炼高频问题、生成可更新的规则建议。",
    human: "确定管理机制、考核口径和下一轮要新增的 Skill 节点。",
  },
];

const boundaries = [
  {
    title: "AI 更适合承担",
    icon: Bot,
    tint: "text-emerald-300 border-emerald-500/20 bg-emerald-500/10",
    points: [
      "线索清洗、打标、评分和优先级排序",
      "客户生命周期监控与异常预警",
      "日报、周报、待办和提醒生成",
    ],
  },
  {
    title: "销售必须承担",
    icon: Handshake,
    tint: "text-amber-300 border-amber-500/20 bg-amber-500/10",
    points: [
      "首次建立信任和深度需求确认",
      "拜访、谈判、价格与合同承诺",
      "客情修复、续费挽回和关键拍板",
    ],
  },
  {
    title: "最适合人机协同",
    icon: Users,
    tint: "text-blue-300 border-blue-500/20 bg-blue-500/10",
    points: [
      "商机漏斗质检与下一步动作建议",
      "客户诊断、流失分级与续费优先级",
      "主管复盘与规则迭代",
    ],
  },
];

const fitCards = [
  {
    title: "适合先落地的团队",
    icon: BriefcaseBusiness,
    body: "已经有销售流程、客户数据和续费压力，希望先从 1 到 3 个关键节点开始提效的团队。",
  },
  {
    title: "交付形式",
    icon: ShieldCheck,
    body: "定制 Skill、部署客户自己的 OpenClaw，并按固定周期持续升级优化，让系统和数据始终掌握在客户自己手里。",
  },
  {
    title: "核心结果",
    icon: Radar,
    body: "让 AI 承担后台高频动作，让销售只做真正需要关系、判断和成交的工作。",
  },
];

export default function SolutionsPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-4 pb-20 pt-24 text-white md:px-8">
      <Header />

      <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
        <div className="mx-auto grid h-full max-w-6xl grid-cols-1 divide-x divide-white/10 border-x border-white/10 md:grid-cols-3" />
      </div>

      <section className="relative z-10 mx-auto mb-10 flex w-full max-w-6xl flex-col items-center text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
          <div className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-gray-400">
            人机协同全链路方案
          </span>
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
          让 AI 承担后台高频动作，
          <br />
          让销售只做真正影响<span className="text-blue-500">成交</span>的事
        </h1>

        <p className="max-w-3xl text-sm leading-relaxed text-gray-400 md:text-base">
          这不是用 AI 替代销售，而是把线索整理、过程质检、客户预警和任务路由交给系统，
          让团队把时间重新放回到触达、谈判、成交和续费挽回上。
        </p>

        <div className="mt-8 grid w-full gap-4 md:grid-cols-3">
          {fitCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl border border-white/10 bg-[#050505] p-6 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            >
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15">
                <card.icon className="h-5 w-5 text-blue-400" />
              </div>
              <h2 className="mb-2 text-base font-semibold text-white">{card.title}</h2>
              <p className="text-sm leading-relaxed text-gray-400">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto mb-10 w-full max-w-6xl rounded-[28px] border border-white/10 bg-[#050505] p-6 md:p-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
              <Sparkles className="h-3.5 w-3.5" />
              从线索到续费的节点拆分
            </div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              一条业务链路里，
              <span className="text-blue-500">AI、销售、主管</span>分别做什么
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-gray-500">
            先把职责边界划清楚，后面的 Skill 封装、部署和优化才有稳定落地的基础。
          </p>
        </div>

        <div className="space-y-4">
          {stages.map((stage) => (
            <div
              key={stage.id}
              className="grid gap-4 rounded-2xl border border-white/10 bg-black/40 p-5 md:grid-cols-[88px_minmax(0,1fr)] md:p-6"
            >
              <div className="flex flex-col items-start justify-between rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-gray-500">
                  Stage
                </span>
                <strong className="text-2xl font-semibold text-white">{stage.id}</strong>
              </div>

              <div>
                <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <h3 className="text-lg font-semibold text-white">{stage.title}</h3>
                  <span className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs ${stage.modeClass}`}>
                    {stage.mode}
                  </span>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-emerald-300">
                      <Bot className="h-4 w-4" />
                      AI 负责
                    </div>
                    <p className="text-sm leading-relaxed text-gray-300">{stage.ai}</p>
                  </div>

                  <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-amber-300">
                      <Users className="h-4 w-4" />
                      人负责
                    </div>
                    <p className="text-sm leading-relaxed text-gray-300">{stage.human}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto mb-10 w-full max-w-6xl">
        <div className="mb-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">
            这套方案的边界，要先说清楚
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500">
            把该自动化的、该人工接管的、该协同判断的拆清楚，团队才更容易真正跑出降本增效的结果。
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {boundaries.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/10 bg-[#050505] p-6">
              <div className={`mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border ${item.tint}`}>
                <item.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-3 text-lg font-semibold text-white">{item.title}</h3>
              <div className="space-y-3">
                {item.points.map((point) => (
                  <div key={point} className="flex items-start gap-3 text-sm leading-relaxed text-gray-400">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 mx-auto w-full max-w-6xl rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.02] p-8 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
            <ChevronsRight className="h-3.5 w-3.5 text-blue-400" />
            下一步怎么落地
          </div>
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            看完方案后，继续看系统怎么跑起来
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-gray-400 md:text-base">
            如果你已经理解这套人机协同方案，下一步就直接回首页看 Demo 展示，
            或继续查看合作方式，确认怎么从审计、部署走到周期优化。
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/#demo"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-500/40 bg-blue-500/15 px-6 py-3 text-sm font-medium text-blue-300 transition-colors hover:bg-blue-500/20"
            >
              返回首页看 Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/#cooperation"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3 text-sm font-medium text-gray-300 transition-colors hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
            >
              查看合作方式
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
