"use client";

import { motion } from "framer-motion";
import { Search, Wrench, RefreshCcw } from "lucide-react";

const STEPS = [
  {
    icon: Search,
    step: "阶段 01",
    title: "业务访谈与工作流梳理",
    desc: "先看清你们团队当前到底怎么跑、哪些判断依赖人脑、哪些动作已经重复高频，再决定第一批从哪几个节点切入。",
    bullets: ["梳理角色节点与手工动作", "提炼高频判断规则", "锁定第一批封装范围"],
  },
  {
    icon: Wrench,
    step: "阶段 02",
    title: "规则抽取与 Skill 封装",
    desc: "把你们团队已经验证过的经验、案例数据和优先级逻辑抽出来，结合我的大厂方法论，封成真正可执行的 Skill。",
    bullets: ["抽取经验与案例数据", "封装客户自有 Skill 知识库", "定义输入输出与人工边界"],
  },
  {
    icon: RefreshCcw,
    step: "阶段 03",
    title: "OpenClaw 部署与周期优化",
    desc: "Skill 不是停留在文档里，而是挂到客户自己的 OpenClaw 上跑起来，再按固定周期持续调参、补节点和扩展流程。",
    bullets: ["接入 OpenClaw 与审批流", "双周或月度复盘", "规则升级与流程扩展"],
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
            不是卖模板，<span className="text-blue-500">而是把你团队已验证的经验封成 Skill 系统</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            我的工作不是把一套现成流程硬塞给你，也不是替你重做一个通用 SaaS。
            而是先理解你们现在的工作流，再把已经验证过的经验、规则和案例数据抽出来，封进你们自己的 Skill 系统。
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
