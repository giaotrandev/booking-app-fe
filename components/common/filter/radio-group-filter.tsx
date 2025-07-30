'use client';
import { OptionType } from '#/types/global';
import { RadioGroup, RadioGroupItem } from '../../ui/radio-group';

interface RadioGroupFilterProps {
  options: OptionType[];
  selectedValue: string;
  onChange: (newValue: string) => void;
}

const RadioGroupFilter = ({
  options,
  selectedValue,
  onChange,
}: RadioGroupFilterProps) => {
  return (
    <RadioGroup
      value={selectedValue}
      onValueChange={onChange}
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
};

export default RadioGroupFilter;
