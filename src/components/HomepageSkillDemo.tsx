"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  Bot,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  Database,
  Handshake,
  LucideIcon,
  Pause,
  Play,
  Radar,
  RefreshCw,
  ShieldAlert,
  UserRound,
} from "lucide-react";
import Link from "next/link";

type ToneKey = "blue" | "emerald" | "violet" | "amber";

type Metric = {
  label: string;
  value: string;
  note: string;
  tone: ToneKey;
};

type FocusItem = {
  company: string;
  tag: string;
  action: string;
};

type LedgerField = {
  label: string;
  value: string;
};

type DemoStage = {
  id: string;
  stageNo: string;
  title: string;
  trackHint: string;
  icon: LucideIcon;
  laneLabel: string;
  laneTone: ToneKey;
  customer: string;
  caseId: string;
  subtitle: string;
  customerInput: string;
  aiAction: string;
  humanAction: string;
  managerView: string;
  salesView: string;
  currentOutput: string;
  boardSummary: string;
  metrics: Metric[];
  focusList: FocusItem[];
  ledgerChanges: LedgerField[];
};

interface HomepageSkillDemoProps {
  skillName?: string;
  color?: "blue" | "purple" | "red" | "amber";
}

const TONE_META: Record<ToneKey, { pill: string; value: string; glow: string; line: string }> = {
  blue: {
    pill: "border-blue-500/25 bg-blue-500/10 text-blue-300",
    value: "text-blue-300",
    glow: "border-blue-500/20 bg-blue-500/10",
    line: "bg-blue-500/80",
  },
  emerald: {
    pill: "border-emerald-500/25 bg-emerald-500/10 text-emerald-300",
    value: "text-emerald-300",
    glow: "border-emerald-500/20 bg-emerald-500/10",
    line: "bg-emerald-500/80",
  },
  violet: {
    pill: "border-violet-500/25 bg-violet-500/10 text-violet-300",
    value: "text-violet-300",
    glow: "border-violet-500/20 bg-violet-500/10",
    line: "bg-violet-500/80",
  },
  amber: {
    pill: "border-amber-500/25 bg-amber-500/10 text-amber-300",
    value: "text-amber-300",
    glow: "border-amber-500/20 bg-amber-500/10",
    line: "bg-amber-500/80",
  },
};

