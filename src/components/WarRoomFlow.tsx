'use client';

import { useState } from 'react';
import {
  ReactFlow,
  Background,
  Edge,
  Node,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  NodeProps,
  Handle,
  Position,
} from '@xyflow/react';
import type { NodeTypes } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Filter, Target, TrendingUp, Zap, Shield, ArrowRight, Terminal } from 'lucide-react';

// Campaign data for tooltips
const CAMPAIGN_DATA: Record<string, { title: string; action: string; result: string }> = {
  'leads-cleaning': {
    title: 'AI 漏斗清洗引擎',
    action: '规则引擎 + ML 分类模型',
    result: '有效线索率提升 18%',
  },
  'crm-dispatch': {
    title: 'CRM 智能分发系统',
    action: '地域权重 + 类别匹配 + 销售能力画像',
    result: '线索 30 分钟内 100% 触达',
  },
  'sales-closed-loop': {
    title: '销售转化闭环重构',
    action: '6 步跟单 SOP + 阶段预警机制',
    result: '成交周期缩短 40%',
  },
  'retention': {
    title: '续费保卫战',
    action: '流失预警模型 + 关怀触达策略',
    result: '续费率提升 15%',
  },
  'churn-prevention': {
    title: '客户生命周期保卫',
    action: 'RFM 分层 + 自动化关怀工单',
    result: 'LTV 提升 28%',
  },
};

type WarRoomNodeData = {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  campaignKey?: string;
  description?: string;
  column?: number;
  tooltipPosition?: 'left' | 'right';
  hasTopHandle?: boolean;
  hasBottomHandle?: boolean;
};

// Vercel Hardware Style Node with flexible handles
function TerminalNode({ data, selected }: NodeProps) {
  const nodeData = data as WarRoomNodeData;
  const [isHovered, setIsHovered] = useState(false);
  const Icon = nodeData.icon || Terminal;
  const campaign = nodeData.campaignKey ? CAMPAIGN_DATA[nodeData.campaignKey] : null;

  const columnColors = [
    { dot: 'bg-emerald-500', icon: 'text-white/80', label: 'text-white' },
    { dot: 'bg-blue-500', icon: 'text-white/80', label: 'text-white' },
    { dot: 'bg-violet-500', icon: 'text-white/80', label: 'text-white' },
    { dot: 'bg-amber-500', icon: 'text-white/80', label: 'text-white' },
  ];
  const col = nodeData.column || 0;
  const color = columnColors[col] || columnColors[0];

  // Determine tooltip position
  const tooltipPos = nodeData.tooltipPosition || 'right';
  const isTooltipLeft = tooltipPos === 'left';

  return (
    <div style={{ zIndex: isHovered ? 9999 : 'auto' }} className="relative">
      {/* Top handle for vertical flow */}
      {nodeData.hasTopHandle && (
        <Handle type="target" position={Position.Top} className="!bg-white/30 !w-1.5 !h-1.5 !border-0" />
      )}

      {/* Left handle for horizontal input */}
      {!nodeData.hasTopHandle && (
        <Handle type="target" position={Position.Left} className="!bg-white/30 !w-1.5 !h-1.5 !border-0" />
      )}

      <div
        className={`
          relative px-3.5 py-2.5 rounded-lg bg-[#0A0A0A] border transition-all duration-300 cursor-pointer min-w-[130px]
          shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]
          ${selected ? 'border-white/30' : 'border-white/10 hover:border-white/20'}
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${color.dot} ${isHovered ? 'opacity-100' : 'opacity-60'}`} />
          </div>
          <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center">
            <Icon className={`w-3.5 h-3.5 ${color.icon}`} />
          </div>
          <div className="flex-1 min-w-0">
            <span className={`text-xs font-medium ${color.label}`}>{nodeData.label}</span>
            {nodeData.description && (
              <div className="text-[9px] text-white/40 font-mono truncate">{nodeData.description}</div>
            )}
          </div>
        </div>

        {/* Tooltip - position based on node data */}
        <AnimatePresence>
          {isHovered && campaign && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.12 }}
              className={`
                absolute top-1/2 -translate-y-1/2 w-64 p-3.5 rounded-lg bg-black/90 backdrop-blur-xl border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.6)]
                ${isTooltipLeft ? 'right-full mr-4' : 'left-full ml-4'}
              `}
              style={{ zIndex: 9999 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap className="w-3 h-3 text-blue-400" />
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider">战役</span>
              </div>
              <div className="text-sm font-semibold text-white mb-1.5">{campaign.title}</div>
              <div className="text-[11px] text-gray-400 mb-2 leading-relaxed">
                <span className="text-gray-500">动作: </span>{campaign.action}
              </div>
              <div className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
                <TrendingUp className="w-3 h-3" />
                {campaign.result}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom handle for vertical flow */}
      {nodeData.hasBottomHandle && (
        <Handle type="source" position={Position.Bottom} className="!bg-white/30 !w-1.5 !h-1.5 !border-0" />
      )}

      {/* Right handle for horizontal output */}
      {!nodeData.hasBottomHandle && (
        <Handle type="source" position={Position.Right} className="!bg-white/30 !w-1.5 !h-1.5 !border-0" />
      )}
    </div>
  );
}

