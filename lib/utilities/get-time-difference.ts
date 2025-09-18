import { differenceInMinutes } from 'date-fns';

const getTimeDifference = (arrivalTime: string, departureTime: string) => {
  const arrival = new Date(arrivalTime);
  const departure = new Date(departureTime);

  const minutesDiff = differenceInMinutes(arrival, departure);

  const hours = Math.floor(minutesDiff / 60); // nguyên giờ
  const minutes = minutesDiff % 60; // số phút lẻ

  // Nếu phút = 0 thì chỉ trả về giờ thôi
  return minutes === 0 ? `${hours}h` : `${hours}h ${minutes}m`;
};

export { getTimeDifference };
