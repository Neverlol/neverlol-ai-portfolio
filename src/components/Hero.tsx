"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Code2, Zap, Layers, PenTool } from "lucide-react";
import { HERO_CONTENT, AGENT_THOUGHTS, HAND_DRAWN_ANNOTATIONS } from "@/constants";

export function Hero() {
  const [currentThought, setCurrentThought] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentThought((prev) => (prev + 1) % AGENT_THOUGHTS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-visible">
      {/* Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#245fff]/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-tight">
            {HERO_CONTENT.headline}
          </h1>
          
          <p className="text-lg text-[#a3a3a3] leading-relaxed max-w-xl">
            {HERO_CONTENT.subheadline}
          </p>

          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-[#245fff] text-white text-sm font-medium rounded-lg hover:bg-[#1a4fd4] transition-colors shadow-[0_0_15px_rgba(36,95,255,0.4)]"
            >
              {HERO_CONTENT.ctaPrimary}
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.05)" }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 border border-white/10 text-[#a3a3a3] text-sm font-medium rounded-lg hover:text-white transition-colors flex items-center gap-2"
            >
              {HERO_CONTENT.ctaSecondary}
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>

        {/* Right: Code Window with Hand-drawn Annotations */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Hand-drawn Annotations */}
          <AnimatePresence>
            {HAND_DRAWN_ANNOTATIONS.map((annotation, index) => (
              <motion.div
                key={annotation.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.4 }}
                className={`absolute ${annotation.x} ${annotation.y} z-20 hidden md:block`}
              >
                {/* Arrow */}
                <svg width="60" height="30" className="absolute -left-6 top-1/2 -translate-y-1/2">
                  <path d="M0 15 Q 15 15, 25 8" fill="none" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" className="opacity-80" />
                  <path d="M20 3 L 28 10 L 20 17" fill="none" stroke="#FACC15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-80" />
                </svg>
                
                {/* Label */}
                <div className="ml-2 inline-flex items-center gap-2 px-3 py-1.5 bg-[#171717]/90 border-2 border-[#FACC15] rounded-lg" style={{ transform: `rotate(${index === 0 ? -1 : 1}deg)` }}>
                  <PenTool className="w-3 h-3 text-[#FACC15]" />
                  <span className="text-xs text-[#FACC15] font-medium whitespace-nowrap">{annotation.text}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Code Window - Physical Console Style */}
          <div className="console-card">
            {/* Corner glows */}
            <div className="console-glow console-glow-tl" />
            <div className="console-glow console-glow-tr" />
            <div className="console-glow console-glow-bl" />
            <div className="console-glow console-glow-br" />
            {/* Code content */}
            <div className="relative z-10">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full breathing-indicator" />
              <div className="ml-4 flex items-center gap-2 text-xs text-[#a3a3a3]">
                <Code2 className="w-3 h-3" />
                <span>RFM_Agent.py</span>
              </div>
            </div>

            <div className="p-4 font-mono text-sm space-y-3">
              <div className="text-[#c586c0]">from58_agents import RFM_Agent</div>
              <div className="text-[#569cd6]">import asyncio</div>
              <div className="text-gray-600">{"// 初始化智能体"}</div>
              
              <div>
                <span className="text-[#569cd6]">agent</span>
                <span className="text-white"> = </span>
                <span className="text-[#4ec9b0]">RFM_Agent</span>
                <span className="text-white">(</span>
                <span className="text-[#ce9178]">region=</span>
                <span className="text-[#ce9178]">"东北大区"</span>
                <span className="text-white">)</span>
              </div>

              {/* LTV Calculation with yellow highlight */}
              <div className="relative pl-2 my-2">
                <div className="absolute -left-0 -top-1 w-3 h-3 border-l-2 border-t-2 border-[#FACC15]" />
                <div className="py-1 pl-3 bg-[#FACC15]/10 rounded border-l-2 border-[#FACC15]">
                  <span className="text-[#569cd6]">def </span>
                  <span className="text-white">calculate_ltv</span>
                  <span className="text-white">(</span>
                  <span className="text-[#9cdcfe]">customer</span>
                  <span className="text-white">):</span>
                </div>
                <div className="absolute -right-0 -bottom-1 w-3 h-3 border-r-2 border-b-2 border-[#FACC15]" />
              </div>

              <div className="pl-6 text-[#a3a3a3]">
                <span className="text-[#569cd6]">if </span>
                <span className="text-white"> customer.login_freq {'<'} 3:</span>
              </div>
              <div className="pl-10 text-[#FACC15]">
                <span className="text-white"># 8级运营的行业直觉阈值</span>
              </div>
              <div className="pl-10">
                <span className="text-[#569cd6]">return </span>
                <span className="text-[#ce9178]">"high_risk"</span>
              </div>

              {/* Agent Thinking */}
              <motion.div
                key={currentThought}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-4 p-3 bg-black/30 rounded-lg border border-white/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium ${AGENT_THOUGHTS[currentThought].color}`}>
                    [{AGENT_THOUGHTS[currentThought].step}]
                  </span>
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                </div>
                <div className="text-[#a3a3a3] text-xs">
                  {AGENT_THOUGHTS[currentThought].content}
                </div>
              </motion.div>

              {/* Metrics */}
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1 text-green-400">
                    <Zap className="w-3 h-3" />
                    <span>续费率 50%</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#a3a3a3]">
                    <Layers className="w-3 h-3" />
                    <span>+5% vs 全国大盘</span>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
