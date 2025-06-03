import { useState } from 'react';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

export type OptionType = {
  label: string;
  value: string;
};

export interface FilterListProps {
  options: OptionType[];
  onChange?: (selectedValues: string[]) => void;
  isMultiple?: boolean;
}

const FilterList = ({ options, isMultiple, onChange }: FilterListProps) => {
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

  if (!(Array.isArray(options) && options.length > 0)) return null;

  return (
    <ul className="flex flex-col gap-2 lg:gap-4">
      {isMultiple ? (
        options.map((item, index) => (
          <li key={index}>
            <Checkbox
              onClick={() => handleClick(item.value)}
              aria-label={item.label}
              label={item.label}
              checked={selectedValues.includes(item.value)}
            />
          </li>
        ))
      ) : (
        <RadioGroup
          value={selectedValues[0] || ''}
          onValueChange={val => handleClick(val)}
        >
          {options.map((item, index) => (
            <li key={index}>
              <RadioGroupItem
                value={item.value}
                aria-label={item.label}
                label={item.label}
              />
            </li>
          ))}
        </RadioGroup>
      )}
    </ul>
  );
};

export default FilterList;
