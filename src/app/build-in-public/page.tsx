import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TerminalLogList } from "@/components/TerminalLogList";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
    title: "Build in Public - 极客探索与实修纪实",
};

export default function BuildInPublicPage() {
    return (
        <div className="min-h-screen bg-[#000000] text-white flex flex-col">
            <Header />
            <main className="flex-1 pt-24 pb-16">
                <TerminalLogList
                    showControls={true}
                />
            </main>
            <Footer />
        </div>
    );
}