const STAGES: DemoStage[] = [
  {
    id: "lead-intake",
    stageNo: "01",
    title: "线索进入与建档",
    trackHint: "AI 建档，销售处理例外",
    icon: Database,
    laneLabel: "新客成交链",
    laneTone: "blue",
    customer: "云栖家居服务（脱敏）",
    caseId: "LEAD-031",
    subtitle: "原始线索先被接住，来源、负责人和首触顺序先理清。",
    customerInput: "客户通过表单留下电话，随后在微信里补充了意向城市、行业方向和预计启动时间。",
    aiAction: "AI 接入表单与微信新增记录，完成去重、建档、来源标签识别和首触优先级推荐，并把线索带回统一客户底座。",
    humanAction: "销售处理少量特殊归属与高价值例外，然后按推荐队列开始首轮触达。",
    managerView: "主管先看到今天新增了多少线索、哪些来源质量更高、哪几条需要先安排首触。",
    salesView: "销售按首触队列拨打电话和加微信，不需要自己先翻多张表找人。",
    currentOutput: "线索档案、来源标签、负责人推荐和首次触达队列。",
    boardSummary: "新增线索与首触队列刚刷新，管理侧已经能看到今天最值得先打的对象。",
    metrics: [
      { label: "今日新增线索", value: "18", note: "新线索已进入统一底座", tone: "blue" },
      { label: "有效推进商机", value: "6", note: "昨天遗留商机继续推进", tone: "emerald" },
      { label: "高风险续费", value: "2", note: "存量客户风险仍在 AI 巡检", tone: "violet" },
      { label: "待主管处理", value: "2", note: "重点归属需要确认", tone: "amber" },
    ],
    focusList: [
      { company: "云栖家居服务", tag: "高优先级", action: "今天完成首次触达" },
      { company: "木川空间设计", tag: "转介绍", action: "优先确认预算范围" },
      { company: "海岚运动工作室", tag: "待分配", action: "确认负责人归属" },
    ],
    ledgerChanges: [
      { label: "来源渠道", value: "转介绍 + 微信补充" },
      { label: "当前状态", value: "待首次触达" },
      { label: "推荐负责人", value: "销售一组" },
      { label: "线索优先级", value: "高" },
    ],
  },
  {
    id: "lead-routing",
    stageNo: "02",
    title: "线索分层与分发",
    trackHint: "AI 排队列，主管定归属",
    icon: Radar,
    laneLabel: "新客成交链",
    laneTone: "blue",
    customer: "木川空间设计（脱敏）",
    caseId: "QUEUE-118",
    subtitle: "线索池先被分层，再送到最合适的人手里。",
    customerInput: "已入池线索叠加来源标签、历史接触记录和负责人规则，准备进入首次触达。",
    aiAction: "AI 依据线索质量、来源结构、负责人规则和当前负载，给出推荐 owner、首触时限和优先处理队列。",
    humanAction: "主管确认重点客户归属，处理跨团队分配和需要特批资源的对象。",
    managerView: "管理者看到的不只是线索数量，还能看到哪几条要先给谁、哪几条要自己拍板。",
    salesView: "销售拿到的是已经排好轻重缓急的首触名单，可以直接进入当天的实际触达动作。",
    currentOutput: "负责人推荐、首次触达时限、优先级名单和需主管处理的归属项。",
    boardSummary: "重点线索完成分发，主管只需要处理真正需要拍板的那一小部分。",
    metrics: [
      { label: "今日新增线索", value: "18", note: "线索总量保持不变", tone: "blue" },
      { label: "有效推进商机", value: "7", note: "新增 1 条进入有效推进", tone: "emerald" },
      { label: "高风险续费", value: "2", note: "存量风险继续巡检", tone: "violet" },
      { label: "待主管处理", value: "3", note: "归属与资源需要确认", tone: "amber" },
    ],
    focusList: [
      { company: "木川空间设计", tag: "主管确认", action: "确认 owner 归属" },
      { company: "云栖家居服务", tag: "首触队列", action: "今天完成电话沟通" },
      { company: "海岚运动工作室", tag: "中优先级", action: "明天前完成加微" },
    ],
    ledgerChanges: [
      { label: "当前 owner", value: "销售一组 / 李顾问" },
      { label: "首触时限", value: "今日内" },
      { label: "分发规则", value: "设计行业优先" },
      { label: "主管确认", value: "需要" },
    ],
  },
  {
    id: "first-touch",
    stageNo: "03",
    title: "首次触达与信息回填",
    trackHint: "销售建立信任，AI 回填字段",
    icon: UserRound,
    laneLabel: "新客成交链",
    laneTone: "blue",
    customer: "云栖家居服务（脱敏）",
    caseId: "CRM-031",
    subtitle: "销售在前台建立信任，AI 把关键事实同步写回系统。",
    customerInput: "电话纪要里明确了推广方向、预算区间、启动时间和客户最担心的历史效果波动。",
    aiAction: "AI 把聊天、通话和拜访记录压成结构化字段，补齐需求摘要、预算区间、启动时间和待补信息提醒。",
    humanAction: "销售确认真实意图、判断是否继续推进，并准备下一轮更深入的沟通。",
    managerView: "管理者看到的是首触完成率、待补字段和高意向对象，不需要再追问录音里到底聊了什么。",
    salesView: "销售可以继续推进，不用再把同样的信息手工抄进另一张表里。",
    currentOutput: "结构化沟通字段、需求摘要、预算区间、待补信息和下一轮跟进提示。",
    boardSummary: "原始沟通已经变成可管理字段，后续推进建立在同一套干净输入上。",
    metrics: [
      { label: "今日新增线索", value: "18", note: "新增端继续滚动", tone: "blue" },
      { label: "有效推进商机", value: "8", note: "又有 1 条进入推进状态", tone: "emerald" },
      { label: "高风险续费", value: "2", note: "续费风险仍在 AI 巡检", tone: "violet" },
      { label: "待主管处理", value: "2", note: "重点对象等复盘确认", tone: "amber" },
    ],
    focusList: [
      { company: "云栖家居服务", tag: "高意向", action: "周五前补目标城市" },
      { company: "木川空间设计", tag: "推进中", action: "准备二次沟通提纲" },
      { company: "海岚运动工作室", tag: "待补字段", action: "确认预算上限" },
    ],
    ledgerChanges: [
      { label: "需求摘要", value: "先跑单城试投" },
      { label: "预算区间", value: "6000-9000 / 月" },
      { label: "启动时间", value: "本月下旬" },
      { label: "待补信息", value: "联系人角色 / 投放城市" },
    ],
  },
  {
    id: "pipeline-review",
    stageNo: "04",
    title: "商机推进与漏斗质检",
    trackHint: "AI 找卡点，主管补动作",
    icon: BarChart3,
    laneLabel: "新客成交链",
    laneTone: "blue",
    customer: "木川空间设计（脱敏）",
    caseId: "OP-118",
    subtitle: "推进速度一旦变慢，重点名单会先浮出来。",
    customerInput: "最近两次跟进都在谈方案方向，但核心预算和落地时间没有继续推进，阶段却从 30% 被手动提到了 40%。",
    aiAction: "AI 对比有效触达、缺失字段和阶段变化，识别这条商机卡在需求确认，不把表面的活跃误判成真实推进。",
    humanAction: "主管加入下轮沟通，销售补需求深度和预算信息，避免继续在热闹里空转。",
    managerView: "管理者会先看到哪些商机在真推进、哪些对象只是表面更新、哪些地方需要自己介入。",
    salesView: "销售拿到的是卡点提示和下一步动作，不用自己靠感觉判断这单到底卡在哪。",
    currentOutput: "卡点诊断、主管关注名单、下一步推进动作和需补字段。",
    boardSummary: "主管优先级名单已经刷新，资源会先投到卡住却值得继续推进的对象上。",
    metrics: [
      { label: "今日新增线索", value: "18", note: "新增端仍在沉淀", tone: "blue" },
      { label: "有效推进商机", value: "9", note: "重点推进对象上浮", tone: "emerald" },
      { label: "高风险续费", value: "2", note: "续费风险保持稳定", tone: "violet" },
      { label: "待主管处理", value: "3", note: "卡点复盘需要介入", tone: "amber" },
    ],
    focusList: [
      { company: "木川空间设计", tag: "卡点上浮", action: "主管加入复盘" },
      { company: "云栖家居服务", tag: "继续推进", action: "准备二次方案" },
      { company: "北川商用设备", tag: "停滞", action: "确认是否继续投入" },
    ],
    ledgerChanges: [
      { label: "当前阶段", value: "40%" },
      { label: "识别卡点", value: "需求确认不足" },
      { label: "需补字段", value: "预算 / 上线时间" },
      { label: "主管建议", value: "带脚本复盘" },
    ],
  },
  {
    id: "proposal-close",
    stageNo: "05",
    title: "方案、报价与成交",
    trackHint: "AI 辅助准备，销售完成成交",
    icon: Handshake,
    laneLabel: "新客成交链",
    laneTone: "blue",
    customer: "北川商用设备（脱敏）",
    caseId: "DEAL-044",
    subtitle: "系统给出准备依据，真正影响签约的动作仍由人完成。",
    customerInput: "客户开始比较价格、投放周期和效果承诺，希望先看到一版试跑方案再决定是否签约。",
    aiAction: "AI 汇总客户顾虑、报价准备要点和风险提醒，帮助销售与主管在沟通前把异议准备完整。",
    humanAction: "销售推进方案沟通、报价、资源协调和关键谈判，主管在必要时加入拍板。",
    managerView: "管理者最后看到的是哪些单接近签约、哪些报价需要自己拍板、哪些对象值得加资源。",
    salesView: "销售继续谈方案、谈价格、锁时间，系统提供的是准备依据和过程辅助。",
    currentOutput: "提案版本、异议标签、报价准备重点和成交推进状态。",
    boardSummary: "最接近成交的对象已经浮到前排，主管知道今天该把时间放在哪几单上。",
    metrics: [
      { label: "今日新增线索", value: "18", note: "新增端继续补充", tone: "blue" },
      { label: "有效推进商机", value: "10", note: "有 1 单进入报价阶段", tone: "emerald" },
      { label: "高风险续费", value: "2", note: "续费风险暂未新增", tone: "violet" },
      { label: "待主管处理", value: "2", note: "关键报价等待拍板", tone: "amber" },
    ],
    focusList: [
      { company: "北川商用设备", tag: "接近签约", action: "确认最终报价" },
      { company: "云栖家居服务", tag: "二次方案", action: "锁定沟通时间" },
      { company: "木川空间设计", tag: "继续推进", action: "补需求深度" },
    ],
    ledgerChanges: [
      { label: "方案版本", value: "试跑方案 V2" },
      { label: "客户顾虑", value: "效果稳定性 / 预算节奏" },
      { label: "当前动作", value: "等待最终报价" },
      { label: "成交状态", value: "持续推进" },
    ],
  },
  {
    id: "lifecycle-monitor",
    stageNo: "06",
    title: "客户生命周期监控",
    trackHint: "AI 巡检存量，团队只管重点",
    icon: BriefcaseBusiness,
    laneLabel: "老客续费链",
    laneTone: "emerald",
    customer: "青禾亲子营地（脱敏）",
    caseId: "ACC-203",
    subtitle: "存量客户不用全靠人盯，AI 会持续巡检健康度和活跃状态。",
    customerInput: "客户最近使用波动、联系间隔拉长、服务提单增加，但还没有进入明显流失状态。",
    aiAction: "AI 持续巡检客户价值、活跃度、联系频率和服务状态，输出客户分层结果和推荐跟进节奏。",
    humanAction: "客户成功只处理高价值异常与需要升级的对象，销售回访重点客户。",
    managerView: "管理者看到的是存量客户健康度、重点维护名单和哪些对象需要提前关心。",
    salesView: "销售拿到的是值得回访的重点客户和优先顺序，不需要自己再从整张存量表里翻找。",
    currentOutput: "客户分层、活跃标签、推荐节奏和需升级处理的异常对象。",
    boardSummary: "存量客户状态被持续盯住，真正值得维护的对象会自动回到团队视野里。",
    metrics: [
      { label: "今日新增线索", value: "18", note: "新增端和存量端并行", tone: "blue" },
      { label: "有效推进商机", value: "10", note: "新客推进不受影响", tone: "emerald" },
      { label: "高风险续费", value: "3", note: "存量端出现新风险", tone: "violet" },
      { label: "待主管处理", value: "2", note: "客户成功可先行处理", tone: "amber" },
    ],
    focusList: [
      { company: "青禾亲子营地", tag: "重点维护", action: "本周回访一次" },
      { company: "星舟教育中心", tag: "风险上升", action: "提前准备续费方案" },
      { company: "远舟健身工作室", tag: "活跃下降", action: "确认服务状态" },
    ],
    ledgerChanges: [
      { label: "客户分层", value: "重点维护" },
      { label: "活跃状态", value: "轻度下滑" },
      { label: "跟进节奏", value: "本周回访" },
      { label: "升级处理", value: "暂不需要" },
    ],
  },
  {
    id: "renewal-risk",
    stageNo: "07",
    title: "流失预警与续费拦截",
    trackHint: "AI 排风险，主管决定先救谁",
    icon: ShieldAlert,
    laneLabel: "老客续费链",
    laneTone: "emerald",
    customer: "星舟教育中心（脱敏）",
    caseId: "SAVE-077",
    subtitle: "高价值和高风险对象一旦露头，会先被抬进优先处理队列。",
    customerInput: "最近两周使用明显下滑，账户余额接近预警线，负责人 8 天没有有效跟进，客户还提到上次服务问题迟迟没人回访。",
    aiAction: "AI 结合到期窗口、余额、使用下滑和服务异常，给出风险等级、优先级名单和建议动作。",
    humanAction: "主管决定先救谁、怎么谈、是否联动客户成功；销售补续费方案，客户成功先修复服务问题。",
    managerView: "管理者最后看到的是今天最需要先救的客户、风险等级和干预顺序，能直接决定资源先投向哪里。",
    salesView: "销售拿到的是已经排好优先级的续费对象和下一步动作，不需要再自己从表里找风险。",
    currentOutput: "P1/P2/P3 风险名单、干预建议、协同角色和 24 小时优先事项。",
    boardSummary: "续费优先级刚刷新，主管知道今天该先把资源投向哪几个高价值高风险客户。",
    metrics: [
      { label: "今日新增线索", value: "18", note: "新增端持续沉淀", tone: "blue" },
      { label: "有效推进商机", value: "10", note: "新客推进保持稳定", tone: "emerald" },
      { label: "高风险续费", value: "4", note: "今天新增 1 个 P1 对象", tone: "violet" },
      { label: "待主管处理", value: "4", note: "续费挽回需要拍板", tone: "amber" },
    ],
    focusList: [
      { company: "星舟教育中心", tag: "P1 风险", action: "24 小时内补方案" },
      { company: "青禾亲子营地", tag: "服务敏感", action: "主管确认回访节奏" },
      { company: "远舟健身工作室", tag: "P2 风险", action: "本周完成预热沟通" },
    ],
    ledgerChanges: [
      { label: "风险等级", value: "P1" },
      { label: "续费窗口", value: "12 天内" },
      { label: "主要信号", value: "使用下滑 / 8 天未跟进" },
      { label: "协同角色", value: "销售 + 主管 + 客户成功" },
    ],
  },
  {
    id: "review-iterate",
    stageNo: "08",
    title: "复盘与规则迭代",
    trackHint: "AI 汇总案例，主管定规则",
    icon: RefreshCw,
    laneLabel: "复盘迭代",
    laneTone: "violet",
    customer: "本周经营复盘（脱敏）",
    caseId: "REVIEW-008",
    subtitle: "一轮动作结束后，系统会继续沉淀结果，帮助团队把经验变成下一轮规则。",
    customerInput: "本周新客推进结果、失单原因、续费挽回结果和人工反馈已经全部回到账本里。",
    aiAction: "AI 汇总动作结果、成功样本、高频卡点和需要调整的规则，为下一轮业务模块优化提供依据。",
    humanAction: "主管确定审批边界、经营规则和下一轮要继续加深的模块，销售按新规则进入下周节奏。",
    managerView: "管理者最后看到的是本周新增、推进、风险和结果变化，以及下周应该优先优化哪一段流程。",
    salesView: "销售拿到的是更清晰的下周动作标准和重点对象，不用重复踩同样的坑。",
    currentOutput: "复盘结论、规则变更项、下周重点动作和下一轮模块优化建议。",
    boardSummary: "系统把一周的动作结果沉淀成经营复盘，下一轮优化从哪里下手已经很清楚。",
    metrics: [
      { label: "今日新增线索", value: "18", note: "新增端数据已沉淀", tone: "blue" },
      { label: "有效推进商机", value: "10", note: "可继续进入下周推进", tone: "emerald" },
      { label: "高风险续费", value: "3", note: "1 个对象已进入挽回中", tone: "violet" },
      { label: "待主管处理", value: "1", note: "只剩规则拍板项", tone: "amber" },
    ],
    focusList: [
      { company: "木川空间设计", tag: "卡点复盘", action: "补需求确认脚本" },
      { company: "星舟教育中心", tag: "挽回中", action: "明日 10:00 复查" },
      { company: "云栖家居服务", tag: "下周重点", action: "进入报价准备" },
    ],
    ledgerChanges: [
      { label: "本周复盘", value: "新增 / 推进 / 风险已汇总" },
      { label: "规则调整", value: "高风险客户提前预热" },
      { label: "下周重点", value: "补需求确认脚本" },
      { label: "新增模块诉求", value: "报价准备辅助" },
    ],
  },
];

