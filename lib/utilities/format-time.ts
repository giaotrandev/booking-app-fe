import { format, parse } from 'date-fns';

const formatTime = (time: string | Date) => {
  const date = typeof time === 'string'
    ? parse(time, 'HH:mm', new Date())
    : time;
  return format(date, 'HH:mm');
};
export {formatTime}