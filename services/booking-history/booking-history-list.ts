import { convertBookingHistoryItem } from './booking-history-item';
import { BookingHistoryRequestProps } from './booking-history-request';
import { BookingHistoryResponseProps } from './booking-history-response';

export const convertBookingHistoryList = async (
  bookingHistoryList: BookingHistoryResponseProps[],
) => {
  const _bookingHistoryList: BookingHistoryRequestProps[] = [];
  for (const item of bookingHistoryList ?? []) {
    if (!item) continue;
    const _item: BookingHistoryRequestProps = convertBookingHistoryItem(item);
    _bookingHistoryList.push(_item);
  }
  return _bookingHistoryList;
};
