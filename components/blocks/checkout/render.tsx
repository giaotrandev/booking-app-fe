'use client';
import { Col } from '#/components/ui/col';
import { Container } from '#/components/ui/container';
import { Row } from '#/components/ui/row';
import { Typography } from '#/components/ui/typography';
import { formatPrice } from '#/lib/utilities/format-price';
import { formatUtcDate, formatUtcTime } from '#/lib/utilities/format-time';
import { BookingRequestProps } from '#/services/booking/booking-request';
import { useEffect, useState } from 'react';
import { InfoList } from './info-list';
import { OptionsPaymentProps, PaymentMethodList } from './payment-method-list';
import { QrCodeRequestProps } from '#/services/QrCode/qr-code-request';
import { ItemQrCode } from './item-qrcode';
import { useSocketContext } from '#/providers/socket-provider';
import { Notification } from '#/components/ui/notification';
import { Icon } from '#/components/icons';
import { cn } from '#/lib/utilities/cn';
import { getUnCheckedQrCodeAction } from '#/lib/service/fetch-unchecked-qrcode';
import { PaymentMethodMobile } from './payment-method-mobile';
import { PaymentRouteItem } from './payment-route-item';
import { PaymentPending } from './payment-pending';
import { PaymentTicket } from './payment-ticket';
import {
  SeatType,
  UncheckedQrCodeItemRequestProps,
} from '#/services/QrCode/details/unchecked-qrcode-request';

