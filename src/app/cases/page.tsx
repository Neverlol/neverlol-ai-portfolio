import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CasesList } from "@/components/CasesList";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "全部案例 - 核心战役库",
};

export default function CasesPage() {
    return (
        <div className="min-h-screen bg-[#000000] text-white flex flex-col">
            <Header />
            <main className="flex-1 pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-6 mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-4">
                        核心战役库
                        <span className="text-[#245fff] ml-3 text-lg font-mono font-medium">~/battle-cases</span>
                    </h1>
                    <p className="text-[#8b949e]">
                        这里沉淀了历经实弹打磨的商业增长战役。
                        每一个案例背后都是可量化的 ROI 与可复用的方法论。
                    </p>
                </div>
                <CasesList />
            </main>
            <Footer />
        </div>
    );
}
