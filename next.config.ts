import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  experimental: { browserDebugInfoInTerminal: true }
};

export default nextConfig;
