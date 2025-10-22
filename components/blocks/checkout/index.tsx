import { createQrCode } from '#/lib/service/create-qrcode';
import { fetchBookingByBookingId } from '#/lib/service/fetch-booking-by-id';
import { BookingRequestProps } from '#/services/booking/booking-request';
import { QrCodeRequestProps } from '#/services/QrCode/qr-code-request';
import { CheckoutBlockRender } from './render';

interface CheckoutBlockProps {
  bookingId: string;
  checkoutData: BookingRequestProps;
}

const CheckoutBlock = async ({
  bookingId,
  checkoutData,
}: CheckoutBlockProps) => {
  let resQrCode: { error: boolean; data?: QrCodeRequestProps } | null = null;

  if (checkoutData.paymentStatus !== 'COMPLETED') {
    resQrCode = await createQrCode({ bookingId });
  }

  return (
    <CheckoutBlockRender
      {...checkoutData}
      qrCode={resQrCode?.data ?? undefined}
    />
  );
};

export { CheckoutBlock };
