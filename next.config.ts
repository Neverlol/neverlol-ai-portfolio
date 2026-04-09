import type { NextConfig } from "next";

const appRoot = process.cwd();

const nextConfig: NextConfig = {
  experimental: {
    webpackBuildWorker: false,
  },
  outputFileTracingRoot: appRoot,
  turbopack: {
    root: appRoot,
  },
};

export default nextConfig;
