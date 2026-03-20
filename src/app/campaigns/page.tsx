'use client';

import { Header } from '@/components/Header';
import CampaignFlowCanvas from '@/components/CampaignFlowCanvas';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, Target, TrendingUp, Users, MessageSquare, ChevronRight } from 'lucide-react';

export default function CampaignsPage() {
  return (
    <main className="relative w-full min-h-screen bg-black text-white flex flex-col pt-24 pb-20 px-4 md:px-8 overflow-hidden font-sans">
      <Header />

      {/* 贯穿的竖向网格对齐线 (保持首页风格一致性) */}
      <div className="absolute inset-0 z-0 flex pointer-events-none opacity-40">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 divide-x divide-white/10 border-x border-white/10">
          <div></div><div></div><div></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full mb-12 flex flex-col items-center text-center relative z-10">

        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-500/10 backdrop-blur-md mb-6">
          <BrainCircuit className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase">SYSTEM BLUEPRINT</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          从线索到利润的<span className="text-blue-500">业务全景蓝图</span>
        </h1>
        <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
          100% 像素级还原年产值过亿的电销体系底层架构。跨越 8 大层级、涵盖 24 个核心节点，拒绝纸上谈兵，展示最真实的大厂硬核业务管线。
        </p>
      </div>

      {/* --- 核心修改区：超大、包装过的交互沙盘 --- */}
      <div className="w-full max-w-7xl mx-auto h-[70vh] min-h-[700px] mt-8 mb-16 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative z-10">
         <CampaignFlowCanvas />
      </div>

      {/* 底部：全链路价值主张 + CTA */}
      <div className="w-full max-w-6xl mx-auto relative z-10">

        {/* 核心能力标签 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-center">
            <Target className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-sm font-medium text-white">精准获客</div>
            <div className="text-xs text-gray-500 mt-1">渠道 ROI 优化</div>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-center">
            <TrendingUp className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-sm font-medium text-white">高效转化</div>
            <div className="text-xs text-gray-500 mt-1">销售漏斗建模</div>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-center">
            <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-sm font-medium text-white">客户经营</div>
            <div className="text-xs text-gray-500 mt-1">LTV 提升策略</div>
          </div>
          <div className="p-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm text-center">
            <MessageSquare className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <div className="text-sm font-medium text-white">AI 赋能</div>
            <div className="text-xs text-gray-500 mt-1">大模型落地应用</div>
          </div>
        </div>

        {/* 能为你做什么 */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">
            我能为你<span className="text-blue-500">做什么</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl border border-white/10 bg-[#050505] hover:border-blue-500/50 transition-colors">
              <div className="text-blue-500 font-mono text-sm mb-3">01</div>
              <h3 className="text-lg font-bold text-white mb-2">搭建增长体系</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                从 0 到 1 构建企业级销售数据中台，打通获客-转化-服务全链路，实现数据驱动的精细化运营。
              </p>
            </div>
            <div className="p-6 rounded-xl border border-white/10 bg-[#050505] hover:border-blue-500/50 transition-colors">
              <div className="text-blue-500 font-mono text-sm mb-3">02</div>
              <h3 className="text-lg font-bold text-white mb-2">AI 场景落地</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                将大模型能力融入销售、客服、客户运营环节，降低人力成本 30%+，提升转化效率 20%+。
              </p>
            </div>
            <div className="p-6 rounded-xl border border-white/10 bg-[#050505] hover:border-blue-500/50 transition-colors">
              <div className="text-blue-500 font-mono text-sm mb-3">03</div>
              <h3 className="text-lg font-bold text-white mb-2">团队效能诊断</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                基于数据埋点与业务指标，定位销售团队卡点，提供可落地的优化方案与培训体系。
              </p>
            </div>
          </div>
        </div>

        {/* CTA 引导 */}
        <div className="text-center p-8 rounded-2xl border border-blue-500/30 bg-blue-500/5">
          <h3 className="text-xl font-bold text-white mb-2">Let's Build Something Great Together</h3>
          <p className="text-gray-400 mb-6 text-sm">
            无论是体系搭建咨询还是项目合作，欢迎聊聊你的业务痛点
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
          >
            立即咨询 <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </main>
  );
}
