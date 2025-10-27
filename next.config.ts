import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // ⛔️ Jangan hentikan build karena error ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ⛔️ Jangan hentikan build karena error TypeScript
    ignoreBuildErrors: true,
  },
  // Kalau kamu pakai folder public/qgis
  // biar aman di-deploy ke Vercel
  output: "standalone",
};

export default nextConfig;
