import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Existing configurations */
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  /* Backend API Proxy (CORS-free, Clean URLs) */
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "https://coding-platform-henna.vercel.app/api/v1/:path*",
        // destination: "http://localhost:5000/api/v1/:path*",
      },
    ];
  },
};
// http://localhost:5000/api/v1

export default nextConfig;