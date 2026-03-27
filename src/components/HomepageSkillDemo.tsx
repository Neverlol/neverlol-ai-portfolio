"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Brain, Sparkles, Zap, User, ArrowRight, Play, ArrowDown, Boxes } from "lucide-react";
import Link from "next/link";

// Logo 图片（本地文件）
const OPENCLAW_LOGO_URL = "/openclaw-logo.png";
const FEISHU_LOGO_URL = "/feishu-logo.png";
const WECHAT_LOGO_URL = "/wechat-logo.png";
const QQ_LOGO_URL = "/qq-logo.png";

// 节点类型：已封装 Skill / 人工 / 可定制扩展
type NodeType = "skill" | "human" | "planned";

export interface PipelineNode {
  id: string;
  type: NodeType;
  name: string;
  skill?: string;
  input: string;
  output: string;
  strategyAction?: string;
}

interface HomepageSkillDemoProps {
  skillName?: string;
  color?: "blue" | "purple" | "red" | "amber";
}

const colorMap = {
  blue: { accent: "border-blue-500/50", text: "text-blue-400", bg: "bg-blue-500/10", glow: "shadow-blue-500/20", bar: "bg-blue-500", icon: "text-blue-400", badge: "bg-blue-500/20 text-blue-400" },
  purple: { accent: "border-purple-500/50", text: "text-purple-400", bg: "bg-purple-500/10", glow: "shadow-purple-500/20", bar: "bg-purple-500", icon: "text-purple-400", badge: "bg-purple-500/20 text-purple-400" },
  red: { accent: "border-red-500/50", text: "text-red-400", bg: "bg-red-500/10", glow: "shadow-red-500/20", bar: "bg-red-500", icon: "text-red-400", badge: "bg-red-500/20 text-red-400" },
  amber: { accent: "border-amber-500/50", text: "text-amber-400", bg: "bg-amber-500/10", glow: "shadow-amber-500/20", bar: "bg-amber-500", icon: "text-amber-400", badge: "bg-amber-500/20 text-amber-400" },
};

const nodeTypeMeta = {
  skill: {
    label: "已封装 Skill",
    badge: "bg-blue-500/20 text-blue-400",
    border: "#3b82f6",
    activeBg: "rgba(59, 130, 246, 0.2)",
    icon: Sparkles,
  },
  human: {
    label: "人工判断",
    badge: "bg-purple-500/20 text-purple-400",
    border: "#a855f7",
    activeBg: "rgba(168, 85, 247, 0.2)",
    icon: User,
  },
  planned: {
    label: "可定制扩展",
    badge: "bg-white/10 text-gray-300",
    border: "#6b7280",
    activeBg: "rgba(107, 114, 128, 0.2)",
    icon: Boxes,
  },
} as const;

// 全链路蓝图节点配置
const PIPELINE_NODES: PipelineNode[] = [
  {
    id: "lead-intake",
    type: "planned",
    name: "线索进入",
    skill: "可定制接入",
    input: "表单 / 企微 / 转介绍 / 存量名单",
    output: "进入客户自有线索池",
    strategyAction: "按客户当前渠道结构接入线索，并预留后续清洗、去重和标签扩展能力",
  },
  {
    id: "first-touch",
    type: "human",
    name: "销售首次触达",
    input: "进入线索池的客户名单",
    output: "聊天记录 / 通话纪要 / 拜访反馈",
    strategyAction: "销售通过微信、飞书、电话建立信任，判断客户真实意图并收集一手信息",
  },
  {
    id: "crm-auto-fill",
    type: "skill",
    name: "crm-auto-fill",
    skill: "input / output schema 已就绪",
    input: "聊天记录 / 通话纪要 / 拜访笔记",
    output: "结构化 CRM 字段 + 缺失字段提醒",
    strategyAction: "自动抽取公司名、需求、预算、决策人、Timeline、当前阶段和下一步动作",
  },
  {
    id: "funnel-doctor",
    type: "skill",
    name: "funnel-doctor",
    skill: "漏斗诊断规则已就绪",
    input: "商机记录 + 当前阶段 + 有效触达次数",
    output: "卡点诊断 + 缺失字段 + 下一步动作",
    strategyAction: "识别商机推进卡点、责任归属与经理动作建议，把主管脑中的判断标准显性化",
  },
  {
    id: "sales-push",
    type: "human",
    name: "销售推进 / 谈判",
    input: "诊断建议 + 客户反馈 + 现场判断",
    output: "报价进展 / 异议记录 / 成交推进",
    strategyAction: "销售基于现场信息推进报价、谈判、资源协调和关键承诺",
  },
  {
    id: "customer-profiler",
    type: "skill",
    name: "customer-profiler",
    skill: "客户分层规则已就绪",
    input: "客户行为 + 最近联系记录 + 价值等级",
    output: "客户分层 + 跟进节奏 + 推荐动作",
    strategyAction: "将客户分成高净值、需关怀、沉睡边缘等类型，并生成 owner cadence 与推荐动作",
  },
  {
    id: "renewal-watch",
    type: "skill",
    name: "renewal-watch",
    skill: "续费预警规则已就绪",
    input: "续费窗口客户 + 余额 / 使用 / 服务异常",
    output: "P1 / P2 / P3 风险名单 + 优先级",
    strategyAction: "预测续费风险、标记关键信号，并给出优先级名单与推荐干预动作",
  },
  {
    id: "save-intervention",
    type: "human",
    name: "人工干预 / 续费挽回",
    input: "优先级名单 + 推荐动作",
    output: "挽回结果 + 下轮策略反馈",
    strategyAction: "客户成功或销售按风险优先级执行挽回，并把结果回写系统用于后续迭代",
  },
];

