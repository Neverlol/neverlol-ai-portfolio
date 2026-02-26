"use client";

import { motion } from "framer-motion";

export function Footer() {
  return (
    <footer className="py-6 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-2"
        >
          <div className="text-sm text-[#8b949e]">
            © 2024 AI Portfolio. Built with Next.js & Shadcn UI.
          </div>
          <div className="text-xs text-[#8b949e]/50">
            From 58 同城 to AI Agent
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
