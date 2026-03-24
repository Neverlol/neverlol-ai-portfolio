'use client';

import { Radar, Filter, Network, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function PipelineTeaser() {
  const steps = [
    { icon: Radar, label: '获客', desc: '从哪里拉来客户' },
    { icon: Filter, label: '筛选', desc: '哪些值得重点跟进' },
    { icon: Network, label: '跟进', desc: '怎么推动成交' },
    { icon: TrendingUp, label: '复购', desc: '怎么让客户持续付费' },
  ];

  return (
    <div className="relative w-full py-16 flex flex-col items-center justify-center overflow-hidden">
      {/* 背景聚光灯 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
        {/* 顶部标签 - 强调大厂背景 */}
        <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 w-fit mx-auto">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">58 同城 · 亿级盘口实战沉淀</span>
        </div>

        {/* 主标题 - 强调提炼过程 */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight text-center">
          <span className="text-gray-500">从 0 到 1 亿的盘口</span><br />
          <span className="text-white">提炼出这 <span className="text-blue-500">4 步</span> 增长闭环</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-base mb-10 text-center max-w-xl leading-relaxed">
          不是理论，是在大客群、高强度竞争环境下验证过的全链路打法。<br className="hidden md:block" />
          获客 → 筛选 → 跟进 → 复购，每一步都有对应的自动化执行机制。
        </p>

        {/* 核心数据流管线 */}
        <div className="relative w-full flex items-center justify-between px-4 md:px-12">

          {/* 背景暗轨 */}
          <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-[1px] bg-white/[0.05]" />

          {/* 彗星流光动画 */}
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes pipeline-beam {
              0% { left: 0%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { left: 100%; opacity: 0; }
            }
            .animate-pipeline-beam {
              animation: pipeline-beam 3s ease-in-out infinite;
            }
          `}} />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-pipeline-beam z-0 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />

          {/* 节点卡片 */}
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center gap-2 group cursor-default">
              {/* 卡片本体 */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#050505] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-center transition-all duration-500 group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15),inset_0_1px_1px_rgba(255,255,255,0.2)] relative overflow-hidden">
                {/* 玻璃微光高光层 */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent opacity-100 transition-opacity duration-500" />

                <step.icon className="w-6 h-6 md:w-8 md:h-8 text-gray-500 group-hover:text-blue-400 relative z-10 transition-colors duration-500" strokeWidth={1.5} />
              </div>

              {/* 环节名称 */}
              <span className="text-xs md:text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-500 tracking-wide">
                {step.label}
              </span>

              {/* 环节描述 */}
              <span className="text-[10px] text-gray-600 group-hover:text-gray-500 transition-colors duration-500">
                {step.desc}
              </span>

              {/* 步骤编号 */}
              <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-[10px] text-blue-400 font-mono">
                {index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* 说明文字 */}
        <p className="text-xs text-gray-600 mt-10 mb-6 text-center">
          每一步都可以封装为 Skill，挂在 <img src="/openclaw-logo.png" alt="OpenClaw" className="w-3.5 h-3.5 object-contain inline-block align-text-bottom mx-0.5" />OpenClaw 系统里自动执行
        </p>

        {/* CTA 按钮 - 跳转到业务沙盘页面 */}
        <Link
          href="/campaigns"
          className="relative z-20 group flex items-center gap-2 px-6 py-3 rounded-xl bg-black border border-white/20 text-sm font-medium text-gray-300 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300"
        >
          <Sparkles className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
          看看这套体系是怎么运转的
          <ArrowRight className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </Link>
      </div>
    </div>
  );
}
