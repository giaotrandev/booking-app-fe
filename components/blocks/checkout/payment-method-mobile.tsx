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
import { useEffect, useState } from 'react';

import {
  PaymentMethodList,
  PaymentMethodListProps,
} from './payment-method-list';
import { useTranslate } from '#/i18n/client';
import { Button } from '#/components/ui/button';
import { Icon } from '#/components/icons';
import { Typography } from '#/components/ui/typography';
import { useMediaQuery } from 'usehooks-ts';
import { ItemQrCodeProps } from './item-qrcode';
import { PaymentQRCodeMobile } from './payment-qrcode-mobile';

interface PaymentMethodMobileProps
  extends PaymentMethodListProps,
    ItemQrCodeProps {
  selectedMethod: string;
}

const PaymentMethodMobile = ({
  options,
  onChange,
  selectedMethod,
  isHaveQrCode,
  totalPrice,
  updatedAt,
  qrCode,
}: PaymentMethodMobileProps) => {
  const [sidenavOpen, setSidenavOpen] = useState<boolean>(false);
  const [showQRCode, setShowQRCode] = useState<boolean>(false);
  const { translate } = useTranslate();
  const matches = useMediaQuery('(min-width: 1024px)');

  const onOpenChange = (open: boolean) => {
    setSidenavOpen(open);
  };

  const handleMethodChange = (value: string) => {
    onChange?.(value);

    // Nếu đã chọn method thì hiển thị QR code
    if (value) {
      setSidenavOpen(false);
      setTimeout(() => {
        setShowQRCode(true); // Mở modal sau khi Sheet đã đóng
      }, 300);
    }
  };

  const handleBackToMethods = () => {
    setShowQRCode(false);
  };

  useEffect(() => {
    if (matches && sidenavOpen) {
      setSidenavOpen(false);
    }
    if (matches && showQRCode) {
      setShowQRCode(false);
    }
  }, [matches, sidenavOpen, showQRCode, setShowQRCode, setSidenavOpen]);

  return (
    <>
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
          <div className="border-b-pj-grey-lightest relative flex w-full border-b px-4 py-3">
            <Typography asChild className="mx-auto font-medium" variant="title">
              <p>Select payment method</p>
            </Typography>
            <SheetClose className="bg-pj-white absolute top-3 right-4 cursor-pointer">
              <Icon className="h-8 w-8 stroke-black" name="x-mark" />
            </SheetClose>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="pointer-events-auto px-4 py-10">
              {/* <PaymentMethodList options={options} onChange={onChange} /> */}

              <PaymentMethodList
                options={options}
                onChange={handleMethodChange}
              />
            </div>
          </div>
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
      {showQRCode && (
        <PaymentQRCodeMobile
          isOpenModal={showQRCode}
          onClose={() => setShowQRCode(false)}
          isHaveQrCode={isHaveQrCode}
          totalPrice={totalPrice}
          updatedAt={updatedAt}
          qrCode={qrCode}
        />
      )}
    </>
  );
};

export { PaymentMethodMobile };
