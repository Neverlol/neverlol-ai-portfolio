'use client';

import CapabilityFlowCanvas from '@/components/CapabilityFlowCanvas';
import { Header } from '@/components/Header';
import { Terminal, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useNodesState, useEdgesState } from '@xyflow/react';
import { initialNodes, initialEdges } from '@/components/CapabilityFlowCanvas';

export default function CapabilityPage() {
  const [nodes] = useNodesState(initialNodes);
  const [edges] = useEdgesState(initialEdges);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-6xl mx-auto w-full">
          {/* Title Section */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/20 bg-blue-950/20 backdrop-blur-md mb-4">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase">业务与系统能力底座</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              支撑这套系统落地的<span className="text-blue-500">业务能力底座</span>
            </h1>
            <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
              这套底座来自真实业务实战和长期运营管理经验的提炼。
              <br className="hidden md:block" />
              每一个模块都对应真实团队里反复验证过的业务动作和判断标准。
            </p>
          </div>

          {/* 能力引言 */}
          <div className="text-center mb-12">
            <div className="inline-flex flex-col items-center gap-4 p-6 rounded-2xl border border-white/10 bg-white/[0.02] max-w-2xl mx-auto">
              <p className="text-gray-300 text-lg leading-relaxed">
                从业务一线操盘，到 AI 系统落地
              </p>
              <p className="text-gray-500 text-sm">
                亲手跑过高强度增长业务，
                <br className="hidden md:block" />
                深度理解获客→筛选→跟进→复购每一个环节
              </p>
              <div className="flex items-center gap-3 mt-2">
                <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs">
                  年营收亿级盘口操盘
                </div>
                <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs">
                  AI 系统落地
                </div>
              </div>
            </div>
          </div>

          {/* 沙盘容器 */}
          <div className="w-full h-[800px] flex flex-col bg-[#0b0f19] border border-slate-800 rounded-xl shadow-2xl overflow-hidden">

            {/* 顶部数据看板 (HUD) */}
            <div className="h-12 px-5 bg-slate-900/50 border-b border-slate-800 flex justify-between items-center z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-200 font-medium text-sm tracking-wide">业务增长链路审计矩阵</span>
              </div>
              <div className="text-xs text-slate-500 font-mono flex gap-4">
                <span className="flex items-center gap-1"><Zap className="w-3 h-3 text-purple-500"/> 流光引擎: 运行中</span>
                <span>Nodes: {nodes.length}</span>
              </div>
            </div>

            {/* 沙盘渲染域 */}
            <div className="flex-1 relative w-full h-full">
               <CapabilityFlowCanvas />
            </div>

          </div>

          {/* 沙盘后的引导 */}
          <div className="text-center mt-12">
            <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl border border-white/10 bg-white/[0.02] max-w-xl mx-auto">
              <p className="text-gray-400 text-sm">
                看完这套业务能力底座？
              </p>
              <p className="text-gray-500 text-xs">
                接下来去看，这套体系最早怎样在真实业务里跑通，
                <br className="hidden md:block" />
                以及后续怎样被拆成客户可接入的系统模块。
              </p>
              <Link
                href="/campaigns"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 font-medium transition-colors mt-2"
              >
                查看 58 业务沙盘
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
