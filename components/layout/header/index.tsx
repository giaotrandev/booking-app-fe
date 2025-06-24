// import { LanguageSwitcher } from '#/components/ui/language-switcher';
'use client';
import { ThemeSwitcher } from '#/components/ui/theme-switcher';
import Image from 'next/image';
import { LayoutHeaderSidenav, LayoutHeaderSidenavProps } from './sidenav';
import { Link } from '#/i18n/routing';
import { LayoutHeaderMenu } from './menu';
import { LinkProps } from '#/types/global';
import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';
import { StretchedLink } from '#/components/common/stretched-link';
import React, { useEffect, useState } from 'react';
import { useGlobalsStore } from '#/store/globals';
import { useUserStore } from '#/store/user';
import { useRouter } from 'next/navigation';
import { useToast } from '#/components/ui/use-toast';
import { verifyTokenAction } from '#/components/auth-layout/actions/verify-token';

export interface LayoutHeaderProps {
  sidenav?: LayoutHeaderSidenavProps;
}

const LayoutHeader = ({ sidenav }: LayoutHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { sidenavOpen } = useGlobalsStore();
  const { isLoggedIn, clearAuth } = useUserStore();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      if (!res.ok) {
        toast({
          title: 'Logout failed',
          description: data.message || 'Unable to logout.',
          variant: 'error',
        });
        return;
      }

      clearAuth();

      toast({
        title: 'Logged out',
        description: data.message || 'You have been successfully logged out.',
        variant: 'success',
      });

      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        title: 'Logout failed',
        description: 'Something went wrong.',
        variant: 'error',
      });
    }
  };
  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };
  useEffect(() => {
    const checkToken = async () => {
      const result = await verifyTokenAction();
      if (!result.valid) {
        clearAuth();
      }
    };
    checkToken();

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
          'pointer-events-auto fixed top-0 left-0 z-1090 flex h-16 w-full items-center justify-center py-3 transition-[background-color] lg:h-23.75 lg:py-5',
          sidenavOpen && 'bg-white',
        )}
      >
        <div
          className={cn(
            'absolute inset-0 -z-10 -translate-y-1.5 bg-[#fff3] opacity-0 backdrop-blur-md transition-opacity duration-500 lg:-translate-y-3',
            isScrolled && 'opacity-100',
            sidenavOpen && 'opacity-0',
          )}
        ></div>
        <div className="flex w-full justify-between px-4 lg:pr-18.5 lg:pl-14">
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
            <LayoutHeaderMenu list={menu.slice(0, -2)} />
          </div>
          <div className="hidden lg:inline-block">
            <ul className="flex w-auto shrink-0 grow-0 basis-auto space-x-2">
              {isLoggedIn ? (
                <li className="relative block">
                  <Typography
                    variant="label"
                    className={cn(
                      'hocus:text-pj-blue hocus:transition-[color] before:bg-pj-blue hocus:before:scale-100 hocus:before:origin-left cursor-pointer before:absolute before:bottom-0 before:h-px before:w-full before:origin-right before:scale-x-0 before:transition-transform before:content-[""]',
                    )}
                    onClick={handleLogout}
                  >
                    Logout
                  </Typography>
                </li>
              ) : (
                menu.slice(-2).map((item, key) => (
                  <React.Fragment key={key}>
                    <li className="relative block">
                      <Typography
                        variant="label"
                        className={cn(
                          "hocus:text-pj-blue hocus:transition-[color] before:bg-pj-blue hocus:before:scale-100 hocus:before:origin-left before:absolute before:bottom-0 before:h-px before:w-full before:origin-right before:scale-x-0 before:transition-transform before:content-['']",
                        )}
                        asChild
                      >
                        <StretchedLink link={item}>{item.text}</StretchedLink>
                      </Typography>
                    </li>
                    {key === 0 && (
                      <li>
                        <span>|</span>
                      </li>
                    )}
                  </React.Fragment>
                ))
              )}
            </ul>
          </div>
          <div className="lg:hidden">
            <LayoutHeaderSidenav {...sidenav} list={menu.slice(0, -2)} />
          </div>
        </div>
        {/* <LanguageSwi  tcher /> */}
        {/* <ThemeSwitcher /> */}
      </header>
      <div className="h-16 lg:h-23.75" />
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
    url: '/my-booking',
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