function MetricValue({ value, tone }: { value: string; tone: ToneKey }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={value}
        initial={{ opacity: 0.35, y: 6, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0.35, y: -6, scale: 1.02 }}
        transition={{ duration: 0.22 }}
        className={`mt-2 block text-3xl font-semibold ${TONE_META[tone].value}`}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  );
}

export default function HomepageSkillDemo({
  skillName = "人机协作 AI 业务系统",
}: HomepageSkillDemoProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pausedRef = useRef(false);

  useEffect(() => {
    pausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const tick = () => {
      if (pausedRef.current) {
        timerRef.current = setTimeout(tick, 900);
        return;
      }

      setCurrentStep((prev) => (prev + 1) % STAGES.length);
      timerRef.current = setTimeout(tick, 4200);
    };

    timerRef.current = setTimeout(tick, 1800);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const currentStage = STAGES[currentStep];
  const nextStage = STAGES[(currentStep + 1) % STAGES.length];

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-black/70 shadow-[0_0_0_1px_rgba(255,255,255,0.03),0_30px_80px_rgba(0,0,0,0.45)]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-blue-500/20 bg-blue-500/10">
            <BriefcaseBusiness className="h-4 w-4 text-blue-300" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">{skillName}</p>
            <p className="text-xs text-gray-500">基于成熟业务节点模块封装，由 OpenClaw 作为 Agent 智能体底座承载并持续协作运行。</p>
          </div>
        </div>

        <button
          onClick={() => setIsPaused(!isPaused)}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-gray-300 transition-colors hover:border-white/20 hover:text-white"
        >
          {isPaused ? (
            <>
              <Play className="h-3.5 w-3.5" />
              继续播放
            </>
          ) : (
            <>
              <Pause className="h-3.5 w-3.5" />
              暂停轮播
            </>
          )}
        </button>
      </div>

      <div className="border-b border-white/10 bg-white/[0.02] px-4 py-3">
        <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gray-500">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1">现有销售流程</span>
          <ArrowRight className="h-3.5 w-3.5 text-gray-600" />
          <span className="rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-blue-300">业务节点模块</span>
          <ArrowRight className="h-3.5 w-3.5 text-gray-600" />
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-300">OpenClaw AI 协作</span>
          <ArrowRight className="h-3.5 w-3.5 text-gray-600" />
          <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-amber-300">人工接手与管理结果</span>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(59,130,246,0.12),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.12),transparent_24%)]" />

        <div className="grid gap-5 p-4 xl:grid-cols-[320px_1fr] xl:items-start xl:p-5">
          <aside className="min-w-0">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <Radar className="h-4 w-4 text-blue-400" />
                    <span className="text-xs uppercase tracking-[0.18em] text-gray-500">8 个业务节点</span>
                  </div>
                  <p className="text-xs leading-relaxed text-gray-400">
                    这里按真实业务链展示人机交互节点。右侧会同步展示 AI 协作、人工接手和管理侧最终看到的结果。
                  </p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-gray-500">
                  当前 {currentStage.stageNo}
                </span>
              </div>

              <div className="relative space-y-3">
                {STAGES.map((stage, index) => {
                  const Icon = stage.icon;
                  const isActive = index === currentStep;
                  const isPast = index < currentStep;
                  return (
                    <div key={stage.id} className="relative flex items-start gap-3">
                      {index < STAGES.length - 1 && (
                        <div
                          className={`absolute left-[13px] top-10 h-11 w-px ${
                            isPast ? "bg-emerald-500/80" : "bg-white/10"
                          }`}
                        />
                      )}

                      <motion.div
                        initial={false}
                        animate={{
                          backgroundColor: isActive
                            ? "rgba(59, 130, 246, 0.18)"
                            : isPast
                              ? "rgba(16, 185, 129, 0.18)"
                              : "rgba(255, 255, 255, 0.04)",
                          borderColor: isActive
                            ? "rgba(59, 130, 246, 0.7)"
                            : isPast
                              ? "rgba(16, 185, 129, 0.7)"
                              : "rgba(255, 255, 255, 0.12)",
                        }}
                        transition={{ duration: 0.25 }}
                        className="z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border"
                      >
                        {isPast ? (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-300" />
                        ) : (
                          <Icon className={`h-3.5 w-3.5 ${isActive ? "text-blue-300" : "text-gray-500"}`} />
                        )}
                      </motion.div>

                      <motion.div
                        initial={false}
                        animate={{ opacity: isActive ? 1 : isPast ? 0.82 : 0.56 }}
                        className="min-w-0 flex-1 pb-2"
                      >
                        <div className="mb-1 flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-[0.18em] text-gray-500">{stage.stageNo}</span>
                          <span className="truncate text-sm font-medium text-white">{stage.title}</span>
                        </div>
                        <p className="text-xs leading-relaxed text-gray-500">{stage.trackHint}</p>
                      </motion.div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-black/25 p-4">
                <div className="mb-2 text-[11px] uppercase tracking-[0.18em] text-gray-500">当前节点摘要</div>
                <p className="text-sm leading-relaxed text-gray-300">{currentStage.subtitle}</p>
              </div>
            </div>
          </aside>

          <section className="min-w-0">
            <div className="rounded-[28px] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-5">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em] ${TONE_META[currentStage.laneTone].pill}`}>
                  {currentStage.laneLabel}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gray-400">
                  节点 {currentStage.stageNo}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-gray-500">
                  {currentStage.caseId}
                </span>
              </div>

              <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
                <div className="max-w-3xl">
                  <div className="mb-2 text-sm font-medium text-gray-300">{currentStage.customer}</div>
                  <h3 className="text-3xl font-semibold tracking-tight text-white md:text-[2.2rem]">
                    {currentStage.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-sm leading-relaxed text-gray-300">
                    {currentStage.subtitle}
                  </p>
                </div>

                <div className={`rounded-3xl border px-4 py-3 ${TONE_META[currentStage.laneTone].glow}`}>
                  <div className="text-[10px] uppercase tracking-[0.18em] text-gray-300">当前业务链</div>
                  <div className="mt-1 text-sm text-white">{currentStage.laneLabel}</div>
                </div>
              </div>

              <div className="grid gap-3 xl:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                  <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                    <Bot className="h-3.5 w-3.5" />
                    AI 在过程中做什么
                  </div>
                  <p className="text-sm leading-relaxed text-gray-200">{currentStage.aiAction}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                  <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                    <UserRound className="h-3.5 w-3.5" />
                    销售现在在做什么
                  </div>
                  <p className="text-sm leading-relaxed text-gray-200">{currentStage.humanAction}</p>
                </div>

                <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
                  <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-blue-300">
                    <BarChart3 className="h-3.5 w-3.5" />
                    管理者最后看到什么
                  </div>
                  <p className="text-sm leading-relaxed text-white">{currentStage.managerView}</p>
                </div>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-2xl border border-white/10 bg-black/35 p-4">
                  <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-gray-500">
                    <BriefcaseBusiness className="h-3.5 w-3.5" />
                    当前客户输入
                  </div>
                  <p className="text-sm leading-relaxed text-gray-200">{currentStage.customerInput}</p>
                </div>

                <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-emerald-300">
                    <ClipboardList className="h-3.5 w-3.5" />
                    当前系统输出
                  </div>
                  <p className="text-sm leading-relaxed text-white">{currentStage.currentOutput}</p>
                </div>
              </div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-blue-400" />
                      <span className="text-xs uppercase tracking-[0.18em] text-gray-500">管理结果同步变化</span>
                    </div>
                    <p className="text-xs leading-relaxed text-gray-400">{currentStage.boardSummary}</p>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-gray-500">
                    只让变化的数字动起来
                  </span>
                </div>

                <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                  {currentStage.metrics.map((metric) => (
                    <div key={`${currentStage.id}-${metric.label}`} className={`rounded-2xl border p-3 ${TONE_META[metric.tone].glow}`}>
                      <div className="text-[11px] uppercase tracking-[0.16em] text-gray-400">{metric.label}</div>
                      <MetricValue value={metric.value} tone={metric.tone} />
                      <p className="mt-1 text-xs leading-relaxed text-gray-400">{metric.note}</p>
                      <div className="mt-3 h-1.5 rounded-full bg-white/8">
                        <div className={`h-full rounded-full ${TONE_META[metric.tone].line}`} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 grid gap-3 xl:grid-cols-[1.1fr_0.9fr]">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <ShieldAlert className="h-4 w-4 text-violet-300" />
                      <span className="text-xs uppercase tracking-[0.18em] text-gray-500">销售管理者最终看到的重点名单</span>
                    </div>
                    <div className="space-y-3">
                      {currentStage.focusList.map((item) => (
                        <div key={`${currentStage.id}-${item.company}`} className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                          <div className="mb-1 flex items-center justify-between gap-3">
                            <span className="text-sm font-medium text-white">{item.company}</span>
                            <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-gray-400">
                              {item.tag}
                            </span>
                          </div>
                          <p className="text-xs leading-relaxed text-gray-400">{item.action}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <div className="mb-3 flex items-center gap-2">
                      <Database className="h-4 w-4 text-emerald-300" />
                      <span className="text-xs uppercase tracking-[0.18em] text-gray-500">刚写回的台账变化</span>
                    </div>
                    <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                      {currentStage.ledgerChanges.map((field) => (
                        <div key={`${currentStage.id}-${field.label}`} className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-3">
                          <div className="mb-1 text-[10px] uppercase tracking-[0.18em] text-gray-500">{field.label}</div>
                          <div className="text-sm leading-relaxed text-white">{field.value}</div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3">
                      <div className="mb-1 text-[10px] uppercase tracking-[0.18em] text-amber-300">销售现在继续做什么</div>
                      <p className="text-sm leading-relaxed text-gray-100">{currentStage.salesView}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-3 md:flex-row md:items-center">
                <div>
                  <div className="mb-1 text-[10px] uppercase tracking-[0.18em] text-gray-500">下一轮即将切到</div>
                  <p className="text-sm font-medium text-white">{nextStage.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-gray-400">{nextStage.trackHint}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-gray-400">
                  节点 {nextStage.stageNo}
                </span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="border-t border-white/10 bg-emerald-500/10 p-4">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15">
              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-300" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">同一条业务主线里，AI 协作、人工接手和管理结果会持续回到一个系统里。</p>
              <p className="mt-1 text-xs leading-relaxed text-gray-400">
                如果你想看这套系统怎样按现有团队流程接入，可以继续进入解决方案页。
              </p>
            </div>
          </div>

          <Link
            href="/solutions"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-gray-200 transition-colors hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
          >
            查看接入方案
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
