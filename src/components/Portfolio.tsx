"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, BookOpen, Activity, GraduationCap, ArrowRight, PenTool, Radio, Loader2 } from "lucide-react";
import { getProjects } from "@/lib/db";
import type { Project } from "@/lib/database.types";
import { useRouter } from "next/navigation";

const iconMap: Record<string, React.ElementType> = {
  Zap, BookOpen, Activity, GraduationCap, Radio,
};

export function Portfolio() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);
    } catch (error) {
      console.error("Failed to load projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Key phrases to highlight
  const problemHighlights: Record<string, string[]> = {
    "dynamic-rfm": ["静态", "每月跑一次表"],
    "rag-copilot": ["培训周期长", "经验萃取慢"],
    "bi-diagnoser": ["事后总结", "T+1"],
    "coaching-agent": ["大班课", "一对一"],
    "sales-broadcaster": ["手动", "1小时"],
  };

  const impactHighlights: Record<string, string[]> = {
    "dynamic-rfm": ["T+0", "30倍"],
    "rag-copilot": ["月级→天级"],
    "bi-diagnoser": ["实时"],
    "coaching-agent": ["赋能型"],
    "sales-broadcaster": ["15分钟"],
  };

  const handleCaseClick = (id: string) => {
    router.push(`/case/${id}`);
  };

  if (loading) {
    return (
      <section id="portfolio" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <Loader2 className="w-6 h-6 text-[#245fff] animate-spin mx-auto mb-3" />
            <p className="text-[#8b949e] text-sm">加载中...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-medium text-white mb-3">
            Portfolio
          </h2>
          <p className="text-[#8b949e] text-sm flex items-center gap-2">
            <PenTool className="w-3 h-3 text-[#FACC15]" />
            问题 → 传统方案 → AI 重构 → 商业价值
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((item, index) => {
            const Icon = iconMap[item.icon] || Zap;
            const isHovered = hoveredId === item.id;
            const highlights = problemHighlights[item.id] || [];
            const impactH = impactHighlights[item.id] || [];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => handleCaseClick(item.id)}
                className={`${item.col_span || 'col-span-1 lg:col-span-2'} group relative nightwatch-card cursor-pointer ${
                  isHovered
                    ? 'lg:col-span-3'
                    : ''
                }`}
              >
                <div className="relative z-10 p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2 bg-[#245fff]/10 rounded-lg border border-[#245fff]/20">
                      <Icon className="w-5 h-5 text-[#245fff]" />
                    </div>
                    <ArrowRight className={`w-4 h-4 text-[#FACC15] transition-transform ${isHovered ? 'rotate-90' : ''}`} />
                  </div>

                  <h3 className="text-lg font-medium text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-[#a3a3a3] mb-3">{item.subtitle}</p>

                  <div className="flex flex-wrap gap-2 mb-2">
                    {(item.tags || []).map((tag) => (
                      <span key={tag} className="px-2 py-1 text-xs text-[#a3a3a3] bg-white/5 rounded-md border border-white/5">{tag}</span>
                    ))}
                  </div>
                  <div className="text-xs text-[#a3a3a3]">
                    量化战果: <span className="text-green-400 font-medium">{item.metrics}</span>
                  </div>
                </div>

                <AnimatePresence>
                  {isHovered && item.sections && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-white/10"
                    >
                      <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/5">
                            <span className="text-xs font-medium text-red-400"><span className="mr-1">业务痛点</span><span className="text-red-400/60">Problem</span></span>
                          </div>
                          <p className="text-xs text-[#a3a3a3] leading-relaxed">{item.sections.problem?.content}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-yellow-500/20 bg-yellow-500/5">
                            <span className="text-xs font-medium text-yellow-400"><span className="mr-1">传统方案</span><span className="text-yellow-400/60">Traditional</span></span>
                          </div>
                          <p className="text-xs text-[#a3a3a3] leading-relaxed">{item.sections.traditional?.content}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-500/20 bg-blue-500/05">
                            <span className="text-xs font-medium text-blue-400"><span className="mr-1">AI 重构</span><span className="text-blue-400/60">AI Solution</span></span>
                          </div>
                          <p className="text-xs text-[#a3a3a3] leading-relaxed">{item.sections.ai?.content}</p>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-green-500/20 bg-green-500/05">
                            <span className="text-xs font-medium text-green-400"><span className="mr-1">商业价值</span><span className="text-green-400/60">Impact</span></span>
                          </div>
                          <p className="text-xs text-green-400 leading-relaxed font-medium">{item.sections.impact?.content}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isHovered && (
                  <div className="px-5 pb-3 text-xs text-[#FACC15]/50 flex items-center gap-1">
                    <span className="w-2 h-2 border border-[#FACC15] rounded-full" />
                    悬停/点击查看详情
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
