import { differenceInMinutes } from 'date-fns';

const getTimeDifference = (arrivalTime: string, departureTime: string) => {
  const arrival = new Date(arrivalTime); // ISO string → Date
  const departure = new Date(departureTime);

  const minutesDiff = differenceInMinutes(arrival, departure);
  return minutesDiff / 60; // chuyển sang giờ
};

export { getTimeDifference };
