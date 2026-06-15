import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/contact',    destination: '/about', permanent: true },
      { source: '/blog/notes', destination: '/notes', permanent: true },
      { source: '/science',    destination: '/#explore', permanent: false },
    ];
  },
};

export default nextConfig;
