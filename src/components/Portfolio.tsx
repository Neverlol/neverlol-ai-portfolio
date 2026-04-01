"use client";

import { motion } from "framer-motion";
import { Database, Route, Users, AlertTriangle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const BENTO_CASES = [
  {
    id: "crm-auto-fill",
    title: "沟通记录结构化回填",
    metric: "结构化录入",
    subtext: "把聊天记录、通话纪要和拜访笔记转成可用 CRM 字段，让后续诊断、分层和续费判断建立在干净输入上。",
    badges: ["聊天转字段", "缺失字段提醒", "CRM 标准化", "首批可接入"],
    pipelineStep: "筛选",
    className: "col-span-1 md:col-span-2 row-span-2",
    icon: Database,
    color: "from-[#245fff] to-[#00f0ff]",
    href: "/category/crm-auto-fill"
  },
  {
    id: "funnel-doctor",
    title: "商机卡点诊断",
    metric: "卡点诊断",
    subtext: "把主管平时靠经验追问的判断标准显性化，自动识别当前漏斗卡点、缺失字段、下一步动作与经理动作。",
    badges: ["漏斗诊断", "下一步动作", "经理建议", "首批可接入"],
    pipelineStep: "跟进",
    className: "col-span-1",
    icon: Route,
    color: "from-[#8b5cf6] to-[#d946ef]",
    href: "/category/funnel-doctor"
  },
  {
    id: "customer-profiler",
    title: "客户分层与维护节奏",
    metric: "分层节奏",
    subtext: "把客户价值等级、联系频率和优先级经验沉淀成可复用规则，让谁该重点维护、谁该降频有清晰标准。",
    badges: ["客户分层", "维护节奏", "推荐动作", "首批可接入"],
    pipelineStep: "复购",
    className: "col-span-1",
    icon: Users,
    color: "from-[#ef4444] to-[#f97316]",
    href: "/category/customer-profiler"
  },
  {
    id: "renewal-watch",
    title: "续费风险前移预警",
    metric: "续费前移",
    subtext: "在客户真正流失前给出 P1/P2/P3 风险名单、续费窗口与挽回优先级，把补救从事后抢救拉回到窗口期内。",
    badges: ["风险分级", "续费窗口", "挽回优先级", "首批可接入"],
    pipelineStep: "复购",
    className: "col-span-1 md:col-span-2",
    icon: AlertTriangle,
    color: "from-[#f59e0b] to-[#fbbf24]",
    href: "/category/renewal-watch"
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
            <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">首批可接入的业务模块</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            系统会先从 4 个高频节点切入，<br className="md:hidden" /><span className="text-blue-500">再按团队流程继续扩展</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
            这 4 个是最适合第一批接入的高频业务模块，
            <br className="hidden md:block" />
            能先把后台最重复、最依赖经验判断的地方接住。
            <br className="hidden md:block" />
            真正落地时，会先读取客户自己的工作流、案例数据和团队经验，
            <br className="hidden md:block" />
            再决定先接哪几个节点，并继续往下定制扩展。
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
                <h3 className="text-lg font-medium text-white/90">查看更多模块案例 →</h3>
              </div>

              <div>
                <p className="text-sm text-[#8b949e] mb-4">
                  已上线案例、在接模块以及后续持续补充的扩展方向
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