// IM 渠道标识
const IM_CHANNELS = [
  { name: "飞书", icon: FEISHU_LOGO_URL },
  { name: "微信", icon: WECHAT_LOGO_URL },
  { name: "QQ", icon: QQ_LOGO_URL },
];

// L1 的 4 步与 L2 蓝图节点对应关系
const L1_L2_MAPPING = [
  { l1: "获客", l2Nodes: ["线索进入", "销售首次触达"] },
  { l1: "筛选", l2Nodes: ["crm-auto-fill", "funnel-doctor"] },
  { l1: "跟进", l2Nodes: ["销售推进 / 谈判"] },
  { l1: "复购", l2Nodes: ["customer-profiler", "renewal-watch", "人工干预 / 续费挽回"] },
];

export default function HomepageSkillDemo({
  skillName = "销售全链路人机协作",
  color = "blue",
}: HomepageSkillDemoProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const colors = colorMap[color];
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const isPausedRef = useRef(false);

  // 监听暂停状态
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  // 自动循环播放
  useEffect(() => {
    const runStep = () => {
      if (isPausedRef.current) {
        timerRef.current = setTimeout(runStep, 1000);
        return;
      }

      setCurrentStep((prev) => {
        const next = prev + 1;
        if (next >= PIPELINE_NODES.length) {
          // 循环回到开始
          return 0;
        }
        return next;
      });

      timerRef.current = setTimeout(runStep, 3500); // 每步 3.5 秒
    };

    // 初始延迟后开始
    timerRef.current = setTimeout(runStep, 1500);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const currentNode = PIPELINE_NODES[currentStep];

  return (
    <div className="rounded-xl border border-white/10 bg-black/60 overflow-hidden">
      {/* 顶部标题栏 */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={OPENCLAW_LOGO_URL} alt="OpenClaw" className="w-5 h-5 object-contain" />
          <span className="text-sm font-medium text-white">{skillName}</span>
        </div>
        <button
          onClick={() => setIsPaused(!isPaused)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${colors.bg} ${colors.text} border ${colors.accent} hover:opacity-80`}
        >
          {isPaused ? (
            <>
              <Play className="w-3 h-3" />
              继续
            </>
          ) : (
            <>
              <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
              暂停
            </>
          )}
        </button>
      </div>

      {/* IM 渠道展示 */}
      <div className="px-4 py-2 bg-white/[0.02] border-b border-white/10 flex items-center gap-4">
        <span className="text-[10px] text-gray-500 uppercase">人机交互发生在你熟悉的 IM 里</span>
        <div className="flex items-center gap-4">
          {IM_CHANNELS.map((channel) => (
            <div key={channel.name} className="flex items-center gap-1.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={channel.icon} alt={channel.name} className="w-4 h-4 object-contain" />
              <span className="text-xs text-gray-400">{channel.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 主体内容区 - 左链路 右策略详情 */}
      <div className="flex flex-col lg:flex-row">
        {/* 左侧: 全链路 */}
        <div className="w-full lg:w-72 p-4 border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <Brain className={`w-4 h-4 ${colors.text}`} />
            <span className="text-xs text-gray-400 flex items-center gap-1.5">
              OpenClaw
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={OPENCLAW_LOGO_URL} alt="OpenClaw" className="w-3.5 h-3.5 object-contain" />
              目标工作流蓝图
            </span>
          </div>

          <div className="mb-4 rounded-lg border border-white/10 bg-white/[0.03] p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] uppercase text-gray-500">当前状态</span>
              <span className="text-[10px] text-gray-400">4 个已封装 / 3 个人工 / 1 个扩展入口</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className={`text-[10px] px-2 py-1 rounded ${nodeTypeMeta.skill.badge}`}>已封装 Skill</span>
              <span className={`text-[10px] px-2 py-1 rounded ${nodeTypeMeta.human.badge}`}>人工判断</span>
              <span className={`text-[10px] px-2 py-1 rounded ${nodeTypeMeta.planned.badge}`}>可定制扩展</span>
            </div>
          </div>

          {/* L1 → L2 对应关系说明 */}
          <div className="mb-4 p-3 rounded-lg bg-white/[0.02] border border-white/5">
            <div className="text-[10px] text-gray-500 uppercase mb-2">4 步闭环如何细化</div>
            <div className="space-y-2">
              {L1_L2_MAPPING.map((mapping, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[10px] text-blue-400 font-medium shrink-0 w-8">{mapping.l1}</span>
                  <span className="text-gray-600">→</span>
                  <span className="text-[10px] text-gray-400">{mapping.l2Nodes.join(" / ")}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 竖向 Pipeline */}
          <div className="relative">
            {PIPELINE_NODES.map((node, index) => {
              const isActive = index === currentStep;
              const isPast = index < currentStep;
              const Icon = nodeTypeMeta[node.type].icon;

              return (
                <div key={node.id} className="relative flex items-start gap-3">
                  {/* 连接线 */}
                  {index < PIPELINE_NODES.length - 1 && (
                    <div className={`absolute left-[11px] top-7 w-0.5 h-6 ${isPast ? colors.bar : "bg-white/10"}`} />
                  )}

                  {/* 节点图标 */}
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: isActive
                        ? nodeTypeMeta[node.type].activeBg
                        : isPast
                        ? "rgba(34, 197, 94, 0.2)"
                        : "rgba(255, 255, 255, 0.05)",
                      borderColor: isActive
                        ? nodeTypeMeta[node.type].border
                        : isPast
                        ? "#22c55e"
                        : "rgba(255, 255, 255, 0.2)",
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${isActive ? "shadow-lg" : ""}`}
                  >
                    {isPast ? (
                      <CheckCircle className={`w-3 h-3 ${colors.text}`} />
                    ) : (
                      <Icon className={`w-3 h-3 ${isActive ? colors.text : "text-gray-500"}`} />
                    )}
                  </motion.div>

                  {/* 文字 */}
                  <motion.div
                    initial={false}
                    animate={{
                      color: isActive ? "#ffffff" : isPast ? "#22c55e" : "#9ca3af",
                    }}
                    transition={{ duration: 0.3 }}
                    className="pt-0.5 flex-1 min-w-0"
                  >
                    <div className="text-xs font-medium flex items-center gap-1.5 truncate">
                      {node.name}
                      <span className={`text-[8px] px-1 py-0.5 rounded ${nodeTypeMeta[node.type].badge}`}>
                        {nodeTypeMeta[node.type].label}
                      </span>
                      {isActive && (
                        <span className={`text-[8px] px-1 py-0.5 rounded ${colors.badge}`}>
                          进行中
                        </span>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 右侧: 策略详情 */}
        <div className="flex-1 p-4 bg-black/40">
          <div className="flex items-center gap-2 mb-4">
            <Zap className={`w-4 h-4 ${colors.text}`} />
            <span className="text-xs text-gray-400 flex items-center gap-2">
              正在演示 · {currentStep + 1}/{PIPELINE_NODES.length}
            </span>
            <div className="flex-1" />
            <span className={`text-[10px] px-2 py-0.5 rounded ${nodeTypeMeta[currentNode.type].badge}`}>
              {nodeTypeMeta[currentNode.type].label}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {/* 当前节点信息 */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`p-4 rounded-lg border ${
                currentNode.type === "skill"
                  ? "border-blue-500/50 bg-blue-500/10"
                  : currentNode.type === "human"
                  ? "border-purple-500/50 bg-purple-500/10"
                  : "border-white/10 bg-white/[0.03]"
              }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${currentNode.type === "skill" ? colors.bg : currentNode.type === "human" ? "bg-purple-500/10" : "bg-white/10"} flex items-center justify-center`}>
                  {currentNode.type === "skill" ? (
                    <Sparkles className={`w-5 h-5 ${colors.icon}`} />
                  ) : currentNode.type === "human" ? (
                    <User className="w-5 h-5 text-purple-400" />
                  ) : (
                    <Boxes className="w-5 h-5 text-gray-300" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-white flex items-center gap-2">
                    {currentNode.name}
                    {currentNode.type === "skill" && (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={OPENCLAW_LOGO_URL} alt="OpenClaw" className="w-4 h-4 object-contain" />
                      </>
                    )}
                  </div>
                  {currentNode.skill && (
                    <div className="text-xs text-gray-400">调用 {currentNode.skill}</div>
                  )}
                </div>
              </div>

              {/* 策略执行详情 */}
              <div className="space-y-3 mt-4">
                {/* 输入 */}
                <div>
                  <div className="text-[10px] text-gray-500 uppercase mb-1.5 flex items-center gap-1">
                    <ArrowRight className="w-2.5 h-2.5" /> 输入
                  </div>
                  <div className="text-xs text-gray-300 bg-black/40 p-2 rounded border border-white/5">
                    {currentNode.input}
                  </div>
                </div>

                {/* 执行动作 */}
                <div>
                  <div className="text-[10px] text-gray-500 uppercase mb-1.5 flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" /> 执行动作
                  </div>
                  <div className="text-xs text-gray-300 bg-black/40 p-2 rounded border border-white/5">
                    {currentNode.strategyAction}
                  </div>
                </div>

                {/* 输出 */}
                <div>
                  <div className="text-[10px] text-gray-500 uppercase mb-1.5 flex items-center gap-1">
                    <CheckCircle className="w-2.5 h-2.5" /> 输出
                  </div>
                  <div className={`text-xs ${colors.text} bg-black/40 p-2 rounded border border-white/5 font-medium`}>
                    {currentNode.output}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* 下一节点预览 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 flex items-center gap-2 text-xs text-gray-500"
          >
            <span>下一个:</span>
            <span className="text-gray-400">{PIPELINE_NODES[(currentStep + 1) % PIPELINE_NODES.length].name}</span>
            {PIPELINE_NODES[(currentStep + 1) % PIPELINE_NODES.length].type === "human" && (
              <span className="text-purple-400">(需人工执行)</span>
            )}
            {PIPELINE_NODES[(currentStep + 1) % PIPELINE_NODES.length].type === "planned" && (
              <span className="text-gray-400">(按客户流程定制)</span>
            )}
          </motion.div>

          {/* 进度条 */}
          <div className="mt-4">
            <div className="flex justify-between text-[10px] text-gray-500 mb-1">
              <span>进度</span>
              <span>{currentStep + 1}/{PIPELINE_NODES.length}</span>
            </div>
            <div className="flex gap-0.5">
              {PIPELINE_NODES.map((_, i) => {
                const progress = (i - (currentStep % PIPELINE_NODES.length) + PIPELINE_NODES.length) % PIPELINE_NODES.length;
                const isCurrent = i === currentStep;
                return (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      isCurrent ? colors.bar :
                      progress < PIPELINE_NODES.length / 2 ? colors.bar + "/30" :
                      "bg-white/10"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 底部状态栏 */}
      <div className="p-3 bg-green-500/10 border-t border-white/10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-4 h-4 text-green-400" />
            </div>
            <div>
              <p className="text-white text-sm font-medium flex items-center gap-2">
                蓝图循环播放中
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={OPENCLAW_LOGO_URL} alt="OpenClaw" className="w-4 h-4 object-contain" />
              </p>
              <p className="text-gray-400 text-xs">
                已封装 4 个核心 Skill，其余节点将在客户业务访谈后按真实流程定制
              </p>
            </div>
          </div>
          <Link
            href="/#portfolio"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:border-white/30 transition-all shrink-0"
          >
            看看这些 Skill 怎么落地
            <ArrowDown className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
