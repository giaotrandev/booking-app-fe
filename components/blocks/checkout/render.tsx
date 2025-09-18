// Thêm loading state và tối ưu việc render
'use client';
import { Col } from '#/components/ui/col';
import { Container } from '#/components/ui/container';
import { Row } from '#/components/ui/row';
import { Typography } from '#/components/ui/typography';
import { formatPrice } from '#/lib/utilities/format-price';
import { formatUtcDate, formatUtcTime } from '#/lib/utilities/format-time';
import { BookingRequestProps } from '#/services/booking/booking-request';
import { useEffect, useState, useMemo } from 'react';
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
import Loading from '#/components/common/loading';
import { LoadingPage } from '#/components/common/loading-page';

interface CheckoutBlockRenderProps extends BookingRequestProps {
  qrCode?: QrCodeRequestProps;
}

// Tạo loading state để kiểm soát việc render
interface ComponentState {
  isHaveQrCode: boolean;
  showNotification: boolean;
  qrCodeInfoList: UncheckedQrCodeItemRequestProps[];
  showInfoTickets: boolean;
  isDataReady: boolean; // Thêm state này để kiểm soát việc render
  isInitialized: boolean; // Kiểm tra đã khởi tạo xong chưa
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
  // Sử dụng một state object để giảm số lần re-render
  const [state, setState] = useState<ComponentState>({
    isHaveQrCode: paymentStatus !== 'COMPLETED',
    showNotification: false,
    qrCodeInfoList: [],
    showInfoTickets: false,
    isDataReady: false,
    isInitialized: false,
  });

  const { socket } = useSocketContext();

  // Memoize để tránh re-render không cần thiết
  const isTicketComplete = useMemo(() => {
    return paymentStatus === 'COMPLETED' && state.isDataReady;
  }, [paymentStatus, state.isDataReady]);

  // Khởi tạo dữ liệu từ localStorage trước khi component render lần đầu
  useEffect(() => {
    const initializeData = async () => {
      try {
        // Kiểm tra cache trước
        const cached = localStorage.getItem(`qr-${id}`);
        let initialQrCodeList: UncheckedQrCodeItemRequestProps[] = [];
        let shouldShowTickets = false;
        let dataReady = false;

        if (cached) {
          initialQrCodeList = JSON.parse(cached);
          shouldShowTickets = true;
          dataReady = true;
        } else if (paymentStatus === 'COMPLETED') {
          // Nếu payment completed nhưng chưa có cache, fetch data
          try {
            const response = await getUnCheckedQrCodeAction(id);
            if (Array.isArray(response.data) && response.data.length > 0) {
              initialQrCodeList = response.data;
              shouldShowTickets = true;
              dataReady = true;
              // Lưu vào cache
              localStorage.setItem(`qr-${id}`, JSON.stringify(response.data));
            }
          } catch (error) {
            // console.error('Failed to fetch QR Code:', error);
            dataReady = true; // Vẫn set ready để tránh loading vô tận
          }
        } else {
          dataReady = true; // Nếu chưa complete thì cũng ready
        }

        // Update state một lần duy nhất
        setState(prev => ({
          ...prev,
          isHaveQrCode: paymentStatus !== 'COMPLETED',
          qrCodeInfoList: initialQrCodeList,
          showInfoTickets: shouldShowTickets,
          isDataReady: dataReady,
          isInitialized: true,
        }));
      } catch (error) {
        console.error('Initialization error:', error);
        setState(prev => ({
          ...prev,
          isDataReady: true,
          isInitialized: true,
        }));
      }
    };

    initializeData();
  }, [id, paymentStatus]);

  // Socket effect
  useEffect(() => {
    if (!socket || !state.isInitialized) return;

    socket.emit(
      'joinBookingRoom',
      id,
      (response: { success: boolean; error?: string }) => {
        if (response.success) {
          socket.on(
            'bookingStatusChanged',
            async (data: { status: string }) => {
              if (data.status === 'CONFIRMED') {
                try {
                  const response = await getUnCheckedQrCodeAction(id);
                  const qrCodeList = Array.isArray(response.data)
                    ? response.data
                    : [];

                  // Update tất cả state cùng lúc để tránh multiple renders
                  setState(prev => ({
                    ...prev,
                    isHaveQrCode: false,
                    showNotification: true,
                    showInfoTickets: true,
                    qrCodeInfoList: qrCodeList,
                    isDataReady: true,
                  }));

                  // Lưu cache
                  if (qrCodeList.length > 0) {
                    localStorage.setItem(
                      `qr-${id}`,
                      JSON.stringify(qrCodeList),
                    );
                  }
                } catch (error) {
                  console.error('Failed to fetch QR Code:', error);
                }
              }
            },
          );
        }
      },
    );

    return () => {
      socket.off('bookingStatusChanged');
      socket.emit(
        'leaveBookingRoom',
        id,
        (response: { success: boolean; error?: string }) => {
          return;
        },
      );
    };
  }, [socket, id, state.isInitialized]);

  // Không render gì cả nếu chưa khởi tạo xong
  if (!state.isInitialized || !state.isDataReady) {
    return <LoadingPage />;
  }

  return (
    <div
      className={cn(
        state.isHaveQrCode ? 'bg-white py-0' : 'bg-pj-grey-lightest py-10',
      )}
    >
      <Container>
        {state.isHaveQrCode ? (
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
              isHaveQrCode: state.isHaveQrCode,
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
                isHaveQrCode: state.isHaveQrCode,
                id,
                tripId,
                finalPrice,
                userId,
                paymentStatus,
                status,
                seats: state.qrCodeInfoList,
              }}
            />
          </div>
        )}
      </Container>
      {state.showNotification && (
        <Notification
          clickOutsideToClose
          open={state.showNotification}
          onClose={() =>
            setState(prev => ({ ...prev, showNotification: false }))
          }
          className="max-w-140"
          children={
            <div className="relative flex w-full flex-col items-center justify-center gap-y-4 rounded-xl bg-white px-4 py-10 shadow-lg">
              <button
                onClick={() =>
                  setState(prev => ({ ...prev, showNotification: false }))
                }
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
                className="text-pj-green-medium text-center font-semibold"
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
