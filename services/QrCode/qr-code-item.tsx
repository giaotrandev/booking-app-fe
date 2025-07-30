import { QrCodeRequestProps } from './qr-code-request';
import { QrCodeResponseProps } from './qr-code-response';

export const convertQRCode = async (
  qrCode: QrCodeResponseProps,
): Promise<QrCodeRequestProps> => {
  return {
    bookingId: qrCode.bookingId ?? '',
    qrCode: qrCode.qrCode ?? '',
    qrCodeExpriresAt: qrCode.qrCodeExpriresAt,
  };
};