// Enhanced Central Hub Node
function HubNode({ data }: NodeProps) {
  const nodeData = data as WarRoomNodeData;
  const Icon = nodeData.icon || Database;

  return (
    <div className="relative" style={{ zIndex: 10 }}>
      <Handle type="target" position={Position.Left} className="!bg-blue-500 !w-2 !h-2 !border-2 !border-[#050505]" />
      <div className="w-24 h-24 rounded-xl bg-blue-950/20 border border-blue-500/30 shadow-[0_0_40px_rgba(59,130,246,0.15),inset_0_0_20px_rgba(59,130,246,0.05)] flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 rounded-xl border border-blue-500/20 animate-pulse" />
        <div className="absolute inset-3 opacity-20">
          <div className="absolute top-1/2 left-1 right-1 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
          <div className="absolute top-1 bottom-1 left-1/2 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
        </div>
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-1.5">
            <Icon className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-xs font-bold text-white text-center leading-tight">{nodeData.label}</span>
          {nodeData.description && (
            <span className="text-[8px] text-blue-300/60 mt-0.5 font-mono">{nodeData.description}</span>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-blue-500 !w-2 !h-2 !border-2 !border-[#050505]" />
    </div>
  );
}

const nodeTypes: NodeTypes = {
  terminal: TerminalNode,
  hub: HubNode,
};

// S-shaped pipeline layout: left vertical → hub → right vertical
const initialNodes: Node[] = [
  // === LEFT COLUMN: Vertical flow (线索入口 → 线索清洗 → 线索分发) ===
  { id: 'left-1', type: 'terminal', position: { x: 50, y: 100 }, data: { label: '线索入口', icon: Target, description: '全域获客', column: 0, tooltipPosition: 'right', hasBottomHandle: true } },
  { id: 'left-2', type: 'terminal', position: { x: 50, y: 280 }, data: { label: '线索清洗', icon: Filter, campaignKey: 'leads-cleaning', description: '规则过滤', column: 0, tooltipPosition: 'right', hasTopHandle: true, hasBottomHandle: true } },
  { id: 'left-3', type: 'terminal', position: { x: 50, y: 460 }, data: { label: '线索分发', icon: ArrowRight, campaignKey: 'crm-dispatch', description: '智能分配', column: 0, tooltipPosition: 'right', hasTopHandle: true } },

  // === CENTRAL HUB ===
  { id: 'hub', type: 'hub', position: { x: 600, y: 280 }, data: { label: 'CRM', icon: Database, description: '核心引擎' } },

  // === RIGHT COLUMN: Vertical flow (销售转化 → 续费管理 → 流失预警) ===
  { id: 'right-1', type: 'terminal', position: { x: 1150, y: 100 }, data: { label: '销售转化', icon: Shield, campaignKey: 'sales-closed-loop', description: '签约闭环', column: 2, tooltipPosition: 'left', hasBottomHandle: true } },
  { id: 'right-2', type: 'terminal', position: { x: 1150, y: 280 }, data: { label: '续费管理', icon: TrendingUp, campaignKey: 'retention', description: '续费跟进', column: 2, tooltipPosition: 'left', hasTopHandle: true, hasBottomHandle: true } },
  { id: 'right-3', type: 'terminal', position: { x: 1150, y: 460 }, data: { label: '流失预警', icon: Zap, campaignKey: 'churn-prevention', description: '客户保卫', column: 2, tooltipPosition: 'left', hasTopHandle: true } },
];

// S-shaped pipeline edges
const initialEdges: Edge[] = [
  // === LEFT VERTICAL: 线索入口 → 线索清洗 → 线索分发 ===
  { id: 'e1', source: 'left-1', target: 'left-2', type: 'smoothstep', animated: true, style: { stroke: '#1e3a8a', strokeWidth: 1.5 }, zIndex: 0 },
  { id: 'e2', source: 'left-2', target: 'left-3', type: 'smoothstep', animated: true, style: { stroke: '#1e3a8a', strokeWidth: 1.5 }, zIndex: 0 },

  // === CROSS TO HUB: 线索分发 → CRM Hub → 销售转化 ===
  { id: 'e3', source: 'left-3', target: 'hub', type: 'smoothstep', animated: true, style: { stroke: '#1e3a8a', strokeWidth: 2 }, zIndex: 0 },
  { id: 'e4', source: 'hub', target: 'right-1', type: 'smoothstep', animated: true, style: { stroke: '#2563eb', strokeWidth: 2 }, zIndex: 0 },

  // === RIGHT VERTICAL: 销售转化 → 续费管理 → 流失预警 ===
  { id: 'e5', source: 'right-1', target: 'right-2', type: 'smoothstep', animated: true, style: { stroke: '#2563eb', strokeWidth: 1.5 }, zIndex: 0 },
  { id: 'e6', source: 'right-2', target: 'right-3', type: 'smoothstep', animated: true, style: { stroke: '#2563eb', strokeWidth: 1.5 }, zIndex: 0 },
];

export default function WarRoomFlow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="w-full h-[600px] md:h-[700px] bg-[#050505]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        panOnDrag={false}
        zoomOnScroll={false}
        zoomOnDoubleClick={false}
        zoomOnPinch={false}
        panOnScroll={false}
        preventScrolling={false}
        fitView
        fitViewOptions={{ maxZoom: 1, minZoom: 0.5 }}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#1e3a8a', strokeWidth: 1.5 },
        }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={24}
          size={0.5}
          color="rgba(255,255,255,0.05)"
        />
      </ReactFlow>
    </div>
  );
}
