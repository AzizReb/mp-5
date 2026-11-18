import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  compiler: { styledComponents: true },
  devIndicators: false,
  experimental: {
    agentFeedback: true,
  },
  reactCompiler: true,
};

export default nextConfig;
