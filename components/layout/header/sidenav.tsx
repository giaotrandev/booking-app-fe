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
// import { useTranslate } from '#/i18n/client';
import { useGlobalsStore } from '#/store/globals';

export interface LayoutHeaderSidenavProps {}

const LayoutHeaderSidenav = ({}: LayoutHeaderSidenavProps) => {
  // const { translate } = useTranslate();
  const { sidenavOpen, setSidenavOpen } = useGlobalsStore();
  const onOpenChange = (open: boolean) => {
    setSidenavOpen(open);
  };
  return (
    <Sheet open={sidenavOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button type="button">
          <span>Hamburger</span>
          <span className="sr-only">
            {/* {translate({
              de: 'Sidenav öffnen',
              en: 'Open sidenav',
            })} */}
          </span>
        </button>
      </SheetTrigger>
      <SheetContent className="h-full w-full max-w-xs overflow-x-hidden overflow-y-auto">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
          <SheetClose asChild>
            <button type="button">
              {/* <span>
                {translate({
                  de: 'Schließen',
                  en: 'Close',
                })}
              </span>
              <span className="sr-only">
                {translate({
                  de: 'Schließen',
                  en: 'Close',
                })}
              </span> */}
            </button>
          </SheetClose>
        </SheetHeader>
        <div></div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export { LayoutHeaderSidenav };
