import { FilterItemProps } from '../hero/navigation-booking/render';
import { BookingRenderBlock } from './render';

const BookingBlock = () => {
  const convertToSelectOptions = (list: string[]) =>
    list.map(item => ({ label: item, value: item }));

  const arrivalListSample: FilterItemProps[] =
    convertToSelectOptions(arrivalList);
  const destinationListSample: FilterItemProps[] =
    convertToSelectOptions(destinationList);
  return (
    <BookingRenderBlock
      arrivalList={arrivalListSample}
      destinationList={destinationListSample}
    />
  );
};

export default BookingBlock;
const arrivalList: string[] = [
  'Hanoi',
  'Ho Chi Minh City',
  'Da Nang',
  'Hue',
  'Nha Trang',
];

const destinationList: string[] = [
  'Sapa',
  'Ha Long Bay',
  'Phu Quoc',
  'Da Lat',
  'Can Tho',
];
