'use client';
import { useTranslate } from '#/i18n/client';
import { cn } from '#/lib/utilities/cn';
import { Command as CommandPrimitive } from 'cmdk';
import { useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../headless/popover';
import { Icon } from '../icons';
import { inputVariants } from './input';

export interface SelectOptionProps {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOptionProps[];
  multiple?: boolean;
  placeholder?: string;
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
            'relative line-clamp-1 pr-4 text-left',
          )}
          disabled={disabled}
        >
          {Array.isArray(valueSelected) && valueSelected.length > 0 ? (
            <span className={cn('text-black', 'dark:text-white')}>
              {valueSelected.map(item => item.label).join(', ')}
            </span>
          ) : (
            <span className={cn('text-zinc-500', 'dark:text-zinc-500')}>
              {placeholder}
            </span>
          )}
          <span className="pointer-events-none absolute top-1 right-0">
            <Icon
              name="chevron-down"
              className={cn(
                'size-4',
                'fill-black stroke-black',
                'dark:fill-white dark:stroke-white',
                open && '-scale-y-100',
              )}
            />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)]"
        onOpenAutoFocus={() => {
          if (ref && ref.current) {
            ref.current.focus();
          }
        }}
      >
        <div
          className={cn(
            'border',
            'border-black bg-white text-black',
            'dark:border-white dark:bg-black dark:text-white',
          )}
        >
          <CommandPrimitive
            data-slot="command"
            ref={ref}
            className="overflow-hidden outline-hidden"
          >
            {searchable && (
              <>
                <CommandPrimitive.Input
                  data-slot="command-input"
                  placeholder={
                    searchPlaceholder ??
                    translate({ de: 'Suche...', en: 'Search...' })
                  }
                  className={cn(
                    'w-full border-b bg-transparent outline-hidden',
                    'border-black bg-white text-black placeholder:text-zinc-500',
                    'dark:border-white dark:bg-black dark:text-white dark:placeholder:text-zinc-500',
                  )}
                />
                <CommandPrimitive.Empty data-slot="command-empty">
                  {emptyMessage ??
                    translate({ de: 'Keine Optionen', en: 'No options' })}
                </CommandPrimitive.Empty>
              </>
            )}
            <CommandPrimitive.List
              data-slot="command-list"
              className="max-h-[300px] overflow-x-hidden overflow-y-auto"
            >
              <CommandPrimitive.Group data-slot="command-group">
                {options.map((item, key) => {
                  const isSelected = handleIsSelected(item);
                  return (
                    <CommandPrimitive.Item
                      data-slot="command-item"
                      key={key}
                      value={item.value}
                      onSelect={() => handleSelect(item)}
                      className={cn(
                        'w-full cursor-pointer outline-hidden',
                        isSelected
                          ? [
                              'bg-black text-white',
                              'dark:bg-white dark:text-black',
                            ]
                          : [
                              'hover:bg-zinc-300 data-[selected=true]:bg-zinc-300',
                              'dark:hover:bg-zinc-700 dark:data-[selected=true]:bg-zinc-700',
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
              </CommandPrimitive.Group>
            </CommandPrimitive.List>
          </CommandPrimitive>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { Select };
