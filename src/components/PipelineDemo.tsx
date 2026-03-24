"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle, Terminal, FileCode, ChevronRight } from "lucide-react";

export interface PipelineStep {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  annotation: string;
  highlight?: boolean;
  code?: string; // 该步骤对应的代码片段
}

interface PipelineDemoProps {
  skillName: string;
  steps: PipelineStep[];
  color?: "blue" | "purple" | "red" | "amber";
}

const colorMap = {
  blue: { accent: "border-blue-500/50", text: "text-blue-400", bg: "bg-blue-500/10", glow: "shadow-blue-500/20", bar: "bg-blue-500" },
  purple: { accent: "border-purple-500/50", text: "text-purple-400", bg: "bg-purple-500/10", glow: "shadow-purple-500/20", bar: "bg-purple-500" },
  red: { accent: "border-red-500/50", text: "text-red-400", bg: "bg-red-500/10", glow: "shadow-red-500/20", bar: "bg-red-500" },
  amber: { accent: "border-amber-500/50", text: "text-amber-400", bg: "bg-amber-500/10", glow: "shadow-amber-500/20", bar: "bg-amber-500" },
};

export function PipelineDemo({
  skillName,
  steps,
  color = "blue",
}: PipelineDemoProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [isComplete, setIsComplete] = useState(false);
  const colors = colorMap[color];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const runPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStep(0);
    setIsComplete(false);

    let stepIndex = 0;
    const totalSteps = steps.length;

    const runStep = () => {
      if (stepIndex >= totalSteps) {
        setIsComplete(true);
        setIsRunning(false);
        return;
      }

      setCurrentStep(stepIndex);

      timerRef.current = setTimeout(() => {
        stepIndex++;
        runStep();
      }, 5000); // 每步停留 5 秒
    };

    timerRef.current = setTimeout(runStep, 1000);
  };

  const handleReset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsRunning(false);
    setCurrentStep(-1);
    setIsComplete(false);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const currentStepData = currentStep >= 0 ? steps[currentStep] : null;

  return (
    <div className="rounded-xl border border-white/10 bg-black/60 overflow-hidden">
      {/* 顶部标题栏 */}
      <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-sm font-medium text-white">{skillName}</span>
        </div>
        <button
          onClick={isComplete ? handleReset : runPipeline}
          disabled={isRunning}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${colors.bg} ${colors.text} border ${colors.accent} hover:opacity-80 disabled:opacity-50`}
        >
          {isRunning ? (
            <>
              <div className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
              运行中...
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

      {/* 主体内容区 - 左 Pipeline 右代码 */}
      <div className="flex flex-col lg:flex-row">
        {/* 左侧: Pipeline 轨道 */}
        <div className="w-full lg:w-80 p-6 border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="flex items-center gap-2 mb-4">
            <Terminal className={`w-4 h-4 ${colors.text}`} />
            <span className="text-xs text-gray-400">执行流程</span>
          </div>

          {/* 竖向 Pipeline */}
          <div className="relative">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isPast = index < currentStep;
              const Icon = step.icon;

              return (
                <div key={step.id} className="relative flex items-start gap-4">
                  {/* 连接线 */}
                  {index < steps.length - 1 && (
                    <div className={`absolute left-[15px] top-8 w-0.5 h-8 ${isPast ? colors.bar : "bg-white/10"}`} />
                  )}

                  {/* 节点 */}
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor: isActive
                        ? "rgba(59, 130, 246, 0.2)"
                        : isPast
                        ? "rgba(34, 197, 94, 0.2)"
                        : "rgba(255, 255, 255, 0.05)",
                      borderColor: isActive
                        ? "#3b82f6"
                        : isPast
                        ? "#22c55e"
                        : "rgba(255, 255, 255, 0.2)",
                    }}
                    transition={{ duration: 0.3 }}
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${isActive ? "shadow-lg " + colors.glow : ""}`}
                  >
                    {isPast ? (
                      <CheckCircle className={`w-4 h-4 ${colors.text}`} />
                    ) : (
                      <Icon className={`w-4 h-4 ${isActive ? colors.text : "text-gray-500"}`} />
                    )}
                  </motion.div>

                  {/* 文字 */}
                  <motion.div
                    initial={false}
                    animate={{
                      color: isActive ? "#ffffff" : isPast ? "#22c55e" : "#9ca3af",
                    }}
                    transition={{ duration: 0.3 }}
                    className="pt-1 flex-1"
                  >
                    <div className="text-sm font-medium">{step.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{step.description}</div>
                    {step.highlight && isPast && (
                      <span className={`inline-block mt-1 text-[10px] px-1.5 py-0.5 rounded ${colors.bg} ${colors.text}`}>
                        Skill ✓
                      </span>
                    )}
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 右侧: 代码块 */}
        <div className="flex-1 p-6 bg-black/40">
          <div className="flex items-center gap-2 mb-4">
            <FileCode className={`w-4 h-4 ${colors.text}`} />
            <span className="text-xs text-gray-400"><img src="/openclaw-logo.png" alt="OpenClaw" className="w-3.5 h-3.5 object-contain inline-block align-text-bottom mx-0.5" />OpenClaw Skill 执行中</span>
          </div>

          {/* 代码展示区 */}
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`rounded-lg border ${colors.accent} bg-black/80 p-4 font-mono text-xs overflow-hidden`}
          >
            {/* 代码头部 */}
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
              <span className="text-gray-500">//</span>
              <span className="text-gray-400">
                {currentStepData ? currentStepData.label : "等待执行"}
              </span>
            </div>

            {/* 代码内容 */}
            <pre className={`${colors.text} leading-relaxed whitespace-pre-wrap`}>
              {currentStepData?.code || `// 点击"运行 Pipeline"开始执行\n// 系统将逐步展示 Skill 执行逻辑`}
              <span className="animate-pulse">▋</span>
            </pre>
          </motion.div>

          {/* 底部提示板 */}
          <motion.div
            key={`log-${currentStep}`}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`mt-4 p-3 rounded-lg border ${colors.accent} ${colors.bg}`}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={`w-2 h-2 rounded-full ${colors.bar} animate-pulse`} />
              <span className="text-xs font-medium text-white">
                {currentStepData ? "当前模块" : "等待中"}
              </span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed">
              {currentStepData?.annotation || "点击「运行 Pipeline」查看 Skill 执行过程"}
            </p>
          </motion.div>
        </div>
      </div>

      {/* 完成状态 */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="border-t border-white/10"
          >
            <div className="p-4 bg-green-500/10 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-white font-medium">Pipeline 执行完成</p>
                <p className="text-gray-400 text-sm">
                  所有 Skill 模块已就绪，可部署到 <img src="/openclaw-logo.png" alt="OpenClaw" className="w-3.5 h-3.5 object-contain inline-block align-text-bottom mx-0.5" />OpenClaw 系统
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
