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
    title: "规则抽取与模块封装",
    desc: "把你们团队已经验证过的经验、案例数据和优先级逻辑抽出来，结合我的实战方法论，封装成真正可执行的后台模块。",
    bullets: ["抽取经验与案例数据", "封装客户自有模块规则", "定义输入输出与人工边界"],
  },
  {
    icon: RefreshCcw,
    step: "阶段 03",
    title: "OpenClaw 部署与周期优化",
    desc: "把模块接到客户自己的 OpenClaw 上跑起来，再按固定周期持续调参、补节点和扩展流程。",
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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-[1.05]">
            <span className="block">准备认真评估时</span>
            <span className="mt-2 inline-flex flex-wrap items-center justify-center gap-3 text-blue-500">
              <span>我们会这样把系统接进</span>
              <span className="inline-flex items-center gap-2">
                <img src="/openclaw-logo.png" alt="OpenClaw" className="h-9 w-9 object-contain md:h-10 md:w-10" />
                <span>OpenClaw</span>
              </span>
            </span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
            <span className="md:block">
              我会先理解你们现在的工作流、角色分工和业务节奏。
            </span>
            <span className="md:block">
              再把已经验证过的经验、规则和案例数据抽出来，
            </span>
            <span className="md:block">
              封进你们自己的业务模块里；
            </span>
            <span className="md:block">
              OpenClaw（小龙虾）负责把这些能力接到客户自己的流程里持续运转。
            </span>
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
