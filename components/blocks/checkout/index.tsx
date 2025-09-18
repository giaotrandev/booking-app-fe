import { createQrCode } from '#/lib/service/create-qrcode';
import { fetchBookingByBookingId } from '#/lib/service/fetch-booking-by-id';
import { BookingRequestProps } from '#/services/booking/booking-request';
import { CheckoutBlockRender } from './render';
import { notFound } from 'next/navigation'; // 👈 cần import hàm này

interface CheckoutBlockProps {
  bookingId: string;
  checkoutData: BookingRequestProps;
}

const CheckoutBlock = async ({
  bookingId,
  checkoutData,
}: CheckoutBlockProps) => {
  const resQrCode = await createQrCode({ bookingId });

  return <CheckoutBlockRender {...checkoutData} qrCode={resQrCode.data} />;
};

export { CheckoutBlock };
