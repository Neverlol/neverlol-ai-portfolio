"use client";

import { motion } from "framer-motion";
import { Search, Wrench, RefreshCcw } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    step: "阶段 01",
    title: "业务 Skill 审计",
    desc: "先判断你的团队适合先从哪 1 到 3 个节点切入，而不是一上来做一整套大而全系统。",
    bullets: ["梳理业务链路与数据条件", "判断优先封装节点", "给出首期 Skill 方案与范围"],
  },
  {
    icon: Wrench,
    step: "阶段 02",
    title: "定制 Skill + 部署 OpenClaw",
    desc: "把业务规则封成可执行 Skill，并部署到客户自己的 OpenClaw 环境，接入真实工作流。",
    bullets: ["封装关键节点 Skill", "部署客户自有 OpenClaw", "打通 webhook / cron / 审批流程"],
  },
  {
    icon: RefreshCcw,
    step: "阶段 03",
    title: "固定周期升级优化",
    desc: "不是一次性交付，而是按固定节奏持续复盘、调参和补节点，让 Skill 越跑越准。",
    bullets: ["双周或月度复盘", "规则调参与误判修正", "新增节点与流程扩展"],
  },
];

export function CooperationProcess() {
  return (
    <section id="cooperation" className="py-16 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <div className="flex items-center justify-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 w-fit mx-auto">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-xs font-mono text-gray-400 tracking-widest uppercase">合作方式</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            不是接外包，<span className="text-blue-500">而是交付一套能持续优化的 Skill 系统</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            我的工作不是替你重做一套 CRM，也不是卖一个通用 SaaS。
            而是把你业务里最值得自动化的后台节点封成 Skill，部署到你自己的 OpenClaw，再按固定周期持续优化。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-3xl bg-black border border-white/10 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-blue-400" />
                </div>

                <div className="text-[10px] text-blue-400 uppercase tracking-wider mb-2">{item.step}</div>
                <h3 className="text-xl font-medium text-white mb-3">{item.title}</h3>
                <p className="text-sm text-[#8b949e] leading-relaxed mb-5">{item.desc}</p>

                <div className="flex flex-wrap gap-2">
                  {item.bullets.map((bullet) => (
                    <span
                      key={bullet}
                      className="px-2 py-1 text-[10px] font-medium rounded-md bg-white/5 border border-white/10 text-[#a3a3a3]"
                    >
                      {bullet}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
