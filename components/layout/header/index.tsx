// import { LanguageSwitcher } from '#/components/ui/language-switcher';
import { ThemeSwitcher } from '#/components/ui/theme-switcher';
import { LayoutHeaderSidenav, LayoutHeaderSidenavProps } from './sidenav';

export interface LayoutHeaderProps {
  sidenav?: LayoutHeaderSidenavProps;
}

const LayoutHeader = ({ sidenav }: LayoutHeaderProps) => {
  return (
    <header id="site-header">
      Header
      <LayoutHeaderSidenav {...sidenav} />
      {/* <LanguageSwitcher /> */}
      <ThemeSwitcher />
    </header>
  );
};

export { LayoutHeader };
