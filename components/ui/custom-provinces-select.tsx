'use client';
import { useTranslate } from '#/i18n/client';
import { cn } from '#/lib/utilities/cn';
import { CommandEmpty, Command as CommandPrimitive } from 'cmdk';
import { useEffect, useRef, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../headless/popover';
import { Icon } from '../icons';
import { inputVariants } from './input';
import { Typography } from './typography';
import { useVirtualizer } from '@tanstack/react-virtual';

export interface CustomProvincesSelectOptionProps {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface CustomProvincesSelectProps {
  options: CustomProvincesSelectOptionProps[];
  multiple?: boolean;
  placeholder?: string;
  subPlaceholder?: string;
  emptyMessage?: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  disabled?: boolean;
  value?:
    | CustomProvincesSelectOptionProps
    | CustomProvincesSelectOptionProps[]
    | undefined;
  onChange?: (
    value:
      | CustomProvincesSelectOptionProps
      | CustomProvincesSelectOptionProps[]
      | undefined,
  ) => void;
}

const CustomProvincesSelect = ({
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
}: CustomProvincesSelectProps) => {
  const { translate } = useTranslate();
  const ref = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  // State để track search value
  const [searchValue, setSearchValue] = useState<string>('');
  const normalizeText = (text: string) => {
    return text
      .toLowerCase()
      .normalize('NFD') // Decompose accented characters
      .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
      .replace(/đ/g, 'd') // Replace đ with d
      .replace(/Đ/g, 'D'); // Replace Đ with D
  };
  // Filter options based on search value
  const filteredOptions =
    searchable && searchValue
      ? options.filter(option => {
          const normalizedLabel = normalizeText(option.label);
          const normalizedSearch = normalizeText(searchValue);
          return normalizedLabel.includes(normalizedSearch);
        })
      : options;

  const rowVirtualizer = useVirtualizer({
    count: filteredOptions.length || 0,
    getScrollElement: () => listRef.current,
    estimateSize: () => 30,
    overscan: 5,
  });

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        rowVirtualizer.measure();
      }, 10);
      return () => clearTimeout(timeout);
    }
  }, [open, rowVirtualizer]);

  // Reset search when popover closes
  useEffect(() => {
    if (!open) {
      setSearchValue('');
    }
  }, [open]);

  const valueSelected = value ? (Array.isArray(value) ? value : [value]) : [];

  const handleSelect = (option: CustomProvincesSelectOptionProps) => {
    if (!option) return;

    const existed = valueSelected.some(
      item => item.label === option.label && item.value === option.value,
    );
    const optionSelected = multiple
      ? existed
        ? valueSelected.filter(
            item => item.label !== option.label || item.value !== option.value,
          )
        : [...valueSelected, option]
      : existed
        ? []
        : [option];

    onChange?.(
      multiple
        ? optionSelected
        : optionSelected.length > 0
          ? optionSelected[0]
          : undefined,
    );

    if (!multiple) {
      setOpen(false);
    }
  };

  const handleIsSelected = (option: CustomProvincesSelectOptionProps) =>
    valueSelected.some(
      item => item.label === option.label && item.value === option.value,
    );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="rounded-xl">
        <button
          type="button"
          className={cn(
            inputVariants(),
            'relative line-clamp-1 flex cursor-pointer items-center py-2 pr-3 text-left',
          )}
          disabled={disabled}
        >
          <Typography
            asChild
            variant="small-label"
            className={cn(
              'absolute top-0.5 left-3 text-[10px] text-zinc-500 transition-opacity',
              valueSelected.length > 0 ? 'opacity-100' : 'opacity-0',
            )}
          >
            <span>{subPlaceholder}</span>
          </Typography>
          {valueSelected.length > 0 ? (
            <Typography className="text-black" asChild variant="small-label">
              <span>{valueSelected.map(item => item.label).join(', ')}</span>
            </Typography>
          ) : (
            <span className="text-zinc-500">{placeholder}</span>
          )}
          <span className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2">
            <Icon
              name="chevron-down"
              className={cn(
                'size-4 fill-black stroke-black',
                open && '-scale-y-100',
              )}
            />
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        className="pointer-events-auto relative top-2 z-[99999999] w-[var(--radix-popover-trigger-width)]"
        onOpenAutoFocus={e => {
          try {
            ref.current?.focus();
          } catch (error) {
            console.warn('Focus error:', error);
          }
        }}
      >
        <div className="rounded-xl border border-black bg-white px-2 py-4 text-black">
          <CommandPrimitive
            ref={ref}
            className="custom-select-scrollbar overflow-hidden bg-white outline-none"
            shouldFilter={false}
          >
            {searchable && (
              <>
                {/* Sử dụng input HTML thông thường thay vì CommandPrimitive.Input */}
                <input
                  placeholder={
                    searchPlaceholder ??
                    translate({ vi: 'Tìm kiếm...', en: 'Search...' })
                  }
                  className="w-full border-b border-black bg-white px-2 py-1 text-black outline-none placeholder:text-zinc-500"
                  value={searchValue}
                  onChange={e => setSearchValue(e.target.value)}
                />
                {searchValue && filteredOptions.length === 0 && (
                  <div className="cursor-default p-2 text-center text-zinc-500 outline-none select-none">
                    {emptyMessage ??
                      translate({ vi: 'Không có lựa chọn', en: 'No options' })}
                  </div>
                )}
              </>
            )}
            <CommandPrimitive.List className="max-h-[300px] overflow-x-hidden overflow-y-auto">
              {!searchable && options.length === 0 && (
                <CommandEmpty className="cursor-default p-2 text-center text-zinc-500 outline-none select-none">
                  {emptyMessage ??
                    translate({ vi: 'Không có lựa chọn', en: 'No options' })}
                </CommandEmpty>
              )}

              <CommandPrimitive.Group>
                {Array.isArray(filteredOptions) &&
                  filteredOptions.length > 0 &&
                  open && (
                    <div
                      ref={listRef}
                      className="relative z-[1] flex max-h-[160px] flex-col gap-y-3 overflow-auto"
                    >
                      <div
                        style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
                        className="relative flex w-full flex-col gap-y-1.5"
                        // tabIndex={-1}
                      >
                        {rowVirtualizer.getVirtualItems().map(virtualRow => {
                          const item = filteredOptions[virtualRow.index];
                          if (!item) return null;

                          const isSelected = handleIsSelected(item);

                          return (
                            <CommandPrimitive.Item
                              data-slot="command-item"
                              key={`${item.value}-${virtualRow.index}`}
                              // Giữ nguyên value là ID
                              value={item.value}
                              onSelect={() => handleSelect(item)}
                              className={cn(
                                'lg:data-[selected=true]:bg-pj-blue/70 absolute right-0 left-0 flex w-full cursor-pointer items-center rounded-xl px-1.5 leading-[0.875] outline-none lg:data-[selected=true]:text-white',
                                isSelected
                                  ? 'bg-pj-blue text-white'
                                  : 'hocus:bg-pj-blue/70 hocus:text-white',
                                'disabled:pointer-events-none disabled:opacity-50',
                              )}
                              style={{
                                transform: `translateY(${virtualRow.start}px)`,
                                height: `${virtualRow.size}px`,
                              }}
                              disabled={item.disabled}
                            >
                              {item.label}
                            </CommandPrimitive.Item>
                          );
                        })}
                      </div>
                    </div>
                  )}
              </CommandPrimitive.Group>
            </CommandPrimitive.List>
          </CommandPrimitive>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export { CustomProvincesSelect };
