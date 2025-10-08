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
import NavigationBooking, {
  NavigationBookingProps,
} from '#/layouts/home-layout/filter-trip/navigation-booking/item';
import { Container } from '#/components/ui/container';
import { Typography } from '#/components/ui/typography';
import { useChangeLocale, useCurrentLocale, useTranslate } from '#/i18n/client';
import { cn } from '#/lib/utilities/cn';
import { useGlobalsStore } from '#/store/globals';
import { Suspense, useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { i18n } from '#/i18n/config';
import { languages } from '#/lib/constant';

export interface LayoutFilterTripProps extends NavigationBookingProps {}
const LayoutFilterTrip = ({
  arrivalList,
  destinationList,
}: LayoutFilterTripProps) => {
  const { translate } = useTranslate();
  const currentLocale = useCurrentLocale();
  const { isChangingLocale, changeLocale } = useChangeLocale();
  const isDesktop = useMediaQuery('(min-width: 1023px)');
  const { sideFilterOpen, setFilterOpen } = useGlobalsStore();
  const onOpenChange = (open: boolean) => {
    setFilterOpen(open);
  };
  useEffect(() => {
    if (isDesktop && sideFilterOpen) {
      setFilterOpen(false);
    }
  }, [isDesktop, sideFilterOpen, setFilterOpen]);
  if (
    !(
      (Array.isArray(arrivalList) && arrivalList.length > 0) ||
      (Array.isArray(destinationList) && destinationList.length > 0)
    )
  ) {
    return null;
  }

  return (
    <Container>
      {/* Desktop */}
      <div
        className={cn(
          'pointer-events-none absolute top-0 left-0 z-[12] hidden h-screen w-full items-center justify-center lg:flex',
        )}
      >
        <Suspense>
          <NavigationBooking
            arrivalList={arrivalList}
            destinationList={destinationList}
          />
        </Suspense>
      </div>
      {/* Mobile */}
      <div className="fixed right-5 bottom-5 z-[1090] flex flex-col gap-y-2 lg:hidden">
        <div>
          {i18n.locales
            .filter(locale => locale !== currentLocale)
            .map((locale, key) => {
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    changeLocale({ locale });
                  }}
                  disabled={isChangingLocale}
                  className="bg-pj-red lg:hocus-visible:text-pj-red lg:ease-ev-easing inline-flex h-10 w-10 items-center justify-center rounded-[50%] text-center text-white disabled:cursor-not-allowed disabled:opacity-50 lg:cursor-pointer lg:transition-[color] lg:duration-300"
                >
                  <Typography
                    asChild
                    variant="button-label"
                    className="flex-none"
                  >
                    <span>{languages[locale]}</span>
                  </Typography>
                </button>
              );
            })}
        </div>
        <Sheet open={sideFilterOpen} onOpenChange={onOpenChange}>
          <SheetTrigger asChild>
            <button
              type="button"
              className="bg-pj-red inline-flex rotate-[180deg] cursor-pointer rounded-[24px] p-2 text-white [writing-mode:vertical-rl]"
            >
              <span className="sr-only">
                {translate({
                  vi: 'Sidenav öffnen',
                  en: 'Open sidenav',
                })}
              </span>
              <Typography asChild>
                <span>
                  {translate({
                    vi: 'Đặt vé',
                    en: 'Booking Trip',
                  })}
                </span>
              </Typography>
            </button>
          </SheetTrigger>
          <SheetContent
            // onInteractOutside={event => event.preventDefault()}
            onInteractOutside={event => {
              // event.preventDefault();
              setFilterOpen(false);
            }}
            // className="pointer-events-none inset-y-auto top-1/2 left-1/2 z-[1094] w-[calc(100%-40px)] -translate-x-1/2 -translate-y-1/2 overflow-x-hidden overflow-y-auto"
            className="inset-y-auto top-1/2 left-1/2 z-[1094] w-[calc(100%-40px)] -translate-x-1/2 -translate-y-1/2 overflow-x-hidden overflow-y-auto"
            overlay={{ className: 'z-1093 bg-black/30' }}
          >
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <SheetDescription></SheetDescription>
            </SheetHeader>
            <Suspense>
              <NavigationBooking
                arrivalList={arrivalList}
                destinationList={destinationList}
              />
            </Suspense>

            <SheetFooter></SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </Container>
  );
};

export { LayoutFilterTrip };
