"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitCommit, Zap, Lightbulb, Target, TrendingUp, Clock, Loader2, ArrowRight, Search, Terminal } from "lucide-react";
import { getEvolutionLogs } from "@/lib/db";
import type { EvolutionLog as EvolutionLogType } from "@/lib/database.types";
import { useRouter } from "next/navigation";

const typeConfig = {
  milestone: { icon: GitCommit, color: "text-[#FACC15]", bg: "bg-[#FACC15]/10", border: "border-[#FACC15]/20" },
  insight: { icon: Lightbulb, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  achievement: { icon: Target, color: "text-green-400", bg: "bg-green-500/10", border: "border-green-500/20" },
  learn: { icon: TrendingUp, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
  project: { icon: Zap, color: "text-orange-400", bg: "bg-orange-500/10", border: "border-orange-500/20" },
};

const PRESET_TAGS = ["All", "Claude Code", "Skills", "MCP", "Antigravity", "Codex"];

interface TerminalLogListProps {
  /** 展示数量限制，默认不限制（显示全部） */
  limit?: number;
  /** 需要过滤的硬核业务标签，传入后只显示包含这些标签的日志 */
  filterTags?: string[];
  /** 需要排除的标签，包含这些标签的日志将被过滤掉 */
  excludeTags?: string[];
  /** 是否显示搜索和筛选控制台（独立页面模式） */
  showControls?: boolean;
  /** 自定义标题 */
  title?: string;
  /** 自定义副标题 */
  subtitle?: string;
}

export function TerminalLogList({
  limit,
  filterTags,
  excludeTags,
  showControls = false,
  title = "Vibe Coding 高频探索日志",
  subtitle = "这里不同于沉重的实战复盘，它记录了我为了突破某项 AI 效能所进行的高频（甚至每日）测试：踩坑、跑通架构、自动化流转。这是关于行动力、技术嗅觉以及从 0 到 1 的一切。"
}: TerminalLogListProps) {
  const router = useRouter();
  const [logs, setLogs] = useState<EvolutionLogType[]>([]);
  const [loading, setLoading] = useState(true);

  // 新增搜索和标签过滤状态
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    try {
      const data = await getEvolutionLogs();
      setLogs(data);
    } catch (error) {
      console.error("Failed to load evolution logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogClick = (id: string) => {
    router.push(`/log/${id}`);
  };

  // 过滤逻辑
  const filteredLogs = useMemo(() => {
    let result = logs.filter((log) => {
      // 0. 如果有 excludeTags，排除带有这些标签的日志
      if (excludeTags && excludeTags.length > 0) {
        const hasExcludeTag = log.tags && log.tags.some(tag => excludeTags.includes(tag));
        if (hasExcludeTag) return false;
      }

      // 1. 如果有 filterTags，则只显示包含这些标签的日志
      if (filterTags && filterTags.length > 0) {
        const hasFilterTag = log.tags && log.tags.some(tag => filterTags.includes(tag));
        if (!hasFilterTag) return false;
      }

      // 2. 匹配标签（仅在显示控制台时生效）
      const matchTag = !showControls || activeTag === "All" || (log.tags && log.tags.includes(activeTag));

      // 3. 匹配搜索词 (仅在显示控制台时生效)
      const query = searchQuery.toLowerCase();
      const matchSearch = !showControls || query === "" ||
        log.title.toLowerCase().includes(query) ||
        (log.tags && log.tags.some(t => t.toLowerCase().includes(query)));

      return matchTag && matchSearch;
    });

    // 4. 应用数量限制
    if (limit && limit > 0) {
      result = result.slice(0, limit);
    }

    return result;
  }, [logs, activeTag, searchQuery, filterTags, showControls, limit]);

  if (loading) {
    return (
      <section className="py-8 px-6 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-1/2 w-[400px] h-[400px] bg-[#245fff]/5 rounded-full blur-[80px]" />
        </div>
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
    <section className="py-8 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 w-[400px] h-[400px] bg-[#245fff]/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-3 text-[#FACC15]">
            <span className="h-px w-8 bg-[#FACC15]/50 block"></span>
            <span className="text-xs font-bold tracking-widest uppercase">TOP FUNNEL / 极客行动仪</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-semibold text-white mb-4">
            {title}
          </h2>
          <p className="text-[#8b949e] text-sm md:text-base max-w-2xl leading-relaxed flex items-start gap-2">
            <GitCommit className="w-5 h-5 text-[#FACC15] shrink-0 mt-0.5" />
            {subtitle}
          </p>
        </motion.div>

        {/* 搜索与分类控制台 - 仅在 showControls 时显示 */}
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between"
          >
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {PRESET_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${activeTag === tag
                      ? "bg-[#FACC15]/20 text-[#FACC15] border border-[#FACC15]/50"
                      : "bg-white/5 text-[#8b949e] border border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Search Box */}
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-[#8b949e]" />
              </div>
              <input
                type="text"
                placeholder="搜索日志..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-white/10 text-white text-sm rounded-lg focus:ring-1 focus:ring-[#FACC15] focus:border-[#FACC15] block pl-10 p-2 transition-colors"
              />
            </div>
          </motion.div>
        )}

        {/* High-frequency Log Grid - Terminal Style */}
        <div className={`relative rounded-xl border border-white/10 bg-black/40 overflow-hidden group ${showControls ? 'h-[600px]' : 'h-auto'}`}>
          {/* 顶部控制栏 - 仅在 showControls 时显示 */}
          {showControls && (
            <div className="absolute top-0 left-0 right-0 h-10 border-b border-white/10 bg-black/60 backdrop-blur-sm flex items-center px-4 z-20">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
              </div>
              <div className="mx-auto text-[10px] text-[#8b949e] font-mono flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                REALTIME_VIBE_LOGS.sh
              </div>
            </div>
          )}

          {/* 渐变遮罩 - 仅在 showControls 时显示 */}
          {showControls && (
            <>
              <div className="absolute top-10 left-0 right-0 h-12 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div>
            </>
          )}

          {/* 滚动内容区 - 仅在 showControls 时显示滚动 */}
          <div className={`${showControls ? 'absolute inset-0 top-10 overflow-y-auto p-4 scrollbar-hide' : 'p-4'}`}>
            <AnimatePresence mode="popLayout">
              {filteredLogs.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {filteredLogs.map((log, index) => {
                    const config = typeConfig[log.type as keyof typeof typeConfig] || typeConfig.milestone;

                    return (
                      <motion.div
                        layout
                        key={log.id}
                        initial={{ opacity: 0, x: -10, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                        onClick={() => handleLogClick(log.id)}
                        className="flex items-center gap-3 p-3 rounded bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-[#FACC15]/30 transition-all cursor-pointer font-mono"
                      >
                        <div className="text-[#8b949e] text-xs w-24 shrink-0 flex items-center gap-1.5">
                          <span className="text-[#245fff]">{'>'}</span> {log.date.substring(5)}
                        </div>

                        <div className="flex-1 min-w-0 flex items-center gap-3">
                          <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-sm ${config.bg} ${config.color} border ${config.border} shrink-0`}>
                            {log.type}
                          </span>
                          <p className="text-sm text-white/80 truncate group-hover:text-white transition-colors">{log.title}</p>
                        </div>

                        <div className="hidden md:flex flex-wrap gap-1 shrink-0">
                          {(log.tags || []).slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] px-1.5 text-[#8b949e]">
                              #{tag}
                            </span>
                          ))}
                        </div>
                        <ArrowRight className="w-3 h-3 text-[#FACC15] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full text-[#8b949e] opacity-50 space-y-3"
                >
                  <Terminal className="w-8 h-8" />
                  <p className="text-sm">No signals detected for this query...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* CTA 按钮 - 仅在限制模式且有更多日志时显示 */}
        {limit && limit > 0 && logs.length > limit && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 text-center"
          >
            <button
              onClick={() => router.push("/build-in-public")}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/20 bg-white/5 text-white/70 text-sm hover:bg-white/10 hover:text-white hover:border-white/40 transition-all"
            >
              查看完整开源日志集 <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {/* GitHub-style contribution hint */}
        {!showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-6 text-center"
          >
            <p className="text-xs text-[#8b949e]/50">
              更多更新持续进行中...
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
