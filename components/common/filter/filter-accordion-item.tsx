import RangeSlider, { RangeSliderProps } from './range-slider';
import CheckboxGroupFilter from './checkbox-group-filter';
import RadioGroupFilter from './radio-group-filter';
import { useFilterStore } from '#/store/filter-store';
import { OptionType } from '#/types/global';
import { maxPriceDefault, minPriceDefault } from '#/lib/constant';

type FilterType = 'checkbox' | 'radio' | 'range-price' | 'range-time';

export interface FilterAccordionItemProps extends RangeSliderProps {
  options?: OptionType[];
  onChange?: (selectedValues: string[] | number[]) => void;
  filterType: FilterType;
  filterKey: 'pickup' | 'dropoff' | 'price' | 'time';
  isMultiple?: boolean;
}

const FilterItem = ({
  options = [],
  filterType,
  onChange,
  isMultiple = false,
  initialMin,
  initialMax,
  max,
  min,
  priceGap,
  filterKey,
  step,
}: FilterAccordionItemProps) => {
  const { filters, setFilter } = useFilterStore();
  // 👇 Giá trị hiện tại từ store
  const selected = filters[filterKey];
  const handleSelectionChange = (newValues: string[]) => {
    const selectedOptions = options.filter(opt =>
      newValues.includes(opt.value),
    );
    setFilter(filterKey as 'pickup' | 'dropoff', selectedOptions);
    onChange?.(newValues);
  };

  const handleRangeChange = (minVal: number, maxVal: number) => {
    setFilter(filterKey, [minVal, maxVal]);
    onChange?.([minVal, maxVal]);
  };
  switch (filterType) {
    case 'checkbox':
      return (
        <CheckboxGroupFilter
          options={options}
          selectedValues={(selected as OptionType[]).map(o => o.value)}
          isMultiple={isMultiple}
          onChange={handleSelectionChange}
        />
      );
    case 'radio':
      return (
        <RadioGroupFilter
          options={options}
          selectedValue={(selected as OptionType[])[0]?.value || ''}
          onChange={val => handleSelectionChange([val])}
        />
      );
    case 'range-price':
      return (
        <RangeSlider
          initialMax={initialMax}
          initialMin={initialMin}
          min={min}
          max={max}
          step={step}
          titleFrom="Min"
          titleTo="Max"
          priceGap={priceGap}
          rangeSliderOnChange={handleRangeChange}
        />
      );
    case 'range-time':
      return (
        <RangeSlider
          titleFrom="From"
          titleTo="To"
          initialMax={initialMax}
          initialMin={initialMin}
          min={0}
          max={1425} // 23 * 60 + 45 = 1380 + 45 = 1425  - (23:45)
          step={15}
          priceGap={priceGap}
          formatValue={val => {
            const h = Math.floor(val / 60)
              .toString()
              .padStart(2, '0');
            const m = (val % 60).toString().padStart(2, '0');
            return `${h}:${m}`;
          }}
          parseValue={str => {
            const [rawH, rawM] = str.split(':').map(Number);
            let h = Math.max(rawH || 0, 0);
            let m = Math.max(rawM || 0, 0);

            // clamp về 23:45 nếu vượt quá
            if (h * 60 + m > 1425) {
              return 1425;
            }

            h = Math.min(h, 23);
            m = Math.min(m, 59);
            return h * 60 + m;
          }}
          rangeSliderOnChange={handleRangeChange}
        />
      );
    default:
      return null;
  }
};

export default FilterItem;
