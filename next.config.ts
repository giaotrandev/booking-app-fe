import type { NextConfig } from 'next';
import { withBotId } from 'botid/next/config';
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-459bf266ac1b494db84a566366b2a2e6.r2.dev',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'img.vietqr.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.tgdd.vn', // ✅ thêm dòng này
        pathname: '/**',
      },
    ],
  },
};

export default withBotId(withNextIntl(nextConfig));
