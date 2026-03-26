"use client";

import { motion } from "framer-motion";
import { Activity, Eye, AlertTriangle, Package, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const BENTO_CASES = [
  {
    id: "case-1",
    title: "商机质检 Skill",
    metric: "过程可视化",
    subtext: "把 0% 到 100% 的商机推进过程拆成硬性节点，自动识别卡点、缺失信息和责任归属，让管理从盯结果变成盯过程。",
    badges: ["漏斗断点识别", "缺失字段提醒", "过程质检", "首批封装方向"],
    pipelineStep: "跟进",
    className: "col-span-1 md:col-span-2 row-span-2",
    icon: Activity,
    color: "from-[#245fff] to-[#00f0ff]",
    href: "/category/activation"
  },
  {
    id: "case-2",
    title: "流失预警 Skill",
    metric: "预警前移",
    subtext: "建立 180 天客户跟踪模型，结合余额、消耗、效果和行为数据，在客户真正流失前给出预警与干预优先级。",
    badges: ["生命周期监控", "流失风险评分", "续费窗口预测", "首批封装方向"],
    pipelineStep: "复购",
    className: "col-span-1",
    icon: AlertTriangle,
    color: "from-[#8b5cf6] to-[#d946ef]",
    href: "/category/lead-scoring"
  },
  {
    id: "case-3",
    title: "归因诊断 Skill",
    metric: "分钟级定位",
    subtext: "把“互相推诿”变成“数据说话”。自动定位问题到底出在线索、分发、跟进、产品效果还是续费阶段。",
    badges: ["业务拆解", "责任定位", "数据说话", "后续补充方向"],
    pipelineStep: "筛选",
    className: "col-span-1",
    icon: Eye,
    color: "from-[#ef4444] to-[#f97316]",
    href: "/category/attribution"
  },
  {
    id: "case-4",
    title: "线索工厂 Skill",
    metric: "前台只打有效线索",
    subtext: "把导入、清洗、补全、评分和分发建议放到 AI 后台，让销售不再把时间耗在线索搬运和低质量触达上。",
    badges: ["清洗去重", "自动评分", "分发建议", "首批封装方向"],
    pipelineStep: "获客",
    className: "col-span-1 md:col-span-2",
    icon: Package,
    color: "from-[#f59e0b] to-[#fbbf24]",
    href: "/category/sales-enablement"
  }
];

export function Portfolio() {
  const router = useRouter();
  return (
    <section id="portfolio" className="py-16 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center md:text-left"
        >
          {/* 顶部标签 - 统一脉冲点风格 */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 w-fit">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">Skill 方案库</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            首批业务 Skill 案例，<br className="md:hidden" /><span className="text-blue-500">先从关键节点切入</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
            这些卡片展示的是最适合优先封装的业务节点，以及它们背后的实战来源。<br className="hidden md:block" />
            后续会持续更新更多已部署的客户案例，以及来自不同垂直场景的实战封装经验。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 auto-rows-min">
          {BENTO_CASES.map((item, index) => {
            const Icon = item.icon;
            const isLarge = item.className.includes("row-span-2");

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => router.push(item.href)}
                className={`${item.className} group relative bg-black border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 cursor-pointer min-h-[180px]`}
              >
                {/* 悬浮光晕 */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${item.color} rounded-full blur-[80px] -mr-32 -mt-32 opacity-20`} />
                </div>

                <div className={`relative z-10 p-8 h-full flex flex-col ${isLarge ? 'justify-center' : 'justify-between'}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    {!isLarge && <h3 className="text-lg font-medium text-white/90">{item.title}</h3>}
                  </div>

                  {isLarge && (
                    <h3 className="text-2xl md:text-3xl font-medium text-white/90 mb-6">
                      {item.title}
                    </h3>
                  )}

                  <div>
                    <div className={`font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.color} pb-2 ${isLarge ? 'text-5xl md:text-7xl mb-4' : 'text-3xl mb-2'}`}>
                      {item.metric}
                    </div>
                    <p className={`text-[#8b949e] ${isLarge ? 'text-lg' : 'text-sm'} mb-4`}>
                      {item.subtext}
                    </p>
                    {/* 战果标签 */}
                    {item.badges && item.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {/* PipelineTeaser 步骤标签 */}
                        {item.pipelineStep && (
                          <span className="px-2 py-1 text-[10px] font-medium rounded-md bg-blue-500/20 border border-blue-500/50 text-blue-400 whitespace-nowrap">
                            → {item.pipelineStep}
                          </span>
                        )}
                        {item.badges.map((badge, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 text-[10px] font-medium rounded-md bg-white/5 border border-white/10 text-[#a3a3a3] whitespace-nowrap`}
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* 更多案例链接 - 填补右下角空位 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            onClick={() => router.push("/cases")}
            className="col-span-1 group relative bg-black border border-white/5 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 cursor-pointer min-h-[180px]"
          >
            {/* 悬浮光晕 */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#245fff] to-[#00f0ff] rounded-full blur-[80px] -mr-32 -mt-32 opacity-15" />
            </div>

            <div className="relative z-10 p-8 h-full flex flex-col justify-between">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:scale-110 transition-transform">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-medium text-white/90">查阅全部案例与原型 →</h3>
              </div>

              <div>
                <p className="text-sm text-[#8b949e] mb-4">
                  已上线案例、封装中的 Skill 原型，以及后续持续补充的部署节点
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-[10px] font-medium rounded-md bg-white/5 border border-white/10 text-[#a3a3a3]">
                    持续更新中
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
