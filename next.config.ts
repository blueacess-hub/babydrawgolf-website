import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.babydrawgolf.net' }],
        destination: 'https://babydrawgolf.net/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
