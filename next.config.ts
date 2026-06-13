import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // GitHub raw content (fallback cuando no hay NEXT_PUBLIC_ASSETS_BASE_URL)
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/Ian9Franco/theboyz-comic-v1/**",
      },
      // GitHub Pages (si se activa en el repo de imágenes)
      {
        protocol: "https",
        hostname: "ian9franco.github.io",
        pathname: "/theboyz-comic-v1/**",
      },
    ],
  },
};

export default nextConfig;
