"use client";

import { motion } from "framer-motion";
import { NAV_ITEMS } from "@/constants";

export function Header() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0D1117]"
    >
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-base font-medium tracking-tight text-white"
        >
          AI Portfolio
        </motion.div>

        <nav className="flex items-center gap-6">
          {NAV_ITEMS.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) + 0.3 }}
              className="text-sm text-[#8b949e] hover:text-white transition-colors duration-200"
            >
              {item.label}
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
