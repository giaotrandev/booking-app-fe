'use client';

import { ComponentProps, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import { cn } from '#/lib/utilities/cn';
import { Icon } from '#/components/icons';
import { useCurrentLocale } from '#/i18n/client';
import { enUS, de, Locale } from 'date-fns/locale';
import { LocaleProps } from '#/i18n/config';

const locales: {
  [key in LocaleProps]: Locale;
} = {
  en: enUS,
  de,
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
      // components={{
      //   IconLeft,
      //   IconRight,
      // }}

      locale={locales[locale]}
      {...props}
      showOutsideDays={showOutsideDays}
      className={cn('', className)}
      classNames={{
        root: 'text-[14px] p-3',
        months: cn('', classNames?.months),
        month: cn('space-y-4', classNames?.month),
        month_grid: 'w-full border-collapse space-y-1', // updated from 'table'
        month_caption: 'relative flex items-center justify-center p-0', // updated from 'caption'
        caption_label:
          'relative z-1 inline-flex items-center justify-between w-full',
        dropdowns: 'relative inline-flex gap-x-4', // updated from 'caption_dropdowns'
        dropdown: 'absolute top-5.5 left-0 z-2 cursor-pointer opacity-0 w-full',
        months_dropdown: 'relative inline-flex items-center', // updated from 'dropdown_month'
        years_dropdown: 'relative inline-flex items-center', // updated from 'dropdown_year'
        nav: 'flex w-full justify-between',
        button_previous: cn(
          'cursor-pointer inline-flex h-10 w-10 rounded items-center justify-center',
          'lg:hocus-visible:bg-pj-input-focus/5',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        ), // ✅ (nav_button_previous -> button_previous)
        button_next: cn(
          'cursor-pointer inline-flex h-10 w-10 rounded items-center justify-center ml-auto',
          'lg:hocus-visible:bg-pj-input-focus/5',
          'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        ), // ✅ (nav_button_next -> button_next)
        // chevron: 'ml-2', // ✅ (dropdown_icon -> chevron)
        weekdays: 'flex w-full', // ✅ (head_row -> weekdays)
        weekday: 'w-full font-semibold text-[12px]', // ✅ (head_cell -> weekday)
        week: 'flex w-full mt-2', // ✅ (row -> week)
        week_number: 'text-[12px]', // ✅ (weeknumber -> week_number)
        day: 'relative inline-flex h-10 rounded w-full items-center justify-center p-0 text-center',
        day_button: cn(
          'm-0 inline-flex h-10 rounded w-full items-center justify-center p-0 cursor-pointer',
          'aria-selected:opacity-100',
          // hover
          'lg:[&:not([aria-selected=true])]:hocus-visible:bg-vs-input-focus/5',
        ),
        outside: 'opacity-50', // ✅ (day_outside -> outside)
        selected: 'bg-black text-white', // ✅ (day_selected -> selected)
        disabled:
          'pointer-events-none opacity-20 aria-selected:bg-pj-input-focus/5', // ✅ (day_disabled -> disabled)
        today: 'font-medium text-pj-orange', // ✅ (day_today -> today)
        hidden: 'invisible', // ✅ (day_hidden -> hidden)
        range_start: 'day-range-start', // ✅ (day_range_start -> range_start)
        range_end: 'day-range-end', // ✅ (day_range_end -> range_end)
        range_middle: '', // ✅ (day_range_middle -> range_middle)
        footer: '', // ✅ (tfoot -> footer)
        weeks: '', // ✅ (tbody -> weeks)
      }}
    />
  );
};
Calendar.displayName = 'Calendar';

export { Calendar };

const IconLeft = () => {
  return (
    <Icon
      name="select-chevron-down"
      className="fill-pj-input-focus stroke-pj-input-focus size-6"
    />
  );
};

const IconRight = () => {
  return (
    <Icon
      name="select-chevron-down"
      className="fill-pj-input-focus stroke-pj-input-focus size-6"
    />
  );
};
