"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Github, Zap, Database, Brain, Route, CheckCircle, AlertCircle } from "lucide-react";
import { motion as motionFramer } from "framer-motion";

interface PipelineStep {
  id: string;
  label: string;
  description: string;
  icon: typeof Database;
  annotation: string;
  highlight?: boolean; // 标记这是 Skill 要替代的环节
}

interface TerminalDemoProps {
  skillName: string;
  command: string;
  inputData?: string;
  problem?: string;
  whyTraditionalFails?: string;
  steps?: string[];
  githubUrl?: string;
  color?: "blue" | "purple" | "red" | "amber";
}

const colorMap = {
  blue: { accent: "border-blue-500/50", text: "text-blue-400", bg: "bg-blue-500/10", glow: "shadow-blue-500/20" },
  purple: { accent: "border-purple-500/50", text: "text-purple-400", bg: "bg-purple-500/10", glow: "shadow-purple-500/20" },
  red: { accent: "border-red-500/50", text: "text-red-400", bg: "bg-red-500/10", glow: "shadow-red-500/20" },
  amber: { accent: "border-amber-500/50", text: "text-amber-400", bg: "bg-amber-500/10", glow: "shadow-amber-500/20" },
};

const PIPELINE_STEPS: PipelineStep[] = [
  {
    id: "leads",
    label: "线索获取",
    description: "批量号码单",
    icon: Database,
    annotation: "传统方式：购买号码名单后直接分配给销售\n• 问题：号码质量差，有效联系率极低\n• 销售状态：盲目拨打，效率低下\n\n没有数据，怎么分析？\n所以第一步不是分析，是先打通沟通环节。",
    highlight: false,
  },
  {
    id: "call",
    label: "首次外呼",
    description: "打通沟通填入 CRM",
    icon: Brain,
    annotation: "传统方式：销售凭感觉沟通，手动填写 CRM\n• 信息记录不完整\n• 缺乏标准化的话术和质量监控\n\n外呼打通沟通后，信息才进入系统可分析阶段。\n这是大厂和小厂都必须经历的第一步。",
    highlight: false,
  },
  {
    id: "analysis",
    label: "NLP 画像分析",
    description: "基于 CRM 数据建模",
    icon: Brain,
    annotation: "传统方式：人工翻 CRM 判断意向\n• 耗时：每个客户 5-10 分钟\n• 主观性强，标准不一\n\nSkill 执行：\n• 分析 CRM 中的沟通记录、行为轨迹、字段标签\n• 自动建立客户画像（意向度/需求/风险）\n• 耗时：4.2 秒/万条",
    highlight: true,
  },
  {
    id: "routing",
    label: "智能路由",
    description: "自动分级 + 精准分配",
    icon: Route,
    annotation: "传统方式：销售挑肥拣瘦，优质线索被冷落\n• 分配看关系，不看转化概率\n• 资源严重浪费\n\nSkill 执行：\n• 高意向 → 分配给金牌销售 + 缩短跟进周期\n• 中意向 → 进入培育流，自动推送内容\n• 低意向 → 进入沉默库，定期激活\n\n结果：3.2x 转化效率提升",
    highlight: true,
  },
];

