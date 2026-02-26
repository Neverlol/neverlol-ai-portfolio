import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { DemoSection } from "@/components/DemoSection";
import { Portfolio } from "@/components/Portfolio";
import { EvolutionLog } from "@/components/EvolutionLog";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0D1117] text-white">
      <Header />
      <main className="pt-16">
        <Hero />
        <div className="relative">
          <DemoSection />
        </div>
        <Portfolio />
        <EvolutionLog />
        <About />
      </main>
      <Footer />
    </div>
  );
}
