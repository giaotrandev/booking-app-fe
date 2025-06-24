'use client';
import { useTranslate } from '#/i18n/client';
import { cn } from '#/lib/utilities/cn';
import { Command as CommandPrimitive } from 'cmdk';
import { useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../headless/popover';
import { Icon } from '../icons';
import { inputVariants } from './input';
import { Typography } from './typography';

export interface SelectOptionProps {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOptionProps[];
  multiple?: boolean;
  placeholder?: string;
  subPlaceholder?: string;
  emptyMessage?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  disabled?: boolean;
  value?: SelectOptionProps | SelectOptionProps[] | undefined;
  onChange?: (
    value: SelectOptionProps | SelectOptionProps[] | undefined,
  ) => void;
}

const Select = ({
  options,
  multiple,
  placeholder,
  subPlaceholder,
  value,
  onChange,
  emptyMessage,
  searchable,
  searchPlaceholder,
  disabled,
}: SelectProps) => {
  const { translate } = useTranslate();
  const ref = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const valueSelected = value ? (Array.isArray(value) ? value : [value]) : [];
  const handleSelect = (option: SelectOptionProps) => {
    const existed = valueSelected.some(
      item => item.label === option.label && item.value === option.value,
    );
    const optionSelected = multiple
      ? existed
        ? [...valueSelected].filter(
            item => item.label !== option.label && item.value !== option.value,
          )
        : [...valueSelected, option]
      : existed
        ? []
        : [option];
    onChange?.(
      multiple
        ? optionSelected
        : Array.isArray(optionSelected) && optionSelected.length > 0
          ? optionSelected[0]
          : undefined,
    );
    setOpen(false);
  };
  const handleIsSelected = (option: SelectOptionProps) => {
    return valueSelected.some(
      valueSelectedItem =>
        valueSelectedItem.label === option.label &&
        valueSelectedItem.value === option.value,
    );
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={cn(
            inputVariants(),
            'relative line-clamp-1 flex cursor-pointer items-center pr-4 text-left',
          )}
          disabled={disabled}
        >
          <Typography
            asChild
            variant="sub-label"
            className={cn(
              'absolute top-1 left-3 text-[10px] text-zinc-500 transition-opacity',
              valueSelected.length > 0 ? 'opacity-100' : 'opacity-0',
            )}
          >
            <span>{subPlaceholder}</span>
          </Typography>
          {Array.isArray(valueSelected) && valueSelected.length > 0 ? (
            <span
              className={cn(
                'text-black',
                // 'dark:text-white'
              )}
            >
              {valueSelected.map(item => item.label).join(', ')}
            </span>
          ) : (
            <span
              className={cn(
                'text-zinc-500',
                //  'dark:text-zinc-500'
              )}
            >
              {placeholder}
            </span>
          )}
          <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2">
            <Icon
              name="chevron-down"
              className={cn(
                'size-4',
                'fill-black stroke-black',
                // 'dark:fill-white dark:stroke-white',
                open && '-scale-y-100',
              )}
            />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className={cn(
          'relative top-2 z-[12] w-[var(--radix-popover-trigger-width)]',
        )}
        onOpenAutoFocus={() => {
          if (ref && ref.current) {
            ref.current.focus();
          }
        }}
      >
        <div
          className={cn(
            'rounded-xl border px-2 py-4',
            'border-black bg-white text-black',
            // 'dark:border-white dark:bg-black dark:text-white',
          )}
        >
          <CommandPrimitive
            data-slot="command"
            ref={ref}
            className="custom-scrollbar overflow-hidden outline-hidden"
          >
            {searchable && (
              <>
                <CommandPrimitive.Input
                  data-slot="command-input"
                  placeholder={
                    searchPlaceholder ??
                    translate({ vi: 'Suche...', en: 'Search...' })
                  }
                  className={cn(
                    'w-full border-b bg-transparent outline-hidden',
                    'border-black bg-white text-black placeholder:text-zinc-500',
                    // 'dark:border-white dark:bg-black dark:text-white dark:placeholder:text-zinc-500',
                  )}
                />
                <CommandPrimitive.Empty data-slot="command-empty">
                  {emptyMessage ??
                    translate({ vi: 'Keine Optionen', en: 'No options' })}
                </CommandPrimitive.Empty>
              </>
            )}
            <CommandPrimitive.List
              data-slot="command-list"
              className="max-h-[300px] overflow-x-hidden overflow-y-auto"
            >
              <CommandPrimitive.Group data-slot="command-group">
                <div className="flex flex-col gap-y-1.5">
                  {options.map((item, key) => {
                    const isSelected = handleIsSelected(item);
                    return (
                      <CommandPrimitive.Item
                        data-slot="command-item"
                        key={key}
                        value={item.value}
                        onSelect={() => handleSelect(item)}
                        className={cn(
                          'w-full cursor-pointer rounded-xl p-1.5 outline-hidden',
                          isSelected
                            ? [
                                'bg-pj-blue text-white',
                                // 'dark:bg-white dark:text-black',
                              ]
                            : [
                                'hocus:bg-pj-blue/70 hocus:text-white data-[selected=true]:bg-pj-blue/70 data-[selected=true]:text-white',
                                // 'dark:hover:bg-zinc-700 dark:data-[selected=true]:bg-zinc-700',
                              ],
                          // disabled
                          'disabled:pointer-events-none disabled:opacity-50',
                        )}
                        disabled={item.disabled}
                      >
                        {item.label}
                      </CommandPrimitive.Item>
                    );
                  })}
                </div>
              </CommandPrimitive.Group>
            </CommandPrimitive.List>
          </CommandPrimitive>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { Select };
