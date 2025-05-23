import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      // SETUP - Robots.txt: Set rules of robots.txt here
    },
    sitemap: process.env.NEXT_PUBLIC_SITE_URL
      ? `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`
      : undefined,
  };
}
