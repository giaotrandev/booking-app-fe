import { createQrCode } from '#/lib/service/create-qrcode';
import { fetchBookingByBookingId } from '#/lib/service/fetch-booking-by-id';
import { CheckoutBlockRender } from './render';
import { notFound } from 'next/navigation'; // 👈 cần import hàm này

interface CheckoutBlockProps {
  bookingId: string;
}

const CheckoutBlock = async ({ bookingId }: CheckoutBlockProps) => {
  const res = await fetchBookingByBookingId(bookingId);
  const resQrCode = await createQrCode({ bookingId });
  if (!res || res.error || !res.data) {
    return notFound();
  }
  return <CheckoutBlockRender {...res.data} qrCode={resQrCode.data} />;
};

export { CheckoutBlock };
