import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Neverlol - 业务逻辑的代码化演进",
  description: "10 年大厂运营深度 + 数学建模直觉 + AI 全栈执行力。从 50% 续费率到 AI 自主智能体。",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Neverlol - 独立商业顾问",
    description: "因上精进，果上随缘。10 年大厂运营深度 + 数学建模直觉 + AI 全栈执行力。",
    type: "website",
    url: "https://neverlol.ai",
    siteName: "Neverlol",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Neverlol - 独立商业顾问",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Neverlol - 独立商业顾问",
    description: "因上精进，果上随缘。10 年大厂运营深度 + 数学建模直觉 + AI 全栈执行力。",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark" suppressHydrationWarning>
      <body className="antialiased bg-[#0D1117]">
        {children}
      </body>
    </html>
  );
}
