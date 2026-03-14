'use client';

import { Radar, Filter, Network, TrendingUp, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PipelineTeaser() {
  const router = useRouter();
  const steps = [
    { icon: Radar, label: '全域线索捕获' },
    { icon: Filter, label: 'AI 漏斗清洗' },
    { icon: Network, label: '自动化 CRM 强控' },
    { icon: TrendingUp, label: 'LTV 利润提纯' },
  ];

  return (
    <div className="relative w-full py-12 flex flex-col items-center justify-center overflow-hidden">
      {/* 1. 极其深邃的 Vercel 环境聚光灯 (Spotlight) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-4xl">
        {/* 顶部标签 */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-mono text-gray-400 tracking-wider uppercase">Data Pipeline Architecture</span>
        </div>

        {/* 主标题 */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-20 tracking-tight">
          从线索到利润的<span className="text-blue-500">全链路数据提纯</span>
        </h2>

        {/* 核心数据流管线 */}
        <div className="relative w-full flex items-center justify-between px-4 md:px-12">

          {/* 2. 背景暗轨 */}
          <div className="absolute left-12 right-12 top-1/2 -translate-y-1/2 h-[1px] bg-white/[0.05]" />

          {/* 3. 彗星流光动画 (原生 CSS 注入，确保 100% 生效) */}
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

          {/* 4. 硬件质感节点卡片 */}
          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center gap-4 group cursor-default">
              {/* 卡片本体 */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-[#050505] border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-center transition-all duration-500 group-hover:border-blue-500/50 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.15),inset_0_1px_1px_rgba(255,255,255,0.2)] relative overflow-hidden">
                {/* 玻璃微光高光层 (Glare) */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/[0.08] to-transparent opacity-100 transition-opacity duration-500" />

                <step.icon className="w-6 h-6 md:w-8 md:h-8 text-gray-500 group-hover:text-blue-400 relative z-10 transition-colors duration-500" strokeWidth={1.5} />
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-500 group-hover:text-gray-300 transition-colors duration-500 tracking-wide">
                {step.label}
              </span>
            </div>
          ))}
        </div>

        {/* 5. 幽灵 CTA 按钮 */}
        <button
          onClick={() => router.push('/cases')}
          className="relative z-20 mt-20 group flex items-center gap-2 px-6 py-3 rounded-xl bg-black border border-white/20 text-sm font-medium text-gray-300 hover:text-white hover:border-white/50 hover:bg-white/5 transition-all duration-300"
        >
          <svg className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          解密 58 铁军过亿盘口的业务全景蓝图
          <ArrowRight className="w-4 h-4 ml-1 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </button>
      </div>
    </div>
  );
}
