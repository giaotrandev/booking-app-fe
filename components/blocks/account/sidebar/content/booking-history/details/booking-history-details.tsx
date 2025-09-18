'use client';
import { Button } from '#/components/ui/button';
import { ButtonIcon } from '#/components/ui/button-icon';
import { Notification } from '#/components/ui/notification';
import { Typography } from '#/components/ui/typography';
import { Link } from '#/i18n/routing';
import {
  BookingRequestProps,
  BookingStatusRequest,
} from '#/services/booking/booking-request';
import { useState, useEffect } from 'react';
import { RouteItem } from './route-item';
import { getTimeDifference } from '#/lib/utilities/get-time-difference';
import { cn } from '#/lib/utilities/cn';
import { Row } from '#/components/ui/row';
import { Col } from '#/components/ui/col';
import { Icon } from '#/components/icons';
import { InfoItem } from './info-item';
import { formatPrice } from '#/lib/utilities/format-price';
import { fetchBookingByBookingId } from '#/lib/service/fetch-booking-by-id';
import { useToast } from '#/components/ui/use-toast';
import { useSearchParams } from 'next/navigation';
import { StatusTag } from '../status-tag';
import { cancelBooking } from '#/lib/service/cancel-booking';

interface BookingHistoryDetailsProps {
  id: string;
}

