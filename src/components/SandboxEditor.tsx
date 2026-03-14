'use client';

import React, { useEffect, useState, useCallback, useMemo } from 'react';
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
  getSmoothStepPath,
  addEdge,
  Connection,
  Node,
  Edge,
  OnConnect,
  applyNodeChanges,
  applyEdgeChanges,
  NodeTypes,
  EdgeTypes
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { NodeChange, EdgeChange, useReactFlow, ReactFlowProvider, Panel } from '@xyflow/react';
import {
  ArrowRight,
  Save,
  Plus,
  Trash2,
  X,
  Move,
  Edit3,
  Link2,
  Download,
  Upload,
  RotateCcw,
  Check,
  Copy,
  Palette,
  Grid3X3,
  Layers
} from 'lucide-react';
import { getSandboxConfig, saveSandboxConfig } from '@/lib/db';

// ==================== 节点类型定义 ====================
type NodeData = {
  label?: string;
  items?: string[];
  layout?: string;
  cols?: number;
  theme?: 'red' | 'blue' | 'green' | 'purple' | 'yellow';
  width?: number;
  align?: string;
  isHeader?: boolean;
  bgColor?: string;
  borderColor?: string;
  highlight?: boolean;
  subBlocks?: { label: string; highlight?: boolean }[];
};

