import { typographyVariants } from '#/components/ui/typography';
import { fontGabriela, fontStrada } from '#/lib/font';
import { cn } from '#/lib/utilities/cn';
import { Providers } from '#/providers';
import { PageProps } from '#/types/global';
import { getMessages } from 'next-intl/server';
import { i18n } from '#/i18n/config';
import { notFound } from 'next/navigation';
import { BotIdClient } from 'botid/client';

import { PropsWithChildren } from 'react';
import { getStaticParams, setStaticParamsLocale } from '#/i18n/server';
import { NextIntlClientProvider } from 'next-intl';
import '#/styles/globals.css';
interface LocaleLayoutProps
  extends Pick<PageProps, 'params'>,
    PropsWithChildren {}
export const metadata = {
  title: 'Vietnam Road Trip',
  description: 'Đặt vé xe liên tỉnh dễ dàng và nhanh chóng',
};

export const generateStaticParams = () => {
  return getStaticParams();
};

const LocaleLayout = async (props: LocaleLayoutProps) => {
  const { locale } = await props.params;
  if (!locale || !i18n.locales.includes(locale)) {
    notFound();
  }
  setStaticParamsLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning className="scroll-smooth">
      <head>
        <BotIdClient
          protect={[
            {
              path: '/*',
              method: 'POST',
            },
          ]}
        />
      </head>
      <body
        suppressHydrationWarning
        className={cn(
          fontStrada.variable,
          fontGabriela.variable,
          'font-strada bg-pj-gray-medium relative antialiased',
          'bg-white text-black',
          typographyVariants({ variant: 'body' }),
        )}
      >
        {/* {process.env.COOKIE_SCRIPT_URL && (
          <Script
            suppressHydrationWarning
            src={process.env.COOKIE_SCRIPT_URL}
            strategy="beforeInteractive"
          />
        )} */}
        <NextIntlClientProvider messages={messages}>
          <Providers>{props.children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
