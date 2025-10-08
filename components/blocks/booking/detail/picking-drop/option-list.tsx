'use client';

import { RadioGroup, RadioGroupItem } from '#/components/ui/radio-group';
import { useEffect, useState } from 'react';
import { cn } from '#/lib/utilities/cn';
import { Typography } from '#/components/ui/typography';
import { formatUtcTime } from '#/lib/utilities/format-time';

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
    onChange?.(value);
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
          <div
            key={option.id}
            className={cn(
              'flex w-full items-center rounded-md border p-2 lg:p-4',
            )}
          >
            <RadioGroupItem disabled={disabled} value={value} id={value} />
            <label className="flex flex-1 flex-col pl-3" htmlFor={value}>
              <Typography asChild className="font-medium">
                <p>
                  {option.time && `${formatUtcTime(option.time)} - `}
                  {option.locationName}
                </p>
              </Typography>
              <Typography asChild className="text-pj-gray" variant="sub-label">
                <p>{option.address}</p>
              </Typography>
            </label>
          </div>
        );
      })}
    </RadioGroup>
  );
};

export { OptionItemList };
