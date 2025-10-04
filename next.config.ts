import type { NextConfig } from 'next';
import { withBotId } from 'botid/next/config';
const createNextIntlPlugin = require('next-intl/plugin');
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'booking-app.46004302832b6f1022cd321a40462869.r2.cloudflarestorage.com',
      //   pathname: '/**',
      // },
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
    ],
  },
};

export default withBotId(withNextIntl(nextConfig));
