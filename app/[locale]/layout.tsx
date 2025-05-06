import { typographyVariants } from '#/components/ui/typography';
import { i18n } from '#/i18n/config';
import {
  fontArchivoBlack,
  fontArmata,
  fontMontserrat,
  fontRoboto,
  fontSans,
} from '#/lib/font';
import { cn } from '#/lib/utilities/cn';
import { Providers } from '#/providers';
import { PageProps } from '#/types/global';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { PropsWithChildren } from 'react';
import { getStaticParams, setStaticParamsLocale } from '#/i18n/server';
import { NextIntlClientProvider } from 'next-intl';

interface LocaleLayoutProps
  extends Pick<PageProps, 'params'>,
    PropsWithChildren {}

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
      <body
        suppressHydrationWarning
        className={cn(
          fontSans.variable,
          fontArmata.variable,
          fontArchivoBlack.variable,
          fontMontserrat.variable,
          fontRoboto.variable,
          'font-sans antialiased',
          'text-ts-grey-darkest bg-white',
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
          <Providers>{props.children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export default LocaleLayout;
