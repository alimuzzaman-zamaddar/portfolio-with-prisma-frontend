import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Leave empty or add other valid options
  reactStrictMode: true,
  images: {
    domains: [], // add domains if you serve remote images
  },
};

export default nextConfig;
