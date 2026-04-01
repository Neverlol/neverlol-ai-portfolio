import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { ConsultingCTA } from "@/components/ConsultingCTA";
import PipelineTeaser from "@/components/PipelineTeaser";
import HomepageSkillDemo from "@/components/HomepageSkillDemo";
import { CooperationProcess } from "@/components/CooperationProcess";

export default function Home() {
  return (
    <div className="w-full bg-[#000000] text-white">
      <Header />
      <main className="relative w-full bg-black flex flex-col gap-y-24 md:gap-y-32 pb-24 overflow-x-hidden">
        {/* 漏斗顶层：极客嗅觉与高频行动力展示 */}
        <Hero />

        {/* 微型流光数据流 - Pipeline Teaser */}
        <PipelineTeaser />

        {/* L2 运转层：展示整套人机交互式 AI 业务系统如何跑 */}
        <section id="demo" className="px-6">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 w-fit mx-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">系统运行 Demo</span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                接进团队之后
                <br className="hidden md:block" />
                <span className="text-blue-500">这套 AI 业务系统</span>会怎样持续运转
              </h3>
              <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                左侧按真实业务主线轮播 8 个节点，右侧同步展示 AI 在后台做什么、销售和主管各自做什么，以及管理侧最终看到的变化。
                <br className="hidden md:block" />
                你可以直接看到它如何接进现有销售流程，把后台协作、人工接手和管理结果串成一个闭环。
              </p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-300">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                当前演示新客推进、问题分流和老客续费三类高频销售场景
              </div>
            </div>
            <HomepageSkillDemo skillName="人机协作 AI 业务系统" color="blue" />
          </div>
        </section>

        {/* 漏斗中层：大厂实弹复盘的信任建立区 */}
        <Portfolio />

        {/* 合作方式：先审计，再部署，再优化 */}
        <CooperationProcess />

        {/* 个人备书 */}
        <About />

        {/* 漏斗底层：页面级/悬浮级转化收口 */}
        <ConsultingCTA />
      </main>
      <Footer />
    </div>
  );
}
