import { format, parseISO, isValid } from 'date-fns';
import { enUS, vi } from 'date-fns/locale';

export const formatUtcTime = (isoString?: string) => {
  if (!isoString) return '';
  try {
    return format(parseISO(isoString), 'HH:mm');
  } catch {
    return '';
  }
};
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

export const formatDate = (date?: Date, locale: 'en' | 'vi' = 'en') => {
  if (!date || !isValid(date)) return '';
  return format(date, 'yyyy-MM-dd', {
    locale: locale === 'vi' ? vi : enUS,
  });
};
export const formatTime = (val: number): string => {
  const h = Math.floor(val / 60)
    .toString()
    .padStart(2, '0');
  const m = (val % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
};
