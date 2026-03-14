"use client";

import { motion } from "framer-motion";
import { Activity, Target, Users, TrendingUp, ShieldCheck, Eye, AlertTriangle, Gauge, Package, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const BENTO_CASES = [
  {
    id: "case-1",
    title: "人效提升：物理级强控生命线",
    metric: "人效整体拉升",
    subtext: "废除销售主观汇报意向，建立 0% 至 100% 的硬性行为进阶卡点，将大班式洗脑转变为漏斗转化靶向赋能。",
    badges: ["剔除无效拨打", "精准锁定转化卡点", "团队人效整体拉升"],
    className: "col-span-1 md:col-span-2 row-span-2",
    icon: Activity,
    color: "from-[#245fff] to-[#00f0ff]",
    href: "/category/activation"
  },
  {
    id: "case-2",
    title: "生命周期：存量防御与价值榨取",
    metric: "续费率绝对值跃升",
    subtext: "摒弃首签即放养。建立 180 天全生命周期模型，针对体验期与破灭期实施强制教学干预，无限延长客户 LTV。",
    badges: ["180天激励暗盘", "赋能破灭期", "大连区全国第一"],
    className: "col-span-1",
    icon: AlertTriangle,
    color: "from-[#8b5cf6] to-[#d946ef]",
    href: "/category/lead-scoring"
  },
  {
    id: "case-3",
    title: "大盘归因诊断：打破甩锅黑盒",
    metric: "分钟级死因定位",
    subtext: "摒弃口水战，祭出「业务拆车拆漏斗」。从全靠前线一张嘴进化到四级漏斗物理归因，用客观数据斩断跨部门甩锅。",
    badges: ["四级漏斗诊断", "肃清虚假定论", "业务物理拆解"],
    className: "col-span-1",
    icon: Eye,
    color: "from-[#ef4444] to-[#f97316]",
    href: "/category/attribution"
  },
  {
    id: "case-4",
    title: "动能重构：行业垄断与独角兽孵化",
    metric: "长尾单量大涨",
    subtext: "专治销售「挑肥拣瘦」。用高意向热门资产强行捆绑长尾冷门资产，设立跨区 PK，孵化深耕垂直类目的行业专家。",
    badges: ["长尾破局", "终结大锅饭", "独角兽养成"],
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
          <div className="inline-flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-[#245fff]" />
            <span className="text-[#245fff] text-xs font-bold tracking-widest uppercase">CORE BATTLES / 核心战役库</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-semibold text-white mb-4 tracking-tight">
            告别黑话，<br className="md:hidden" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">只谈商业转化与 ROI</span>
          </h2>
          <p className="text-[#8b949e] text-base md:text-lg max-w-2xl leading-relaxed">
            没有复杂的架构图，没有听不懂的 AI 术语。<br className="hidden md:block" />
            只有被验证过的底层逻辑、增长杠杆，以及实打实的业绩提升。
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
                <h3 className="text-lg font-medium text-white/90">查看全部实战案例</h3>
              </div>

              <div>
                <p className="text-sm text-[#8b949e] mb-4">
                  探索底层数据系统的降维打击过程
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
