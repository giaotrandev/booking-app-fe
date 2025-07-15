type FilterType = 'checkbox' | 'radio' | 'range';
export interface OptionItem {
  id: string;
  label?: string;
  value: string;
}
export interface FilterItemProps {
  title?: string;
  filterType: FilterType;
  optionList?: OptionItem[];
  isMultiple?: boolean;
  initialMin?: number;
  initialMax?: number;
  min?: number;
  max?: number;
  step?: number;
  priceGap?: number;
}
export interface FilterListProps {
  list: FilterItemProps[];
}
