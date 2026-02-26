"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Scan, Tag, BookSearch, Wand2, CheckCircle2, Terminal, Code2, AlertCircle, TrendingDown, Clock } from "lucide-react";
import { DEMO_STEPS, DEMO_NODES, DEMO_CODE_SNIPPET, DEMO_SCENARIO } from "@/constants";
import { HandDrawnTag } from "@/components/HandDrawn";

type StepId = "idle" | "scan" | "classify" | "retrieve" | "generate" | "complete";

const iconMap: Record<string, React.ElementType> = { Play, Scan, Tag, BookSearch, Wand2, CheckCircle2 };

const nodePositions: Record<string, { x: number; y: number }> = {
  start: { x: 0, y: 0 }, scan: { x: 1, y: 0 }, classify: { x: 2, y: 0 },
  retrieve: { x: 2, y: 1 }, generate: { x: 1, y: 1 }, action: { x: 0, y: 1 },
};

export function DemoSection() {
  const [currentStep, setCurrentStep] = useState<StepId>("idle");
  const [isRunning, setIsRunning] = useState(false);

  const runDiagnosis = async () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStep("scan");
    const stepSequence: StepId[] = ["scan", "classify", "retrieve", "generate", "complete"];
    for (const step of stepSequence) {
      const stepData = DEMO_STEPS.find(s => s.id === step);
      await new Promise(resolve => setTimeout(resolve, stepData?.delay || 1200));
      setCurrentStep(step);
    }
    setIsRunning(false);
  };

  const resetDemo = () => setCurrentStep("idle");
  const currentStepData = DEMO_STEPS.find(s => s.id === currentStep);
  const Icon = currentStepData ? iconMap[currentStepData.icon] : Play;
  const activeNodes = DEMO_STEPS.slice(0, DEMO_STEPS.findIndex(s => s.id === currentStep) + 1).map(s => s.id);
  const currentStepIndex = DEMO_STEPS.findIndex(s => s.id === currentStep);
  const isExpanded = isRunning || currentStep === "complete";

  return (
    <section id="lab" className="py-16 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/4 w-[600px] h-[600px] bg-[#245fff]/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
          <h2 className="text-2xl md:text-3xl font-medium text-white mb-3">Live Demo</h2>
          <p className="text-[#8b949e] text-sm flex items-center gap-2">
            <Play className="w-3 h-3 text-[#FACC15]" />
            智能挽留 Agent：模拟真实业务场景
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Console */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="nightwatch-card p-5">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#8b949e]" />
                <span className="text-xs text-[#8b949e]">智能挽留控制台</span>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[#8b949e]">Agent 在线</span>
              </div>
            </div>

            <div className="h-1 bg-black/30">
              <motion.div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" initial={{ width: 0 }} animate={{ width: `${((currentStepIndex + 1) / DEMO_STEPS.length) * 100}%` }} transition={{ duration: 0.3 }} />
            </div>

            <div className="p-5">
              {/* Merchant Alert */}
              <AnimatePresence>
                {currentStep !== "idle" && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-red-400" />
                      <span className="text-sm font-medium text-red-400">检测到异常商户</span>
                    </div>
                    <p className="text-xs text-[#8b949e] mb-2">{DEMO_SCENARIO.merchant} ({DEMO_SCENARIO.merchantId})</p>
                    <div className="space-y-1">
                      {DEMO_SCENARIO.issues.map((issue, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs">
                          {issue.icon === "AlertCircle" && <AlertCircle className={`w-3 h-3 ${issue.color}`} />}
                          {issue.icon === "TrendingDown" && <TrendingDown className={`w-3 h-3 ${issue.color}`} />}
                          {issue.icon === "Clock" && <Clock className={`w-3 h-3 ${issue.color}`} />}
                          <span className="text-[#8b949e]" dangerouslySetInnerHTML={{ __html: issue.text }} />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Status */}
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 rounded-lg bg-[#245fff]/10 border border-[#245fff]/20">
                  <Icon className="w-6 h-6 text-[#245fff]" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{currentStepData?.label}</h3>
                  <p className="text-xs text-[#8b949e]">{currentStepData?.message}</p>
                </div>
              </div>

              {/* Node Flow */}
              <div className="mb-4 p-3 bg-black/30 rounded-lg border border-white/5">
                <div className="flex items-center gap-2 mb-3">
                  <HandDrawnTag variant="yellow" icon="zap" className="text-[10px]">LangGraph</HandDrawnTag>
                  <span className="text-xs text-[#8b949e]">Agent 执行流程</span>
                </div>
                <div className="relative h-24">
                  <svg className="w-full h-full" viewBox="0 0 200 80">
                    <path d="M 30 20 L 70 20" stroke="#333" strokeWidth="1" fill="none" />
                    <path d="M 100 20 L 140 20" stroke="#333" strokeWidth="1" fill="none" />
                    <path d="M 140 20 L 140 50" stroke="#333" strokeWidth="1" fill="none" />
                    <path d="M 140 50 L 100 50" stroke="#333" strokeWidth="1" fill="none" />
                    <path d="M 70 50 L 30 50" stroke="#333" strokeWidth="1" fill="none" />
                    {currentStepIndex >= 1 && <path d="M 30 20 L 70 20" stroke="#245fff" strokeWidth="2" fill="none" className="animate-pulse" />}
                    {currentStepIndex >= 2 && <path d="M 100 20 L 140 20" stroke="#245fff" strokeWidth="2" fill="none" className="animate-pulse" />}
                    {currentStepIndex >= 3 && <path d="M 140 20 L 140 50" stroke="#245fff" strokeWidth="2" fill="none" className="animate-pulse" />}
                    {currentStepIndex >= 4 && <path d="M 140 50 L 100 50" stroke="#245fff" strokeWidth="2" fill="none" className="animate-pulse" />}
                    {currentStepIndex >= 5 && <path d="M 70 50 L 30 50" stroke="#245fff" strokeWidth="2" fill="none" className="animate-pulse" />}
                    {DEMO_NODES.map((node) => {
                      const x = nodePositions[node.id]?.x * 70 + 30;
                      const y = nodePositions[node.id]?.y * 30 + 20;
                      const isActive = activeNodes.includes(node.id);
                      const isCurrent = DEMO_STEPS[currentStepIndex]?.id === node.id;
                      return (
                        <g key={node.id}>
                          <circle cx={x} cy={y} r="8" fill={isActive ? "#245fff" : "#1e1e1e"} stroke={isCurrent ? "#FACC15" : isActive ? "#245fff" : "#333"} strokeWidth="2" />
                          <text x={x} y={y + 18} textAnchor="middle" fill={isActive ? "#fff" : "#666"} fontSize="6">{node.label}</text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-center gap-3">
                {currentStep === "idle" && (
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={runDiagnosis} className="px-5 py-2 bg-[#245fff] text-white text-sm font-medium rounded-lg">
                    开始诊断
                  </motion.button>
                )}
                {currentStep === "complete" && (
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={resetDemo} className="px-5 py-2 border border-white/10 text-white text-sm font-medium rounded-lg">
                    重新诊断
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>

          {/* Code Panel - Always expanded when running */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.1 }} 
            className="nightwatch-card p-5"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/5 sticky top-0 bg-[#1e1e1e] z-10">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#8b949e]" />
                <HandDrawnTag variant="purple" icon="pen" className="text-[10px]">Vibe Coding</HandDrawnTag>
              </div>
              <div className="flex items-center gap-2 text-xs text-green-400">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {isRunning ? "执行中..." : currentStep === "complete" ? "已完成" : "就绪"}
              </div>
            </div>
            <div className="p-4">
              <p className="text-xs text-[#8b949e] mb-3">真正的 Vibe Coding，不是套壳。核心路由逻辑实时展示：</p>
              
              {/* Always show full code when running */}
              <motion.div layout className="overflow-hidden">
                <pre className="p-3 bg-black/50 rounded-lg text-xs font-mono text-gray-300 overflow-x-auto max-h-[400px] overflow-y-auto"><code>{DEMO_CODE_SNIPPET}</code></pre>
              </motion.div>

              {/* Active step code highlight */}
              <AnimatePresence>
                {isRunning && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="mt-4 p-3 bg-[#245fff]/10 border border-[#245fff]/20 rounded-lg"
                  >
                    <p className="text-xs text-[#245fff] mb-2">📍 当前执行节点：{currentStepData?.label}</p>
                    <p className="text-xs text-[#8b949e]">{currentStepData?.message}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-2 text-xs text-[#8b949e]"><span className="w-2 h-2 rounded-full bg-green-500" /><span>Claude API + LangGraph + RAG</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
