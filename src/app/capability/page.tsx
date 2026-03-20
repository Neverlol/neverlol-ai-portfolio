'use client';

import CapabilityFlowCanvas from '@/components/CapabilityFlowCanvas';
import { Header } from '@/components/Header';
import { Terminal, Zap } from 'lucide-react';
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
              <span className="text-[10px] font-mono text-blue-400 tracking-widest uppercase">System Architecture</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              精益运营<span className="text-blue-500">增长引擎</span>
            </h1>
            <p className="text-gray-400 max-w-2xl text-sm leading-relaxed">
              拒绝纸上谈兵的空洞理念。以数据与算法为双轴，贯穿增量扩张、漏斗提效、RFM 盘活与敏捷决策的全景操作系统。
            </p>
          </div>

          {/* 沙盘容器 */}
          <div className="w-full h-[800px] flex flex-col bg-[#0b0f19] border border-slate-800 rounded-xl shadow-2xl overflow-hidden">

            {/* 顶部数据看板 (HUD) */}
            <div className="h-12 px-5 bg-slate-900/50 border-b border-slate-800 flex justify-between items-center z-10">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-slate-200 font-medium text-sm tracking-wide">业务漏斗转化链路审计矩阵</span>
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
        </div>
      </main>
    </div>
  );
}
