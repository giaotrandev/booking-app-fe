import type { NextConfig } from 'next';
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'booking-app.46004302832b6f1022cd321a40462869.r2.cloudflarestorage.com',
        pathname: '/**',
      },
    ],
  },
};

export default withNextIntl(nextConfig);
