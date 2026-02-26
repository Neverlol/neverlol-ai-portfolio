"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GitCommit, Zap, Lightbulb, Target, TrendingUp, Clock, Loader2, ArrowRight } from "lucide-react";
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

export function EvolutionLog() {
  const router = useRouter();
  const [logs, setLogs] = useState<EvolutionLogType[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <section className="py-16 px-6 relative">
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
    <section className="py-16 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-1/2 w-[400px] h-[400px] bg-[#245fff]/5 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-medium text-white mb-3">
            Evolution Log
          </h2>
          <p className="text-[#8b949e] text-sm flex items-center gap-2">
            <GitCommit className="w-3 h-3 text-[#FACC15]" />
            Build in Public - 记录每一个思考和行动
          </p>
        </motion.div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {logs.map((log, index) => {
            const config = typeConfig[log.type as keyof typeof typeConfig] || typeConfig.milestone;
            const Icon = config.icon;

            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleLogClick(log.id)}
                className={`flex items-start gap-3 p-3 rounded-lg border ${config.bg} ${config.border} hover:scale-[1.02] transition-all cursor-pointer group`}
              >
                <div className={`p-2 rounded-lg ${config.bg}`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-[#8b949e] flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {log.date}
                    </span>
                  </div>
                  <p className="text-sm text-white/90 leading-snug group-hover:text-white">{log.title}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {(log.tags || []).map((tag) => (
                      <span key={tag} className="text-xs px-1.5 py-0.5 bg-white/5 rounded text-[#8b949e]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#FACC15] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
              </motion.div>
            );
          })}
        </div>

        {/* GitHub-style contribution hint */}
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
      </div>
    </section>
  );
}
