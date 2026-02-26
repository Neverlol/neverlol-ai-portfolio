"use client";

import { PenTool, Sparkles, Lightbulb, Target, TrendingUp, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface HandDrawnArrowProps {
  text: string;
  className?: string;
  rotation?: number;
  showIcon?: boolean;
  variant?: "yellow" | "purple" | "green";
}

const variantColors = {
  yellow: {
    stroke: "#FACC15",
    bg: "#171717",
    border: "#FACC15",
    text: "#FACC15",
    icon: PenTool,
  },
  purple: {
    stroke: "#A855F7",
    bg: "#171717",
    border: "#A855F7",
    text: "#A855F7",
    icon: Sparkles,
  },
  green: {
    stroke: "#22C55E",
    bg: "#171717",
    border: "#22C55E",
    text: "#22C55E",
    icon: TrendingUp,
  },
};

export function HandDrawnArrow({
  text,
  className = "",
  rotation = 0,
  showIcon = true,
  variant = "yellow",
}: HandDrawnArrowProps) {
  const colors = variantColors[variant];
  const Icon = colors.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      {/* Arrow */}
      <svg
        width="60"
        height="30"
        className="absolute -left-6 top-1/2 -translate-y-1/2"
      >
        <path
          d="M0 15 Q 15 15, 25 8"
          fill="none"
          stroke={colors.stroke}
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-80"
        />
        <path
          d="M20 3 L 28 10 L 20 17"
          fill="none"
          stroke={colors.stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="opacity-80"
        />
      </svg>

      {/* Label */}
      <div
        className="ml-2 inline-flex items-center gap-2 px-3 py-1.5 border-2 rounded-lg"
        style={{
          backgroundColor: colors.bg,
          borderColor: colors.border,
          transform: `rotate(${rotation}deg)`,
        }}
      >
        {showIcon && <Icon className="w-3 h-3" style={{ color: colors.text }} />}
        <span className="text-xs font-medium whitespace-nowrap" style={{ color: colors.text }}>
          {text}
        </span>
      </div>
    </motion.div>
  );
}

interface HandDrawnTagProps {
  children: React.ReactNode;
  className?: string;
  variant?: "yellow" | "purple" | "green" | "blue";
  icon?: "pen" | "bulb" | "target" | "zap" | "none";
}

const tagVariants = {
  yellow: {
    border: "#FACC15",
    bg: "rgba(250, 204, 21, 0.1)",
    text: "#FACC15",
    icon: PenTool,
  },
  purple: {
    border: "#A855F7",
    bg: "rgba(168, 85, 247, 0.1)",
    text: "#A855F7",
    icon: Sparkles,
  },
  green: {
    border: "#22C55E",
    bg: "rgba(34, 197, 94, 0.1)",
    text: "#22C55E",
    icon: TrendingUp,
  },
  blue: {
    border: "#3B82F6",
    bg: "rgba(59, 130, 246, 0.1)",
    text: "#3B82F6",
    icon: Zap,
  },
};

export function HandDrawnTag({
  children,
  className = "",
  variant = "yellow",
  icon = "pen",
}: HandDrawnTagProps) {
  const colors = tagVariants[variant];
  const Icon = icon === "none" ? null : icon === "bulb" ? Lightbulb : icon === "target" ? Target : icon === "zap" ? Zap : colors.icon;

  return (
    <motion.span
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 border rounded-md text-xs font-medium ${className}`}
      style={{
        backgroundColor: colors.bg,
        borderColor: colors.border,
        color: colors.text,
      }}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </motion.span>
  );
}