interface CheckoutBlockRenderProps extends BookingRequestProps {
  qrCode?: QrCodeRequestProps;
}
const paymentList: OptionsPaymentProps[] = [
  {
    label: 'Vietqr',
    value: 'vietqr',
    image: {
      alt: 'Vietqr-payment-logo',
      src: '/images/vietqr.webp',
    },
  },
  {
    label: 'Momo',
    value: 'momo',
    image: {
      alt: 'Momo-payment-logo',
      src: '/images/vietqr.webp',
    },
  },
];
const CheckoutBlockRender = ({
  arrivalTime,
  departureTime,
  id,
  passengerEmail,
  passengerName,
  passengerPhone,
  seats,
  totalPrice,
  dropingPoint,
  finalPrice,
  passengerNote,
  paymentStatus,
  pickupPoint,
  status,
  userId,
  vehicle,
  route,
  tripId,
  qrCode,
  updatedAt,
}: CheckoutBlockRenderProps) => {
  const [isHaveQrCode, setIsHaveQrCode] = useState<boolean>(
    () => paymentStatus !== 'COMPLETED',
  );
  const [showNotification, setShowNotification] = useState(false);
  const [qrCodeInfoList, setQrCodeInfoList] = useState<
    UncheckedQrCodeItemRequestProps[]
  >([]);
  const [showInfoTickets, setShowInfoTickets] = useState<boolean>(false);
  const { socket } = useSocketContext();

  useEffect(() => {
    if (!socket) return;
    socket.emit(
      'joinBookingRoom',
      id,
      (response: { success: boolean; error?: string }) => {
        if (response.success) {
          socket.on('bookingStatusChanged', (data: { status: string }) => {
            if (data.status === 'CONFIRMED') {
              setIsHaveQrCode(false);
              setShowNotification(true);
              setShowInfoTickets(true);
              // socket.emit('leaveBookingRoom', id);
            }
          });
        }
      },
    );
    return () => {
      socket.off('bookingStatusChanged');
      socket.emit('leaveBookingRoom', id);
    };
  }, [socket, id]);
  useEffect(() => {
    if (!showInfoTickets) return;
    const getQrCode = async () => {
      try {
        const response = await getUnCheckedQrCodeAction(id);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setQrCodeInfoList(response.data);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to fetch QR Code:', error);
      }
    };
    getQrCode();
  }, [showInfoTickets]);
  useEffect(() => {
    if (paymentStatus === 'COMPLETED') {
      setIsHaveQrCode(false);
      setShowInfoTickets(true);
    }
  }, [paymentStatus]);
  useEffect(() => {
    if (qrCodeInfoList.length > 0) {
      localStorage.setItem(`qr-${id}`, JSON.stringify(qrCodeInfoList));
    }
  }, [qrCodeInfoList, id]);

  useEffect(() => {
    const cached = localStorage.getItem(`qr-${id}`);
    if (cached) {
      setQrCodeInfoList(JSON.parse(cached));
      setIsHaveQrCode(false);
      setShowInfoTickets(true);
    }
  }, [id]);
  return (
    <div
      className={cn(
        isHaveQrCode ? 'bg-white py-0' : 'bg-pj-grey-lightest py-10',
      )}
    >
      <Container>
        {isHaveQrCode ? (
          <PaymentPending
            {...{
              arrivalTime,
              departureTime,
              passengerEmail,
              passengerName,
              passengerPhone,
              passengerNote,
              seats,
              totalPrice,
              pickupPoint,
              dropingPoint,
              vehicle,
              route,
              qrCode: qrCode?.qrCode,
              updatedAt,
              isHaveQrCode,
              paymentList,
              id,
              tripId,
              finalPrice,
              userId,
              paymentStatus,
              status,
            }}
          />
        ) : (
          <div className="mx-auto w-full lg:max-w-250">
            <PaymentTicket
              {...{
                arrivalTime,
                departureTime,
                passengerEmail,
                passengerName,
                passengerPhone,
                passengerNote,
                totalPrice,
                pickupPoint,
                dropingPoint,
                vehicle,
                route,
                qrCode: qrCode?.qrCode,
                updatedAt,
                isHaveQrCode,
                id,
                tripId,
                finalPrice,
                userId,
                paymentStatus,
                status,
                seats: qrCodeInfoList,
              }}
            />
          </div>
        )}
      </Container>
      {showNotification && (
        <Notification
          clickOutsideToClose
          open={showNotification}
          onClose={() => setShowNotification(false)}
          children={
            <div className="relative flex w-full max-w-140 flex-col items-center justify-center gap-y-4 rounded-xl bg-white px-4 py-10 shadow-lg">
              <button
                onClick={() => setShowNotification(false)}
                className="group/button bg-pj-white absolute top-2 right-2 cursor-pointer rounded-full transition-colors duration-200 ease-in-out hover:bg-black focus-visible:bg-black"
              >
                <Icon
                  className="h-5 w-5 stroke-black transition-colors duration-200 ease-in-out group-hover/button:stroke-white group-focus-visible/button:stroke-white lg:h-6 lg:w-6"
                  name="x-mark"
                />
              </button>
              <Typography
                asChild
                variant="h3"
                className="text-pj-green text-center font-semibold"
              >
                <p>🎉 The ticket has been booked successfully</p>
              </Typography>
              <div>
                <Typography
                  asChild
                  variant="small-label"
                  className="text-pj-grey-light text-center"
                >
                  <p>Thank you for using our service</p>
                </Typography>
                <Typography
                  asChild
                  variant="small-label"
                  className="text-pj-grey-light text-center"
                >
                  <p>Please close this window to view your ticket details</p>
                </Typography>
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};

export { CheckoutBlockRender };
const sample: UncheckedQrCodeItemRequestProps[] = [
  {
    bookingId: '687d0f82f195429cc83d1806',
    passengerName: 'Trần Ngọc Giao',
    passengerEmail: 'h************hi@****',
    passengerPhone: '09******75',
    qrCodeImage:
      'https://pub-459bf266ac1b494db84a566366b2a2e6.r2.dev/temp/qr-6a8253e0f052373bd5a1e821f1f55883-optimized-f3faeec5.png',
    seat: {
      seatNumber: 'A1',
      seatType: SeatType.STANDARD,
    },
  },
  {
    bookingId: '687d0f82f195429cc83d1806',
    passengerName: 'Trần Ngọc Giao',
    passengerEmail: 'h************hi@****',
    passengerPhone: '09******75',
    qrCodeImage:
      'https://pub-459bf266ac1b494db84a566366b2a2e6.r2.dev/temp/qr-6a8253e0f052373bd5a1e821f1f55883-optimized-f3faeec5.png',
    seat: {
      seatNumber: 'A2',
      seatType: SeatType.STANDARD,
    },
  },
];
