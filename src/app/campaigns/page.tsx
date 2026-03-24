'use client';

import { Header } from '@/components/Header';
import CampaignFlowCanvas from '@/components/CampaignFlowCanvas';
import Link from 'next/link';
import { ArrowRight, Sparkles, Zap, Target, TrendingUp, Users, ChevronRight, MousePointer, Info, Bot, Wrench, Clock, CheckCircle } from 'lucide-react';

export default function CampaignsPage() {
  return (
    <main className="relative w-full min-h-screen bg-black text-white flex flex-col pt-24 pb-20 px-4 md:px-8 overflow-hidden font-sans">
      <Header />

      {/* 贯穿的竖向网格对齐线 */}
      <div className="absolute inset-0 z-0 flex pointer-events-none opacity-40">
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 divide-x divide-white/10 border-x border-white/10">
          <div></div><div></div><div></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto w-full mb-12 flex flex-col items-center text-center relative z-10">

        {/* 标签 - 强调大厂验证背景 */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-mono text-gray-400 tracking-wider uppercase">58 同城 · 亿级盘口实战验证</span>
        </div>

        {/* 主标题 - 对齐 PipelineTeaser 的 4 步 */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          从线索到利润<br />
          <span className="text-white">4步增长闭环</span>
        </h1>
        <p className="text-gray-500 max-w-2xl text-sm leading-relaxed mb-6">
          获客 → 筛选 → 跟进 → 复购。这套在几百人团队、亿级盘口上验证过的增长体系，
          <br />现在可以拆解成 Skill 挂载到你的 <img src="/openclaw-logo.png" alt="OpenClaw" className="w-4 h-4 object-contain inline-block align-text-bottom mx-0.5" />OpenClaw 系统里自动执行。
        </p>
      </div>

      {/* --- Skill 认知建立区 --- */}
      <div className="w-full max-w-5xl mx-auto mb-16 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-3">
            这套体系是怎么<span className="text-blue-500">跑起来的</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            4 步闭环里的每一步，都可以把「老销售脑子里的经验」变成 AI 员工能执行的技能手册
          </p>
        </div>

        {/* 什么是 Skill */}
        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 mb-6">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
              <Bot className="w-6 h-6 text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white mb-2">Skill = 技能手册</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                <img src="/openclaw-logo.png" alt="OpenClaw" className="w-4 h-4 object-contain inline-block align-text-bottom mx-0.5" />OpenClaw 是 AI 员工的管理系统，Agent 是替你执行的数字员工，
                Skill 是员工手里的「工作手册」——把老销售多年的经验变成 AI 能看懂、能执行的步骤。
              </p>
            </div>
          </div>

          {/* 对比：传统方式 vs Skill 方式 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-4 h-4 text-red-400" />
                <span className="text-sm font-medium text-red-400">传统方式</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-red-400">·</span>
                  <span>销售自己整理客户信息，耗时半天</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">·</span>
                  <span>靠感觉判断客户意向，准不准看心情</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400">·</span>
                  <span>客户快流失了才知道，错过最佳干预时机</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/20">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-green-400">Skill 方式</span>
              </div>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <span className="text-green-400">·</span>
                  <span>AI 自动采集、清洗线索，5分钟搞定</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">·</span>
                  <span>AI 读懂客户说了啥，自动打分判断意向</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400">·</span>
                  <span>180天监控，异常自动预警</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Skill 示例 */}
        <div className="flex items-center justify-center gap-3 text-sm">
          <span className="text-gray-500">比如：</span>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Wrench className="w-3 h-3 text-blue-400" />
            <span className="text-gray-300">线索获取手册</span>
          </div>
          <span className="text-gray-600">·</span>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Wrench className="w-3 h-3 text-cyan-400" />
            <span className="text-gray-300">客户评分手册</span>
          </div>
          <span className="text-gray-600">·</span>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Wrench className="w-3 h-3 text-amber-400" />
            <span className="text-gray-300">跟进策略手册</span>
          </div>
          <span className="text-gray-600">·</span>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Wrench className="w-3 h-3 text-purple-400" />
            <span className="text-gray-300">流失预警手册</span>
          </div>
        </div>
      </div>

      {/* --- 核心交互沙盘 --- */}
      <div className="w-full max-w-7xl mx-auto mt-8 mb-8 relative z-10">
        {/* 沙盘顶部：Step 标注条 */}
        <div className="flex items-center justify-between mb-4 px-2">
          <div className="flex items-center gap-6">
            <span className="text-xs text-gray-500">业务管线节点标注</span>
            <div className="flex items-center gap-4">
              {[
                { step: 'Step 1', label: '获客', desc: '渠道拉新', color: 'text-blue-400', border: 'border-blue-500/50' },
                { step: 'Step 2', label: '筛选', desc: '线索清洗', color: 'text-cyan-400', border: 'border-cyan-500/50' },
                { step: 'Step 3', label: '跟进', desc: '销售转化', color: 'text-amber-400', border: 'border-amber-500/50' },
                { step: 'Step 4', label: '复购', desc: '生命周期', color: 'text-purple-400', border: 'border-purple-500/50' },
              ].map((item) => (
                <div key={item.step} className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${item.border} bg-black/50`}>
                  <span className={`text-[10px] font-mono ${item.color}`}>{item.step}</span>
                  <span className="text-xs text-gray-400">{item.label}</span>
                  <span className="text-[10px] text-gray-600">·</span>
                  <span className="text-[10px] text-gray-500">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MousePointer className="w-3 h-3" />
            <span>拖动浏览 · 滚轮缩放</span>
          </div>
        </div>

        {/* 沙盘主体 */}
        <div className="h-[65vh] min-h-[600px] border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">
          <CampaignFlowCanvas />

          {/* 左上角：当前 PipelineTeaser 4步闭环标注 */}
          <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
            <div className="px-3 py-2 rounded-lg bg-black/80 border border-white/10 backdrop-blur-sm">
              <div className="text-[10px] text-gray-500 mb-1.5 uppercase">对应 PipelineTeaser</div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-blue-400">获客</span>
                <span className="text-gray-600">→</span>
                <span className="text-xs text-cyan-400">筛选</span>
                <span className="text-gray-600">→</span>
                <span className="text-xs text-amber-400">跟进</span>
                <span className="text-gray-600">→</span>
                <span className="text-xs text-purple-400">复购</span>
              </div>
            </div>
          </div>

          {/* 右上角：图例 */}
          <div className="absolute top-4 right-4 z-20 px-3 py-2 rounded-lg bg-black/80 border border-white/10 backdrop-blur-sm">
            <div className="text-[10px] text-gray-500 mb-1.5 uppercase">图例</div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-blue-500 rounded-full" />
                <span className="text-[10px] text-gray-400">正向流转</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-0.5 bg-red-500 rounded-full opacity-60" style={{ borderTop: '1px dashed red' }} />
                <span className="text-[10px] text-gray-400">异常回流</span>
              </div>
            </div>
          </div>
        </div>

        {/* 沙盘底部：管线统计 */}
        <div className="flex items-center justify-center gap-8 mt-4 py-3 rounded-xl bg-white/[0.02] border border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-xs text-gray-500">正向链路</span>
            <span className="text-xs text-gray-400">24条</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <span className="text-xs text-gray-500">异常回流</span>
            <span className="text-xs text-gray-400">8条</span>
          </div>
          <div className="flex items-center gap-2">
            <Info className="w-3 h-3 text-gray-500" />
            <span className="text-xs text-gray-500">核心节点</span>
            <span className="text-xs text-gray-400">28个</span>
          </div>
        </div>
      </div>

      {/* 沙盘后的引导 - 先看 Demo */}
      <div className="w-full max-w-4xl mx-auto mb-16 relative z-10">
        <div className="text-center p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
          <h3 className="text-lg font-medium text-white mb-3">
            看完了 58 同城的实战沙盘？
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            上面的 4 步闭环，正是从这整套业务管线中提炼出来的。
            <br />接下来看看，每一步是怎么被拆解成 Skill 执行的。
          </p>
          <Link
            href="/#demo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 font-medium transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            看 Skill 执行 Demo
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* --- Skill 落地匹配区 --- */}
      <div className="w-full max-w-6xl mx-auto relative z-10">

        {/* 标题 */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-3">
            你的业务遇到<span className="text-blue-500">什么问题</span>
          </h2>
          <p className="text-gray-500 text-sm">
            选一个最痛的，我帮你匹配对应的 Skill 方案
          </p>
        </div>

        {/* 痛点匹配卡片 - 直接对应 4 步闭环 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* 获客问题 */}
          <Link
            href="/category/attribution"
            className="group p-6 rounded-xl border border-white/10 bg-[#050505] hover:border-blue-500/50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase">Step 1</div>
                <div className="text-sm font-medium text-white">获客问题</div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              获客越来越贵
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              投了很多广告，但不知道哪分钱真的有用。客户留了电话就消失。
            </p>
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="text-[10px] text-blue-400">→ 查看归因诊断 Skill</div>
            </div>
          </Link>

          {/* 成交问题 */}
          <Link
            href="/category/sales-enablement"
            className="group p-6 rounded-xl border border-white/10 bg-[#050505] hover:border-blue-500/50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase">Step 2-3</div>
                <div className="text-sm font-medium text-white">成交问题</div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              成交率太低
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              10个客户进来，只成交1-2个。销售挑肥拣瘦，难啃的客户没人跟进。
            </p>
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="text-[10px] text-blue-400">→ 查看跟进赋能 Skill</div>
            </div>
          </Link>

          {/* 复购问题 */}
          <Link
            href="/category/lead-scoring"
            className="group p-6 rounded-xl border border-white/10 bg-[#050505] hover:border-blue-500/50 transition-colors cursor-pointer text-left"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="text-[10px] text-gray-500 uppercase">Step 4</div>
                <div className="text-sm font-medium text-white">复购问题</div>
              </div>
            </div>
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              客户不回头
              <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              签完合同就消失了，永远在找新客户。续费率上不去，获客成本降不下来。
            </p>
            <div className="mt-4 pt-4 border-t border-white/5">
              <div className="text-[10px] text-blue-400">→ 查看生命周期 Skill</div>
            </div>
          </Link>
        </div>

        {/* 回到首页 */}
        <div className="text-center">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            查看全部 Skill 方案
          </Link>
        </div>

      </div>

    </main>
  );
}
