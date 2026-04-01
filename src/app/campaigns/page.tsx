'use client';

import { Header } from '@/components/Header';
import CampaignFlowCanvas from '@/components/CampaignFlowCanvas';
import Link from 'next/link';
import { ArrowRight, Sparkles, Target, TrendingUp, Users, ChevronRight, MousePointer, Info, Radar, Layers3, NotebookPen, Wrench } from 'lucide-react';

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

        {/* 标签 - 强调业务原型来源 */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-mono text-gray-400 tracking-wider uppercase">业务原型 · 58 同城本地生活服务实战</span>
        </div>

        {/* 主标题 - 对齐首页 PipelineTeaser */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          这套系统背后那条<br />
          <span className="text-white">真实跑通过的<span className="text-blue-500">业务链</span></span>
        </h1>
        <p className="text-gray-500 max-w-2xl text-sm leading-relaxed mb-6">
          这里展示的是这套系统背后的业务原型，也就是一条真实团队怎样从线索走到利润的销售运营链路。
          <br className="hidden md:block" />
          先看“线索到利润”如何在现场运转，
          <br className="hidden md:block" />
          再看哪些成熟节点最适合交给后台持续协作。
        </p>
      </div>

      {/* --- 业务可封装性说明区 --- */}
      <div className="w-full max-w-5xl mx-auto mb-16 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-3">
            为什么这条业务链，适合接进<span className="text-blue-500">AI 业务系统</span>
          </h2>
          <p className="text-gray-500 text-sm max-w-xl mx-auto">
            因为它包含大量高频、可标准化、依赖数据判断的后台动作，
            <br className="hidden md:block" />
            正适合交给系统长期稳定地承担。
          </p>
        </div>

        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-blue-500/5 border border-blue-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Radar className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-white">高频重复</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                线索清洗、过程跟催、异常扫描、续费预警这些动作每天都在重复发生，适合交给系统稳定执行。
              </p>
            </div>

            <div className="p-5 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
              <div className="flex items-center gap-2 mb-3">
                <Layers3 className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-medium text-white">规则明确</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                哪些字段缺失、哪些状态异常、哪些客户该优先处理，都能被拆成清晰规则，方便系统持续协作。
              </p>
            </div>

            <div className="p-5 rounded-xl bg-amber-500/5 border border-amber-500/20">
              <div className="flex items-center gap-2 mb-3">
                <NotebookPen className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-white">经验可沉淀</span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                老销售和运营主管的经验，不必继续只留在脑子里，可以被整理成可复用、可迭代的业务 Skill。
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 text-sm">
          <span className="text-gray-500">优先接入的模块：</span>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Wrench className="w-3 h-3 text-blue-400" />
            <span className="text-gray-300">线索工厂</span>
          </div>
          <span className="text-gray-600">·</span>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Wrench className="w-3 h-3 text-cyan-400" />
            <span className="text-gray-300">商机质检</span>
          </div>
          <span className="text-gray-600">·</span>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Wrench className="w-3 h-3 text-amber-400" />
            <span className="text-gray-300">归因诊断</span>
          </div>
          <span className="text-gray-600">·</span>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
            <Wrench className="w-3 h-3 text-purple-400" />
            <span className="text-gray-300">流失预警</span>
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

      {/* 沙盘后的引导 - 先看解决方案，再回看 Demo */}
      <div className="w-full max-w-4xl mx-auto mb-16 relative z-10">
        <div className="text-center p-8 rounded-2xl border border-white/10 bg-white/[0.02]">
          <h3 className="text-lg font-medium text-white mb-3">
            看完业务原型，再看它怎样接进你的团队
          </h3>
          <p className="text-gray-500 text-sm mb-6">
            这页展示的是底层业务原型，也就是这套系统最早在真实团队里怎样跑通。
            <br className="hidden md:block" />
            下一页会把这条链拆成客户可直接接入的人机交互式 AI 业务系统，说明 AI 和团队各自承担什么。
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-400 font-medium transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              查看解决方案
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/#demo"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-gray-300 transition-colors hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
            >
              直接看系统 Demo
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* --- Skill 落地匹配区 --- */}
      <div className="w-full max-w-6xl mx-auto relative z-10">

        {/* 标题 */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-3">
            如果你已经知道最想优先解决哪一段
          </h2>
          <p className="text-gray-500 text-sm">
            可以继续进入对应模块方向，
            <br className="hidden md:block" />
            看更具体的落地案例
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
              <div className="text-[10px] text-blue-400">→ 查看对应模块方向</div>
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
              <div className="text-[10px] text-blue-400">→ 查看对应模块方向</div>
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
              <div className="text-[10px] text-blue-400">→ 查看对应模块方向</div>
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
            查看首页中的模块案例
          </Link>
        </div>

      </div>

    </main>
  );
}