// ==================== 通用可编辑节点组件 ====================
const EditableNode = ({ data, id, selected }: NodeProps) => {
  const nodeData = data as unknown as NodeData;

  const themeColors: Record<string, { bg: string; border: string; text: string; headBg: string; hover: string; dot: string }> = {
    red: { bg: 'bg-rose-950/20', border: 'border-rose-900/50', text: 'text-rose-400', headBg: 'bg-rose-950/50', hover: 'hover:border-rose-500', dot: 'bg-rose-500' },
    blue: { bg: 'bg-blue-950/20', border: 'border-blue-900/50', text: 'text-blue-400', headBg: 'bg-blue-950/50', hover: 'hover:border-blue-500', dot: 'bg-blue-500' },
    green: { bg: 'bg-emerald-950/20', border: 'border-emerald-900/50', text: 'text-emerald-400', headBg: 'bg-emerald-950/50', hover: 'hover:border-emerald-500', dot: 'bg-emerald-500' },
    purple: { bg: 'bg-purple-950/20', border: 'border-purple-900/50', text: 'text-purple-400', headBg: 'bg-purple-950/50', hover: 'hover:border-purple-500', dot: 'bg-purple-500' },
    yellow: { bg: 'bg-yellow-950/20', border: 'border-yellow-900/50', text: 'text-yellow-400', headBg: 'bg-yellow-950/50', hover: 'hover:border-yellow-500', dot: 'bg-yellow-500' }
  };

  const c = themeColors[nodeData.theme || 'blue'];

  // Header 节点
  if (nodeData.isHeader) {
    return (
      <div
        className={`${nodeData.theme === 'red' ? 'bg-rose-600' : nodeData.theme === 'blue' ? 'bg-blue-600' : nodeData.theme === 'green' ? 'bg-emerald-600' : nodeData.theme === 'purple' ? 'bg-purple-600' : 'bg-yellow-600'} text-white font-bold text-[15px] tracking-widest flex flex-col items-center justify-center shadow-lg rounded-sm py-2.5 z-20 relative`}
        style={{
          width: nodeData.width || 400,
          borderColor: nodeData.borderColor || 'transparent'
        }}
      >
        <Handle type="target" position={Position.Left} className="!bg-white/50 !w-3 !h-3" />
        <Handle type="target" position={Position.Top} className="!bg-white/50 !w-3 !h-3" />
        <div className="flex items-center gap-2">{nodeData.label}</div>
        {nodeData.items && nodeData.items[0] && (
          <div className="text-[10px] font-normal opacity-80 mt-1 font-mono tracking-normal">{nodeData.items[0]}</div>
        )}
        <Handle type="source" position={Position.Right} className="!bg-white/50 !w-3 !h-3" />
        <Handle type="source" position={Position.Bottom} className="!bg-white/50 !w-3 !h-3" />
      </div>
    );
  }

  return (
    <div
      className={`bg-[#0a0a0a] border ${c.border} rounded-sm shadow-xl text-gray-200 font-sans transition-colors ${c.hover} relative ${selected ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0a0a0a]' : ''}`}
      style={{
        width: nodeData.width || 180,
        backgroundColor: nodeData.bgColor || '#0a0a0a',
        borderColor: nodeData.borderColor || undefined
      }}
    >
      {/* 连接点 */}
      <Handle type="target" position={Position.Left} id="t-left" className="!bg-gray-500 !w-2 !h-2" />
      <Handle type="target" position={Position.Right} id="t-right" className="!bg-gray-500 !w-2 !h-2" />
      <Handle type="target" position={Position.Top} id="t-top" className="!bg-gray-500 !w-2 !h-2" />
      <Handle type="target" position={Position.Bottom} id="t-bottom" className="!bg-gray-500 !w-2 !h-2" />
      <Handle type="source" position={Position.Right} id="s-right" className="!bg-gray-500 !w-2 !h-2" />
      <Handle type="source" position={Position.Left} id="s-left" className="!bg-gray-500 !w-2 !h-2" />
      <Handle type="source" position={Position.Bottom} id="s-bottom" className="!bg-gray-500 !w-2 !h-2" />
      <Handle type="source" position={Position.Top} id="s-top" className="!bg-gray-500 !w-2 !h-2" />

      {/* 标题 */}
      {nodeData.label && (
        <div className={`px-3 py-2.5 text-[12px] font-bold ${nodeData.align === 'center' ? 'text-center' : 'text-left'} border-b border-[#222] ${c.headBg} ${c.text}`}>
          {nodeData.label}
        </div>
      )}

      {/* 标准列表布局 */}
      {(!nodeData.layout || nodeData.layout === 'standard') && nodeData.items && (
        <div className="p-3 flex flex-col gap-2 text-[11px] text-gray-300 bg-[#050505]">
          {nodeData.items.map((it: string, i: number) => (
            <div key={i} className="flex items-start leading-tight">
              <span className={`mr-2 mt-1 w-1 h-1 rounded-full ${c.dot} opacity-70 shrink-0`}></span>
              <span>{it}</span>
            </div>
          ))}
        </div>
      )}

      {/* Bento 网格布局 */}
      {nodeData.layout === 'grid' && nodeData.items && (
        <div className={`p-3 bg-[#050505] grid ${nodeData.cols === 3 ? 'grid-cols-3' : 'grid-cols-2'} gap-2`}>
          {nodeData.items.map((it: string, i: number) => (
            <div key={i} className={`border ${c.border} bg-[#111] hover:bg-[#1a1a1a] transition-colors flex items-center justify-center text-center py-2.5 px-1.5 text-[10px] text-gray-300 rounded-sm shadow-sm leading-snug`}>
              {it}
            </div>
          ))}
        </div>
      )}

      {/* 横向流布局 */}
      {nodeData.layout === 'horizontal-flow' && nodeData.items && (
        <div className="p-2 bg-[#050505] flex gap-1 items-center overflow-hidden">
          {nodeData.items.map((it: string, i: number) => (
            <React.Fragment key={i}>
              <div className={`flex-shrink-0 min-w-[28px] border ${c.border} bg-[#111] py-1 px-0.5 flex items-center justify-center text-center text-[7px] text-gray-300 rounded-sm shadow-sm leading-tight h-[32px] w-full`}>
                {it}
              </div>
              {nodeData.items && i < nodeData.items.length - 1 && <ArrowRight className="w-2.5 h-2.5 text-[#555] shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      )}

      {/* 决策布局 */}
      {nodeData.layout === 'decision' && (
        <div className="p-4 bg-[#050505] flex gap-4">
          <div className="flex flex-col gap-3 w-[120px] shrink-0 p-2.5 bg-[#111] border border-[#222] rounded relative mt-2">
            <div className="text-[9px] text-gray-500 absolute -top-2.5 left-2 bg-[#050505] px-1 font-mono">CORE</div>
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

// ==================== 战区组节点 ====================
const GroupNode = ({ data, selected }: NodeProps) => {
  const groupData = data as unknown as { label: string; width: number; height: number; borderColor?: string; bgColor?: string };
  return (
    <div
      className={`relative rounded-lg flex flex-col pointer-events-none ${selected ? 'ring-2 ring-blue-500' : ''}`}
      style={{
        width: groupData.width,
        height: groupData.height,
        border: `1.5px dashed ${groupData.borderColor || '#444'}` as any,
        backgroundColor: groupData.bgColor || 'rgba(17, 17, 17, 0.4)'
      }}
    >
      <div
        className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 border rounded text-[11px] font-bold tracking-widest z-10"
        style={{ backgroundColor: '#0a0a0a', borderColor: groupData.borderColor || '#444', color: groupData.borderColor || '#ccc' }}
      >
        {groupData.label}
      </div>
    </div>
  );
};

// ==================== 隐形路标节点 ====================
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

// ==================== 流光边组件 ====================
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

  const [path, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 0,
  });

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
      <path
        d={path}
        fill="none"
        stroke={edgeColor}
        strokeOpacity={0.15}
        strokeWidth={4}
        style={{ ...style, strokeDasharray: 'none' }}
      />
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

// 注入全局动画样式
const FlowingEdgeStyles = () => (
  <style dangerouslySetInnerHTML={{
    __html: `
    @keyframes flowPulse {
      0% { stroke-dashoffset: 40; }
      100% { stroke-dashoffset: 0; }
    }
  `
  }} />
);

// ==================== 本地节点类型映射 ====================
const localNodeTypes = {
  editableNode: EditableNode,
  groupNode: GroupNode,
  wpNode: WaypointNode
};

const localEdgeTypes = {
  flowing: FlowingEdge
};

// ==================== 默认边样式 ====================
const defaultEdgeOptions = {
  type: 'flowing',
  markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' } as const,
  style: { stroke: '#3b82f6', strokeWidth: 1.5 } as const
};

// ==================== 主编辑器组件 ====================
interface SandboxEditorProps {
  configId: string;
  initialNodes?: Node[];
  initialEdges?: Edge[];
  name: string;
  nodeTypes?: NodeTypes;
  edgeTypes?: EdgeTypes;
}

function SandboxEditorInner({ configId, initialNodes = [], initialEdges = [], name, nodeTypes: customNodeTypes, edgeTypes: customEdgeTypes }: SandboxEditorProps) {
  // 不使用初始值，让 useEffect 加载完成后再渲染，避免闪烁
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  // 编辑面板状态
  const [editLabel, setEditLabel] = useState('');
  const [editItems, setEditItems] = useState('');
  const [editLayout, setEditLayout] = useState('standard');
  const [editTheme, setEditTheme] = useState('blue');
  const [editWidth, setEditWidth] = useState(180);
  const [editAlign, setEditAlign] = useState('left');
  const [editHighlight, setEditHighlight] = useState(false);
  const [editBgColor, setEditBgColor] = useState('');
  const [editBorderColor, setEditBorderColor] = useState('');

  // 边编辑状态
  const [edgeLabel, setEdgeLabel] = useState('');
  const [edgeColor, setEdgeColor] = useState('#3b82f6');
  const [edgeStyle, setEdgeStyle] = useState<'solid' | 'dashed'>('solid');
  const [loaded, setLoaded] = useState(false);

  // 加载配置 - 优先从数据库加载，否则使用传入的初始数据
  useEffect(() => {
    async function loadConfig() {
      try {
        const config = await getSandboxConfig(configId);
        if (config && config.nodes_json && config.edges_json && (config.nodes_json as unknown[]).length > 0) {
          // 数据库有配置，使用数据库的数据
          setNodes(config.nodes_json as any[]);
          setEdges(config.edges_json as any[]);
        } else {
          // 数据库没有配置，使用传入的初始数据
          setNodes(initialNodes);
          setEdges(initialEdges);
        }
      } catch (error) {
        console.error('加载配置失败:', error);
        // 出错时使用传入的初始数据
        setNodes(initialNodes);
        setEdges(initialEdges);
      }
      setLoaded(true);
    }
    loadConfig();
  }, [configId, initialNodes, initialEdges]);

  // 标记组件已加载完成
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  // 处理节点选择
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
    setSelectedEdge(null);
    setShowPanel(true);

    // 填充编辑表单
    const data = node.data as unknown as NodeData;
    setEditLabel(data.label || '');
    setEditItems(data.items?.join('\n') || '');
    setEditLayout(data.layout || 'standard');
    setEditTheme(data.theme || 'blue');
    setEditWidth(data.width || 180);
    setEditAlign(data.align || 'left');
    setEditHighlight(data.highlight || false);
    setEditBgColor(data.bgColor || '');
    setEditBorderColor(data.borderColor || '');
  }, []);

  // 处理边选择
  const onEdgeClick = useCallback((_: React.MouseEvent, edge: Edge) => {
    setSelectedEdge(edge);
    setSelectedNode(null);
    setShowPanel(true);

    setEdgeLabel(edge.label as string || '');
    setEdgeColor((edge.style?.stroke as string) || '#3b82f6');
    setEdgeStyle(edge.style?.strokeDasharray ? 'dashed' : 'solid');
  }, []);

  // 处理空白处点击
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
    setSelectedEdge(null);
    setShowPanel(false);
  }, []);

  // 处理连接
  const onConnect: OnConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge({
      ...params,
      type: 'flowing',
      markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' },
      style: { stroke: '#3b82f6', strokeWidth: 1.5 }
    }, eds));
  }, [setEdges]);

  // 添加新节点
  const addNode = useCallback(() => {
    const newNode: Node = {
      id: `node-${Date.now()}`,
      type: 'editableNode',
      position: { x: 100 + Math.random() * 200, y: 100 + Math.random() * 200 },
      data: {
        label: '新节点',
        items: ['项目1', '项目2'],
        layout: 'standard',
        theme: 'blue',
        width: 180
      }
    };
    setNodes((nds) => [...nds, newNode]);
    setSelectedNode(newNode);
    setSelectedEdge(null);
    setShowPanel(true);
    setEditLabel('新节点');
    setEditItems('项目1\n项目2');
    setEditLayout('standard');
    setEditTheme('blue');
    setEditWidth(180);
    setEditAlign('left');
    setEditHighlight(false);
    setEditBgColor('');
    setEditBorderColor('');
  }, [setNodes]);

  // 删除选中节点
  const deleteSelectedNode = useCallback(() => {
    if (selectedNode) {
      setNodes((nds) => nds.filter((n) => n.id !== selectedNode.id));
      // 同时删除相关的边
      setEdges((eds) => eds.filter((e) => e.source !== selectedNode.id && e.target !== selectedNode.id));
      setSelectedNode(null);
      setShowPanel(false);
    }
  }, [selectedNode, setNodes, setEdges]);

  // 删除选中边
  const deleteSelectedEdge = useCallback(() => {
    if (selectedEdge) {
      setEdges((eds) => eds.filter((e) => e.id !== selectedEdge.id));
      setSelectedEdge(null);
      setShowPanel(false);
    }
  }, [selectedEdge, setEdges]);

  // 更新节点数据
  const updateNodeData = useCallback(() => {
    if (!selectedNode) return;

    const updatedNodes = nodes.map((node) => {
      if (node.id === selectedNode.id) {
        return {
          ...node,
          data: {
            ...node.data,
            label: editLabel,
            items: editItems.split('\n').filter((item) => item.trim()),
            layout: editLayout,
            theme: editTheme,
            width: editWidth,
            align: editAlign,
            highlight: editHighlight,
            bgColor: editBgColor || undefined,
            borderColor: editBorderColor || undefined
          }
        };
      }
      return node;
    });

    setNodes(updatedNodes);
    setSelectedNode({ ...selectedNode, data: { ...selectedNode.data, label: editLabel, items: editItems.split('\n').filter((item) => item.trim()), layout: editLayout, theme: editTheme, width: editWidth, align: editAlign, highlight: editHighlight, bgColor: editBgColor || undefined, borderColor: editBorderColor || undefined } });
  }, [selectedNode, nodes, editLabel, editItems, editLayout, editTheme, editWidth, editAlign, editHighlight, editBgColor, editBorderColor, setNodes]);

  // 更新边数据
  const updateEdgeData = useCallback(() => {
    if (!selectedEdge) return;

    const updatedEdges = edges.map((edge) => {
      if (edge.id === selectedEdge.id) {
        return {
          ...edge,
          label: edgeLabel,
          style: {
            ...edge.style,
            stroke: edgeColor,
            strokeDasharray: edgeStyle === 'dashed' ? '4 4' : undefined
          },
          markerEnd: { type: MarkerType.ArrowClosed, color: edgeColor }
        };
      }
      return edge;
    });

    setEdges(updatedEdges);
    setSelectedEdge({
      ...selectedEdge,
      label: edgeLabel,
      style: { stroke: edgeColor, strokeDasharray: edgeStyle === 'dashed' ? '4 4' : undefined }
    });
  }, [selectedEdge, edges, edgeLabel, edgeColor, edgeStyle, setEdges]);

  // 保存到数据库
  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      const result = await saveSandboxConfig(configId, {
        name,
        nodes_json: nodes,
        edges_json: edges
      });

      if (result) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 2000);
      }
    } catch (error) {
      console.error('保存失败:', error);
    } finally {
      setSaving(false);
    }
  }, [configId, name, nodes, edges]);

  // 导出配置
  const handleExport = useCallback(() => {
    const config = {
      name,
      nodes: nodes,
      edges: edges
    };
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${configId}-config.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [configId, name, nodes, edges]);

  // 导入配置
  const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const config = JSON.parse(e.target?.result as string);
        if (config.nodes && config.edges) {
          setNodes(config.nodes);
          setEdges(config.edges);
        }
      } catch (error) {
        console.error('导入失败:', error);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  }, [setNodes, setEdges]);

  // 重置为默认
  const handleReset = useCallback(() => {
    if (confirm('确定要重置为默认配置吗？当前所有更改将被清除！')) {
      setNodes(initialNodes);
      setEdges(initialEdges);
    }
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  // 合并节点类型 - 当有自定义节点类型时优先使用，否则使用本地组件
  // 关键：确保自定义节点类型从一开始就被使用，避免闪烁
  const mergedNodeTypes = useMemo(() => {
    if (customNodeTypes && Object.keys(customNodeTypes).length > 0) {
      return customNodeTypes;
    }
    return localNodeTypes;
  }, [customNodeTypes]);

  const mergedEdgeTypes = useMemo(() => {
    if (customEdgeTypes && Object.keys(customEdgeTypes).length > 0) {
      return customEdgeTypes;
    }
    return localEdgeTypes;
  }, [customEdgeTypes]);

  // 在数据加载完成前显示加载状态，避免闪烁
  if (!loaded) {
    return (
      <div className="flex items-center justify-center h-full bg-[#050505] text-gray-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span>加载配置中...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onEdgeClick={onEdgeClick}
        onPaneClick={onPaneClick}
        nodeTypes={mergedNodeTypes}
        edgeTypes={mergedEdgeTypes}
        colorMode="dark"
        defaultViewport={{ x: 50, y: 50, zoom: 0.8 }}
        minZoom={0.1}
        maxZoom={2}
        nodesDraggable={true}
        nodesConnectable={true}
        elementsSelectable={true}
        panOnDrag={true}
        zoomOnScroll={true}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        defaultEdgeOptions={defaultEdgeOptions}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="#222" />
        <Controls className="bg-[#111] border-[#333] fill-gray-400" showInteractive={false} />
        <MiniMap
          nodeColor="#333"
          maskColor="rgba(0,0,0,0.7)"
          style={{ backgroundColor: '#050505', border: '1px solid #222', borderRadius: '8px' }}
        />
        <FlowingEdgeStyles />

        {/* 工具栏面板 */}
        <Panel position="top-left" className="flex gap-2">
          <button
            onClick={addNode}
            className="px-3 py-2 bg-[#245fff] text-white rounded-lg flex items-center gap-2 hover:bg-[#1a4fd4] transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            添加节点
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`px-3 py-2 text-white rounded-lg flex items-center gap-2 transition-colors text-sm ${saveSuccess ? 'bg-green-600' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {saving ? (
              <RotateCcw className="w-4 h-4 animate-spin" />
            ) : saveSuccess ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? '保存中...' : saveSuccess ? '已保存' : '保存配置'}
          </button>
          <button
            onClick={handleExport}
            className="px-3 py-2 bg-[#333] text-white rounded-lg flex items-center gap-2 hover:bg-[#444] transition-colors text-sm"
          >
            <Download className="w-4 h-4" />
            导出
          </button>
          <label className="px-3 py-2 bg-[#333] text-white rounded-lg flex items-center gap-2 hover:bg-[#444] transition-colors text-sm cursor-pointer">
            <Upload className="w-4 h-4" />
            导入
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
          <button
            onClick={handleReset}
            className="px-3 py-2 bg-red-600/20 border border-red-600/30 text-red-400 rounded-lg flex items-center gap-2 hover:bg-red-600/30 transition-colors text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            重置
          </button>
        </Panel>

        {/* 节点/边计数面板 */}
        <Panel position="top-right" className="flex gap-4 bg-[#111] border border-[#333] rounded-lg px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Layers className="w-4 h-4" />
            <span>节点: {nodes.length}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Link2 className="w-4 h-4" />
            <span>连线: {edges.length}</span>
          </div>
        </Panel>
      </ReactFlow>

      {/* 编辑面板 */}
      {showPanel && selectedNode && (
        <div className="w-80 bg-[#111] border-l border-[#333] p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium flex items-center gap-2">
              <Edit3 className="w-4 h-4" />
              编辑节点
            </h3>
            <button
              onClick={() => {
                setSelectedNode(null);
                setShowPanel(false);
              }}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {/* 节点标签 */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">节点标题</label>
              <input
                type="text"
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* 节点内容 */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">节点内容 (每行一项)</label>
              <textarea
                value={editItems}
                onChange={(e) => setEditItems(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            {/* 布局类型 */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">布局类型</label>
              <select
                value={editLayout}
                onChange={(e) => setEditLayout(e.target.value)}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="standard">标准列表</option>
                <option value="grid">Bento网格</option>
                <option value="horizontal-flow">横向流程</option>
                <option value="decision">决策布局</option>
              </select>
            </div>

            {/* 主题颜色 */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">主题颜色</label>
              <div className="flex gap-2">
                {['blue', 'green', 'red', 'purple', 'yellow'].map((theme) => (
                  <button
                    key={theme}
                    onClick={() => setEditTheme(theme)}
                    className={`w-8 h-8 rounded-lg border-2 ${
                      editTheme === theme ? 'border-white' : 'border-transparent'
                    } ${
                      theme === 'blue' ? 'bg-blue-600' :
                      theme === 'green' ? 'bg-emerald-600' :
                      theme === 'red' ? 'bg-rose-600' :
                      theme === 'purple' ? 'bg-purple-600' :
                      'bg-yellow-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* 宽度 */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">节点宽度: {editWidth}px</label>
              <input
                type="range"
                min={100}
                max={600}
                value={editWidth}
                onChange={(e) => setEditWidth(Number(e.target.value))}
                className="w-full"
              />
            </div>

            {/* 对齐方式 */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">对齐方式</label>
              <select
                value={editAlign}
                onChange={(e) => setEditAlign(e.target.value)}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="left">左对齐</option>
                <option value="center">居中</option>
              </select>
            </div>

            {/* 高亮 */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="highlight"
                checked={editHighlight}
                onChange={(e) => setEditHighlight(e.target.checked)}
                className="w-4 h-4 rounded border-[#333] bg-[#0a0a0a]"
              />
              <label htmlFor="highlight" className="text-sm text-gray-400">高亮显示</label>
            </div>

            {/* 背景颜色 */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">背景颜色 (可选)</label>
              <input
                type="text"
                value={editBgColor}
                onChange={(e) => setEditBgColor(e.target.value)}
                placeholder="rgba(0,0,0,0.5)"
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* 边框颜色 */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">边框颜色 (可选)</label>
              <input
                type="text"
                value={editBorderColor}
                onChange={(e) => setEditBorderColor(e.target.value)}
                placeholder="#333333"
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* 保存节点更改 */}
            <button
              onClick={updateNodeData}
              className="w-full px-4 py-2 bg-[#245fff] text-white rounded-lg hover:bg-[#1a4fd4] transition-colors"
            >
              应用更改
            </button>

            {/* 删除节点 */}
            <button
              onClick={deleteSelectedNode}
              className="w-full px-4 py-2 bg-red-600/20 border border-red-600/30 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              删除节点
            </button>
          </div>
        </div>
      )}

      {/* 边编辑面板 */}
      {showPanel && selectedEdge && (
        <div className="w-80 bg-[#111] border-l border-[#333] p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-medium flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              编辑连线
            </h3>
            <button
              onClick={() => {
                setSelectedEdge(null);
                setShowPanel(false);
              }}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            {/* 连线标签 */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">连线标签</label>
              <input
                type="text"
                value={edgeLabel}
                onChange={(e) => setEdgeLabel(e.target.value)}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* 连线颜色 */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">连线颜色</label>
              <div className="flex gap-2">
                {['#3b82f6', '#22c55e', '#ef4444', '#a855f7', '#f59e0b'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setEdgeColor(color)}
                    className={`w-8 h-8 rounded-lg border-2 ${
                      edgeColor === color ? 'border-white' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* 连线样式 */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">连线样式</label>
              <select
                value={edgeStyle}
                onChange={(e) => setEdgeStyle(e.target.value as 'solid' | 'dashed')}
                className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#333] rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
              >
                <option value="solid">实线</option>
                <option value="dashed">虚线</option>
              </select>
            </div>

            {/* 保存连线更改 */}
            <button
              onClick={updateEdgeData}
              className="w-full px-4 py-2 bg-[#245fff] text-white rounded-lg hover:bg-[#1a4fd4] transition-colors"
            >
              应用更改
            </button>

            {/* 删除连线 */}
            <button
              onClick={deleteSelectedEdge}
              className="w-full px-4 py-2 bg-red-600/20 border border-red-600/30 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors flex items-center justify-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              删除连线
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==================== 导出主组件 ====================
export default function SandboxEditor(props: SandboxEditorProps) {
  return (
    <ReactFlowProvider>
      <SandboxEditorInner {...props} />
    </ReactFlowProvider>
  );
}
