import { differenceInMinutes, parse } from 'date-fns';

const getTimeDifference = (arrivalTime: string, departureTime: string) => {
  const arrival = parse(arrivalTime, 'HH:mm', new Date());
  const departure = parse(departureTime, 'HH:mm', new Date());

  return (differenceInMinutes(departure, arrival) /60); // kết quả là số phút
};
export {getTimeDifference}