import { Typography } from '#/components/ui/typography';
import { blurDataUrl } from '#/lib/constant';
import { cn } from '#/lib/utilities/cn';
import { formatPrice } from '#/lib/utilities/format-price';
import { formatTimeLeft } from '#/lib/utilities/format-time-left';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export interface ItemQrCodeProps {
  totalPrice: string;
  updatedAt: string;
  isHaveQrCode: boolean;
  qrCode?: string;
  className?: string;
}

const ItemQrCode = ({
  qrCode,
  totalPrice,
  updatedAt,
  isHaveQrCode,
  className,
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
    setTimeCount(remaining);
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
  }, [updatedAt]);
  return (
    <>
      <div
        className={cn(
          'border-pj-grey-light flex w-full flex-col items-center gap-y-2 rounded-xl border p-4',
          !isHaveQrCode && 'items-end border-0 p-0',
          className,
        )}
      >
        <div className="w-full text-center">
          <div className="flex flex-wrap items-center justify-center gap-x-2">
            <div className="mt-1.25">
              <Typography asChild variant="small-label">
                <p>Total price: </p>
              </Typography>
            </div>
            <Typography asChild variant="h3" className="text-pj-red font-bold">
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
            <div className="relative mx-auto w-full max-w-[500px] overflow-hidden pt-[100%]">
              <Image
                src={qrCode}
                className="w-full rounded-xl object-contain"
                fill
                blurDataURL={blurDataUrl}
                alt={`qrcode - ${qrCode}`}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Typography
                asChild
                className="text-pj-green-medium font-medium"
                variant="h5"
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
