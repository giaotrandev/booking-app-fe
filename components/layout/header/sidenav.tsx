'use client';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '#/components/headless/sheet';
import { Hamburger } from '#/components/icons/hamburger';
import { useTranslate } from '#/i18n/client';
// import { useTranslate } from '#/i18n/client';
import { useGlobalsStore } from '#/store/globals';
import { useMediaQuery } from 'usehooks-ts';
import { LayoutHeaderMenu, LayoutHeaderMenuProps } from './menu';
import { useEffect } from 'react';

export interface LayoutHeaderSidenavProps {
  list?: LayoutHeaderMenuProps['list'];
}

const LayoutHeaderSidenav = ({ list }: LayoutHeaderSidenavProps) => {
  const { translate } = useTranslate();
  const { sidenavOpen, setSidenavOpen } = useGlobalsStore();
  const onOpenChange = (open: boolean) => {
    setSidenavOpen(open);
  };
  const matches = useMediaQuery('(min-width: 1024px)');
  useEffect(() => {
    if (matches && sidenavOpen) {
      setSidenavOpen(false);
    }
  }, [matches, sidenavOpen, setSidenavOpen]);
  return (
    <Sheet open={sidenavOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button type="button" className="inline-flex cursor-pointer">
          <span className="sr-only">
            {translate({
              vi: 'Sidenav öffnen',
              en: 'Open sidenav',
            })}
          </span>
          <Hamburger />
        </button>
      </SheetTrigger>
      <SheetContent
        onInteractOutside={event => event.preventDefault()}
        className="pointer-events-none z-1091 h-full w-full overflow-x-hidden overflow-y-auto outline-hidden data-[state=closed]:duration-300 data-[state=open]:duration-300"
        overlay={{ className: 'z-1040' }}
      >
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="h-16 lg:h-23.75" />

        <div className="pointer-events-auto h-[calc(100%-64px)] bg-white py-15">
          <LayoutHeaderMenu list={list} />
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export { LayoutHeaderSidenav };
