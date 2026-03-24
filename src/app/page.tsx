import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { ConsultingCTA } from "@/components/ConsultingCTA";
import PipelineTeaser from "@/components/PipelineTeaser";
import HomepageSkillDemo from "@/components/HomepageSkillDemo";

export default function Home() {
  return (
    <div className="w-full bg-[#000000] text-white">
      <Header />
      <main className="relative w-full bg-black flex flex-col gap-y-24 md:gap-y-32 pb-24 overflow-x-hidden">
        {/* 漏斗顶层：极客嗅觉与高频行动力展示 */}
        <Hero />

        {/* 微型流光数据流 - Pipeline Teaser */}
        <PipelineTeaser />

        {/* L2 运转层：Demo 展示 4 步闭环如何跑 */}
        <section id="demo" className="px-6">
          <div className="max-w-6xl mx-auto">
            {/* 顶部标签 */}
            <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 w-fit mx-auto">
              <div className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">人机协作演示</span>
            </div>

            <div className="text-center mb-8">
              <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                销售全链路<span className="text-blue-500">人机协作</span>
              </h3>
              <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                查看 <img src="/openclaw-logo.png" alt="OpenClaw" className="w-4 h-4 object-contain inline-block align-text-bottom mx-0.5" />OpenClaw 如何与销售协作，<br className="hidden md:block" />
                完成从获客到续费的全生命周期
              </p>
            </div>
            <HomepageSkillDemo skillName="销售全链路人机协作" color="blue" />
          </div>
        </section>

        {/* 漏斗中层：大厂实弹复盘的信任建立区 */}
        <Portfolio />

        {/* 个人备书 */}
        <About />

        {/* 漏斗底层：页面级/悬浮级转化收口 */}
        <ConsultingCTA />
      </main>
      <Footer />
    </div>
  );
}
