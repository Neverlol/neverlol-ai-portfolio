'use client';

import { useEffect, useState } from 'react';

// 安全边界算法
const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));

// 浮动标签配置
const FLOATING_LABELS = {
  blue: [
    { text: 'ROI测算', x: 0.15 },
    { text: 'AB测试', x: 0.45 },
    { text: '流量分发', x: 0.75 },
  ],
  green: [
    { text: '异动归因', x: 0.2 },
    { text: '促销投放', x: 0.5 },
    { text: '商机发掘', x: 0.8 },
  ],
  red: [
    { text: '活跃度监控', x: 0.25 },
    { text: '异常干预', x: 0.55 },
    { text: '会员分层', x: 0.85 },
  ],
};

export default function HeroBackgroundRadar() {
  const [mounted, setMounted] = useState(false);
  const [offset, setOffset] = useState(0);
  const POINTS_COUNT = 120;
  const X_STEP = 2000 / POINTS_COUNT;

  // 初始化数据 - 使用确定性函数，避免 SSR hydration mismatch
  const [data, setData] = useState(() => {
    return Array.from({ length: POINTS_COUNT }, (_, i) => ({
      blue: 120 + Math.sin(i / 6) * 40,    // 流量 - 较高位置
      green: 280 + Math.cos(i / 8) * 30,    // 成交 - 中间位置
      red: 480 + Math.sin(i / 12) * 15,     // 流失 - 底部位置
    }));
  });

  useEffect(() => {
    setMounted(true);

    let frame = 0;
    const interval = setInterval(() => {
      frame++;
      setOffset((frame * 3) % X_STEP); // 控制流动速度

      setData((prev) => {
        const next = [...prev];
        next.shift();

        const last = prev[prev.length - 1];
        next.push({
          // 蓝线：流量波动大，周期性变化
          blue: clamp(
            last.blue + (Math.random() - 0.45) * 30 + Math.sin(frame / 15) * 15,
            60, 200
          ),
          // 绿线：成交稳步上升，带波动
          green: clamp(
            last.green + (Math.random() - 0.48) * 20 + Math.cos(frame / 20) * 10,
            220, 380
          ),
          // 红线：流失相对平稳，小幅波动
          red: clamp(
            last.red + (Math.random() - 0.5) * 12 + Math.sin(frame / 25) * 8,
            440, 540
          ),
        });
        return next;
      });
    }, 50); // 50ms 适中流速

    return () => clearInterval(interval);
  }, [X_STEP]);

  if (!mounted) return null;

  // 生成路径 - 带流动偏移
  const bluePath = `M ${data.map((d, i) => `${i * X_STEP - offset},${d.blue}`).join(' L ')}`;
  const greenPath = `M ${data.map((d, i) => `${i * X_STEP - offset},${d.green}`).join(' L ')}`;
  const redPath = `M ${data.map((d, i) => `${i * X_STEP - offset},${d.red}`).join(' L ')}`;

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0"
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
        maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
      }}
    >
      {/* 深渊背景 */}
      <div className="absolute inset-0 bg-[#0a0a0a] -z-10" />

      {/* 微弱的径向光晕 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/8 via-transparent to-transparent opacity-60" />

      {/* 底部微弱渐变 */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      {/* 动态 SVG 画布 */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 2000 600">
        <defs>
          {/* 蓝色流量渐变 */}
          <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          {/* 绿色成交渐变 */}
          <linearGradient id="green-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
          {/* 红色流失渐变 */}
          <linearGradient id="red-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0" />
            <stop offset="50%" stopColor="#ef4444" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* 蓝线 - 流量 */}
        <path
          d={bluePath}
          fill="none"
          stroke="url(#blue-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_15px_rgba(59,130,246,0.7)]"
        />

        {/* 绿线 - 成交 */}
        <path
          d={greenPath}
          fill="none"
          stroke="url(#green-grad)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="drop-shadow-[0_0_15px_rgba(16,185,129,0.7)]"
        />

        {/* 红线 - 流失 */}
        <path
          d={redPath}
          fill="none"
          stroke="url(#red-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.7"
          className="drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]"
        />

        {/* 浮动标签 - 蓝线 */}
        {FLOATING_LABELS.blue.map((label, i) => (
          <g key={`blue-${i}`}>
            <rect
              x={label.x * 2000 - 32}
              y={data[Math.floor(label.x * POINTS_COUNT)]?.blue - 28 || 100}
              width="64"
              height="18"
              rx="4"
              fill="rgba(15,23,42,0.85)"
              stroke="rgba(59,130,246,0.3)"
              strokeWidth="0.5"
            />
            <text
              x={label.x * 2000}
              y={data[Math.floor(label.x * POINTS_COUNT)]?.blue - 16 || 100}
              textAnchor="middle"
              fill="#60a5fa"
              fontSize="10"
              fontFamily="monospace"
            >
              {label.text}
            </text>
          </g>
        ))}

        {/* 浮动标签 - 绿线 */}
        {FLOATING_LABELS.green.map((label, i) => (
          <g key={`green-${i}`}>
            <rect
              x={label.x * 2000 - 32}
              y={data[Math.floor(label.x * POINTS_COUNT)]?.green - 28 || 280}
              width="64"
              height="18"
              rx="4"
              fill="rgba(15,23,42,0.85)"
              stroke="rgba(16,185,129,0.3)"
              strokeWidth="0.5"
            />
            <text
              x={label.x * 2000}
              y={data[Math.floor(label.x * POINTS_COUNT)]?.green - 16 || 280}
              textAnchor="middle"
              fill="#34d399"
              fontSize="10"
              fontFamily="monospace"
            >
              {label.text}
            </text>
          </g>
        ))}

        {/* 浮动标签 - 红线 */}
        {FLOATING_LABELS.red.map((label, i) => (
          <g key={`red-${i}`}>
            <rect
              x={label.x * 2000 - 36}
              y={data[Math.floor(label.x * POINTS_COUNT)]?.red - 28 || 480}
              width="72"
              height="18"
              rx="4"
              fill="rgba(15,23,42,0.85)"
              stroke="rgba(239,68,68,0.3)"
              strokeWidth="0.5"
            />
            <text
              x={label.x * 2000}
              y={data[Math.floor(label.x * POINTS_COUNT)]?.red - 16 || 480}
              textAnchor="middle"
              fill="#f87171"
              fontSize="10"
              fontFamily="monospace"
            >
              {label.text}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
