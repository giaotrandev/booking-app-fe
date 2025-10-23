'use client';

import { Button } from '#/components/ui/button';
import { useTranslate } from '#/i18n/client';
import { cn } from '#/lib/utilities/cn';
import { useEffect, useState } from 'react';
import { Slide, SliderAbstract } from '../slider-abstract';

export type OptionType = {
  label: string;
  value: string;
};

interface FiltersProps {
  options: OptionType[];
  isMultiple?: boolean;
  isShowIconFilter?: boolean;
  resetTrigger?: boolean;
  onChange?: (selectedValues: string[]) => void;
  disabled?: boolean;
  isToggle?: boolean;
  className?: string;
  defaultValues?: string[];
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

const Filters = ({
  options,
  isMultiple = false,
  className,
  resetTrigger,
  disabled = false,
  onChange,
  isToggle,
  defaultValues,
  containerRef,
}: FiltersProps) => {
  const { translate } = useTranslate();
  const [selectedValues, setSelectedValues] = useState<string[]>(
    defaultValues ?? ['all'],
  ); // ✅ mặc định là 'all'

  // Reset trigger
  useEffect(() => {
    setSelectedValues(['all']);
  }, [resetTrigger]);

  if (!Array.isArray(options) || options.length === 0) return null;

  const handleClick = (value: string) => {
    let newSelected = [...selectedValues];

    if (value === 'all') {
      // Bấm "All" => chỉ còn 'all'
      newSelected = ['all'];
    } else if (isMultiple) {
      if (selectedValues.includes(value)) {
        // Nếu đang chọn -> bỏ chọn
        newSelected = selectedValues.filter(v => v !== value);
      } else {
        // Chọn thêm => bỏ 'all' nếu có
        newSelected = [...selectedValues.filter(v => v !== 'all'), value];
      }
    } else {
      // Single select
      newSelected = selectedValues.includes(value) ? ['all'] : [value];
    }

    // ✅ Nếu bỏ chọn hết -> tự bật lại 'all'
    if (newSelected.length === 0) {
      newSelected = ['all'];
    }

    setSelectedValues(newSelected);
    onChange?.(newSelected);
  };
  useEffect(() => {
    if (defaultValues) setSelectedValues(defaultValues);
  }, [defaultValues]);
  return (
    <SliderAbstract slidesPerView={3}>
      <Slide>
        <Button
          onClick={() => handleClick('all')}
          text={translate({
            vi: `Tất cả`,
            en: `All`,
          })}
          variant={selectedValues.includes('all') ? 'default' : 'outline'}
          colors={selectedValues.includes('all') ? 'red' : 'none'}
          asChild
          className={cn(
            'w-full flex-none whitespace-nowrap uppercase transition-[colors,background-colors] duration-500 lg:min-w-30',
            !selectedValues.includes('all') &&
              'hocus-visible:bg-pj-red hocus-visible:text-white',
          )}
        >
          <span />
        </Button>
      </Slide>

      {options.map(item => (
        <Slide key={item.value}>
          <Button
            onClick={() => handleClick(item.value)}
            variant={
              selectedValues.includes(item.value) ? 'default' : 'outline'
            }
            colors={selectedValues.includes(item.value) ? 'red' : 'none'}
            text={item.label}
            asChild
            className={cn(
              'flex-none whitespace-nowrap uppercase transition-[colors,background-colors] duration-500 lg:min-w-30',
              !selectedValues.includes(item.value) &&
                'hocus-visible:bg-pj-red hocus-visible:text-white',
            )}
          >
            <span />
          </Button>
        </Slide>
      ))}
    </SliderAbstract>
  );
};

export default Filters;
