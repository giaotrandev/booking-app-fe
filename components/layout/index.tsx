import { getCurrentLocale } from '#/i18n/server';
import { PropsWithChildren } from 'react';
import { LayoutFooter, LayoutFooterProps } from './footer/footer';
import { LayoutHeader, LayoutHeaderProps } from './header';
import { LayoutMain } from './main';

interface LayoutProps extends PropsWithChildren {}

const Layout = async ({ children }: LayoutProps) => {
  const currentLocale = await getCurrentLocale();
  // NOTE: Query Global Settings here to get the Header & the Footer
  //   const globalSettings = await queryGlobalSettings({
  //     params: { locale: currentLocale },
  //   });
  const header: LayoutHeaderProps = {};
  const footer: LayoutFooterProps = {};
  return (
    <>
      <LayoutHeader {...header} />
      <LayoutMain>{children}</LayoutMain>
      <LayoutFooter {...footer} />
    </>
  );
};

export { Layout };
