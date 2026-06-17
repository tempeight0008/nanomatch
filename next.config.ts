import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'humble-space-robot-697rrvwppq59cr5vv-3000.app.github.dev' // Your exact cloud proxy domain
      ],
    },
  },
};

export default nextConfig;