export function TerminalDemo({
  skillName,
  command,
  problem = "你的销售团队每天浪费 80% 的时间在低质量线索上？",
  whyTraditionalFails = "人工清洗线索需要逐个打电话确认意向，效率低且成本高昂。",
  steps = [
    "STEP 1: AI 自动读取线索数据（支持 CSV/Excel/API）",
    "STEP 2: NLP 模型批量分析对话内容与行为数据",
    "STEP 3: 自动分级并推送至高意向队列",
  ],
  githubUrl = "#",
  color = "blue",
}: TerminalDemoProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1); // -1 = 初始状态，未开始
  const [showAnnotation, setShowAnnotation] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const colors = colorMap[color];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const runPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStep(0);
    setShowAnnotation(false);
    setIsComplete(false);

    // 步骤顺序：显示步骤 → 显示注释 → 隐藏注释 → 下一个步骤
    let stepIndex = 0;
    const totalSteps = PIPELINE_STEPS.length;

    const runStep = () => {
      if (stepIndex >= totalSteps) {
        setIsComplete(true);
        setIsRunning(false);
        setShowAnnotation(false);
        return;
      }

      setCurrentStep(stepIndex);
      setShowAnnotation(true);

      timerRef.current = setTimeout(() => {
        setShowAnnotation(false);
        timerRef.current = setTimeout(() => {
          stepIndex++;
          runStep();
        }, 800); // 注释消失后到下一步之间的间隔
      }, 4000); // 每个注释显示 4 秒

    };

    timerRef.current = setTimeout(runStep, 1000); // 首次运行延迟 1 秒
  };

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsRunning(false);
    setCurrentStep(-1);
    setShowAnnotation(false);
    setIsComplete(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 顶部说明区 */}
      <div className="mb-6 p-4 rounded-xl border border-white/10 bg-black/40">
        <div className="flex items-start gap-3">
          <AlertCircle className={`w-5 h-5 ${colors.text} shrink-0 mt-0.5`} />
          <div>
            <p className="text-white font-medium mb-1">痛点：{problem}</p>
            <p className="text-gray-400 text-sm">传统方式：{whyTraditionalFails}</p>
          </div>
        </div>
      </div>

      {/* 流水线可视化区 */}
      <div className="relative rounded-xl border border-white/10 bg-black/60 overflow-hidden">
        {/* 顶部标题栏 */}
        <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Zap className={`w-4 h-4 ${colors.text}`} />
            <span className="text-sm font-medium text-white">{skillName} / 线索评分 Pipeline</span>
          </div>
          <button
            onClick={isComplete ? handleReset : runPipeline}
            disabled={isRunning}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${colors.bg} ${colors.text} border ${colors.accent} hover:opacity-80 disabled:opacity-50`}
          >
            {isRunning ? (
              <>
                <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                Running...
              </>
            ) : isComplete ? (
              <>
                <Play className="w-3 h-3" />
                重播
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                运行 Pipeline
              </>
            )}
          </button>
        </div>

        {/* Pipeline 步骤区 - 节点和气泡分开展示 */}
        <div className="p-6">
          {/* 连接线背景 */}
          <div className="relative h-20">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2" />

            {/* 步骤节点 - 水平排列 */}
            <div className="relative flex justify-between items-center h-20">
              {PIPELINE_STEPS.map((step, index) => {
                const isActive = index === currentStep;
                const isPast = index < currentStep;
                const Icon = step.icon;

                return (
                  <div key={step.id} className="relative flex flex-col items-center z-10">
                    {/* 节点圆圈 */}
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isActive ? 1.2 : 1,
                        backgroundColor: isActive
                          ? step.highlight ? "rgba(59, 130, 246, 0.2)" : "rgba(34, 197, 94, 0.2)"
                          : isPast
                          ? "rgba(34, 197, 94, 0.2)"
                          : "rgba(255, 255, 255, 0.05)",
                        borderColor: isActive
                          ? step.highlight ? "#3b82f6" : "#22c55e"
                          : isPast
                          ? "#22c55e"
                          : "rgba(255, 255, 255, 0.2)",
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-shadow ${isActive ? "shadow-lg " + colors.glow : ""}`}
                    >
                      <Icon className={`w-6 h-6 ${isActive || isPast ? colors.text : "text-gray-500"}`} />
                    </motion.div>

                    {/* 步骤标签 - 在节点下方 */}
                    <motion.div
                      initial={false}
                      animate={{
                        color: isActive ? "#ffffff" : isPast ? "#22c55e" : "#9ca3af",
                      }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 text-xs font-medium text-center whitespace-nowrap"
                    >
                      <div>{step.label}</div>
                      <div className="text-[10px] text-gray-500 mt-0.5">{step.description}</div>
                    </motion.div>

                    {/* 高亮标记 - Skill 替代环节 */}
                    {step.highlight && !isActive && index < currentStep && (
                      <div className="absolute -top-6">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${colors.bg} ${colors.text}`}>
                          Skill ✓
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 注释气泡 - 单独显示在节点下方，不遮挡 */}
          <AnimatePresence>
            {showAnnotation && currentStep >= 0 && currentStep < PIPELINE_STEPS.length && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-6 flex justify-center"
              >
                <div className={`w-full max-w-lg p-4 rounded-xl border ${colors.accent} ${colors.bg} shadow-xl`}>
                  {/* 当前步骤名 */}
                  <div className="flex items-center gap-2 mb-3">
                    {(() => {
                      const Icon = PIPELINE_STEPS[currentStep].icon;
                      return <Icon className={`w-5 h-5 ${colors.text}`} />;
                    })()}
                    <span className="font-medium text-white">
                      {PIPELINE_STEPS[currentStep].label}
                    </span>
                    {PIPELINE_STEPS[currentStep].highlight && (
                      <span className={`text-[10px] px-2 py-0.5 rounded ${colors.bg} ${colors.text} ml-auto`}>
                        Skill 替代环节
                      </span>
                    )}
                  </div>

                  {/* 注释内容 */}
                  <div className="text-sm text-gray-300 whitespace-pre-line leading-relaxed">
                    {PIPELINE_STEPS[currentStep].annotation}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 完成状态 */}
        <AnimatePresence>
          {isComplete && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="border-t border-white/10"
            >
              <div className="p-4 bg-green-500/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Pipeline 执行完成</p>
                    <p className="text-gray-400 text-sm">
                      销售打完电话、CRM 录入信息后，Skill 在 4.2 秒内完成画像分析与线索分层。
                    </p>
                  </div>
                </div>

                {/* 效率对比 */}
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="text-xs text-gray-400 mb-1">传统方式</div>
                    <div className="text-lg font-bold text-red-400">人工翻 CRM</div>
                    <div className="text-xs text-gray-500">每客户 5-10 分钟，主观判断</div>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-green-500/30">
                    <div className="text-xs text-gray-400 mb-1">使用 Skill 后</div>
                    <div className="text-lg font-bold text-green-400">4.2 秒 / 万条</div>
                    <div className="text-xs text-gray-500">自动画像 + 精准分层</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Skill 详情展开区 */}
      <div className="mt-6 space-y-3">
        <div className={`p-4 rounded-xl border ${colors.accent} ${colors.bg}`}>
          <h4 className={`text-sm font-bold ${colors.text} mb-2`}>这个 Skill 解决什么问题</h4>
          <p className="text-sm text-gray-400">{problem}</p>
        </div>

        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <h4 className="text-sm font-bold text-red-400 mb-2">为什么传统方式失败</h4>
          <p className="text-sm text-gray-400">{whyTraditionalFails}</p>
        </div>

        <div className="p-4 rounded-xl border border-white/10 bg-white/5">
          <h4 className="text-sm font-bold text-emerald-400 mb-3">Skill 执行逻辑（3步以内）</h4>
          <div className="space-y-2">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className={`w-6 h-6 rounded-full ${colors.bg} ${colors.text} flex items-center justify-center text-xs font-bold`}>
                  {i + 1}
                </span>
                <span className="text-gray-300">{step}</span>
              </div>
            ))}
          </div>
        </div>

        <a
          href={githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center justify-center gap-2 p-3 rounded-xl ${colors.bg} ${colors.text} border ${colors.accent} hover:opacity-80 transition-opacity`}
        >
          <Github className="w-4 h-4" />
          <span className="text-sm font-medium">查看源码 / 部署到 <img src="/openclaw-logo.png" alt="OpenClaw" className="w-4 h-4 object-contain inline-block align-text-bottom mx-0.5" />OpenClaw</span>
        </a>
      </div>
    </div>
  );
}
