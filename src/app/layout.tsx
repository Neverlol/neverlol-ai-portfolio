import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Portfolio - 业务逻辑的代码化演进",
  description: "10 年大厂运营深度 + 数学建模直觉 + AI 全栈执行力。从 50% 续费率到 AI 自主智能体。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark">
      <body className="antialiased bg-[#0D1117]">
        {children}
      </body>
    </html>
  );
}
