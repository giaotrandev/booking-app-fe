import { useState } from 'react';
import { Checkbox } from '../../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';
import RangeSlider, { RangeSliderProps } from './range-slider';

export type OptionType = {
  label: string;
  value: string;
};

type FilterType = 'checkbox' | 'radio' | 'range';

export interface FilterItemProps extends RangeSliderProps {
  options?: OptionType[];
  onChange?: (selectedValues: string[] | number[]) => void;
  filterType: FilterType;
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
  step,
}: FilterItemProps) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleClick = (value: string) => {
    let newSelectedValues: string[];

    if (!value) {
      newSelectedValues = [];
    } else {
      if (value === 'Alle') {
        newSelectedValues = selectedValues.includes('Alle') ? [] : ['Alle'];
      } else {
        if (isMultiple) {
          newSelectedValues = selectedValues.includes(value)
            ? selectedValues.filter(item => item !== value)
            : [...selectedValues, value];
        } else {
          newSelectedValues = [value];
        }
      }
    }

    setSelectedValues(newSelectedValues);
    onChange?.(newSelectedValues);
  };

  const renderFilter = () => {
    switch (filterType) {
      case 'checkbox':
        return (
          <ul className="flex flex-col gap-2 lg:gap-4">
            {options.map((item, index) => {
              if (!item.value) return null;
              return (
                <li key={index}>
                  <Checkbox
                    onClick={() => handleClick(item.value)}
                    aria-label={item.label}
                    label={item.label}
                    checked={selectedValues.includes(item.value)}
                  />
                </li>
              );
            })}
          </ul>
        );

      case 'radio':
        return (
          <RadioGroup
            value={selectedValues[0] || ''}
            onValueChange={val => handleClick(val)}
            className="gap-2 lg:gap-4"
          >
            {options.map((item, index) => (
              <div key={index}>
                <RadioGroupItem
                  value={item.value}
                  aria-label={item.label}
                  label={item.label}
                />
              </div>
            ))}
          </RadioGroup>
        );

      case 'range': {
        return (
          <div>
            <RangeSlider
              initialMax={initialMax}
              initialMin={initialMin}
              min={min}
              max={max}
              step={step}
              priceGap={priceGap}
            />
          </div>
        );
      }

      default:
        return null;
    }
  };

  return <div>{renderFilter()}</div>;
};

export default FilterItem;
