"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/constants";

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0D1117]">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            {/* 终端风格 Logo - > N_ (加宽) */}
            <div className="relative flex items-center justify-center w-10 h-8 bg-black border border-white/20 rounded-md overflow-hidden group-hover:border-white/40 transition-colors">
              {/* 闪烁光标动画 */}
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes blink {
                  0%, 50% { opacity: 1; }
                  51%, 100% { opacity: 0; }
                }
                .cursor-blink {
                  animation: blink 1s step-end infinite;
                }
              `}} />
              {/* > 箭头 - 文字终端符号，小号 */}
              <span className="font-mono font-bold text-xs text-[#0066FF] absolute left-0.5 top-1/2 -translate-y-1/2">{'>'}</span>
              {/* N字母 - 主体，居中，更大更充分 */}
              <svg viewBox="0 0 100 100" className="w-6 h-6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="headerLeftBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="100%" stopColor="#dddddd" />
                  </linearGradient>
                  <linearGradient id="headerRightBarFade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#eeeeee" stopOpacity="1" />
                    <stop offset="100%" stopColor="#eeeeee" stopOpacity="0.5" />
                  </linearGradient>
                  <linearGradient id="headerDiagFade" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="60%" stopColor="#eeeeee" stopOpacity="1" />
                    <stop offset="100%" stopColor="#cccccc" stopOpacity="0.6" />
                  </linearGradient>
                </defs>
                <rect x="28" y="22" width="10" height="56" fill="url(#headerLeftBarGrad)" />
                <rect x="62" y="22" width="10" height="32" fill="url(#headerRightBarFade)" />
                <polygon points="28,22 38,22 72,78 62,78" fill="url(#headerDiagFade)" />
              </svg>
              {/* _ 下划线在N右侧，小号，稍向下，向左贴近N，线条闪烁 */}
              <span className="cursor-blink absolute right-1 top-[55%] -translate-y-1/2">
                <span className="font-mono text-[10px] text-[#0066FF]">_</span>
              </span>
            </div>
            <span className="text-base font-medium tracking-tight text-white group-hover:text-[#58a6ff] transition-colors">
              Neverlol
            </span>
          </Link>

          {!isHome && (
            <div className="flex items-center ml-4 pl-4 border-l border-white/10">
              <Link href="/" className="flex items-center gap-1.5 text-xs text-[#8b949e] hover:text-white transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                返回主页
              </Link>
            </div>
          )}
        </div>

        <nav className="flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isRouteActive = !item.href.includes("#") && pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group relative flex items-center gap-2 rounded-md border px-3 py-1.5 text-xs font-mono tracking-wider transition-all duration-200 ${
                  isRouteActive
                    ? "border-white/10 bg-white/5 text-gray-200"
                    : "border-transparent text-gray-500 hover:border-white/10 hover:bg-white/5 hover:text-gray-200"
                }`}
              >
                <div
                  className={`h-1 w-1 rounded-full transition-colors duration-200 ${
                    isRouteActive ? "bg-blue-500" : "bg-gray-600 group-hover:bg-blue-500"
                  }`}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
