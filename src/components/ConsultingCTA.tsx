"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X, ArrowRight, Loader2, Target, Users, Coins } from "lucide-react";
import { submitConsultingLead } from "@/lib/db";

export function ConsultingCTA() {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bottleneckType, setBottleneckType] = useState("");

    // 表单数据
    const [formData, setFormData] = useState({
        contact_info: "",
        business_desc: ""
    });

    // 实际接入 DB 的提交逻辑
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const success = await submitConsultingLead({
                bottleneck_type: bottleneckType || "未分类瓶颈",
                contact_info: formData.contact_info,
                business_desc: formData.business_desc
            });

            if (success) {
                setStep(3); // 完成页
            } else {
                alert("提交失败，请稍后重试或直接联系管理员");
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {/* 悬浮强力按钮 */}
            <motion.button
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-8 right-8 z-50 px-6 py-4 bg-gradient-to-r from-[#e94560] to-[#c72d47] text-white rounded-2xl shadow-[0_0_20px_rgba(233,69,96,0.3)] hover:shadow-[0_0_30px_rgba(233,69,96,0.5)] transition-all flex items-center gap-3 group border border-white/10"
            >
                <div className="p-2 bg-white/10 rounded-lg">
                    <Terminal className="w-5 h-5 text-white" />
                </div>
                <div className="text-left hidden sm:block">
                    <div className="text-sm font-bold tracking-wide">获取业务诊断方案</div>
                    <div className="text-xs text-white/80">中小企业微咨询入驻</div>
                </div>
                <ArrowRight className="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </motion.button>

            {/* 多步表单 Modal */}
            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-[#16213e] border border-[#4a4e69] rounded-2xl shadow-2xl overflow-hidden"
                        >
                            {/* Modal 头部 */}
                            <div className="flex justify-between items-center p-6 border-b border-white/5 bg-black/20">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Terminal className="w-5 h-5 text-[#e94560]" />
                                    业务漏斗诊断申请
                                </h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-1 text-white/50 hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* 步骤条指示器 */}
                            <div className="flex h-1 bg-black/40">
                                <div
                                    className="h-full bg-gradient-to-r from-[#e94560] to-[#c72d47] transition-all duration-300"
                                    style={{ width: `${(step / 3) * 100}%` }}
                                />
                            </div>

                            <div className="p-6">
                                {step === 1 && (
                                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                        <div className="space-y-2">
                                            <h4 className="text-lg font-medium text-white">您当前业务最大的瓶颈是什么？</h4>
                                            <p className="text-sm text-white/50">请选择最困扰您的一个核心环节</p>
                                        </div>

                                        <div className="grid gap-3">
                                            {[
                                                { icon: Target, title: "获客拓客困局", desc: "线索成本高，漏斗上开口断层" },
                                                { icon: Users, title: "留存与复购疲软", desc: "客损率高，生命周期短，无续费模型" },
                                                { icon: Coins, title: "转化与变现卡点", desc: "线索浪费，商机转化率低于行业标准" }
                                            ].map((item, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        setBottleneckType(item.title);
                                                        setStep(2);
                                                    }}
                                                    className={`flex items-start gap-4 p-4 rounded-xl border transition-all group ${bottleneckType === item.title
                                                            ? 'bg-[#e94560]/10 border-[#e94560]'
                                                            : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#e94560]/50'
                                                        } text-left`}
                                                >
                                                    <div className={`p-2 rounded-lg transition-colors ${bottleneckType === item.title ? 'bg-[#e94560] text-white' : 'bg-black/40 text-white/70 group-hover:text-[#e94560]'
                                                        }`}>
                                                        <item.icon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-white mb-1">{item.title}</div>
                                                        <div className="text-sm text-white/50">{item.desc}</div>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.form
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        onSubmit={handleSubmit}
                                        className="space-y-5"
                                    >
                                        <div className="space-y-2">
                                            <h4 className="text-lg font-medium text-white">完善基础信息以获取深层诊断</h4>
                                            <p className="text-sm text-white/50">留下您的联系方式与简单描述，我们会在24小时内发送策略建议初稿。</p>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">手机或微信号</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.contact_info}
                                                    onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })}
                                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-[#e94560] text-white"
                                                    placeholder="您的微信号/联系电话"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-medium text-white/50 mb-1.5 uppercase tracking-wider">业务简述 (选填)</label>
                                                <textarea
                                                    value={formData.business_desc}
                                                    onChange={(e) => setFormData({ ...formData, business_desc: e.target.value })}
                                                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-[#e94560] text-white min-h-[100px] resize-none"
                                                    placeholder="例如：目前主要做教育培训，有5人销售团队，近三个月新签转化率一直在跳水..."
                                                />
                                            </div>
                                        </div>

                                        <div className="pt-4 flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() => setStep(1)}
                                                className="px-6 py-3 rounded-xl border border-white/10 text-white/70 hover:text-white hover:bg-white/5 transition-colors font-medium"
                                            >
                                                返回上一步
                                            </button>
                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-[#e94560] to-[#c72d47] text-white font-medium shadow-lg shadow-[#e94560]/20 flex justify-center items-center hover:shadow-[#e94560]/40 transition-all disabled:opacity-70"
                                            >
                                                {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "免费获取针对性诊断"}
                                            </button>
                                        </div>
                                    </motion.form>
                                )}

                                {step === 3 && (
                                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-4">
                                        <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Terminal className="w-8 h-8 text-green-500" />
                                        </div>
                                        <h4 className="text-2xl font-bold text-white">线索接收成功！</h4>
                                        <p className="text-white/60 leading-relaxed max-w-sm mx-auto">
                                            数据已安全抵达后端漏斗底层。<br />我们会在对其进行分析后尽快与您展开交流。
                                        </p>
                                        <div className="pt-6">
                                            <button
                                                onClick={() => setIsOpen(false)}
                                                className="px-8 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all"
                                            >
                                                关闭窗口
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}
