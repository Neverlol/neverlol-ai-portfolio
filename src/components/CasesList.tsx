"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Search, ShieldCheck } from "lucide-react";
import { getProjects } from "@/lib/db";
import type { Project } from "@/lib/database.types";
import { useRouter } from "next/navigation";

export function CasesList() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    return (
      query === "" ||
      project.title?.toLowerCase().includes(query) ||
      project.subtitle?.toLowerCase().includes(query) ||
      (project.tags && project.tags.some(t => t.toLowerCase().includes(query)))
    );
  });

  if (loading) {
    return (
      <section className="py-16 px-6 relative">
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
    <section className="py-16 px-6 relative">
      <div className="max-w-6xl mx-auto">
        {/* 搜索框 */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="w-4 h-4 text-[#8b949e]" />
            </div>
            <input
              type="text"
              placeholder="搜索案例..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-black/40 border border-white/10 text-white text-sm rounded-lg focus:ring-1 focus:ring-[#245fff] focus:border-[#245fff] block pl-10 p-2 transition-colors"
            />
          </div>
        </div>

        {/* 案例网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => router.push(`/case/${project.id}`)}
                className="p-6 rounded-2xl bg-black border border-white/10 hover:border-[#245fff]/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(36,95,255,0.1)] transition-all duration-300 cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white group-hover:scale-110 group-hover:bg-[#245fff]/20 group-hover:text-[#245fff] transition-all">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#8b949e] group-hover:text-white group-hover:translate-x-1 transition-all" />
                </div>

                <h3 className="text-xl font-medium text-white mb-2">{project.title}</h3>
                <p className="text-[#8b949e] text-sm line-clamp-2 mb-4">{project.subtitle}</p>

                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-2 items-center justify-between">
                  <div className="flex gap-2 flex-wrap">
                    {(project.tags || []).slice(0, 3).map((tag) => (
                      <span key={tag} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-[#a3a3a3]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-[#245fff] font-medium text-xs bg-[#245fff]/10 px-2 py-1 rounded">
                    {project.metrics}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-20 text-[#8b949e]">
              暂无匹配的案例
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
