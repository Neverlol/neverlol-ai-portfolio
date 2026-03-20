import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { TerminalLogList } from "@/components/TerminalLogList";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";
import { ConsultingCTA } from "@/components/ConsultingCTA";
import PipelineTeaser from "@/components/PipelineTeaser";

export default function Home() {
  return (
    <div className="w-full bg-[#000000] text-white">
      <Header />
      <main className="relative w-full bg-black flex flex-col gap-y-24 md:gap-y-32 pb-24 overflow-x-hidden">
        {/* 漏斗顶层：极客嗅觉与高频行动力展示 */}
        <Hero />

        {/* 微型流光数据流 - Pipeline Teaser */}
        <PipelineTeaser />

        {/* 漏斗中层：大厂实弹复盘的信任建立区 */}
        <Portfolio />

        {/* 个人备书 */}
        <About />

        {/* 近期底层基建实测 - 限制展示3条硬核日志 */}
        <TerminalLogList
          limit={3}
          filterTags={["AI", "Python", "RFM", "自动化", "Claude Code", "MCP", "Agent", "RAG", "数据挖掘", "重构", "Agent", "自动化", "Python"]}
          excludeTags={["LEARN", "学习", "Skills", "GitHub", "长跑", "YouTube", "生活", "跑步"]}
          showControls={false}
          title="System.Logs / 近期底层基建实测"
          subtitle="摒弃纯理论。这里记录了为突破业务效能，近期进行的高频自动化脚本与 AI 架构测试。实战驱动，代码说话。"
        />

        {/* 漏斗底层：页面级/悬浮级转化收口 */}
        <ConsultingCTA />
      </main>
      <Footer />
    </div>
  );
}
