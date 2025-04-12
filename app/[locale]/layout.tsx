import { typographyVariants } from '#/components/ui/typography';
import { i18n } from '#/i18n/config';
import { getStaticParams, setStaticParamsLocale } from '#/i18n/server';
import { fontSans } from '#/lib/font';
import { cn } from '#/lib/utilities/cn';
import { Providers } from '#/providers';
import { PageProps } from '#/types/global';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { PropsWithChildren } from 'react';

interface LocaleLayoutProps extends PageProps, PropsWithChildren {}

export const generateStaticParams = () => {
  return getStaticParams();
};

const LocaleLayout = async ({ params, children }: LocaleLayoutProps) => {
  const { locale } = await params;
  if (!locale || !i18n.locales.includes(locale)) {
    notFound();
  }
  setStaticParamsLocale(locale);
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={cn(
          fontSans.variable,
          'font-sans antialiased',
          'bg-white text-black',
          'dark:bg-black dark:text-white',
          typographyVariants({ variant: 'body' }),
        )}
      >
        {process.env.COOKIE_SCRIPT_URL && (
          <Script
            suppressHydrationWarning
            src={process.env.COOKIE_SCRIPT_URL}
            strategy="beforeInteractive"
          />
        )}
        <NextIntlClientProvider messages={messages}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
