'use client';

import React, { useEffect, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Handle,
  Position,
  NodeProps,
  MarkerType
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ArrowRight, Zap } from 'lucide-react';
import { getSandboxConfig } from '@/lib/db';

// --- 1. 万能复合工业蓝图节点 (支持高维 Bento 排版) ---
type NodeData = { label?: string; items?: string[]; layout?: string; cols?: number; theme?: 'red' | 'blue' | 'green' | 'purple'; width?: number; align?: string; isHeader?: boolean };
const RichDrawioNode = ({ data }: NodeProps) => {
  const d = data as unknown as NodeData;

  const themeColors = {
    red: { bg: 'bg-rose-950/20', border: 'border-rose-900/50', text: 'text-rose-400', headBg: 'bg-rose-950/50', hover: 'hover:border-rose-500', dot: 'bg-rose-500' },
    blue: { bg: 'bg-blue-950/20', border: 'border-blue-900/50', text: 'text-blue-400', headBg: 'bg-blue-950/50', hover: 'hover:border-blue-500', dot: 'bg-blue-500' },
    green: { bg: 'bg-emerald-950/20', border: 'border-emerald-900/50', text: 'text-emerald-400', headBg: 'bg-emerald-950/50', hover: 'hover:border-emerald-500', dot: 'bg-emerald-500' },
    purple: { bg: 'bg-purple-950/20', border: 'border-purple-900/50', text: 'text-purple-400', headBg: 'bg-purple-950/50', hover: 'hover:border-purple-500', dot: 'bg-purple-500' }
  };
  const c = themeColors[d.theme || 'blue'];

  if (d.isHeader) {
    return (
      <div className={`${d.theme === 'red' ? 'bg-rose-600' : d.theme === 'blue' ? 'bg-blue-600' : 'bg-emerald-600'} text-white font-bold text-[15px] tracking-widest flex flex-col items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] rounded-sm py-2.5 z-20 relative`} style={{ width: d.width || 400 }}>
        <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-white/80" /> {d.label}</div>
        {d.items && d.items[0] && <div className="text-[10px] font-normal opacity-80 mt-1 font-mono tracking-normal">{d.items[0]}</div>}
      </div>
    );
  }

  return (
    <div className={`bg-[#0a0a0a] border ${c.border} rounded-sm shadow-xl text-gray-200 font-sans transition-colors ${c.hover} relative`} style={{ width: d.width || 180 }}>
      {/* 4向隐藏锚点 */}
      <Handle type="target" position={Position.Left} id="t-left" className="opacity-0" />
      <Handle type="target" position={Position.Right} id="t-right" className="opacity-0" />
      <Handle type="target" position={Position.Top} id="t-top" className="opacity-0" />
      <Handle type="target" position={Position.Bottom} id="t-bottom" className="opacity-0" />
      <Handle type="source" position={Position.Right} id="s-right" className="opacity-0" />
      <Handle type="source" position={Position.Left} id="s-left" className="opacity-0" />
      <Handle type="source" position={Position.Bottom} id="s-bottom" className="opacity-0" />
      <Handle type="source" position={Position.Top} id="s-top" className="opacity-0" />

      {d.label && (
        <div className={`px-3 py-2.5 text-[12px] font-bold ${d.align === 'center' ? 'text-center' : 'text-left'} border-b border-[#222] ${c.headBg} ${c.text}`}>
          {d.label}
        </div>
      )}

      {/* 标准列表 */}
      {(!d.layout || d.layout === 'standard') && d.items && (
        <div className="p-3 flex flex-col gap-2 text-[11px] text-gray-300 bg-[#050505]">
          {d.items.map((it: string, i: number) => (
            <div key={i} className="flex items-start leading-tight">
              <span className={`mr-2 mt-1 w-1 h-1 rounded-full ${c.dot} opacity-70 shrink-0`}></span>
              <span>{it}</span>
            </div>
          ))}
        </div>
      )}

      {/* Bento 模块化网格 */}
      {d.layout === 'grid' && d.items && (
        <div className={`p-3 bg-[#050505] grid ${d.cols === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}>
          {d.items.map((it: string, i: number) => (
            <div key={i} className={`border ${c.border} bg-[#111] hover:bg-[#1a1a1a] transition-colors flex items-center justify-center text-center py-2.5 px-1.5 text-[10px] text-gray-300 rounded-sm shadow-sm leading-snug`}>
              {it}
            </div>
          ))}
        </div>
      )}

      {/* 横向漏斗流 - 强制不压缩 */}
      {d.layout === 'horizontal-flow' && d.items && (
        <div className="p-2 bg-[#050505] flex gap-1 items-center overflow-hidden">
          {d.items.map((it: string, i: number) => (
            <React.Fragment key={i}>
              <div className={`flex-shrink-0 min-w-[28px] border ${c.border} bg-[#111] py-1 px-0.5 flex items-center justify-center text-center text-[7px] text-gray-300 rounded-sm shadow-sm leading-tight h-[32px] w-full`}>
                {it}
              </div>
              {d.items && i < d.items.length - 1 && <ArrowRight className="w-2.5 h-2.5 text-[#555] shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

// --- 2. 战区底盘 (Group Wrapper) ---
type GroupData = { width: number; height: number; borderColor?: string; bgColor?: string };
const GroupWrapperNode = ({ data }: NodeProps) => {
  const gd = data as unknown as GroupData;
  return (
    <div className="relative rounded-lg flex flex-col pointer-events-none" style={{ width: gd.width, height: gd.height, border: `1.5px dashed ${gd.borderColor || '#444'}`, backgroundColor: gd.bgColor || 'rgba(17, 17, 17, 0.4)' }} />
  );
};

export const nodeTypes = { richNode: RichDrawioNode, groupNode: GroupWrapperNode };

// --- 3. 升维改造：主板级网格排布数据字典 ---
export const initialNodes = [
  // --- 柱1：增量引擎 (Red) ---
  { id: 'box-red', type: 'groupNode', position: { x: 0, y: 40 }, data: { width: 440, height: 900, borderColor: '#be123c', bgColor: 'rgba(190, 18, 60, 0.03)' }, zIndex: -1 },
  { id: 'r-head', type: 'richNode', position: { x: 0, y: 0 }, data: { isHeader: true, label: '增量扩张引擎 (Growth)', items: ['基于组织裂变、营销策略与新商业模式进行市场扩张'], theme: 'red', width: 440 } },

  { id: 'r-mkt', type: 'richNode', position: { x: 20, y: 80 }, data: { label: '市场拓扑矩阵', layout: 'grid', cols: 2, items: ['蓝海市场横向拓荒', '存量市场纵向渗透', '下沉区域网格抢占', '高净值客群攻坚'], theme: 'red', width: 400 } },
  { id: 'r-org', type: 'richNode', position: { x: 20, y: 280 }, data: { label: '组织能力裂变与溢出', items: ['核心销售铁军规模化裂变', '区域政委与支持体系搭建'], theme: 'red', width: 400 } },

  { id: 'r-matrix', type: 'richNode', position: { x: 20, y: 420 }, data: { label: '扩张基建底座', layout: 'grid', cols: 2, items: ['管理梯队孵化器', 'Top Sales 基因克隆', '敏捷市场需求嗅探网', '产品核心价值重塑'], theme: 'red', width: 400 } },

  { id: 'r-curve', type: 'richNode', position: { x: 20, y: 610 }, data: { label: '第二曲线：新商业生态与模式验证', align: 'center', theme: 'red', width: 400 } },
  { id: 'r-hack', type: 'richNode', position: { x: 20, y: 740 }, data: { label: '增长黑客 (Growth Hacking) 全域实验闭环', align: 'center', theme: 'red', width: 400 } },

  // --- 柱2：系统提效 (Blue) ---
  { id: 'box-blue', type: 'groupNode', position: { x: 500, y: 40 }, data: { width: 460, height: 900, borderColor: '#1d4ed8', bgColor: 'rgba(29, 78, 216, 0.03)' }, zIndex: -1 },
  { id: 'b-head', type: 'richNode', position: { x: 500, y: 0 }, data: { isHeader: true, label: '系统提效 (Efficiency)', items: ['从底层数据赋能前线，到管理中枢通过数据驱动决策'], theme: 'blue', width: 460 } },

  { id: 'b-bi', type: 'richNode', position: { x: 520, y: 80 }, data: { label: '商业智能 (BI) 数据舱与武器库', layout: 'grid', cols: 2, items: ['全域业绩大盘推演', '业务漏斗断层诊断', '360°全景客户画像', '行业标杆与竞品知识库'], theme: 'blue', width: 420 } },
  { id: 'b-funnel', type: 'richNode', position: { x: 520, y: 280 }, data: { label: '标准化漏斗流水线强控 SOP', layout: 'horizontal-flow', items: ['精准触达', '痛点挖掘', '方案共创', '逼单签约', '履约交付'], theme: 'blue', width: 420 } },

  { id: 'b-empower', type: 'richNode', position: { x: 520, y: 440 }, data: { label: '中台向业务终端赋能', align: 'center', theme: 'blue', width: 200 } },
  { id: 'b-feedback', type: 'richNode', position: { x: 740, y: 440 }, data: { label: '终端向中台实战反哺', align: 'center', theme: 'blue', width: 200 } },

  { id: 'b-ctrl', type: 'richNode', position: { x: 520, y: 560 }, data: { label: '全生命周期过程指标强控', layout: 'grid', cols: 2, items: ['前端行动量级雷达', '核心商机转化时效监控', '终阶成单比率异常预警', '后端履约/交付质量追踪'], theme: 'blue', width: 420 } },

  { id: 'b-result', type: 'richNode', position: { x: 520, y: 740 }, data: { label: '终端行动量管理与转化技巧敏捷迭代', align: 'center', theme: 'blue', width: 420 } },
  { id: 'b-close', type: 'richNode', position: { x: 520, y: 860 }, data: { label: '行为与结果的强关联闭环追踪模型', align: 'center', theme: 'blue', width: 420 } },

  // --- 柱3：市场布局 (Green) ---
  { id: 'box-green', type: 'groupNode', position: { x: 1020, y: 40 }, data: { width: 440, height: 900, borderColor: '#059669', bgColor: 'rgba(5, 150, 105, 0.03)' }, zIndex: -1 },
  { id: 'g-head', type: 'richNode', position: { x: 1020, y: 0 }, data: { isHeader: true, label: '市场生态布局 (Market Layout)', items: ['通过市场数据敏捷迭代，实现资源动态配置与决策调整'], theme: 'green', width: 440 } },

  { id: 'g-insight', type: 'richNode', position: { x: 1040, y: 80 }, data: { label: '宏观市场洞察与动态推演', items: ['持续深度盘点大盘市场波动周期', '全域目标客群资源热力图描绘', '基于区域市场容量的期望业绩基线测算'], theme: 'green', width: 400 } },

  { id: 'g-monitor', type: 'richNode', position: { x: 1040, y: 260 }, data: { label: '市场动态监测雷达', layout: 'horizontal-flow', items: ['大盘异动告警', '漏斗断层定位', '异常归因分析'], theme: 'green', width: 400 } },

  { id: 'g-eval', type: 'richNode', position: { x: 1040, y: 420 }, data: { label: 'ROI 与生态动态评估体系', layout: 'grid', cols: 2, items: ['业务人效分布密度核算', '各类资源/政策投放回报率', '竞品动态压制与反制分析', '底层系统与产研需求统筹'], theme: 'green', width: 400 } },

  { id: 'g-strategy', type: 'richNode', position: { x: 1040, y: 620 }, data: { label: '敏捷策略库调度与高优先级指令下发', align: 'center', theme: 'green', width: 400 } },
  { id: 'g-dual', type: 'richNode', position: { x: 1040, y: 760 }, data: { label: '大盘生态与终端指标的双向纠偏防线', align: 'center', theme: 'green', width: 400 } },
];

// --- 4. 极致视觉：内部纵线 + 跨域神经网络 (紫色流光) ---
const rawEdges = [
  // 红柱内部
  { id: 're1', source: 'r-mkt', target: 'r-org', color: '#e11d48' },
  { id: 're2', source: 'r-org', target: 'r-matrix', color: '#e11d48' },
  { id: 're3', source: 'r-matrix', target: 'r-curve', color: '#e11d48' },
  { id: 're4', source: 'r-curve', target: 'r-hack', color: '#e11d48' },

  // 蓝柱内部
  { id: 'be1', source: 'b-bi', target: 'b-funnel', color: '#3b82f6' },
  { id: 'be2', source: 'b-bi', sourceHandle: 's-bottom', target: 'b-empower', targetHandle: 't-top', color: '#3b82f6' },
  { id: 'be3', source: 'b-empower', sourceHandle: 's-right', target: 'b-feedback', targetHandle: 't-left', color: '#3b82f6' },
  { id: 'be4', source: 'b-funnel', target: 'b-ctrl', color: '#3b82f6' },
  { id: 'be5', source: 'b-ctrl', target: 'b-result', color: '#3b82f6' },
  { id: 'be6', source: 'b-result', target: 'b-close', color: '#3b82f6' },

  // 绿柱内部
  { id: 'ge1', source: 'g-insight', target: 'g-monitor', color: '#10b981' },
  { id: 'ge2', source: 'g-monitor', target: 'g-eval', color: '#10b981' },
  { id: 'ge3', source: 'g-eval', target: 'g-strategy', color: '#10b981' },
  { id: 'ge4', source: 'g-strategy', target: 'g-dual', color: '#10b981' },

  // --- 【核心亮点】：跨域协同神经网络 (Cross-Pillar Synergy)，全紫色高级流光 ---
  { id: 'ce1', source: 'g-insight', sourceHandle: 's-left', target: 'b-bi', targetHandle: 't-right', color: '#a855f7', label: '市场情报赋能BI', type: 'smoothstep' },
  { id: 'ce2', source: 'b-feedback', sourceHandle: 's-right', target: 'g-monitor', targetHandle: 't-left', color: '#a855f7', label: '终端实战反哺预警', type: 'smoothstep' },
  { id: 'ce3', source: 'g-strategy', sourceHandle: 's-left', target: 'b-ctrl', targetHandle: 't-right', color: '#a855f7', label: '策略指导强控', type: 'smoothstep' },
  // 超长跨越：市场策略直接指导红柱的增长黑客 (底部绕行规避穿模)
  { id: 'ce4', source: 'g-strategy', sourceHandle: 's-bottom', target: 'r-hack', targetHandle: 't-bottom', color: '#a855f7', label: '大盘策略直驱黑客实验', type: 'smoothstep' },
];

// 双轨流光引擎
export const initialEdges = rawEdges.flatMap((e: any) => {
  const trackEdge = {
    ...e, id: `${e.id}-track`, animated: false, label: undefined,
    sourceHandle: e.sourceHandle || 's-bottom', targetHandle: e.targetHandle || 't-top', type: e.type || 'step',
    style: { stroke: e.color, strokeWidth: 1.5, strokeOpacity: 0.15 }
  };
  const lightEdge = {
    ...e, id: `${e.id}-light`, animated: true, className: 'capability-flowing-light',
    sourceHandle: e.sourceHandle || 's-bottom', targetHandle: e.targetHandle || 't-top', type: e.type || 'step',
    markerEnd: { type: MarkerType.ArrowClosed, color: e.color },
    labelStyle: { fill: e.color, fontSize: 10, fontWeight: 'bold' }, labelBgStyle: { fill: '#111', fillOpacity: 0.8 },
    style: { stroke: e.color, strokeWidth: 2, filter: `drop-shadow(0 0 4px ${e.color}) drop-shadow(0 0 8px ${e.color})` }
  };
  return [trackEdge, lightEdge];
});

export default function CapabilityFlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const [loaded, setLoaded] = useState(false);

  // 从数据库加载配置并更新状态
  useEffect(() => {
    async function loadConfig() {
      const config = await getSandboxConfig('capability');
      if (config && config.nodes_json && config.edges_json) {
        setNodes(config.nodes_json as any[]);
        setEdges(config.edges_json as any[]);
      } else {
        // 没有数据库配置时使用初始数据
        setNodes(initialNodes);
        setEdges(initialEdges);
      }
      setLoaded(true);
    }
    loadConfig();
  }, [setNodes, setEdges]);

  // 在数据加载完成前显示加载状态，避免闪烁
  if (!loaded) {
    return (
      <div className="w-full h-full bg-[#030303] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-400">加载中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#030303] cursor-grab active:cursor-grabbing">
      <style dangerouslySetInnerHTML={{__html: `
        .capability-flowing-light path.react-flow__edge-path {
          stroke-dasharray: 15 85 !important;
          animation: capabilityFlowAnim 2.5s linear infinite !important;
          stroke-linecap: round;
        }
        @keyframes capabilityFlowAnim {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -100; }
        }
      `}} />

      <ReactFlow
        nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes} colorMode="dark"
        defaultViewport={{ x: 0, y: 0, zoom: 0.85 }}
        fitView
        fitViewOptions={{ padding: 0.1, minZoom: 0.7, maxZoom: 1.3 }}
        minZoom={0.1} maxZoom={2}
        nodesDraggable={false} nodesConnectable={false}
        panOnDrag={true} zoomOnScroll={true} elementsSelectable={true}
        proOptions={{ hideAttribution: true }} defaultEdgeOptions={{ type: 'step' }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#222" />
        <Controls className="bg-[#111] border-[#333] fill-gray-400" showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
