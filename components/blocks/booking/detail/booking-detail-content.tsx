'use client';

import { Button } from '#/components/ui/button';
import { Typography } from '#/components/ui/typography';
import { useBookingSelection } from '#/context/booking/booking-selection-context';
import { cn } from '#/lib/utilities/cn';
import { useState } from 'react';
import { SeatList } from './seat/seat-list';
import { TabDetailList } from './tab-navigation/tab-detail-list';
import { InformationRender } from './information/render';
import { PickingAndDropingList } from './picking-drop/picking-droping-list';
import { TripsRequestProps } from '#/services/trip/trips-request';
import { formatPrice } from '#/lib/utilities/format-price';
import { useToast } from '#/components/ui/use-toast';
import { Notification } from '#/components/ui/notification';
import { useTranslate } from '#/i18n/client';

export interface BookingDetailContentProps extends TripsRequestProps {}

const BookingDetailContent = ({
  id,
  decks,
  dropingList,
  pickingList,
}: BookingDetailContentProps) => {
  const { toast } = useToast();
  const { translate } = useTranslate();

  const [activeTab, setActiveTab] = useState<number>(1);
  const [isConflictModalOpen, setIsConflictModalOpen] =
    useState<boolean>(false);
  const [isFullConflictSeats, setIsFullConflictSeats] =
    useState<boolean>(false);
  const [conflictSeats, setConflictSeats] = useState<string[]>([]);
  const [isBooking, setIsBooking] = useState(false);
  const {
    selectedSeats,
    totalPrice,
    setIsSubmit,
    saveTotalPrice,
    validateSelectedSeats,
    getAvailableSeats,
    getTotalPriceForAvailableSeats,
    deselectSeat,
  } = useBookingSelection();

  const isContinueDisabled = selectedSeats.length === 0;

  const handleActionButtonNext = async () => {
    if (activeTab === 3) {
      const validation = validateSelectedSeats();
      if (!validation.isValid) {
        const conflict = validation.unavailableSeats;
        const allConflict = conflict.length === selectedSeats.length;
        setIsFullConflictSeats(allConflict);
        setConflictSeats(conflict);
        setIsConflictModalOpen(true);
        return;
      }
      saveTotalPrice();
      setIsSubmit(true);
      return;
    }
    saveTotalPrice();
    setActiveTab(prev => Math.min(3, prev + 1));
  };

  const handleCloseFullyConflictModal = () => {
    conflictSeats.forEach(seatNumber => {
      deselectSeat(seatNumber);
    });
    saveTotalPrice();
    setActiveTab(1);
    setIsConflictModalOpen(false);
    toast({
      title: translate({
        vi: 'Đã hủy đặt vé',
        en: 'Booking cancelled',
      }),
      description: translate({
        vi: 'Vui lòng chọn lại ghế và thử lại.',
        en: 'Please select your seats again and try.',
      }),
      variant: 'default',
    });
  };

  const handleConfirmContinueWithAvailableSeats = () => {
    conflictSeats.forEach(seatNumber => {
      deselectSeat(seatNumber);
    });

    toast({
      title: translate({
        vi: 'Đã cập nhật lựa chọn',
        en: 'Selection updated',
      }),
      description: translate({
        vi: `Đã xóa ${conflictSeats.length} ghế bị trùng. Tiếp tục với ${getAvailableSeats().length} ghế còn lại.`,
        en: `Removed ${conflictSeats.length} conflicted seats. Continuing with ${getAvailableSeats().length} remaining seats.`,
      }),
      variant: 'success',
    });

    setIsConflictModalOpen(false);
    setIsSubmit(true);
    saveTotalPrice();
  };

  return (
    <>
      <div>
        <div className="border-pj-gray-light border-y py-3 lg:px-5">
          <TabDetailList tabActive={activeTab} />
        </div>

        <div className="px-4 pb-4 lg:pt-3 lg:pb-5">
          {Array.isArray(decks) && decks.length > 0 && (
            <div className={cn(activeTab === 1 ? 'block' : 'hidden')}>
              <SeatList decks={decks} />
            </div>
          )}

          {((Array.isArray(pickingList) && pickingList.length > 0) ||
            (Array.isArray(dropingList) && dropingList.length > 0)) && (
            <div className={cn(activeTab === 2 ? 'block' : 'hidden')}>
              <PickingAndDropingList
                dropingList={dropingList}
                pickingList={pickingList}
              />
            </div>
          )}

          {activeTab === 3 && (
            <InformationRender tripId={id} setIsBooking={setIsBooking} />
          )}

          <div className="mt-4 flex flex-wrap justify-between">
            <div
              className={cn(
                'transition-opacity',
                activeTab > 1
                  ? 'static flex items-center justify-center opacity-100'
                  : 'absolute opacity-0',
              )}
            >
              <Button
                text={translate({
                  vi: 'Quay lại',
                  en: 'Back',
                })}
                variant="small"
                disabled={isBooking}
                onClick={() => setActiveTab(prev => Math.max(1, prev - 1))}
              />
            </div>

            <div
              className={cn(
                'flex items-center gap-x-1 lg:gap-x-4',
                activeTab < 2 && 'w-full justify-end',
              )}
            >
              <Typography asChild className="text-center font-medium">
                <p>
                  {translate({
                    vi: `Tổng cộng: ${formatPrice(totalPrice)}`,
                    en: `Total: ${formatPrice(totalPrice)}`,
                  })}
                </p>
              </Typography>

              <Button
                type={activeTab === 3 ? 'submit' : 'button'}
                text={
                  isBooking
                    ? translate({ vi: 'Đang xử lý...', en: 'Processing...' })
                    : translate({ vi: 'Tiếp tục', en: 'Continue' })
                }
                variant="small"
                disabled={isContinueDisabled || isBooking}
                onClick={handleActionButtonNext}
              />
            </div>
          </div>
        </div>
      </div>

      <Notification
        clickOutsideToClose={false}
        open={isConflictModalOpen}
        className="max-w-md"
        onClose={() => setIsConflictModalOpen(false)}
      >
        <div className="w-full rounded-xl bg-white p-6 shadow-lg">
          <Typography
            asChild
            variant="h3"
            className="text-center font-semibold"
          >
            <h2>
              {translate({
                vi: 'Ghế bạn chọn đã được đặt trước',
                en: 'Your selected seats have already been booked',
              })}
            </h2>
          </Typography>

          {isFullConflictSeats ? (
            <>
              <Typography asChild className="mb-4" variant="small-label">
                <p>
                  {translate({
                    vi: `Tất cả các ghế bạn chọn (${conflictSeats.join(
                      ', ',
                    )}) đã bị người khác đặt. Vui lòng chọn lại ghế khác để tiếp tục đặt vé.`,
                    en: `All selected seats (${conflictSeats.join(
                      ', ',
                    )}) have been booked by others. Please select different seats to continue.`,
                  })}
                </p>
              </Typography>

              <div className="flex justify-end">
                <Button
                  variant="small"
                  text={translate({
                    vi: 'Đóng',
                    en: 'Close',
                  })}
                  onClick={handleCloseFullyConflictModal}
                />
              </div>
            </>
          ) : (
            <>
              <p className="mb-4 text-sm">
                {translate({
                  vi: `Một số ghế bạn chọn (${conflictSeats.join(
                    ', ',
                  )}) đã bị người khác đặt. Bạn có muốn tiếp tục với ${getAvailableSeats().length} ghế còn lại không?`,
                  en: `Some seats you selected (${conflictSeats.join(
                    ', ',
                  )}) have already been booked. Do you want to continue with ${getAvailableSeats().length} remaining seats?`,
                })}
                <br />
                <strong>
                  {translate({ vi: 'Tổng tiền mới:', en: 'New total:' })}
                </strong>{' '}
                {formatPrice(getTotalPriceForAvailableSeats())}
              </p>

              <div className="flex justify-end gap-2">
                <Button
                  variant="small"
                  text={translate({
                    vi: 'Chọn lại',
                    en: 'Re-select',
                  })}
                  onClick={() => {
                    toast({
                      title: translate({
                        vi: 'Đã hủy đặt vé',
                        en: 'Booking cancelled',
                      }),
                      description: translate({
                        vi: 'Vui lòng chọn lại ghế và thử lại.',
                        en: 'Please select your seats again and try.',
                      }),
                      variant: 'default',
                    });
                    setActiveTab(1);
                    setIsConflictModalOpen(false);
                  }}
                />

                <Button
                  variant="small"
                  text={translate({
                    vi: 'Tiếp tục',
                    en: 'Continue',
                  })}
                  onClick={handleConfirmContinueWithAvailableSeats}
                />
              </div>
            </>
          )}
        </div>
      </Notification>
    </>
  );
};

export default BookingDetailContent;
