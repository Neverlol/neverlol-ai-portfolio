'use client';

import React, { useEffect, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  BackgroundVariant,
  Handle,
  Position,
  NodeProps,
  MarkerType,
  EdgeProps,
  getBezierPath,
  getSmoothStepPath
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { ArrowRight } from 'lucide-react';
import { getSandboxConfig } from '@/lib/db';

// --- 0. 流光动画边组件 (Double-Edge Track) ---
// 双层轨道：底层暗线 + 顶层流光动画
const FlowingEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  label,
  labelStyle,
  labelBgStyle,
  data
}: EdgeProps) => {
  const edgeColor = style.stroke as string || '#3b82f6';

  // 使用 smoothstep 路径
  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 0,
  });

  // 获取 marker 颜色
  const getMarkerColor = () => {
    if (!markerEnd) return edgeColor;
    const marker = markerEnd as { color?: string };
    return marker.color || edgeColor;
  };
  const markerColor = getMarkerColor();

  return (
    <g className="flowing-edge-group">
      <defs>
        <marker
          id={id + '-arrow'}
          viewBox="0 -5 10 10"
          refX={8}
          refY={0}
          markerWidth={6}
          markerHeight={6}
          orient="auto"
        >
          <path d="M0,-5L10,0L0,5" fill={markerColor} />
        </marker>
      </defs>
      {/* 底层暗轨道 - 极暗的底色 */}
      <path
        d={path}
        fill="none"
        stroke={edgeColor}
        strokeOpacity={0.15}
        strokeWidth={4}
        style={{ ...style, strokeDasharray: 'none' }}
      />
      {/* 顶层流光 - 强发光 + 动画 */}
      <path
        d={path}
        fill="none"
        stroke={edgeColor}
        strokeWidth={2.5}
        strokeLinecap="round"
        markerEnd={markerEnd ? `url(#${id}-arrow)` : undefined}
        style={{
          strokeDasharray: '8 32',
          filter: `drop-shadow(0 0 6px ${edgeColor}) drop-shadow(0 0 12px ${edgeColor})`,
          animation: 'flowPulse 2s linear infinite',
        }}
      />
      {/* 标签 */}
      {label && (
        <g transform={`translate(${labelX}, ${labelY})`}>
          {labelBgStyle && (
            <rect
              x={-20}
              y={-8}
              width={40}
              height={16}
              rx={3}
              fill={(labelBgStyle as any).fill || '#111'}
            />
          )}
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fill={labelStyle?.fill || edgeColor}
            fontSize={labelStyle?.fontSize || 10}
            fontFamily="monospace"
            style={{ fontWeight: labelStyle?.fontWeight || 'normal' }}
          >
            {label as string}
          </text>
        </g>
      )}
    </g>
  );
};

