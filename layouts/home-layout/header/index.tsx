// import { LanguageSwitcher } from '#/components/ui/language-switcher';
'use client';
import { ThemeSwitcher } from '#/components/ui/theme-switcher';
import Image from 'next/image';
import { LayoutHeaderSidenav, LayoutHeaderSidenavProps } from './sidenav';
import { Link } from '#/i18n/routing';
import { LayoutHeaderMenu } from './menu';
import { LinkProps } from '#/types/global';
import { cn } from '#/lib/utilities/cn';
import React, { useEffect, useState } from 'react';
import { useGlobalsStore } from '#/store/globals';
import { useUserStore } from '#/store/user';
import { Button } from '#/components/ui/button';
import { UserMenu } from './user-menu';
import { InformationProfileRequestProps } from '#/services/user/information-profile-request';

export interface LayoutHeaderProps {
  sidenav?: LayoutHeaderSidenavProps;
  userInformation?: InformationProfileRequestProps;
}

const LayoutHeader = ({ sidenav, userInformation }: LayoutHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { sidenavOpen, sideFilterOpen } = useGlobalsStore();
  const { isLoggedIn, clearAuth } = useUserStore();
  const filteredMenu = isLoggedIn
    ? menu
    : menu.filter(item => item.url !== '/my-account/my-booking');
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <header
        id="site-header"
        className={cn(
          'pointer-events-auto fixed top-0 left-0 z-1093 flex h-16 w-full items-center justify-center py-3 transition-[background-color] lg:h-23.75 lg:py-5',
          sidenavOpen && 'bg-white',
          sideFilterOpen && 'bg-transparent',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 -z-10 h-16 bg-[#fff3] opacity-100 backdrop-blur-xs transition-opacity duration-500 lg:h-23.75',
            isScrolled && 'bg-white',
            (sidenavOpen || sideFilterOpen) && 'opacity-0',
            // sidenavOpen && 'opacity-0',
          )}
        />
        <div className="flex w-full items-center justify-between px-5 lg:px-30">
          <div>
            <Link href="/">
              <Image
                height={100}
                width={180}
                src="/images/logo.png"
                alt="logo"
              />
            </Link>
          </div>
          <div className="hidden lg:flex">
            <LayoutHeaderMenu list={filteredMenu.slice(0, -2)} />
          </div>
          <div className="hidden lg:inline-block">
            <ul className="flex w-auto shrink-0 grow-0 basis-auto space-x-2">
              {isLoggedIn ? (
                <li className="relative block">
                  <UserMenu />
                </li>
              ) : (
                menu.slice(-2).map((item, key) => {
                  const isSecondLast = key === 1;
                  return (
                    <li
                      key={key}
                      className="relative block"
                      id={key.toString()}
                    >
                      <Button
                        text={item.text}
                        asChild
                        variant={isSecondLast ? 'outline' : 'default'}
                        colors={isSecondLast ? 'none' : 'red'}
                      >
                        <Link href="/login" />
                      </Button>
                    </li>
                  );
                })
              )}
            </ul>
          </div>
          <div className="flex items-center lg:hidden">
            {/* <UserMenu /> */}
            <LayoutHeaderSidenav {...sidenav} list={menu.slice(0, -2)} />
          </div>
        </div>
        {/* <LanguageSwitcher /> */}
        {/* <ThemeSwitcher /> */}
      </header>
      {/* <div className="h-16 lg:h-23.75" /> */}
    </>
  );
};

export { LayoutHeader };
const menu: LinkProps[] = [
  {
    text: 'Home',
    url: '/',
  },
  {
    text: 'Promotion',
    url: '/promotion',
  },
  {
    text: 'My Booking',
    url: '/my-account/my-booking',
  },
  {
    text: 'About us',
    url: '/about-us',
  },
  {
    text: 'Sign in',
    url: '/login',
  },
  {
    text: 'Register',
    url: '/register',
  },
];
