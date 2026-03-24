"use client";

import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "@/constants";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-16 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          {/* 顶部标签 - 统一脉冲点风格 */}
          <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 w-fit mx-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">能力档案</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
            为什么<span className="text-blue-500">选择我</span>？
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            从互联网大厂运营操盘者，到AI技术落地实践者——<br className="hidden md:block" />
            用大厂经验 × AI技能，帮你复制这套增长全链路体系。
          </p>

          {/* 个人资质标签 */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <div className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-medium">
              58同城大区运营负责人
            </div>
            <div className="px-3 py-1.5 rounded-full bg-white/5 border border-white/20 text-gray-300 text-xs font-medium">
              高级数据分析师
            </div>
            <div className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-medium">
              北外管理科学硕士
            </div>
            <div className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium">
              AI 技术落地实践者
            </div>
          </div>
        </motion.div>

        {/* 仿 Next.js 官网底座互联引擎 UI */}
        <div className="relative flex flex-col items-center mt-8 pb-6">

          {/* 内置流动动画 CSS */}
          <style dangerouslySetInnerHTML={{
            __html: `
            @keyframes circuit-flow {
              from { stroke-dashoffset: 800; }
              to { stroke-dashoffset: 0; }
            }
            .animate-line-flow {
              stroke-dasharray: 60 400;
              animation: circuit-flow 4s linear infinite;
            }
            .animate-line-flow-delayed {
              stroke-dasharray: 60 400;
              animation: circuit-flow 4s linear infinite;
              animation-delay: 2s;
            }
          `}} />

          {/* 复杂背景连线网络 (微暗虚线底板) */}
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30 hidden md:block">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M50% 10% L20% 10% L20% 50%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
              <path d="M50% 15% L85% 15% L85% 80%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
              <path d="M50% 25% L10% 25% L10% 70%" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" />
            </svg>
          </div>

          {/* 顶层：控制芯片节点 (Next.js 风格实体金属针脚) */}
          <div className="relative z-20 mb-[-1px]">
            {/* 顶部针脚 */}
            <div className="absolute -top-2 left-0 right-0 flex justify-evenly px-4">
              {[...Array(6)].map((_, i) => <div key={`t-${i}`} className="w-1.5 h-2.5 bg-[#444] border-x border-[#666] rounded-t-sm"></div>)}
            </div>
            {/* 底部针脚 */}
            <div className="absolute -bottom-2 left-0 right-0 flex justify-evenly px-4">
              {[...Array(6)].map((_, i) => <div key={`b-${i}`} className="w-1.5 h-2.5 bg-[#444] border-x border-[#666] rounded-b-sm"></div>)}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-20 flex justify-center"
            >
              <Link href="/capability" className="group relative flex flex-col items-center justify-center cursor-pointer">

                {/* 极客感外发光圈 (Hover时显现) */}
                <div className="absolute inset-0 bg-blue-600/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* 按钮主体 */}
                <div className="relative bg-[#050505] border border-[#333] group-hover:border-blue-500/50 text-white px-6 py-3.5 rounded-full shadow-[0_0_15px_rgba(0,0,0,0.8)] transition-all duration-300 group-hover:scale-[1.02] flex items-center gap-3">

                  {/* 脉冲指示灯 */}
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]"></div>

                  {/* 核心文字 */}
                  <span className="font-mono text-sm font-bold tracking-widest text-gray-200 group-hover:text-white transition-colors">
                    查看完整能力档案
                  </span>

                  <span className="text-gray-600 font-mono text-xs">|</span>

                  {/* 行为召唤 (CTA) */}
                  <span className="text-xs font-medium text-gray-400 group-hover:text-blue-400 transition-colors flex items-center gap-1">
                    了解我能帮你做什么
                    <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>

                </div>

                {/* 底部悬浮提示文本 */}
                <div className="absolute -bottom-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] font-mono text-blue-500/80 tracking-widest">
                  基于亿级盘口实战沉淀
                </div>

              </Link>
            </motion.div>
          </div>

          {/* 中间层：直角复杂 SVG 连线与流动粒子 (桌面端大屏走线) */}
          <div className="hidden md:block w-full max-w-4xl h-20 relative z-10">
            <svg viewBox="0 0 1000 128" preserveAspectRatio="none" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 底色路轨线 (固定轨道) */}
              <path d="M480,0 L480,40 L166,40 L166,128" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeLinejoin="round" />
              <path d="M500,0 L500,128" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeLinejoin="round" />
              <path d="M520,0 L520,60 L833,60 L833,128" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeLinejoin="round" />

              {/* 左侧流动数据线 - 赛博蓝 */}
              <path
                d="M480,0 L480,40 L166,40 L166,128"
                stroke="#245fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="animate-line-flow opacity-80"
              />

              {/* 中间流动数据线 - 数据白 */}
              <path
                d="M500,0 L500,128"
                stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="animate-line-flow-delayed opacity-80"
              />

              {/* 右侧流动数据线 - 深空紫 */}
              <path
                d="M520,0 L520,60 L833,60 L833,128"
                stroke="#8b5cf6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="animate-line-flow opacity-80"
              />
            </svg>
          </div>

          {/* 移动端简易竖排流动连线 */}
          <div className="md:hidden flex flex-col items-center w-full h-16 relative z-10 my-4 overflow-hidden">
            <svg viewBox="0 0 10 100" preserveAspectRatio="none" className="h-full w-2" fill="none">
              <path d="M5,0 L5,100" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              <path d="M5,0 L5,100" stroke="#245fff" strokeWidth="2" className="animate-line-flow" />
            </svg>
          </div>

          {/* 底层：三大能力引擎卡片 */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20 md:-mt-4">
            {/* 卡片 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 md:p-8 rounded-2xl bg-black border border-white/10 hover:border-[#245fff]/50 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(36,95,255,0.15)] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#245fff]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-10 h-10 mb-6 rounded-lg bg-[#245fff]/10 flex items-center justify-center text-[#245fff] group-hover:scale-110 group-hover:bg-[#245fff]/20 transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 12 12 17 22 12" /><polyline points="2 17 12 22 22 17" /></svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2 flex items-center gap-2">
                数据思维
                <span className="text-[#8b949e] opacity-0 group-hover:opacity-100 transition-opacity transition-transform group-hover:translate-x-1 inline-block">↗</span>
              </h3>
              <p className="text-[#8b949e] text-sm leading-relaxed">
                数学与管科学术底座。精通客户价值分级与问题定位建模。任何商业现象背后都是数据流，任何数据的跳点背后都是生意经。将复杂的商业表象解构为可被量化的数学飞轮。
              </p>
            </motion.div>

            {/* 卡片 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 md:p-8 rounded-2xl bg-black border border-white/10 hover:border-white/30 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-10 h-10 mb-6 rounded-lg bg-white/5 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-white/10 transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2" /></svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2 flex items-center gap-2">
                运营策略
                <span className="text-[#8b949e] opacity-0 group-hover:opacity-100 transition-opacity transition-transform group-hover:translate-x-1 inline-block">↗</span>
              </h3>
              <p className="text-[#8b949e] text-sm leading-relaxed">
                历经 58 同城大区级运营历练，实弹打磨的增长全链路体系。深谙 B端获客、续费拦截与客户流转机制。告别纸上谈兵的空洞理念，直接对核心成交率与千万级盘口规模负责。
              </p>
            </motion.div>

            {/* 卡片 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="p-6 md:p-8 rounded-2xl bg-black border border-white/10 hover:border-[#8b5cf6]/50 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#8b5cf6]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="w-10 h-10 mb-6 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center text-[#8b5cf6] group-hover:scale-110 group-hover:bg-[#8b5cf6]/20 transition-all">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 7 4 4 20 4 20 7" /><line x1="9" y1="20" x2="15" y2="20" /><line x1="12" y1="4" x2="12" y2="20" /></svg>
              </div>
              <h3 className="text-xl font-medium text-white mb-2 flex items-center gap-2">
                Vibe Coding
                <span className="text-[#8b949e] opacity-0 group-hover:opacity-100 transition-opacity transition-transform group-hover:translate-x-1 inline-block">↗</span>
              </h3>
              <p className="text-[#8b949e] text-sm leading-relaxed">
                基于自然语言和高维智能体的全栈实现力。掌握从 MCP 知识库拉取到客户端动态交互组件再到 Supabase 底层数据的流转通道。将运营策略和数据见解，秒级转换为可运行的生产力工具。
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
