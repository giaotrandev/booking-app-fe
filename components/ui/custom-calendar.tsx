'use client';
import { useCurrentLocale } from '#/i18n/client';
import { LocaleProps } from '#/i18n/config';
import { cn } from '#/lib/utilities/cn';
import { enUS, Locale, vi } from 'date-fns/locale';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from 'lucide-react';
import { ComponentProps } from 'react';
import { DayPicker } from 'react-day-picker';
import { Icon } from '../icons';

const locales: {
  [key in LocaleProps]: Locale;
} = {
  en: enUS,
  vi: vi,
};

export type CustomCalendarProps = ComponentProps<typeof DayPicker>;

const CustomCalendar = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CustomCalendarProps) => {
  const locale = useCurrentLocale();
  return (
    <DayPicker
      locale={locales[locale]}
      {...props}
      captionLayout="dropdown"
      showOutsideDays={showOutsideDays}
      className={cn('', className)}
      // classNames={{
      //   root: 'text-[14px] rounded-xl border p-2 bg-white relative',
      //   months: 'flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0',
      //   month: 'space-y-4',
      //   day: cn(
      //     'relative m-0 inline-flex w-8 rounded h-8 items-center justify-center p-0',
      //     'aria-selected:opacity-100 font-normal',
      //   ),
      //   day_button: 'h-full w-full lg:cursor-pointer',
      //   caption_label:
      //     'relative z-1 inline-flex items-center whitespace-nowrap border-0 cursor-pointer [&_svg]:ml-1',
      //   button_next: cn(
      //     'pointer-events-auto inline-flex size-10 items-center justify-center rounded lg:cursor-pointer',
      //     'lg:hocus-visible:bg-pj-input-focus/5',
      //     'disabled:pointer-events-none disabled:opacity-50',
      //   ),
      //   button_previous: cn(
      //     'pointer-events-auto inline-flex size-10 items-center justify-center rounded lg:cursor-pointer',
      //     'lg:hocus-visible:bg-pj-input-focus/5',
      //     'disabled:pointer-events-none disabled:opacity-50',
      //   ),
      //   chevron: 'inline-block',
      //   dropdowns: 'relative inline-flex items-center space-x-4 pl-4 b',
      //   dropdown:
      //     'absolute z-2 opacity-0 appearance-none w-full m-0 p-2 border-none',
      //   dropdown_root: 'relative inline-flex items-center',
      //   month_caption: 'flex justify-center items-center h-10',
      //   month_grid: 'w-full border-collapse space-y-1 mt-4',
      //   nav: 'pointer-events-none absolute left-0 top-0 flex w-full justify-between',
      //   week: 'flex flex-nowrap mt-2',
      //   weekday: 'grow shrink-0 basis-[0%]',
      //   weekdays: 'flex flex-nowrap text-[12px]',
      //   today: cn('font-medium', 'text-pj-blue'),
      //   selected: cn(
      //     'bg-pj-blue text-white',
      //     'data-today:text-pj-blue',
      //     'opacity-100',
      //   ),
      //   outside: 'opacity-50',
      //   disabled: cn(
      //     'pointer-events-none opacity-20',
      //     'aria-selected:bg-pj-input-focus/5',
      //   ),
      //   hidden: 'invisible',
      //   // Range styling
      //   range_start: cn(
      //     'bg-pj-blue text-white rounded-l-full',
      //     'relative z-[2] before:absolute before:content-[""] before:inset-y-0 before:right-0 before:w-2 before:bg-pj-blue/20',
      //   ),
      //   range_end: cn(
      //     'bg-pj-blue text-white rounded-r-full',
      //     'relative z-[2] before:absolute before:content-[""] before:inset-y-0 before:left-0 before:w-2 before:bg-pj-blue/20',
      //   ),
      //   range_middle: 'bg-pj-blue/20 text-pj-blue rounded-none',
      // }}
      classNames={{
        root: 'text-[14px] rounded-xl border p-2 bg-white relative',
        day: cn(
          // 'h-10 grow shrink-0 basis-[0%] rounded',
          // 'lg:[&:not([aria-selected=true])]:hocus-visible:bg-pj-input-focus/5',
          'relative m-0 inline-flex w-8  h-8 items-center justify-center p-0',
          'aria-selected:opacity-100 font-normal',
        ),
        day_button: 'h-full w-full lg:cursor-pointer',
        caption_label:
          'relative z-1 inline-flex items-center whitespace-nowrap border-0 cursor-pointer [&_svg]:ml-1',
        button_next: cn(
          'pointer-events-auto inline-flex size-10 items-center justify-center rounded lg:cursor-pointer',
          'lg:hocus-visible:bg-pj-input-focus/5',
          'disabled:pointer-events-none disabled:opacity-50',
        ),
        button_previous: cn(
          'pointer-events-auto inline-flex size-10 items-center justify-center rounded lg:cursor-pointer',
          'lg:hocus-visible:bg-pj-input-focus/5',
          'disabled:pointer-events-none disabled:opacity-50',
        ),
        chevron: 'inline-block',
        dropdowns: 'relative inline-flex items-center space-x-4 pl-4 b',
        dropdown:
          'absolute z-2 opacity-0 appearance-none w-full m-0 p-2 border-none',
        dropdown_root: 'relative inline-flex items-center',
        month_caption: 'flex justify-center items-center h-10',
        // months: 'relative',
        months: 'flex flex-col space-y-4 lg:flex-row lg:space-x-4 lg:space-y-0',
        month_grid: 'w-full border-collapse space-y-1 mt-4',
        nav: 'pointer-events-none absolute left-0 top-2 flex w-full justify-between',
        week: 'flex flex-nowrap mt-2',
        weekday: 'grow shrink-0 basis-[0%]',
        weekdays: 'flex flex-nowrap text-[12px]',
        // week_number: '',
        today: cn('font-medium', 'text-pj-blue bg-pj-blue/20 rounded-[50%]'),
        selected: cn(
          'bg-pj-blue text-white ',
          'data-today:text-pj-blue',
          'opacity-100',
        ),
        outside: 'opacity-50',
        disabled: cn(
          'pointer-events-none opacity-20',
          'aria-selected:bg-pj-input-focus/5',
        ),
        hidden: 'invisible',
        range_start:
          'relative z-[2] text-white rounded-l-[50%] before:absolute before:content-[""] before:inset-[0_2px_0_2px] before:bg-pj-blue before:-z-[1] before:rounded-[50%] after:absolute after:inset-[0_0_0_2px] after:bg-pj-blue/20 after:rounded-l-[50%] day-range-start after:-z-[1]',
        range_end:
          'relative z-[2] text-white rounded-r-[50%] before:absolute before:content-[""] before:inset-[0_2px_0_2px] before:bg-pj-blue before:-z-[1] before:rounded-[50%] day-range-end after:absolute after:inset-[0_2px_0_0] after:bg-pj-blue/20 after:rounded-r-[50%] after:-z-[1]',
        range_middle: 'bg-pj-blue/20',
      }}
      components={{
        Chevron: props => {
          if (props.orientation === 'left') {
            return (
              <Icon
                name="select-chevron-down"
                className="fill-pj-input-focus stroke-pj-input-focus size-6 rotate-90"
              />
            );
          }
          if (props.orientation === 'right') {
            return (
              <Icon
                name="select-chevron-down"
                className="fill-pj-input-focus stroke-pj-input-focus size-6 -rotate-90"
              />
            );
          }
          if (props.orientation === 'up') {
            return <ChevronUp className={cn('size-4', props.className)} />;
          }
          return <ChevronDown className={cn('size-4', props.className)} />;
        },
      }}
    />
  );
};
CustomCalendar.displayName = 'CustomCalendar';

export { CustomCalendar };
