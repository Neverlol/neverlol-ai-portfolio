'use client';

import { motion } from 'framer-motion';
import { Radar, Filter, Shield, TrendingUp, Zap, Users, Layers, Target, ArrowDown, ArrowRight, Database, MessageSquare, Building2, MapPin, Briefcase } from 'lucide-react';

const BATTLE_STAGES = [
  // === STAGE 1: 全域获客 ===
  {
    id: 'stage-1',
    title: '全域获客',
    subtitle: 'Multi-Channel Acquisition',
    icon: Radar,
    nodes: [
      { name: '58帮帮IM', desc: '即时通讯获客 + 消息推送', metric: '-40%', label: '获客成本' },
      { name: '推广通', desc: '智能投放 + ROI 实时监控', metric: '+65%', label: '线索量' },
      { name: '社区推广', desc: '线下社区渗透 + 面对面获客', metric: '3x', label: '覆盖半径' },
      { name: '写字楼推广', desc: 'BD陌拜 + 企业直营', metric: '50+', label: '日触达' },
      { name: '商户BD', desc: '异业合作 + 商家联盟', metric: '20+', label: '合作渠道' },
    ],
  },
  // === STAGE 2: 线索清洗 ===
  {
    id: 'stage-2',
    title: '线索清洗',
    subtitle: 'Lead Qualification',
    icon: Filter,
    nodes: [
      { name: '线索池汇总', desc: '全渠道线索统一入口 + 去重', metric: '100%', label: '覆盖率' },
      { name: 'AI清洗', desc: '规则引擎 + ML意图识别', metric: '+18%', label: '有效率' },
      { name: '线索分配', desc: '地域权重 + 类别匹配 + 销售画像', metric: '30min', label: '触达时效' },
    ],
  },
  // === STAGE 3: CRM转化 ===
  {
    id: 'stage-3',
    title: 'CRM转化',
    subtitle: 'Sales Pipeline Control',
    icon: Shield,
    nodes: [
      { name: '销售CRM', desc: '工作台 + 客户公海 + 商机管理', metric: '5x', label: '效率提升' },
      { name: '销售跟单', desc: '6步SOP + 阶段预警机制', metric: '-40%', label: '成交周期' },
      { name: '转化闭环', desc: '线索→签约全链路追踪', metric: '+47%', label: '人效' },
    ],
  },
  // === STAGE 4: 客户生命周期 ===
  {
    id: 'stage-4',
    title: '客户生命周期',
    subtitle: 'LTV & Retention',
    icon: TrendingUp,
    nodes: [
      { name: '续费管理', desc: '续费提醒 + 自动催办', metric: '+15%', label: '续费率' },
      { name: '续费预警', desc: '流失模型 + 提前90天预警', metric: '-60%', label: '流失风险' },
      { name: '客户管理', desc: 'RFM分层 + 价值客户运营', metric: '+28%', label: 'LTV' },
    ],
  },
];

function MetricBadge({ metric, label }: { metric: string; label: string }) {
  return (
    <div className="flex flex-col items-center px-3 py-2 rounded-lg bg-white/[0.02] border border-white/5">
      <span className="text-lg font-bold text-blue-400">{metric}</span>
      <span className="text-[10px] text-gray-500 uppercase tracking-wider">{label}</span>
    </div>
  );
}

export default function WarRoomPipeline() {
  return (
    <div className="relative w-full min-h-screen bg-[#050505] overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20">
        {/* Stage Cards */}
        <div className="space-y-20">
          {BATTLE_STAGES.map((stage, stageIndex) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: stageIndex * 0.12, duration: 0.6 }}
              >
                {/* Stage Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">{stage.title}</h3>
                    <p className="text-xs text-gray-500 font-mono">{stage.subtitle}</p>
                  </div>
                  <div className="ml-auto hidden md:flex items-center gap-2 text-xs text-gray-500">
                    <span>{stage.nodes.length} 个子模块</span>
                  </div>
                </div>

                {/* Nodes Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {stage.nodes.map((node, nodeIndex) => (
                    <motion.div
                      key={nodeIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: stageIndex * 0.12 + nodeIndex * 0.05, duration: 0.4 }}
                      className="group relative bg-[#0A0A0A] border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all duration-300"
                    >
                      {/* Subtle hover glow */}
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      <div className="relative">
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-sm font-medium text-white">{node.name}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed mb-4">{node.desc}</p>
                        <MetricBadge metric={node.metric} label={node.label} />
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Flow Arrow to next stage */}
                {stageIndex < BATTLE_STAGES.length - 1 && (
                  <div className="flex justify-center mt-8">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: stageIndex * 0.12 + 0.3 }}
                      className="flex flex-col items-center gap-2"
                    >
                      <ArrowDown className="w-4 h-4 text-gray-600" />
                      <div className="w-px h-8 bg-gradient-to-b from-white/10 to-transparent" />
                    </motion.div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-20 text-center"
        >
          <button className="px-8 py-4 bg-white text-black text-sm font-semibold rounded-xl hover:bg-gray-100 transition-colors">
            预约 15 分钟漏斗诊断
          </button>
        </motion.div>
      </div>
    </div>
  );
}
