// app/opengraph-image.tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Neverlol - 独立商业顾问 | 前58同城大区操盘手';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#050505',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* 1. 极客网格背景 (SaaS Vibe) */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
          width="1200"
          height="630"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* 2. 权威信任标签 (Authority Badge) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 32px',
            backgroundColor: 'rgba(0, 102, 255, 0.1)', // 贴合你的 #0066FF 极客蓝
            border: '1px solid rgba(0, 102, 255, 0.4)',
            borderRadius: '100px',
            marginBottom: '40px',
            color: '#66A3FF',
            fontSize: '24px',
            fontWeight: 600,
            letterSpacing: '0.05em',
            zIndex: 10,
          }}
        >
          前 58 同城大区操盘手 · AI 商业架构师
        </div>

        {/* 3. 等比例放大的终端风格 Logo (你的最新设计) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '250px',   // 完美映射 w-10
            height: '200px',  // 完美映射 h-8
            backgroundColor: 'black',
            border: '2px solid rgba(255,255,255,0.2)',
            borderRadius: '16px', // 映射 rounded-md
            position: 'relative',
            zIndex: 10,
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          }}
        >
          {/* > 箭头 - 文字终端符号 (等比例缩放位置与大小) */}
          <span style={{ color: '#0066FF', fontSize: '60px', fontWeight: 'bold', fontFamily: 'monospace', position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}>
            {'>'}
          </span>

          {/* N字母 - 完美复刻你的专属渐变与尺寸比例 */}
          <svg viewBox="0 0 100 100" width="150" height="150" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <rect x="62" y="22" width="10" height="32" fill="url(#headerRightBarFade)" /> {/* 短竖杠特征保留 */}
            <polygon points="28,22 38,22 72,78 62,78" fill="url(#headerDiagFade)" />
          </svg>

          {/* _ 下划线 - 完美映射：较小号、稍微向下 (top: 55%) */}
          <span style={{ color: '#0066FF', fontSize: '50px', fontWeight: 'bold', fontFamily: 'monospace', position: 'absolute', right: '24px', top: '55%', transform: 'translateY(-50%)' }}>
            _
          </span>
        </div>

        {/* 4. 厂牌与高密度商业钩子 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '48px', zIndex: 10 }}>
          <h1 style={{ fontSize: '72px', fontWeight: 'bold', color: 'white', letterSpacing: '-0.02em', margin: 0 }}>
            Neverlol
          </h1>

          <p style={{ fontSize: '36px', color: '#0066FF', marginTop: '24px', fontWeight: 'bold', letterSpacing: '0.02em' }}>
            大厂级数据基建 × 商业漏斗物理级强控
          </p>

          <p style={{ fontSize: '24px', color: '#6b7280', marginTop: '20px', fontWeight: 500, letterSpacing: '0.1em' }}>
            因上精进，果上随缘。
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
