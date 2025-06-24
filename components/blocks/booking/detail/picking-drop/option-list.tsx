'use client';

import { RadioGroup, RadioGroupItem } from '#/components/ui/radio-group';
import { useEffect, useState } from 'react';
import { cn } from '#/lib/utilities/cn';

export interface OptionItemProps {
  id: string;
  time?: string;
  locationName?: string;
  address?: string;
}

export interface OptionItemListProps {
  list: OptionItemProps[];
  onChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
}

const OptionItemList = ({
  list,
  onChange,
  defaultValue,
  disabled = false,
}: OptionItemListProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(
    defaultValue || '',
  );
  useEffect(() => {
    if (defaultValue) {
      onChange?.(defaultValue);
    }
  }, [defaultValue]);
  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChange?.(value); // truyền ra ngoài
  };

  return (
    <RadioGroup
      value={selectedValue}
      onValueChange={handleChange}
      className="flex flex-col gap-4"
    >
      {list.map(option => {
        const value = String(option.id);
        return (
          <div key={option.id} className={cn('w-full rounded-md border p-4')}>
            <div className="flex items-center gap-x-3">
              <RadioGroupItem disabled={disabled} value={value} id={value} />
              <label className="flex flex-col" htmlFor={value}>
                <p className="font-medium">
                  {option.time} - {option.locationName}
                </p>
                <p className="text-muted-foreground text-sm">
                  {option.address}
                </p>
              </label>
            </div>
          </div>
        );
      })}
    </RadioGroup>
  );
};

export { OptionItemList };
