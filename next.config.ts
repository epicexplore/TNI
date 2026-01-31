import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  output: 'export',
  images: { unoptimized: true }, // Required for static export
  /* config options here */
};

export default nextConfig;
