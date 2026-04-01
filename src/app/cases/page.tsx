import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CasesList } from "@/components/CasesList";

export const metadata = {
    title: "业务模块案例库",
};

export default function CasesPage() {
    return (
        <div className="min-h-screen bg-[#000000] text-white flex flex-col">
            <Header />
            <main className="flex-1 pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-6 mb-8">
                    <h1 className="text-3xl font-bold tracking-tight mb-4">
                        业务模块案例库
                        <span className="text-[#245fff] ml-3 text-lg font-mono font-medium">~/deployment-modules</span>
                    </h1>
                    <p className="text-[#8b949e] leading-relaxed">
                        这里展示的是已经沉淀出的业务案例、首批可接入模块，
                        <br className="hidden md:block" />
                        以及后续可继续接入客户真实工作流的扩展方向。
                    </p>
                </div>
                <CasesList />
            </main>
            <Footer />
        </div>
    );
}
