import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/fresher-jobs",
        permanent: true,
      },
      {
        source: "/jobs",
        destination: "/fresher-jobs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
