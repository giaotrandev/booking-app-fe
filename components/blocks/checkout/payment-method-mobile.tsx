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
import { useState } from 'react';

import {
  PaymentMethodList,
  PaymentMethodListProps,
} from './payment-method-list';
import { useTranslate } from '#/i18n/client';
import { Button } from '#/components/ui/button';
import { Icon } from '#/components/icons';

interface PaymentMethodMobileProps extends PaymentMethodListProps {}

const PaymentMethodMobile = ({
  options,
  onChange,
}: PaymentMethodMobileProps) => {
  const [sidenavOpen, setSidenavOpen] = useState<boolean>(false);
  const onOpenChange = (open: boolean) => {
    setSidenavOpen(open);
  };
  const { translate } = useTranslate();
  return (
    <Sheet open={sidenavOpen} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        {/* <button type="button" className="inline-flex cursor-pointer">
          <span className="sr-only">
            {translate({
              vi: 'Sidenav öffnen',
              en: 'Open sidenav',
            })}
          </span>
        </button> */}
        <Button type="button" variant="big" text="Select payment methods" />
      </SheetTrigger>
      <SheetContent
        side="bottom"
        // onInteractOutside={event => event.preventDefault()}
        className="pointer-events-none z-1095 flex h-137.5 w-full flex-col overflow-x-hidden bg-white outline-hidden data-[state=closed]:duration-300 data-[state=open]:duration-300"
        overlay={{ className: 'z-1094 bg-black/40' }}
      >
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="border-b-pj-grey-lightest flex w-full border-b p-3">
          <SheetClose className="bg-pj-white ml-auto cursor-pointer">
            <Icon className="h-7 w-7 stroke-black" name="x-mark" />
          </SheetClose>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="pointer-events-auto px-6 py-10">
            <PaymentMethodList options={options} />
          </div>
        </div>
        <SheetFooter></SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export { PaymentMethodMobile };
