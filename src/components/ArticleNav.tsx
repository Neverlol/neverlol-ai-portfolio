"use client";

import { motion } from "framer-motion";
import { Home, FolderOpen, User, X } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface ArticleNavProps {
  onClose?: () => void;
}

export function ArticleNav({ onClose }: ArticleNavProps) {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "返回主页", icon: Home },
    { href: "/#portfolio", label: "作品集", icon: FolderOpen },
    { href: "/#about", label: "关于我", icon: User },
  ];

  const handleClick = (href: string) => {
    router.push(href);
    onClose?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 hidden md:block"
    >
      <div className="flex flex-col gap-2">
        {/* Navigation Items */}
        <div className="nightwatch-card !p-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href.replace("/#", "")));
            const Icon = item.icon;

            return (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive
                    ? "bg-[#245fff]/20 text-[#245fff]"
                    : "text-[#a3a3a3] hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>

                {/* Tooltip */}
                <div className="absolute left-full ml-2 px-3 py-1.5 bg-[#1e1e1e] border border-white/10 rounded-lg text-sm text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// Mobile/Tablet bottom navigation
export function ArticleNavMobile() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "主页", icon: Home },
    { href: "/#portfolio", label: "作品集", icon: FolderOpen },
    { href: "/#about", label: "关于", icon: User },
  ];

  const handleClick = (href: string) => {
    router.push(href);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      <div className="mx-4 mb-4">
        <div className="nightwatch-card !p-2 flex justify-around">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href.replace("/#", "")));
            const Icon = item.icon;

            return (
              <button
                key={item.href}
                onClick={() => handleClick(item.href)}
                className={`flex flex-col items-center gap-1 px-6 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-[#245fff]/20 text-[#245fff]"
                    : "text-[#a3a3a3] hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
