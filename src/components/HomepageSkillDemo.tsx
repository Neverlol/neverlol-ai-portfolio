"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Brain, Sparkles, Zap, User, ArrowRight, Play, ArrowDown } from "lucide-react";

// Logo 图片（本地文件）
const OPENCLAW_LOGO_URL = "/openclaw-logo.png";
const FEISHU_LOGO_URL = "/feishu-logo.png";
const WECHAT_LOGO_URL = "/wechat-logo.png";
const QQ_LOGO_URL = "/qq-logo.png";

// 节点类型：智能体(agent) 或 人工(human)
type NodeType = "agent" | "human";

export interface PipelineNode {
  id: string;
  type: NodeType;
  name: string;
  skill?: string;
  input: string;
  output: string;
  strategyInput?: string;
  strategyOutput?: string;
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

// 全链路节点配置
const PIPELINE_NODES: PipelineNode[] = [
  {
    id: "lead-gen",
    type: "agent",
    name: "获客智能体",
    skill: "线索获取 Skill",
    input: "各渠道线索",
    output: "清洗后 3200 条有效线索",
    strategyInput: "原始线索数据",
    strategyOutput: "有效线索分类",
    strategyAction: "自动过滤无效线索，标准化格式",
  },
  {
    id: "human-followup",
    type: "human",
    name: "销售初步跟进",
    input: "3200 条有效线索",
    output: "获取需求、预算、决策人、Timeline",
    strategyInput: "跟进沟通记录",
    strategyOutput: "客户画像补充",
    strategyAction: "微信/飞书/电话沟通，记录关键信息",
  },
  {
    id: "scoring",
    type: "agent",
    name: "评分智能体",
    skill: "NLP 画像 Skill",
    input: "客户跟进记录 + 沟通内容",
    output: "A类 580 / B类 1200 / C类 1420",
    strategyInput: "沟通记录分析请求",
    strategyOutput: "客户分层结果",
    strategyAction: "NLP 分析沟通内容，自动提取标签",
  },
  {
    id: "routing",
    type: "agent",
    name: "路由智能体",
    skill: "分层策略 Skill",
    input: "A类 580 线索 + 销售 Skill 匹配",
    output: "按 Skill 分配给对应销售",
    strategyInput: "销售能力矩阵 + 客户画像",
    strategyOutput: "最优分配方案",
    strategyAction: "Skill 匹配 + 强制捆绑规则 + 负载均衡",
  },
  {
    id: "strategy",
    type: "agent",
    name: "策略智能体",
    skill: "策略建议 Skill",
    input: "A类 580 客户完整画像",
    output: "本周建议跟进 23 组高价值客户",
    strategyInput: "客户画像 + 历史跟进记录",
    strategyOutput: "个性化跟进策略",
    strategyAction: "分析最佳联系时机、话术重点、决策人突破口",
  },
  {
    id: "human-execute",
    type: "human",
    name: "销售执行跟进",
    input: "策略建议 + 客户信息",
    output: "本周成交 23 单，金额 ¥46.8 万",
    strategyInput: "策略建议执行",
    strategyOutput: "跟进结果反馈",
    strategyAction: "按策略执行，微信/飞书/电话跟进，汇报结果",
  },
  {
    id: "order",
    type: "agent",
    name: "订单管理",
    skill: "CRM 自动录入",
    input: "成交订单信息",
    output: "订单状态跟踪、交付进度",
    strategyInput: "订单数据",
    strategyOutput: "订单生命周期",
    strategyAction: "自动创建订单记录，关联客户、交付、收款",
  },
  {
    id: "lifecycle",
    type: "agent",
    name: "生命周期监控",
    skill: "180天监控 Skill",
    input: "所有成交客户状态",
    output: "23 个高风险客户预警",
    strategyInput: "客户健康度数据",
    strategyOutput: "风险等级 + 预警",
    strategyAction: "监控 180 天生命周期阶段，发现异常自动预警",
  },
  {
    id: "human-intervention",
    type: "human",
    name: "人工干预",
    input: "预警客户列表 + 策略建议",
    output: "问题确认已解决 / 需继续跟进",
    strategyInput: "干预策略",
    strategyOutput: "干预结果",
    strategyAction: "收到预警后按策略执行干预，确认是否解决",
  },
  {
    id: "renewal",
    type: "agent",
    name: "续费智能体",
    skill: "续费预测 Skill",
    input: "到期前 60 天客户列表",
    output: "续费意向预测 + 跟进优先级",
    strategyInput: "续费窗口期客户",
    strategyOutput: "续费概率 + 推荐策略",
    strategyAction: "提前 60 天启动续费流程，生成续费方案",
  },
];

// IM 渠道标识
const IM_CHANNELS = [
  { name: "飞书", icon: FEISHU_LOGO_URL },
  { name: "微信", icon: WECHAT_LOGO_URL },
  { name: "QQ", icon: QQ_LOGO_URL },
];

// L1 的 4 步与 L2 的 10 步对应关系
const L1_L2_MAPPING = [
  { l1: "获客", l2Nodes: ["获客智能体"] },
  { l1: "筛选", l2Nodes: ["评分智能体", "路由智能体"] },
  { l1: "跟进", l2Nodes: ["策略智能体", "销售执行跟进"] },
  { l1: "复购", l2Nodes: ["订单管理", "生命周期监控", "人工干预", "续费智能体"] },
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
              <img src={OPENCLAW_LOGO_URL} alt="OpenClaw" className="w-3.5 h-3.5 object-contain" />
              小龙虾 全链路
            </span>
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
              const Icon = node.type === "agent" ? Sparkles : User;

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
                        ? node.type === "agent" ? "rgba(59, 130, 246, 0.2)" : "rgba(168, 85, 247, 0.2)"
                        : isPast
                        ? "rgba(34, 197, 94, 0.2)"
                        : "rgba(255, 255, 255, 0.05)",
                      borderColor: isActive
                        ? node.type === "agent" ? "#3b82f6" : "#a855f7"
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
                      {node.type === "agent" && (
                        <span className={`text-[8px] px-1 py-0.5 rounded ${colors.badge}`}>AI</span>
                      )}
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
            <span className={`text-[10px] px-2 py-0.5 rounded ${currentNode.type === "agent" ? colors.badge : "bg-purple-500/20 text-purple-400"}`}>
              {currentNode.type === "agent" ? "智能体" : "人工"}
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
                currentNode.type === "agent"
                  ? "border-blue-500/50 bg-blue-500/10"
                  : "border-purple-500/50 bg-purple-500/10"
              }`}>
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 rounded-lg ${currentNode.type === "agent" ? colors.bg : "bg-purple-500/10"} flex items-center justify-center`}>
                  {currentNode.type === "agent" ? (
                    <Sparkles className={`w-5 h-5 ${colors.icon}`} />
                  ) : (
                    <User className="w-5 h-5 text-purple-400" />
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium text-white flex items-center gap-2">
                    {currentNode.name}
                    {currentNode.type === "agent" && (
                      <img src={OPENCLAW_LOGO_URL} alt="OpenClaw" className="w-4 h-4 object-contain" />
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
                全链路循环播放中
                <img src={OPENCLAW_LOGO_URL} alt="OpenClaw" className="w-4 h-4 object-contain" />
              </p>
              <p className="text-gray-400 text-xs">
                智能体自动监控、预警，人执行关键干预。策略已推送至飞书/微信/QQ
              </p>
            </div>
          </div>
          <a
            href="/#portfolio"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:border-white/30 transition-all shrink-0"
          >
            看看这些 Skill 怎么落地
            <ArrowDown className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
