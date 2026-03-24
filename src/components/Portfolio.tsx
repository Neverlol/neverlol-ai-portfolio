"use client";

import { motion } from "framer-motion";
import { Activity, Eye, AlertTriangle, Package, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const BENTO_CASES = [
  {
    id: "case-1",
    title: "人效提升：物理级强控生命线",
    metric: "人效整体拉升",
    subtext: "废除销售自己报意向，建立 0% 到 100% 的硬性行为进阶卡点，将大班式管理转变为精准跟进赋能。",
    badges: ["剔除无效拨打", "精准锁定转化卡点", "团队人效整体拉升", "可复用 Skill"],
    pipelineStep: "跟进",
    className: "col-span-1 md:col-span-2 row-span-2",
    icon: Activity,
    color: "from-[#245fff] to-[#00f0ff]",
    href: "/category/activation"
  },
  {
    id: "case-2",
    title: "生命周期：存量防御与价值榨取",
    metric: "续费率绝对值跃升",
    subtext: "摒弃签完合同就不管了。建立 180 天客户跟踪模型，针对快要流失的客户实施强制干预，大幅提升续费率。",
    badges: ["180天激励暗盘", "赋能破灭期", "大连区全国第一", "可复用 Skill"],
    pipelineStep: "复购",
    className: "col-span-1",
    icon: AlertTriangle,
    color: "from-[#8b5cf6] to-[#d946ef]",
    href: "/category/lead-scoring"
  },
  {
    id: "case-3",
    title: "大盘归因诊断：打破互相推诿",
    metric: "分钟级定位问题",
    subtext: "摒弃吵架，祭出「业务拆解」。从全靠销售一张嘴进化到用数据说话，用客观数据定位问题到底是谁的责任。",
    badges: ["问题定位", "数据说话", "业务拆解", "可复用 Skill"],
    pipelineStep: "筛选",
    className: "col-span-1",
    icon: Eye,
    color: "from-[#ef4444] to-[#f97316]",
    href: "/category/attribution"
  },
  {
    id: "case-4",
    title: "动能重构：让难啃的客户也被认真对待",
    metric: "难啃客户成交率提升",
    subtext: "专治销售挑肥拣瘦。用高意向客户强行捆绑难啃客户，用积分机制让销售愿意跟进所有人。",
    badges: ["打破挑肥拣瘦", "积分激励", "公平分配", "可复用 Skill"],
    pipelineStep: "跟进",
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
            可部署的 Skill，<br className="md:hidden" /><span className="text-blue-500">不是 PPT，是机器</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed">
            这些不是过往战绩，而是已被封装的业务导弹。<br className="hidden md:block" />
            挂载到你的 <img src="/openclaw-logo.png" alt="OpenClaw" className="w-4 h-4 object-contain inline-block align-text-bottom mx-0.5" />OpenClaw 系统，<br className="hidden md:block" />
            立刻自动执行。
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
            onClick={() => router.push("/skills")}
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
                <h3 className="text-lg font-medium text-white/90">查阅全部 Skill 方案 →</h3>
              </div>

              <div>
                <p className="text-sm text-[#8b949e] mb-4">
                  <img src="/openclaw-logo.png" alt="OpenClaw" className="w-4 h-4 object-contain inline-block align-text-bottom mx-0.5" />OpenClaw 可挂载的自动化导弹库
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
