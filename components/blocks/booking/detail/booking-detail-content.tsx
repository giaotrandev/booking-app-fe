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
export interface BookingDetailContentProps extends TripsRequestProps {}
const BookingDetailContent = ({
  id,
  decks,
  dropingList,
  pickingList,
}: BookingDetailContentProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<number>(1);
  const [isConflictModalOpen, setIsConflictModalOpen] =
    useState<boolean>(false);
  const [isFullConflictSeats, setIsFullConflictSeats] =
    useState<boolean>(false);
  const [conflictSeats, setConflictSeats] = useState<string[]>([]);
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
      // Validate seats trước khi submit
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
      title: 'Đã hủy đặt vé',
      description: 'Vui lòng chọn lại ghế và thử lại.',
      variant: 'default',
    });
  };
  const handleConfirmContinueWithAvailableSeats = () => {
    conflictSeats.forEach(seatNumber => {
      deselectSeat(seatNumber);
    });

    toast({
      title: 'Đã cập nhật lựa chọn',
      description: `Đã xóa ${conflictSeats.length} ghế bị trùng. Tiếp tục với ${getAvailableSeats().length} ghế còn lại.`,
      variant: 'success',
    });

    setIsConflictModalOpen(false);
    setIsSubmit(true);
    saveTotalPrice();
  };
  return (
    <>
      <div>
        <div className="border-pj-grey-light border-y py-3 lg:px-5">
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
          {activeTab === 3 && <InformationRender tripId={id} />}
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
                text="Back"
                variant="small"
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
                <p>{`Total: ${formatPrice(totalPrice)}`}</p>
              </Typography>
              <Button
                type={activeTab === 3 ? 'submit' : 'button'}
                text="Continue"
                variant="small"
                disabled={isContinueDisabled}
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
            <h2>Your seats have already booked </h2>
          </Typography>
          {isFullConflictSeats ? (
            <>
              <Typography asChild className="mb-4" variant="small-label">
                <p>
                  Tất cả các ghế bạn chọn ({conflictSeats.join(', ')}) đã bị
                  người khác đặt. Vui lòng chọn lại ghế khác để tiếp tục đặt vé.
                </p>
              </Typography>
              <div className="flex justify-end">
                <Button
                  variant="small"
                  text="Close"
                  onClick={handleCloseFullyConflictModal}
                />
              </div>
            </>
          ) : (
            <>
              <p className="mb-4 text-sm">
                Một số ghế bạn chọn ({conflictSeats.join(', ')}) đã bị người
                khác đặt. Bạn có muốn tiếp tục với {getAvailableSeats().length}{' '}
                ghế còn lại không?
                <br />
                <strong>Tổng tiền mới:</strong>{' '}
                {formatPrice(getTotalPriceForAvailableSeats())}
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="small"
                  text="Chọn lại"
                  onClick={() => {
                    toast({
                      title: 'Đã hủy đặt vé',
                      description: 'Vui lòng chọn lại ghế và thử lại.',
                      variant: 'default',
                    });
                    setActiveTab(1);
                    setIsConflictModalOpen(false);
                  }}
                />
                <Button
                  variant="small"
                  text="Tiếp tục"
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
