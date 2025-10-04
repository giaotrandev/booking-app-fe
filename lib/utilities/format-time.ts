import { format, parseISO, isValid, intervalToDuration } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';
//"17:45"
export const formatUtcTime = (isoString?: string) => {
  if (!isoString) return '';
  try {
    return format(parseISO(isoString), 'HH:mm');
  } catch {
    return '';
  }
};

// "12 August 2025" | "12 tháng 8 2025"
export const formatUtcDate = (
  isoString?: string,
  locale: 'en' | 'vi' = 'en',
) => {
  if (!isoString) return '';

  const date = parseISO(isoString);
  if (!isValid(date)) return '';

  return format(date, 'd MMMM yyyy', {
    locale: locale === 'vi' ? vi : enUS,
  });
};

// "2025-08-12"
export const formatDate = (date?: Date, locale: 'en' | 'vi' = 'en') => {
  if (!date || !isValid(date)) return '';
  return format(date, 'yyyy-MM-dd', {
    locale: locale === 'vi' ? vi : enUS,
  });
};

// // 645 phút = 10 giờ 45 phút
// h = 10, m = 45
// => "10:45"
export const formatTime = (val: number): string => {
  const h = Math.floor(val / 60)
    .toString()
    .padStart(2, '0');
  const m = (val % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
};

// hh = 17, mm = 45
// => 17*60 + 45 = 1065
// 👉 Kết quả: 1065

export const parseTimeStringToMinutes = (
  timeStr?: string | null,
  fallback = 0,
): number => {
  if (!timeStr) return fallback;
  // timeStr thường là "HH:MM" (searchParams.get trả về decoded string)
  const parts = timeStr.split(':');
  if (parts.length !== 2) return fallback;
  const hh = Number(parts[0]);
  const mm = Number(parts[1]);
  if (Number.isNaN(hh) || Number.isNaN(mm)) return fallback;
  return hh * 60 + mm;
};

// parseISO thành Date object local +7.
// 👉 Kết quả: Date Tue Aug 12 2025 17:45:00 GMT+0700

export const parseDate = (dateString?: string) => {
  if (!dateString) return undefined;
  const date = parseISO(dateString);
  return isValid(date) ? date : undefined;
};

// console.log(formatFullDateWithWeekday(iso, 'vi'));
// // 👉 "Thứ hai, 25/08/2025"

export const formatFullDateWithWeekday = (
  isoString?: string,
  locale: 'en' | 'vi' = 'en',
) => {
  if (!isoString) return '';
  const date = parseISO(isoString);
  if (!isValid(date)) return '';

  return format(date, 'EEEE, dd/MM/yyyy', {
    locale: locale === 'vi' ? vi : enUS,
  });
};

// console.log(formatDuration(300)); // "5h"
// console.log(formatDuration(180)); // "3h"
// console.log(formatDuration(210)); // "3h30m"
export function formatDuration(
  minutes: number,
  locale: 'en' | 'vi' = 'en',
): string {
  if (!minutes) return '';

  const { hours = 0, minutes: mins = 0 } = intervalToDuration({
    start: 0,
    end: minutes * 60 * 1000,
  });

  // Define short labels per locale
  const labels = {
    en: { h: 'h', m: 'm' },
    vi: { h: 'g', m: 'p' },
  }[locale];

  if (mins === 0) return `${hours}${labels.h}`;
  if (hours === 0) return `${mins}${labels.m}`;
  return `${hours}${labels.h}-${mins}${labels.m}`;
}