const BookingHistoryDetails = ({ id }: BookingHistoryDetailsProps) => {
  const [openBookingDetails, setOpenBookingDetails] = useState<boolean>(false);
  const [booking, setBooking] = useState<BookingRequestProps | null>(null);
  const [showModalConfirmCancel, setShowModalConfirmCancel] =
    useState<boolean>(false);
  const [isProcessingCancel, setIsProcessingCancel] = useState<boolean>(false);

  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [bookingHistoryId, setBookingHistoryId] = useState<string | null>(
    searchParams.get('bookingHistoryId'),
  );
  useEffect(() => {
    if (
      bookingHistoryId &&
      bookingHistoryId === id &&
      !openBookingDetails &&
      !booking
    ) {
      handleOpenBookingHistoryDetail(id);
    }
  }, [bookingHistoryId, id, openBookingDetails, booking]);

  const handleCloseDetails = () => {
    // Chỉ đóng modal chính khi không có modal confirm đang mở
    if (showModalConfirmCancel) return;

    setOpenBookingDetails(false);
    setBooking(null);
    setBookingHistoryId(null);

    // Sử dụng native History API - nhanh nhất
    const url = new URL(window.location.href);
    url.searchParams.delete('bookingHistoryId');

    window.history.replaceState(
      window.history.state,
      '',
      url.pathname + url.search,
    );
  };

  const handleOpenBookingHistoryDetail = async (id: string) => {
    if (booking?.id === id) return;
    try {
      const res = await fetchBookingByBookingId(id);
      if (!res || res.error || !res.data) {
        toast({
          title: 'Failed to fetch ticket details',
          description:
            'There was an issue connecting to the system. Please refresh the page or try again later.',
          variant: 'destructive',
        });
        return;
      }
      setBooking(res.data);
      setOpenBookingDetails(true);
      setBookingHistoryId(id);
    } catch (error) {
      toast({
        title: 'Failed to fetch ticket details',
        description:
          'There was an issue connecting to the system. Please refresh the page or try again later.',
        variant: 'destructive',
      });
    }
  };

  const handleCancelTicket = () => {
    setShowModalConfirmCancel(true);
  };

  const handleCloseModalCancel = () => {
    setShowModalConfirmCancel(false);
  };
  const handleConfirmCancel = async () => {
    if (!id || isProcessingCancel) return;
    setIsProcessingCancel(true);
    try {
      const responseCancel = await cancelBooking(id);
      if (responseCancel?.success) {
        setBooking(prev => {
          if (!prev) return null;
          return {
            ...prev,
            status: BookingStatusRequest.CANCELLED,
          };
        });
        toast({
          title: 'Ticket cancelled successfully',
          description: 'Your ticket has been cancelled.',
          variant: 'success',
        });

        // Đóng modal confirm
        setShowModalConfirmCancel(false);
      } else {
        toast({
          title: 'Failed to cancel ticket',
          description: responseCancel?.message || 'Please try again later.',
          variant: 'destructive',
        });
        // Chỉ đóng modal confirm, giữ nguyên modal chính
        setShowModalConfirmCancel(false);
      }
    } catch (error) {
      toast({
        title: 'Failed to cancel ticket',
        description:
          'There was an error processing your request. Please try again.',
        variant: 'destructive',
      });
      // Chỉ đóng modal confirm, giữ nguyên modal chính
      setShowModalConfirmCancel(false);
    } finally {
      setIsProcessingCancel(false);
    }
  };
  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          text="View Details"
          variant="small"
          asChild
          onClick={() => handleOpenBookingHistoryDetail(id)}
        >
          <Link
            href={`/my-account/my-booking?bookingHistoryId=${id}`}
            scroll={false}
          />
        </Button>
        <Button
          text="Print Ticket"
          variant="outline"
          colors="none"
          className="py-2 text-[14px] lg:text-[16px]"
        />
      </div>
      {openBookingDetails && (
        <Notification
          onClose={handleCloseDetails}
          open={openBookingDetails}
          clickOutsideToClose={true}
          className="my-10 max-w-[800px]"
        >
          {booking &&
            (() => {
              const {
                id: bookingId,
                basePrice,
                tripId,
                dropingPoint,
                arrivalTime,
                departureTime,
                finalPrice,
                seats,
                paymentStatus,
                status,
                route,
                createdAt,
                passengerEmail,
                passengerName,
                passengerPhone,
                passengerNote,
                totalPrice,
                userId,
                pickupPoint,
                vehicle,
                updatedAt,
                totalSeats,
              } = booking;

              return (
                <div className="bg-pj-red relative flex flex-col gap-4 rounded-t-md rounded-b-xl">
                  <div className="absolute top-3 right-3 lg:top-4 lg:right-4">
                    <ButtonIcon
                      onClick={handleCloseDetails}
                      size="sm"
                      icon={{ name: 'x-mark' }}
                    />
                  </div>

                  {/* Header */}
                  <div className="flex flex-col gap-y-2 p-4 text-white lg:p-6">
                    <div className="flex items-center gap-x-3">
                      <Typography asChild variant="h5">
                        <h1>{`Ticket ID: ${bookingId}`}</h1>
                      </Typography>
                      {status && <StatusTag status={status} />}
                    </div>

                    {route && (
                      <Typography asChild variant="h3">
                        <h2>
                          {route.sourceProvince?.name} →{' '}
                          {route.destinationProvince?.name}
                        </h2>
                      </Typography>
                    )}
                  </div>

                  {/* Body */}
                  <div className="flex flex-col gap-y-4 rounded-xl bg-white px-6 py-10">
                    {/* Timeline */}
                    {(arrivalTime ||
                      departureTime ||
                      pickupPoint ||
                      dropingPoint) && (
                      <Row className="gap-y-3 lg:gap-y-0">
                        {pickupPoint && (
                          <Col className="col-span-full lg:col-span-3 lg:col-start-2">
                            <RouteItem
                              point={pickupPoint}
                              time={departureTime}
                            />
                          </Col>
                        )}

                        {arrivalTime && departureTime && (
                          <Col className="col-span-full flex items-center lg:col-span-2 lg:col-start-6 lg:flex-col lg:gap-y-2">
                            <div className="flex w-1/2 justify-end pr-4 lg:w-full lg:justify-center lg:pr-0">
                              <Typography
                                asChild
                                className="bg-pj-grey-lightest rounded-[20px] px-3 py-1 font-bold lg:px-4 lg:py-2"
                              >
                                <p>
                                  {getTimeDifference(
                                    arrivalTime,
                                    departureTime,
                                  )}
                                </p>
                              </Typography>
                            </div>
                            <div
                              className={cn(
                                'relative h-full w-px bg-black lg:h-px lg:w-full',
                                'before:absolute before:-top-1 before:left-1/2 before:size-2 before:-translate-x-1/2 before:rounded-full before:bg-black lg:before:left-0 lg:before:translate-x-0',
                                'after:absolute after:-bottom-1 after:left-1/2 after:size-2 after:-translate-x-1/2 after:rounded-full after:bg-black lg:after:-top-1 lg:after:right-0 lg:after:left-auto lg:after:translate-x-0',
                              )}
                            />
                          </Col>
                        )}

                        {dropingPoint && (
                          <Col className="col-span-full lg:col-span-3 lg:col-start-9">
                            <RouteItem
                              point={dropingPoint}
                              time={arrivalTime}
                            />
                          </Col>
                        )}
                      </Row>
                    )}

                    {/* Passenger info */}
                    {(passengerName ||
                      passengerEmail ||
                      passengerPhone ||
                      passengerNote) && (
                      <div className="bg-pj-yellow-light border-pj-yellow-medium rounded-[8px] border p-8">
                        <div className="text-pj-ye flex items-center gap-x-2 font-bold">
                          <Icon name="user" className="size-5" />
                          <Typography asChild variant="h6">
                            <span>User information</span>
                          </Typography>
                        </div>
                        <div className="mt-2 flex flex-col gap-y-3">
                          {passengerName && (
                            <InfoItem content={passengerName} title="Name" />
                          )}
                          {passengerEmail && (
                            <InfoItem content={passengerEmail} title="Email" />
                          )}
                          {passengerPhone && (
                            <InfoItem
                              content={passengerPhone}
                              title="Phone number"
                            />
                          )}
                          {passengerNote && (
                            <InfoItem content={passengerNote} title="Note" />
                          )}
                        </div>
                      </div>
                    )}

                    {/* Vehicle & Payment info */}
                    <Row className="gap-x-4">
                      {(vehicle?.vehicleName ||
                        (Array.isArray(seats) && seats.length > 0)) && (
                        <Col className="bg-pj-grey-lightest col-span-full flex flex-col gap-y-3 rounded-[8px] p-5 lg:col-span-6">
                          <InfoItem
                            content="Vietnam Roadtrip"
                            title="Bus Service Provider"
                          />
                          {vehicle?.vehicleName && (
                            <InfoItem
                              title="Bus type"
                              content={vehicle.vehicleName}
                            />
                          )}
                          {Array.isArray(seats) && seats.length > 0 && (
                            <InfoItem
                              title="Seat numbers"
                              content={seats
                                .map(seat => seat.seatNumber)
                                .join(', ')}
                            />
                          )}
                        </Col>
                      )}
                      {((totalSeats && totalPrice) ||
                        finalPrice ||
                        paymentStatus) && (
                        <Col className="bg-pj-grey-lightest col-span-full flex flex-col gap-y-3 rounded-[8px] p-5 lg:col-span-6">
                          {totalSeats && totalPrice && (
                            <InfoItem
                              title={`Price tickets (x${totalSeats})`}
                              content={formatPrice(Number(totalPrice))}
                            />
                          )}
                          <InfoItem title="Discount" content={formatPrice(0)} />
                          {finalPrice && (
                            <InfoItem
                              title="Total price"
                              content={formatPrice(Number(finalPrice))}
                              contentClassName="text-pj-red"
                            />
                          )}
                          <InfoItem
                            title="Payment method"
                            content="Account Transfer"
                          />
                          {paymentStatus && (
                            <InfoItem
                              title="Payment status"
                              content={paymentStatus}
                              contentClassName={
                                paymentStatus === 'COMPLETED'
                                  ? 'text-pj-green-medium'
                                  : paymentStatus === 'PENDING'
                                    ? 'text-pj-yellow'
                                    : ''
                              }
                            />
                          )}
                        </Col>
                      )}
                    </Row>
                    <div className="flex justify-center gap-x-4">
                      <Button
                        icon={{
                          name: 'print',
                        }}
                        text="Print ticket"
                        iconClassName="w-6 h-6 stroke-white"
                      />
                      <Button
                        icon={{
                          name: 'phone',
                        }}
                        colors="none"
                        variant="outline"
                        asChild
                        text="Contact Support"
                        iconClassName="w-6 h-6 stroke-pj-red fill-white"
                      >
                        <Link href="tel:0963606075" />
                      </Button>
                      <Button
                        icon={{
                          name: 'x-mark',
                        }}
                        text="Cancel ticket"
                        iconClassName="w-6 h-6 stroke-white"
                        onClick={handleCancelTicket}
                        disabled={
                          showModalConfirmCancel ||
                          isProcessingCancel ||
                          status == BookingStatusRequest.CANCELLED ||
                          (!!departureTime &&
                            new Date() > new Date(departureTime))
                        }
                      />
                    </div>
                    {/* Notes */}
                    <div className="border-pj-orange-medium bg-pj-yellow-dark rounded-[8px] border px-7 py-5">
                      <Typography
                        asChild
                        variant="h6"
                        className="text-pj-brown mb-2 font-semibold"
                      >
                        <p>Important note list:</p>
                      </Typography>
                      <ul className="space-y-2">
                        {notes.map((note, idx) => (
                          <li
                            key={idx}
                            className="before:bg-pj-orange-medium relative before:absolute before:top-1/2 before:-left-3 before:size-1.25 before:-translate-y-1/2 before:rounded-full"
                          >
                            <Typography className="text-pj-brown" asChild>
                              <p>{note}</p>
                            </Typography>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })()}
        </Notification>
      )}
      {showModalConfirmCancel && (
        <Notification
          onClose={handleCloseModalCancel}
          open={showModalConfirmCancel}
          clickOutsideToClose={false}
          className="max-w-[400px]"
          containerClassName="z-[2001]"
        >
          <div className="flex flex-col items-center justify-center rounded-xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <Typography variant="h4" className="flex-1 text-center">
                Discard Changes
              </Typography>
            </div>
            <Typography
              variant="sub-body"
              className="mb-6 text-center text-gray-600"
            >
              Are you sure you want to discard the changes?
            </Typography>
            <div className="flex w-full gap-x-3">
              <div className="w-1/2">
                <Button
                  type="button"
                  onClick={handleCloseModalCancel}
                  text="Keep Ticket"
                  colors="none"
                  variant="outline"
                  className="w-full"
                  disabled={isProcessingCancel}
                />
              </div>
              <div className="w-1/2">
                <Button
                  type="button"
                  onClick={handleConfirmCancel}
                  text={isProcessingCancel ? 'Cancelling...' : 'Cancel Ticket'}
                  className="w-full"
                  disabled={isProcessingCancel}
                />
              </div>
            </div>
          </div>
        </Notification>
      )}
    </>
  );
};

export { BookingHistoryDetails };

const notes = [
  'Please arrive at the bus station at least 15 minutes before departure for check-in.',
  'Bring your ID card/passport and e-ticket when boarding.',
  'Carry-on luggage: maximum 7kg; Checked baggage: maximum 20kg.',
  'Contact hotline 1900-xxxx for assistance if needed.',
  'Tickets can be canceled free of charge up to 4 hours before departure.',
];
