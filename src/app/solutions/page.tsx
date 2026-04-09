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
    title: "线索进入与建档",
    mode: "AI 可连续承担",
    modeClass: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
    ai: "接住表单、微信、飞书、CRM 和存量名单，完成去重、建档并保留原始来源。",
    human: "处理异常样本、特殊客户归属和少量高价值例外。",
  },
  {
    id: "02",
    title: "线索分层与分发",
    mode: "AI 与销售协同",
    modeClass: "text-blue-300 border-blue-500/30 bg-blue-500/10",
    ai: "依据来源、画像、分发规则和优先级逻辑，给出推荐分发对象与首次触达队列。",
    human: "确认重点客户归属，处理跨团队分配和特批资源。",
  },
  {
    id: "03",
    title: "首次触达与信息回填",
    mode: "销售主导关键环节",
    modeClass: "text-amber-300 border-amber-500/30 bg-amber-500/10",
    ai: "把聊天、通话和拜访记录整理成结构化字段，补齐关键信息缺口，并生成沟通摘要。",
    human: "打首电、加微信、建立信任、确认真实意图和一手事实。",
  },
  {
    id: "04",
    title: "商机推进与漏斗质检",
    mode: "AI 与销售协同",
    modeClass: "text-blue-300 border-blue-500/30 bg-blue-500/10",
    ai: "识别推进卡点、虚假进展、缺失字段和需要主管介入的时机。",
    human: "推进拜访、方案沟通、资源协调，并在关键阶段做管理动作。",
  },
  {
    id: "05",
    title: "方案、报价与成交",
    mode: "销售主导关键环节",
    modeClass: "text-amber-300 border-amber-500/30 bg-amber-500/10",
    ai: "提供报价准备参考、异议提醒和风险提示，减少重复准备时间。",
    human: "拜访、谈判、价格、合同承诺和最终签约拍板。",
  },
  {
    id: "06",
    title: "客户生命周期监控",
    mode: "AI 可连续承担",
    modeClass: "text-emerald-300 border-emerald-500/30 bg-emerald-500/10",
    ai: "持续巡检客户状态，输出客户分层结果、跟进节奏和推荐动作。",
    human: "只处理异常客户和高价值例外，不再靠人工翻表盯存量。",
  },
  {
    id: "07",
    title: "流失预警与续费拦截",
    mode: "AI 与销售协同",
    modeClass: "text-blue-300 border-blue-500/30 bg-blue-500/10",
    ai: "输出风险等级、续费窗口、优先级名单和建议动作。",
    human: "决定先救谁、怎么谈、是否联动主管或客户成功挽回。",
  },
  {
    id: "08",
    title: "复盘与规则迭代",
    mode: "AI 与销售协同",
    modeClass: "text-blue-300 border-blue-500/30 bg-blue-500/10",
    ai: "汇总动作结果、提炼高频问题，沉淀下一轮规则和管理口径。",
    human: "确定审批边界、经营规则和下一轮要继续加深的能力。",
  },
];

const boundaries = [
  {
    title: "AI 先负责",
    icon: Bot,
    tint: "text-emerald-300 border-emerald-500/20 bg-emerald-500/10",
    points: [
      "接入、建档和客户台账结构化回填",
      "漏斗质检、客户分层和续费风险排序",
      "处理清单、风险提醒、沟通摘要和复核提醒",
    ],
  },
  {
    title: "销售亲自推进",
    icon: Handshake,
    tint: "text-amber-300 border-amber-500/20 bg-amber-500/10",
    points: [
      "首次建立信任和真实需求确认",
      "拜访、谈判、价格、合同与关键承诺",
      "客情修复、续费挽回和资源拍板",
    ],
  },
  {
    title: "AI 与人一起抬重点",
    icon: Users,
    tint: "text-blue-300 border-blue-500/20 bg-blue-500/10",
    points: [
      "模糊问题先由 AI 分清，再把处理事项推给对应的人",
      "商机卡点诊断、客户分层和流失优先级",
      "重点名单、沟通摘要和主管复盘同步刷新",
    ],
  },
];

const fitCards = [
  {
    title: "成熟业务节点模块",
    icon: BriefcaseBusiness,
    body: "把新客推进、问题分流、客户分层、续费风险这些关键节点拆成可持续运转的业务模块，直接接进真实销售流程。",
  },
  {
    title: "OpenClaw 智能体承载",
    icon: ShieldCheck,
    body: "由 OpenClaw 作为 AI / Agent 智能体底座，负责触发、调度、回写、提醒和持续协作，把系统真正部署成能跑的业务底盘。",
  },
  {
    title: "按你当前流程定制接入",
    icon: Radar,
    body: "微信、电话、CRM、飞书表格和原有分工都可以继续保留，系统按团队现在的销售工作流去做定制化接入。",
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
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue-500" />
          <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-gray-400">
            人机交互式 AI 业务系统
          </span>
        </div>

        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-6xl">
          把成熟业务链路接成一套
          <br />
          <span className="text-blue-500">人机交互式 AI 业务系统</span>
        </h1>

        <p className="max-w-3xl text-sm leading-relaxed text-gray-400 md:text-base">
          这套系统基于成熟的全链路业务体系，把关键业务节点封装成可持续运转的模块，
          <br className="hidden md:block" />
          再由 OpenClaw 作为 AI / Agent 智能体底座承载运行，并按你当前的销售工作流做定制接入，平滑融入现有团队。
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
        <div className="mb-8">
          <div className="max-w-4xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs text-blue-300">
              <Sparkles className="h-3.5 w-3.5" />
              从业务节点到系统分工
            </div>
            <h2 className="text-2xl font-bold leading-[1.2] text-white md:text-3xl md:leading-[1.15]">
              这套系统如何接进
              <br className="hidden md:block" />
              <span className="text-blue-500">你的销售工作流</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              先把业务节点、AI 负责和销售接手点说清楚，后面的部署、接线和持续优化才会稳定。
            </p>
          </div>
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
                      销售负责
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
            这套系统落地后的三个关键变化
          </h2>
          <p className="mx-auto max-w-2xl text-sm leading-relaxed text-gray-500">
            客户真正买单的，是这套系统能否无痛接进团队、持续由 AI 协作运行，并把关键动作稳定交回给人。
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
            接着看系统实际运转
          </div>
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
            去看它在业务主线里怎样持续运转
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-gray-400 md:text-base">
            接入方式明确之后，最值得继续看的就是它真正跑起来时，AI、销售和主管各自看到什么。
            <br className="hidden md:block" />
            首页 Demo 会把业务主线、AI 协作和管理结果放在一个界面里连续展示。
          </p>
          <div className="flex flex-col items-center justify-center gap-3">
            <Link
              href="/#demo"
              className="inline-flex items-center gap-2 rounded-xl border border-blue-500/40 bg-blue-500/15 px-6 py-3 text-sm font-medium text-blue-300 transition-colors hover:bg-blue-500/20"
            >
              查看首页 Demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="text-xs text-gray-500">顺着 Demo 往下看，还会继续进入模块案例、合作方式和业务背景。</p>
          </div>
        </div>
      </section>
    </main>
  );
}
