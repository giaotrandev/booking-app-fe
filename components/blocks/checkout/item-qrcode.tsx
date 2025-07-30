import { Typography } from '#/components/ui/typography';
import { blurDataUrl } from '#/lib/constant';
import { cn } from '#/lib/utilities/cn';
import { formatPrice } from '#/lib/utilities/format-price';
import { formatTimeLeft } from '#/lib/utilities/format-time-left';
import { QrCodeRequestProps } from '#/services/QrCode/qr-code-request';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ItemQrCodeProps {
  totalPrice: string;
  updatedAt: string;
  isHaveQrCode: boolean;
  qrCode?: string;
}

const ItemQrCode = ({
  qrCode,
  totalPrice,
  updatedAt,
  isHaveQrCode,
}: ItemQrCodeProps) => {
  const [timeCount, setTimeCount] = useState<number | null>(null);
  const router = useRouter();
  const steps = [
    'Open the MoMo app on your phone.',
    'Use the icon_scan icon to scan the QR code.',
    'Scan the code on this page and proceed with the payment.',
  ];
  useEffect(() => {
    if (!isHaveQrCode) return;
    const updatedTime = new Date(updatedAt).getTime();
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - updatedTime) / 1000);
    const remaining = 7200 - elapsedSeconds;

    if (remaining <= 0) {
      router.push('/');
    } else {
      setTimeCount(remaining);
    }
  }, [updatedAt, router]);
  useEffect(() => {
    if (!isHaveQrCode) return;
    if (timeCount === null) return;
    if (timeCount <= 0) {
      router.push('/');
      return;
    }

    const timer = setInterval(() => {
      setTimeCount(prev => {
        if (prev !== null && prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return (prev ?? 1) - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeCount, router]);
  return (
    <>
      <div
        className={cn(
          'border-pj-grey-light flex flex-col items-center gap-y-2 rounded-xl border p-2',
          !isHaveQrCode && 'items-end border-0 p-0',
        )}
      >
        <div className="text-center">
          <div className="flex items-center justify-center gap-x-2">
            <div className="mt-1.25">
              <Typography asChild variant="small-label" className="font-sans">
                <p>Total price: </p>
              </Typography>
            </div>
            <Typography
              asChild
              variant="h3"
              className="text-pj-red font-sans font-bold"
            >
              <p>{formatPrice(totalPrice)}</p>
            </Typography>
          </div>
          {timeCount !== null && isHaveQrCode && (
            <Typography asChild className="text-pj-orange -mt-1">
              <p>Time left to hold the seat: {formatTimeLeft(timeCount)}</p>
            </Typography>
          )}
        </div>
        {isHaveQrCode && qrCode && (
          <div className="w-full">
            <div className="relative w-full overflow-hidden pt-[100%]">
              <Image
                src={qrCode}
                className="w-full rounded-xl"
                fill
                blurDataURL={blurDataUrl}
                alt={`qrcode - ${qrCode}`}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Typography
                asChild
                className="text-pj-green font-sans font-medium"
                variant="label"
              >
                <p>How to Pay: </p>
              </Typography>
              {steps.map((text, index) => (
                <div key={index} className="flex items-center gap-x-2">
                  <div className="flex min-h-6 min-w-6 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-black">
                    {index + 1}
                  </div>
                  <Typography asChild>
                    <p>{text}</p>
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export { ItemQrCode };
