// components/common/turnstile-block.tsx
'use client';

import { CloudflareTurnstileWidget } from '#/lib/cloudflare/turnstile/widget';
import { useTheme } from 'next-themes';
import { useCurrentLocale } from '#/i18n/client';

interface TurnstileBlockProps {
  show?: boolean;
  onVerify: (token: string, widget: any) => void;
  onLoad?: (widgetId: string, widget: any) => void;
  onExpire?: (token: string) => void;
  onError?: (error: any) => void;
}

export function TurnstileBlock({
  show = true, // ✅ Default là true
  onVerify,
  onLoad,
  onExpire,
  onError,
}: TurnstileBlockProps) {
  const { theme } = useTheme();
  const locale = useCurrentLocale();
  const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;

  if (!siteKey || !show) return null; // ✅ Ẩn khi show = false

  return (
    <div className="mt-4 flex items-center justify-center">
      <CloudflareTurnstileWidget
        sitekey={siteKey}
        theme={theme !== 'system' ? (theme as 'light' | 'dark') : 'auto'}
        language={locale}
        refreshExpired="auto"
        retry="auto"
        retryInterval={2000}
        onVerify={onVerify}
        onLoad={onLoad}
        onExpire={onExpire}
        onError={onError}
      />
    </div>
  );
}
