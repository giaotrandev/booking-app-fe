'use client';
import { OptionType } from '#/types/global';
import { Checkbox } from '../../ui/checkbox';

interface CheckboxGroupFilterProps {
  options: OptionType[];
  selectedValues: string[];
  isMultiple?: boolean;
  onChange: (newValues: string[]) => void;
}

const CheckboxGroupFilter = ({
  options,
  selectedValues,
  isMultiple = true,
  onChange,
}: CheckboxGroupFilterProps) => {
  const handleClick = (value: string) => {
    let newSelected: string[];

    newSelected = isMultiple
      ? selectedValues.includes(value)
        ? selectedValues.filter(v => v !== value)
        : [...selectedValues, value]
      : [value];

    onChange(newSelected);
  };

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
};

export default CheckboxGroupFilter;