// 注入全局流光动画 CSS
const FlowingEdgeStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
    @keyframes flowPulse {
      0% { stroke-dashoffset: 40; }
      100% { stroke-dashoffset: 0; }
    }
  `}} />
);

// --- 1. 万能复合工业蓝图节点 ---
const RichDrawioNode = ({ data }: NodeProps) => {
  const nodeData = data as unknown as { label?: string; items?: string[]; layout?: string; subBlocks?: any[]; highlight?: boolean; width?: number; align?: string; isHeader?: boolean };

  if (nodeData.isHeader) {
    return (
      <div className="bg-yellow-500 text-black font-bold text-[14px] tracking-widest flex items-center justify-center shadow-lg rounded-sm" style={{ width: nodeData.width || 400, height: 36 }}>
        {nodeData.label}
      </div>
    );
  }

  return (
    <div
      className={`bg-[#0a0a0a] border ${nodeData.highlight ? 'border-yellow-600 shadow-[0_0_15px_rgba(202,138,4,0.2)]' : 'border-[#333]'} rounded-sm shadow-xl text-gray-200 font-sans transition-colors hover:border-blue-500`}
      style={{ width: nodeData.width || 180 }}
    >
      <Handle type="target" position={Position.Left} id="t-left" className="w-1.5 h-3 bg-gray-500 border-none rounded-none" />
      <Handle type="target" position={Position.Right} id="t-right" className="w-1.5 h-3 bg-gray-500 border-none rounded-none opacity-0" />
      <Handle type="target" position={Position.Top} id="t-top" className="w-3 h-1.5 bg-gray-500 border-none rounded-none opacity-0" />
      <Handle type="target" position={Position.Bottom} id="t-bottom" className="w-3 h-1.5 bg-gray-500 border-none rounded-none opacity-0" />

      <Handle type="source" position={Position.Right} id="s-right" className="w-1.5 h-3 bg-gray-500 border-none rounded-none" />
      <Handle type="source" position={Position.Left} id="s-left" className="w-1.5 h-3 bg-gray-500 border-none rounded-none opacity-0" />
      <Handle type="source" position={Position.Bottom} id="s-bottom" className="w-3 h-1.5 bg-gray-500 border-none rounded-none opacity-0" />
      <Handle type="source" position={Position.Top} id="s-top" className="w-3 h-1.5 bg-gray-500 border-none rounded-none opacity-0" />

      {nodeData.label && (
        <div className={`px-3 py-2 text-[12px] font-bold ${nodeData.align === 'center' ? 'text-center' : 'text-left'} border-b ${nodeData.highlight ? 'border-yellow-600/50 bg-yellow-950/30 text-yellow-500' : 'border-[#222] bg-[#141414]'}`}>
          {nodeData.label}
        </div>
      )}

      {(!nodeData.layout || nodeData.layout === 'standard') && nodeData.items && nodeData.items.length > 0 && (
        <div className="p-3 flex flex-col gap-1.5 text-[11px] text-gray-400 bg-[#050505]">
          {nodeData.items.map((it, i) => (
            <div key={i} className="flex items-start leading-tight">
              <span className="mr-1.5 text-gray-600 select-none">▪</span>
              <span>{it}</span>
            </div>
          ))}
        </div>
      )}

      {nodeData.layout === 'horizontal-flow' && nodeData.items && (
        <div className="p-4 bg-[#050505] flex items-center justify-between relative gap-2 mb-2">
          {nodeData.items.map((it, i) => (
            <React.Fragment key={i}>
              <div className="flex-1 bg-[#151515] border border-[#333] p-2 flex items-center justify-center text-center text-[10px] text-gray-300 z-10 leading-tight rounded-sm h-12">
                {it}
              </div>
              {nodeData.items && i < nodeData.items.length - 1 && <ArrowRight className="w-4 h-4 text-[#555] shrink-0 z-10" />}
            </React.Fragment>
          ))}
          {/* U 型回流线 */}
          <div className="absolute -bottom-4 left-[30%] right-[10%] h-6 border-b border-l border-r border-[#ef4444] border-dashed rounded-b-md z-0 pointer-events-none">
            <div className="absolute -top-1.5 -left-[4.5px] text-[#ef4444] text-[10px]">▲</div>
            <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-[#050505] px-1.5 text-[9px] text-[#ef4444] font-bold tracking-widest">
              转化失败回流
            </div>
          </div>
        </div>
      )}

      {nodeData.layout === 'decision' && (
        <div className="p-4 bg-[#050505] flex gap-4">
          <div className="flex flex-col gap-3 w-[120px] shrink-0 p-2.5 bg-[#111] border border-[#222] rounded relative mt-2">
            <div className="text-[9px] text-gray-500 absolute -top-2.5 left-2 bg-[#050505] px-1 font-mono">CORE_MODULES</div>
            {nodeData.subBlocks?.map((block, i) => (
              <div key={i} className={`py-2 text-center text-[11px] rounded-sm ${block.highlight ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-600/50 font-bold' : 'bg-[#1a1a1a] text-gray-200 border border-[#333]'}`}>
                {block.label}
              </div>
            ))}
          </div>
          <div className="w-px bg-[#222]"></div>
          <div className="flex-1 flex flex-col justify-center gap-2 text-[11px] text-gray-400 p-2.5 bg-[#111] border border-[#222] rounded relative mt-2">
            <div className="text-[9px] text-gray-500 absolute -top-2.5 left-2 bg-[#050505] px-1 font-mono">FACTORS</div>
            {nodeData.items?.map((it, i) => (
              <div key={i} className="flex items-start"><span className="mr-1.5 text-gray-600 select-none">▪</span><span>{it}</span></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// --- 2. 背景包裹战区框 ---
const GroupWrapperNode = ({ data }: NodeProps) => {
  const groupData = data as unknown as { label: string; width: number; height: number; borderColor?: string; bgColor?: string };
  return (
    <div className="relative rounded-lg flex flex-col pointer-events-none" style={{ width: groupData.width, height: groupData.height, border: `1.5px dashed ${groupData.borderColor || '#444'}`, backgroundColor: groupData.bgColor || 'rgba(17, 17, 17, 0.4)' }}>
      {/* 彻底修复文字遮挡问题：强制不透明黑底 */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 border rounded text-[11px] font-bold tracking-widest z-10" style={{ backgroundColor: '#0a0a0a', borderColor: groupData.borderColor || '#444', color: groupData.borderColor || '#ccc' }}>
        {groupData.label}
      </div>
    </div>
  );
};

// --- 3. 真·隐形路标节点 (解决线消失问题) ---
const WaypointNode = () => (
  <div style={{ width: 1, height: 1, background: 'transparent' }}>
    <Handle type="target" position={Position.Top} id="t-top" className="opacity-0" />
    <Handle type="target" position={Position.Right} id="t-right" className="opacity-0" />
    <Handle type="target" position={Position.Bottom} id="t-bottom" className="opacity-0" />
    <Handle type="target" position={Position.Left} id="t-left" className="opacity-0" />
    <Handle type="source" position={Position.Top} id="s-top" className="opacity-0" />
    <Handle type="source" position={Position.Right} id="s-right" className="opacity-0" />
    <Handle type="source" position={Position.Bottom} id="s-bottom" className="opacity-0" />
    <Handle type="source" position={Position.Left} id="s-left" className="opacity-0" />
  </div>
);

export const nodeTypes = { richNode: RichDrawioNode, groupNode: GroupWrapperNode, wpNode: WaypointNode };
export const edgeTypes = { flowing: FlowingEdge };

// --- 4. 绝对严密的坐标系统 (主轴 Y=262，下轴 Y=482) ---
export const initialNodes = [
  // --- 底框 ---
  { id: 'box-sfa', type: 'groupNode', position: { x: 1340, y: 140 }, data: { label: '商机跟进域 (SFA)', width: 560, height: 380, borderColor: '#ca8a04', bgColor: 'rgba(202, 138, 4, 0.05)' }, zIndex: -1 },
  // LTV 区域使用 ltv-head 作为标题，不再单独显示底框标签

  // --- 列 1：拉开 Y 轴避免重叠 ---
  { id: 'm-net', type: 'richNode', position: { x: 0, y: 0 }, data: { label: '网络推广', items: ['SEO/SEM', 'B2B', '行业/垂直', '媒体', 'QQ', '微信', '相关论坛', '微博/博客', '友链/外链'] } },
  { id: 'm-off', type: 'richNode', position: { x: 0, y: 280 }, data: { label: '线下推广', items: ['电视/广播', '报纸/杂志', '公交/地铁', '楼宇', '户外', '会展'] } },
  { id: 'm-col', type: 'richNode', position: { x: 0, y: 500 }, data: { label: '数据采集', items: ['工商', '协会', '网站爬取', '企业名录'] } },
  { id: 'm-edm', type: 'richNode', position: { x: 0, y: 680 }, data: { label: '数据库营销', items: ['EDM', 'SMS', '语音', '微信', '提醒', 'QQ'] } },

  // --- 列 2 ---
  { id: 'c-web', type: 'richNode', position: { x: 260, y: 100 }, data: { label: '企业网站', align: 'center', width: 120 } },
  { id: 'c-adv', type: 'richNode', position: { x: 260, y: 280 }, data: { label: '咨询通道', align: 'center', width: 120 } },
  { id: 'c-act', type: 'richNode', position: { x: 260, y: 500 }, data: { label: '行动反馈', align: 'center', width: 120 } },

  // --- 列 3 ---
  { id: 'l-gen', type: 'richNode', position: { x: 450, y: 280 }, data: { label: 'Leads生成', align: 'center', width: 100 } },

  // --- 列 4 ---
  { id: 'info-top', type: 'richNode', position: { x: 620, y: 140 }, data: { label: '信息管理', items: ['Leads导入', '标准化', '结构化', '垃圾删除', '信息补全', '重复校验', '号码测试', 'Leads评分', 'Incall绿色通道'] } },
  { id: 'info-bot', type: 'richNode', position: { x: 620, y: 440 }, data: { label: '信息管理', items: ['盘点/评估', '分配策略', '销售识别', '使用规则', '效果监控'] } },

  // --- 列 5、6、7、8 主轴对齐 (中心点绝对固定在 Y=262，下轴固定在 Y=482) ---
  // y = 262 - (height/2)
  { id: 's-valid', type: 'richNode', position: { x: 880, y: 244 }, data: { label: '有效可分发leads', align: 'center', width: 160 } },
  { id: 'db-priv', type: 'richNode', position: { x: 1120, y: 244 }, data: { label: '销售私有库', align: 'center', highlight: true, width: 160 } },

  { id: 'sfa-funnel', type: 'richNode', position: { x: 1380, y: 179 }, data: { label: '销售漏斗', width: 160, items: ['外呼', '接通', '有效', '拜访', '签单'] } },
  { id: 'sfa-sop', type: 'richNode', position: { x: 1600, y: 179 }, data: { label: '商机开发SOP', width: 260, items: ['0% 公司名；决策电话；初步意向', '20% 明确需求；意向合作；明确品类', '40% 拜访；预计时间、金额', '60% 订金；签合同；全款时间', '100% 完成全款'] } },

  { id: 'order', type: 'richNode', position: { x: 1980, y: 179 }, data: { label: '订单管理', width: 180, items: ['审核', '认证', '财务', '商品库', '进销存'] } },

  // 下轴 Y=482
  { id: 's-invalid', type: 'richNode', position: { x: 880, y: 464 }, data: { label: '未达分发标准leads', align: 'center', width: 160 } },
  { id: 'db-pub', type: 'richNode', position: { x: 1120, y: 464 }, data: { label: '公海Database', align: 'center', highlight: true, width: 160 } },

  // SFA 下方诊断模块
  { id: 'sfa-diag1', type: 'richNode', position: { x: 1380, y: 400 }, data: { label: '销售漏斗与商机转化过程指标关联', align: 'center', width: 480 } },
  // Y 设为 464，使其横向中心点与 db-pub 绝对平行，抽出完美的直线
  { id: 'sfa-diag2', type: 'richNode', position: { x: 1380, y: 464 }, data: { label: '诊断转化问题；推进解决', align: 'center', width: 480 } },

  // --- LTV 后链路 ---
  { id: 'ltv-head', type: 'richNode', position: { x: 2260, y: 0 }, data: { isHeader: true, label: '客户生命周期管理', width: 680 } },
  { id: 'ltv-act', type: 'richNode', position: { x: 2260, y: 60 }, data: { label: '客户行为管理', layout: 'horizontal-flow', items: ['开通会员', '发帖投放广告', '消耗现金竞价排名', '获取C端流量', '尝试转化成交'], width: 680 } },

  // 核心循环也在 Y=262 主轴上
  { id: 'ltv-fine', type: 'richNode', position: { x: 2260, y: 244 }, data: { label: '精细化管理模块', items: ['客户分层管理', '指标监控预警', '行为数据追踪'], width: 180 } },
  { id: 'ltv-val', type: 'richNode', position: { x: 2500, y: 244 }, data: { label: '增值管理', items: ['现金充值', '现金消耗', '余额存量', '产品投放', '竞价策略', '流量转化'], width: 180 } },
  { id: 'ltv-renew', type: 'richNode', position: { x: 2740, y: 244 }, data: { label: '续费管理', items: ['续费率', '维护频率', '行业效果', '未续费原因', '问题跟踪', '资源投放'], width: 180 } },

  // 决策层下移，避免遮挡
  { id: 'ltv-dec', type: 'richNode', position: { x: 2260, y: 460 }, data: { label: '决策模块', layout: 'decision', subBlocks: [{ label: '客户诊断' }, { label: '策略仓库', highlight: true }], items: ['政策因素', '服务因素', '效果因素', '行业因素', '其他因素'], width: 360 } },
  { id: 'ltv-exe', type: 'richNode', position: { x: 2260, y: 800 }, data: { label: '执行模块', items: ['电话', '面访', '邮件', 'QQ', '微信'], width: 280 } },

  // --- C. 修复后的深水区坚固路标 (绝对不穿模) ---
  { id: 'wp-renew-down', type: 'wpNode', position: { x: 2830, y: 860 }, data: {} },
  { id: 'wp-db-up', type: 'wpNode', position: { x: 1200, y: 860 }, data: {} },
  { id: 'wp-db-down', type: 'wpNode', position: { x: 1200, y: 920 }, data: {} },
  { id: 'wp-edm-up', type: 'wpNode', position: { x: 90, y: 920 }, data: {} },
];

// --- 5. 箭头样式定义 ---
// 正向流动：蓝色实线
const forwardEdge = { type: 'step', markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' }, style: { stroke: '#3b82f6', strokeWidth: 1.5 } };
const forwardSmoothEdge = { type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' }, style: { stroke: '#3b82f6', strokeWidth: 1.5 } };
// 成功/正向特殊：蓝色实线
const successEdge = { type: 'step', markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' }, style: { stroke: '#3b82f6', strokeWidth: 1.5 } };
// 回流/异常/负面：红色虚线
const backEdge = { type: 'step', markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444' }, style: { stroke: '#ef4444', strokeWidth: 1.5, strokeDasharray: '4 4' } };
const backSmoothEdge = { type: 'smoothstep', markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444' }, style: { stroke: '#ef4444', strokeWidth: 1.5, strokeDasharray: '4 4' } };

export const initialEdges = [
  // --- 正向流动：蓝色实线 ---
  { id: 'e1', source: 'm-net', sourceHandle: 's-right', target: 'c-web', targetHandle: 't-left', ...forwardSmoothEdge, type: 'flowing' },
  { id: 'e2', source: 'm-off', sourceHandle: 's-right', target: 'c-web', targetHandle: 't-left', ...forwardSmoothEdge, type: 'flowing' },
  { id: 'e3', source: 'm-off', sourceHandle: 's-right', target: 'c-adv', targetHandle: 't-left', ...forwardSmoothEdge, type: 'flowing' },
  { id: 'e4', source: 'm-col', sourceHandle: 's-right', target: 'c-act', targetHandle: 't-left', ...forwardSmoothEdge, type: 'flowing' },
  { id: 'e5', source: 'm-edm', sourceHandle: 's-right', target: 'c-act', targetHandle: 't-left', ...forwardSmoothEdge, type: 'flowing' },

  { id: 'e6', source: 'c-web', sourceHandle: 's-right', target: 'l-gen', targetHandle: 't-left', label: '行为捕捉', labelStyle: { fill: '#3b82f6', fontSize: 10 }, labelBgStyle: { fill: '#111' }, ...forwardSmoothEdge, type: 'flowing' },
  { id: 'e7', source: 'c-adv', sourceHandle: 's-right', target: 'l-gen', targetHandle: 't-left', ...forwardSmoothEdge, type: 'flowing' },
  { id: 'e8', source: 'c-act', sourceHandle: 's-right', target: 'l-gen', targetHandle: 't-left', label: '营销激活', labelStyle: { fill: '#3b82f6', fontSize: 10 }, labelBgStyle: { fill: '#111' }, ...forwardSmoothEdge, type: 'flowing' },

  { id: 'e9', source: 'l-gen', sourceHandle: 's-right', target: 'info-top', targetHandle: 't-left', ...forwardSmoothEdge, type: 'flowing' },
  { id: 'e10', source: 'l-gen', sourceHandle: 's-right', target: 'info-bot', targetHandle: 't-left', ...forwardSmoothEdge, type: 'flowing' },

  { id: 'e11', source: 'info-top', sourceHandle: 's-right', target: 's-valid', targetHandle: 't-left', ...forwardSmoothEdge, type: 'flowing' },
  { id: 'e12', source: 'info-top', sourceHandle: 's-right', target: 's-invalid', targetHandle: 't-left', ...forwardSmoothEdge, type: 'flowing' },
  { id: 'e13', source: 'info-bot', sourceHandle: 's-right', target: 's-valid', targetHandle: 't-left', ...forwardSmoothEdge, type: 'flowing' },
  { id: 'e14', source: 'info-bot', sourceHandle: 's-right', target: 's-invalid', targetHandle: 't-left', ...forwardSmoothEdge, type: 'flowing' },

  // --- 主干道直线 ---
  { id: 'e15', source: 's-valid', sourceHandle: 's-right', target: 'db-priv', targetHandle: 't-left', label: 'Leads分配', labelStyle: { fill: '#3b82f6', fontSize: 10 }, labelBgStyle: { fill: '#111' }, ...forwardEdge, type: 'flowing' },
  { id: 'e16', source: 's-invalid', sourceHandle: 's-right', target: 'db-pub', targetHandle: 't-left', label: '待孵化', labelStyle: { fill: '#3b82f6', fontSize: 10 }, labelBgStyle: { fill: '#111' }, ...forwardEdge, type: 'flowing' },
  { id: 'e17', source: 'db-priv', sourceHandle: 's-right', target: 'sfa-funnel', targetHandle: 't-left', ...forwardEdge, type: 'flowing' },

  { id: 'e18', source: 'sfa-funnel', sourceHandle: 's-right', target: 'sfa-sop', targetHandle: 't-left', markerStart: { type: MarkerType.ArrowClosed, color: '#3b82f6', orient: 'auto-start-reverse' }, ...forwardEdge, type: 'flowing' },
  { id: 'e19', source: 'sfa-funnel', sourceHandle: 's-bottom', target: 'sfa-diag1', targetHandle: 't-top', ...forwardEdge, type: 'flowing' },
  { id: 'e19b', source: 'sfa-sop', sourceHandle: 's-bottom', target: 'sfa-diag1', targetHandle: 't-top', ...forwardEdge, type: 'flowing' },
  { id: 'e20', source: 'sfa-diag1', sourceHandle: 's-bottom', target: 'sfa-diag2', targetHandle: 't-top', ...forwardEdge, type: 'flowing' },

  // --- 回流/异常：红色虚线 ---
  { id: 'e21', source: 'sfa-diag2', sourceHandle: 's-left', target: 'db-pub', targetHandle: 't-right', label: '未签约', labelStyle: { fill: '#ef4444', fontSize: 10 }, labelBgStyle: { fill: '#111' }, ...backEdge, type: 'flowing' },

  // --- 成功：绿色实线 ---
  { id: 'e22', source: 'sfa-sop', sourceHandle: 's-right', target: 'order', targetHandle: 't-left', label: '签约', labelStyle: { fill: '#3b82f6', fontSize: 10 }, ...successEdge, type: 'flowing' },

  // --- 后续正向流动：蓝色 ---
  { id: 'e23', source: 'order', sourceHandle: 's-right', target: 'ltv-act', targetHandle: 't-left', ...forwardSmoothEdge, type: 'flowing' },
  { id: 'e24', source: 'order', sourceHandle: 's-right', target: 'ltv-fine', targetHandle: 't-left', ...forwardEdge, type: 'flowing' },

  { id: 'e25', source: 'ltv-fine', sourceHandle: 's-right', target: 'ltv-val', targetHandle: 't-left', label: '活跃', labelStyle: { fill: '#3b82f6', fontSize: 10 }, labelBgStyle: { fill: '#111' }, ...forwardEdge, type: 'flowing' },
  { id: 'e26', source: 'ltv-val', sourceHandle: 's-right', target: 'ltv-renew', targetHandle: 't-left', label: '到期', labelStyle: { fill: '#3b82f6', fontSize: 10 }, labelBgStyle: { fill: '#111' }, ...forwardEdge, type: 'flowing' },

  // --- 异常/决策：红色 ---
  { id: 'err', source: 'ltv-fine', sourceHandle: 's-bottom', target: 'ltv-dec', targetHandle: 't-top', label: '异常诊断', labelStyle: { fill: '#ef4444', fontSize: 10 }, labelBgStyle: { fill: '#111' }, ...backEdge, type: 'flowing' },
  { id: 'dec', source: 'ltv-dec', sourceHandle: 's-bottom', target: 'ltv-exe', targetHandle: 't-top', label: '策略推进', labelStyle: { fill: '#3b82f6', fontSize: 10 }, labelBgStyle: { fill: '#111' }, ...forwardEdge, type: 'flowing' },
  { id: 'e-back', source: 'ltv-exe', sourceHandle: 's-left', target: 'ltv-dec', targetHandle: 't-left', label: '未解决回退', labelStyle: { fill: '#ef4444', fontSize: 10 }, labelBgStyle: { fill: '#111' }, ...backSmoothEdge, type: 'flowing' },

  // --- 成功：绿色 ---
  { id: 'e-ok', source: 'ltv-exe', sourceHandle: 's-right', target: 'ltv-val', targetHandle: 't-bottom', label: '解决入增值', labelStyle: { fill: '#3b82f6', fontSize: 10 }, labelBgStyle: { fill: '#111' }, ...successEdge, type: 'flowing' },

  // --- 地铁级大回流：红色虚线 ---
  { id: 'r1', source: 'ltv-renew', sourceHandle: 's-bottom', target: 'wp-renew-down', targetHandle: 't-top', ...backEdge, type: 'flowing' },
  { id: 'r2', source: 'wp-renew-down', sourceHandle: 's-left', target: 'wp-db-up', targetHandle: 't-right', label: '未续费掉库', labelStyle: { fill: '#ef4444', fontSize: 12, fontWeight: 'bold' }, labelBgStyle: { fill: '#111' }, ...backEdge, type: 'flowing' },
  { id: 'r3', source: 'wp-db-up', sourceHandle: 's-top', target: 'db-pub', targetHandle: 't-bottom', ...backEdge, type: 'flowing' },

  { id: 'p1', source: 'db-pub', sourceHandle: 's-bottom', target: 'wp-db-down', targetHandle: 't-top', ...backEdge, type: 'flowing' },
  { id: 'p2', source: 'wp-db-down', sourceHandle: 's-left', target: 'wp-edm-up', targetHandle: 't-right', label: '公海营销', labelStyle: { fill: '#ef4444', fontSize: 12, fontWeight: 'bold' }, labelBgStyle: { fill: '#111' }, ...backEdge, type: 'flowing' },
  { id: 'p3', source: 'wp-edm-up', sourceHandle: 's-top', target: 'm-edm', targetHandle: 't-bottom', ...backEdge, type: 'flowing' },
];

export default function CampaignFlowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const [loaded, setLoaded] = useState(false);

  // 从数据库加载配置并更新状态
  useEffect(() => {
    async function loadConfig() {
      const config = await getSandboxConfig('campaigns');
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
      <div className="w-full h-full bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-gray-400">加载中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-[#050505] cursor-grab active:cursor-grabbing">
      <FlowingEdgeStyles />
      <ReactFlow
        nodes={nodes} edges={edges} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes} edgeTypes={edgeTypes} colorMode="dark"
        defaultViewport={{ x: 100, y: 100, zoom: 0.9 }}
        minZoom={0.1} maxZoom={2}
        nodesDraggable={false} nodesConnectable={false}
        panOnDrag={true} zoomOnScroll={true} elementsSelectable={true}
        proOptions={{ hideAttribution: true }} defaultEdgeOptions={{ ...forwardEdge, type: 'flowing' }}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#222" />
        <Controls className="bg-[#111] border-[#333] fill-gray-400" showInteractive={false} />
        <MiniMap
          nodeColor="#333" maskColor="rgba(0,0,0,0.7)"
          style={{ backgroundColor: '#050505', border: '1px solid #222', borderRadius: '8px' }}
        />
      </ReactFlow>
    </div>
  );
}
