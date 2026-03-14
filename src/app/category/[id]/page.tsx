"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Activity, Target, Users, TrendingUp, Loader2, Eye, AlertTriangle, Package } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { getProjects } from "@/lib/db";
import type { Project } from "@/lib/database.types";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const CATEGORY_MAP: Record<string, { title: string, description: string, icon: any, mappedTags?: string[], fallbackIds: string[] }> = {
    "attribution": {
        title: "大盘归因诊断：打破甩锅黑盒",
        description: "摒弃口水战，祭出「业务拆车拆漏斗」。从「全靠前线一张嘴」进化到「四级漏斗的物理级归因」，用客观数据定位异常波动的绝对死因。",
        icon: Eye,
        fallbackIds: ["bi-diagnoser", "tableau-bi", "fake-leads-audit"],
    },
    "sales-enablement": {
        title: "动能重构：行业垄断与独角兽孵化",
        description: "专治销售「挑肥拣瘦」。将固定分粥变为动态抢肉，用高意向热门资产强行捆绑长尾冷门资产。用生态机制培养深耕垂直类目的行业专家。",
        icon: Package,
        fallbackIds: ["dynamic-rfm", "unicorn-upsell"],
    },
    "activation": {
        title: "人效提升：物理级强控生命线",
        description: "专治「终端黑盒化，业绩全靠天收」。废除销售主观汇报意向，建立 0% 至 100% 的硬性行为进阶卡点，将大班式洗脑转变为漏斗转化靶向赋能。",
        icon: Activity,
        fallbackIds: ["coaching-agent", "high-pressure-elimination", "rookie-ramp-up"],
    },
    "lead-scoring": {
        title: "生命周期：存量防御与价值榨取",
        description: "摒弃「首签即放养」的客套式售后。建立 180 天全生命周期模型（萌芽-体验-破灭-成熟-续费），针对破灭期实施强制教学干预，无限延长客户充值 LTV。",
        icon: AlertTriangle,
        fallbackIds: ["sales-broadcaster", "t90-churn-prevention", "apollo-handover-crisis"],
    }
};

const iconMap: Record<string, any> = {
    Zap, Activity, Target, Users, TrendingUp, Eye, AlertTriangle, Package
};

export default function CategoryDetailPage() {
    const params = useParams();
    const router = useRouter();
    const categoryId = params.id as string;
    const categoryNode = CATEGORY_MAP[categoryId];

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (categoryNode) {
            loadProjects();
        } else {
            setLoading(false);
        }
    }, [categoryNode]);

    const loadProjects = async () => {
        try {
            const allProjects = await getProjects();
            // 筛选属于当前 Category 的项目
            const filtered = allProjects.filter(p => categoryNode?.fallbackIds.includes(p.id));
            setProjects(filtered);
        } catch (error) {
            console.error("Failed to load category projects:", error);
        } finally {
            setLoading(false);
        }
    };

    const TopIcon = categoryNode?.icon || Zap;

    return (
        <div className="min-h-screen bg-[#000000] text-white flex flex-col">
            <Header />

            <main className="flex-1 pt-24 pb-16 px-6">
                <div className="max-w-4xl mx-auto">
                    {!categoryNode ? (
                        <div className="text-center py-20 text-[#8b949e]">类别不存在</div>
                    ) : (
                        <>
                            {/* Category Header */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-14 border-b border-white/10 pb-10 relative overflow-hidden"
                            >
                                <div className="absolute -right-20 -top-20 w-64 h-64 bg-[#245fff] rounded-full blur-[100px] opacity-10 pointer-events-none" />
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
                                        <TopIcon className="w-8 h-8 text-[#245fff]" />
                                    </div>
                                    <h1 className="text-3xl md:text-5xl font-semibold tracking-tight">{categoryNode.title}</h1>
                                </div>
                                <p className="text-[#8b949e] text-base md:text-lg leading-relaxed max-w-2xl relative z-10">
                                    {categoryNode.description}
                                </p>
                            </motion.div>

                            {/* Cases List */}
                            <div className="space-y-6">
                                <h2 className="text-xl font-medium mb-6 flex items-center gap-2">
                                    <span className="w-2 h-6 bg-[#245fff] rounded-sm inline-block"></span>
                                    收录的落地方案 ({projects.length})
                                </h2>

                                {loading ? (
                                    <div className="flex items-center justify-center py-20">
                                        <Loader2 className="w-6 h-6 text-[#245fff] animate-spin" />
                                    </div>
                                ) : projects.length === 0 ? (
                                    <div className="p-8 border border-white/5 rounded-2xl bg-white/[0.02] text-center text-[#8b949e]">
                                        该板块下的精选项目正在沉淀中，敬请期待...
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                        {projects.map((project, index) => {
                                            const ProjIcon = iconMap[project.icon] || Zap;
                                            return (
                                                <motion.button
                                                    key={project.id}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: index * 0.1 }}
                                                    onClick={() => router.push(`/case/${project.id}`)}
                                                    className="w-full text-left p-6 rounded-2xl bg-black border border-white/10 hover:border-[#245fff]/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(36,95,255,0.1)] transition-all duration-300 group flex flex-col justify-between"
                                                >
                                                    <div>
                                                        <div className="flex justify-between items-start mb-4">
                                                            <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#245fff]/20 group-hover:text-[#245fff] transition-all">
                                                                <ProjIcon className="w-5 h-5" />
                                                            </div>
                                                            <ArrowRight className="w-5 h-5 text-[#8b949e] group-hover:text-white group-hover:translate-x-1 transition-all" />
                                                        </div>
                                                        <h3 className="text-xl font-medium text-white mb-2">{project.title}</h3>
                                                        <p className="text-[#8b949e] text-sm line-clamp-2 mb-4">{project.subtitle}</p>
                                                    </div>

                                                    <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2 items-center justify-between">
                                                        <div className="flex gap-2 flex-wrap">
                                                            {(project.tags || []).slice(0, 2).map((tag) => (
                                                                <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-[#a3a3a3]">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                        <span className="text-[#245fff] font-medium text-xs bg-[#245fff]/10 px-2 py-1 rounded">
                                                            {project.metrics}
                                                        </span>
                                                    </div>
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
