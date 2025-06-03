import { FilterItemProps } from './navigation-booking/render';
import { HeroRenderBlock } from './render';

const HeroBlock = () => {
  const convertToSelectOptions = (list: string[]) =>
    list.map(item => ({ label: item, value: item }));

  const arrivalListSample: FilterItemProps[] =
    convertToSelectOptions(arrivalList);
  const destinationListSample: FilterItemProps[] =
    convertToSelectOptions(destinationList);
  return (
    <HeroRenderBlock
      arrivalList={arrivalListSample}
      destinationList={destinationListSample}
    />
  );
};
export { HeroBlock };
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
