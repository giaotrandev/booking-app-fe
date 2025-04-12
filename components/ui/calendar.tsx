'use client';

import { ComponentProps } from 'react';
import { DayPicker } from 'react-day-picker';
import { cn } from '#/lib/utilities/cn';
import { Icon } from '#/components/icons';
import { useCurrentLocale } from '#/i18n/client';
import { enUS, de, Locale } from 'date-fns/locale';
import { LocaleProps } from '#/i18n/config';

const locales: {
  [key in LocaleProps]: Locale;
} = {
  de: de,
  en: enUS,
};

export type CalendarProps = ComponentProps<typeof DayPicker>;

const Calendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) => {
  const locale = useCurrentLocale();

  return (
    <DayPicker
      locale={locales[locale]}
      showOutsideDays={showOutsideDays}
      components={{
        Nav: CustomNav,
      }}
      className={cn('', className)}
      classNames={{
        root: 'text-[14px]',
        vhidden:
          'absolute! top-0 m-0 box-border h-px! w-px! appearance-none overflow-hidden! border-0! bg-transparent p-0',
        caption: 'relative flex items-center justify-center p-0',
        caption_label:
          'relative z-1 inline-flex items-center whitespace-nowrap px-2 py-1',
        caption_dropdowns: 'relative inline-flex',
        dropdown:
          'absolute inset-0 z-2 w-full cursor-pointer appearance-none border-none bg-transparent p-0 opacity-0',
        dropdown_month: cn('relative inline-flex items-center'),
        dropdown_year: cn('relative inline-flex items-center'),
        dropdown_icon: 'ml-2 mb-1',
        months: cn('', classNames?.months),
        month: cn('space-y-4', classNames?.month),
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex w-full',
        head_cell: 'w-full font-semibold text-[12px]',
        nav: 'pointer-events-none absolute left-0 top-1/2 flex w-full -translate-y-1/2 justify-between',
        nav_button:
          'pointer-events-auto inline-flex h-7 w-7 items-center justify-center disabled:pointer-events-none disabled:opacity-50',
        nav_button_next: 'ml-auto',
        row: 'flex w-full mt-2',
        weeknumber: 'text-[12px]',
        cell: 'relative inline-flex h-9 w-full items-center justify-center p-0 text-center',
        day: cn(
          'm-0 inline-flex h-9 w-full items-center justify-center p-0',
          'aria-selected:opacity-100',
          '[&:not([aria-selected=true])]:hover:bg-zinc-300',
          'dark:[&:not([aria-selected=true])]:hover:bg-zinc-700',
        ),
        day_outside: 'opacity-50',
        day_selected: cn('bg-black text-white', 'dark:bg-white dark:text-black'),
        day_disabled: cn(
          'pointer-events-none opacity-20',
          'aria-selected:bg-zinc-700',
          'dark:aria-selected:bg-zinc-300',
        ),
        day_hidden: 'invisible',
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_today: cn('font-medium', 'text-amber-500', 'dark:text-amber-500'),
      }}
      {...props}
    />
  );
};

Calendar.displayName = 'Calendar';
export { Calendar };

// ✅ Custom Nav (fix for DayPicker v9.0.7)
type CustomNavProps = {
  previousMonth?: Date;
  nextMonth?: Date;
  onPreviousClick?: React.MouseEventHandler<HTMLButtonElement>;
  onNextClick?: React.MouseEventHandler<HTMLButtonElement>;
};

const CustomNav = ({
  previousMonth,
  nextMonth,
  onPreviousClick,
  onNextClick,
}: CustomNavProps) => {
  return (
    <div className="pointer-events-none absolute left-0 top-1/2 flex w-full -translate-y-1/2 justify-between">
      <button
        type="button"
        onClick={onPreviousClick}
        disabled={!previousMonth}
        className="pointer-events-auto inline-flex h-7 w-7 items-center justify-center disabled:pointer-events-none disabled:opacity-50"
      >
        <Icon name="chevron-left" className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={onNextClick}
        disabled={!nextMonth}
        className="pointer-events-auto inline-flex h-7 w-7 items-center justify-center disabled:pointer-events-none disabled:opacity-50 ml-auto"
      >
        <Icon name="chevron-right" className="h-4 w-4" />
      </button>
    </div>
  );
};
