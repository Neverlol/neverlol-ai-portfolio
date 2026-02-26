"use client";

import { motion } from "framer-motion";
import { ABOUT_CONTENT } from "@/constants";

export function About() {
  return (
    <section id="about" className="py-16 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-medium text-white mb-3">
            About
          </h2>
          <p className="text-[#8b949e] mb-10">
            {ABOUT_CONTENT.subtitle}
          </p>

          {/* Philosophy Quote */}
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative p-5 bg-[#1e1e1e] border border-white/10 rounded-xl mb-10"
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#0D1117] text-xs text-[#8b949e]">
              一句话哲学
            </div>
            <p className="text-lg text-white leading-relaxed">
              {ABOUT_CONTENT.philosophy}
            </p>
          </motion.blockquote>

          {/* Keywords */}
          <div className="flex flex-wrap justify-center gap-2">
            {ABOUT_CONTENT.keywords.map((keyword, index) => (
              <motion.span
                key={keyword}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="px-4 py-2 text-sm text-[#8b949e] bg-white/5 rounded-lg border border-white/10"
              >
                {keyword}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
