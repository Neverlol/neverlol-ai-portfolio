"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-2"
        >
          <div className="flex items-center gap-4">
            {/* 终端风格 Logo - > N_ (加宽) */}
            <div className="relative flex items-center justify-center w-10 h-8 bg-black border border-white/20 rounded-md overflow-hidden group-hover:border-white/40 transition-colors">
              {/* > 箭头 - 文字终端符号，小号 */}
              <span className="font-mono font-bold text-xs text-[#0066FF] absolute left-0.5 top-1/2 -translate-y-1/2">{'>'}</span>
              {/* N字母 - 主体，居中，更大更充分 */}
              <svg viewBox="0 0 100 100" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footerLeftBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#dddddd" />
                  </linearGradient>
                  <linearGradient id="footerRightBarFade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#eeeeee" stopOpacity="1" />
                    <stop offset="100%" stopColor="#eeeeee" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="footerDiagFade" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="60%" stopColor="#eeeeee" stopOpacity="1" />
                    <stop offset="100%" stopColor="#cccccc" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <rect x="28" y="22" width="10" height="56" fill="url(#footerLeftBarGrad)" />
                <rect x="62" y="22" width="10" height="32" fill="url(#footerRightBarFade)" />
                <polygon points="28,22 38,22 72,78 62,78" fill="url(#footerDiagFade)" />
              </svg>
              {/* _ 下划线在N右侧，小号，稍向下，向左贴近N */}
              <span className="absolute right-1 top-[55%] -translate-y-1/2">
                <span className="font-mono text-[10px] text-[#0066FF]">_</span>
              </span>
            </div>
            <div className="text-sm text-[#8b949e]">
              © 2024 AI Portfolio. Built with Next.js & Shadcn UI.
            </div>
          </div>
          <div className="text-xs text-[#8b949e]/50">
            From 58 同城 to AI Agent
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
