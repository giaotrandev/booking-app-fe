'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/components/headless/popover';
import { Icon } from '#/components/icons';
import { Button } from '#/components/ui/button';
import { ButtonIcon } from '#/components/ui/button-icon';
import { CustomCalendar } from '#/components/ui/custom-calendar';
import { CustomProvincesSelect } from '#/components/ui/custom-provinces-select';
import { Typography } from '#/components/ui/typography';
import { useTranslate } from '#/i18n/client';
import { cn } from '#/lib/utilities/cn';
import { sanitizeTitle } from '#/lib/utilities/sanitize-title';
import { useGlobalsStore } from '#/store/globals';
import { format, parseISO } from 'date-fns';
// import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useMediaQuery } from 'usehooks-ts';
import { useCurrentLocale } from '#/i18n/client';
import { useRouter } from '#/i18n/routing';
import { useSearchParams } from 'next/navigation';

const dateFormat = 'dd-MM-yyyy';

export interface FilterItemProps {
  label: string;
  value: string;
}

export interface NavigationBookingProps {
  arrivalList?: FilterItemProps[];
  destinationList?: FilterItemProps[];
  className?: string;
  dateContainerClassName?: string;
  buttonContainerClassName?: string;
  isInSpeacialLayout?: boolean;
}

const NavigationBooking = ({
  arrivalList = [],
  destinationList = [],
  className,
  dateContainerClassName,
  buttonContainerClassName,
  isInSpeacialLayout,
}: NavigationBookingProps) => {
  const isTablet = useMediaQuery('(min-width: 767px)');

  const { translate } = useTranslate();

  const { setFilterOpen } = useGlobalsStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sourceProvinceLabel = searchParams.get('from');
  const destinationProvinceLabel = searchParams.get('to');
  const departureDate = searchParams.get('departureDate');
  const arrivalDate = searchParams.get('arrivalDate');
  const [processing, setProcessing] = useState(false);
  const [selectedArrival, setSelectedArrival] = useState<FilterItemProps>();
  const [selectedDestination, setSelectedDestination] =
    useState<FilterItemProps>();

  // Date range state
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  // Popover states
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [arrivalPlaceholder, setArrivalPlaceholder] = useState(
    translate({ vi: 'Điểm xuất phát', en: 'Departure Point' }),
  );
  const [destinationPlaceholder, setDestinationPlaceholder] = useState(
    translate({ vi: 'Điểm đến', en: 'Destination Point' }),
  );
  const hasSearched =
    sourceProvinceLabel === sanitizeTitle(selectedArrival?.label || '') &&
    destinationProvinceLabel ===
      sanitizeTitle(selectedDestination?.label || '') &&
    departureDate ===
      (dateRange?.from ? format(dateRange.from, 'yyyy-MM-dd') : '') &&
    arrivalDate === (dateRange?.to ? format(dateRange.to, 'yyyy-MM-dd') : '');
  const handleSwap = () => {
    if (!selectedArrival && !selectedDestination) {
      const tmp = arrivalPlaceholder;
      setArrivalPlaceholder(destinationPlaceholder);
      setDestinationPlaceholder(tmp);
    } else {
      const tmp = selectedArrival;
      setSelectedArrival(selectedDestination);
      setSelectedDestination(tmp);
    }
  };

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    setDateRange(range);
  };

  const handleSearchTrip = () => {
    setProcessing(true);
    const params = new URLSearchParams();
    if (selectedArrival) {
      params.append('from', sanitizeTitle(selectedArrival.label));
    }
    if (selectedDestination) {
      params.append('to', sanitizeTitle(selectedDestination.label));
    }

    if (dateRange?.from) {
      params.append('departureDate', format(dateRange.from, 'yyyy-MM-dd'));
    }
    if (dateRange?.to) {
      params.append('arrivalDate', format(dateRange.to, 'yyyy-MM-dd'));
    }
    const queryString = params.toString();
    const bookingUrl = queryString ? `/booking?${queryString}` : '/booking';
    router.push(bookingUrl);
  };

  useEffect(() => {
    if (!arrivalList.length || !destinationList.length) return;
    if (sourceProvinceLabel && !selectedArrival) {
      const foundArrival = arrivalList.find(
        arrivalItem => sanitizeTitle(arrivalItem.label) === sourceProvinceLabel,
      );
      if (foundArrival) {
        setSelectedArrival(foundArrival);
      }
    }

    if (destinationProvinceLabel && !selectedDestination) {
      const foundDestination = destinationList.find(
        destinationItem =>
          sanitizeTitle(destinationItem.label) === destinationProvinceLabel,
      );
      if (foundDestination) {
        setSelectedDestination(foundDestination);
      }
    }

    if ((departureDate || arrivalDate) && !dateRange?.from && !dateRange?.to) {
      const range = {
        from: departureDate ? parseISO(departureDate) : undefined,
        to: arrivalDate ? parseISO(arrivalDate) : undefined,
      };
      setDateRange(range);
    }
  }, [
    sourceProvinceLabel,
    destinationProvinceLabel,
    departureDate,
    arrivalDate,
    arrivalList,
    destinationList,
  ]);

  useEffect(() => {
    setProcessing(false);
  }, [
    sourceProvinceLabel,
    destinationProvinceLabel,
    departureDate,
    arrivalDate,
  ]);

  // useEffect(() => {
  //   if (!isDesktop && isDatePickerOpen) {
  //     setIsDatePickerOpen(false);
  //   }
  // }, [isDesktop, isDatePickerOpen, setIsDatePickerOpen]);

  return (
    <div
      className={cn(
        'pointer-events-auto relative flex w-full flex-col items-center gap-y-6 rounded-[20px] bg-white px-4 pt-15 pb-8 lg:max-w-232 lg:flex-row lg:space-y-0 lg:gap-x-3 lg:px-3 lg:py-5',
        // !isInSpeacialLayout && 'mx-auto max-w-150',
        className,
      )}
    >
      {!isInSpeacialLayout && (
        <button
          className="absolute top-4 right-3 lg:hidden"
          onClick={() => setFilterOpen(false)}
        >
          <Icon className="h-6 w-6 stroke-black" name="x-mark" />
        </button>
      )}
      {((Array.isArray(arrivalList) && arrivalList.length > 0) ||
        (Array.isArray(destinationList) && destinationList.length > 0)) && (
        <div className="flex w-full flex-col items-center justify-between gap-x-2 gap-y-2 md:flex-row md:gap-y-0 lg:w-[55%]">
          {Array.isArray(arrivalList) && arrivalList.length > 0 && (
            <div className="w-full">
              <CustomProvincesSelect
                searchable
                disabled={processing}
                options={arrivalList.filter(
                  item => item.value !== selectedDestination?.value,
                )}
                multiple={false}
                placeholder={arrivalPlaceholder}
                subPlaceholder={translate({
                  vi: 'Điểm xuất phát',
                  en: 'Departure Point',
                })}
                value={selectedArrival}
                onChange={value => {
                  if (!Array.isArray(value)) {
                    setSelectedArrival(value);
                  }
                }}
              />
            </div>
          )}
          <div>
            <ButtonIcon
              size="lg"
              icon={{ name: 'swap' }}
              colors="black"
              aria-label="swap-arrival-and-destination"
              onClick={handleSwap}
            />
          </div>

          {Array.isArray(destinationList) && destinationList.length > 0 && (
            <div className="w-full">
              <CustomProvincesSelect
                searchable
                disabled={processing}
                options={destinationList.filter(
                  item => item.value !== selectedArrival?.value,
                )}
                multiple={false}
                placeholder={destinationPlaceholder}
                subPlaceholder={translate({
                  vi: 'Điểm đến',
                  en: 'Destination Point',
                })}
                value={selectedDestination}
                onChange={value => {
                  if (!Array.isArray(value)) {
                    setSelectedDestination(value);
                  }
                }}
              />
            </div>
          )}
        </div>
      )}

      <div className="flex w-full flex-col gap-y-6 lg:w-[45%] lg:flex-row lg:gap-x-3 lg:gap-y-0">
        <div
          className={cn(
            'relative z-[1000] w-full flex-1',
            dateContainerClassName,
          )}
        >
          <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
            <PopoverTrigger asChild>
              <button
                type="button"
                disabled={processing}
                className={cn(
                  'relative h-14 w-full cursor-pointer rounded-xl border px-3 py-3 text-left lg:h-12',
                  'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
                )}
                onClick={() => setIsDatePickerOpen(true)}
              >
                <Typography
                  asChild
                  variant="small-label"
                  className={cn(
                    'absolute top-0.5 left-3 text-[10px] text-zinc-500 transition-opacity',
                    dateRange?.from && dateRange?.to
                      ? 'opacity-100'
                      : 'opacity-0',
                  )}
                >
                  <span>
                    {translate({ vi: 'Từ', en: 'From' })} |{' '}
                    {translate({ vi: 'Đến', en: 'To' })}
                  </span>
                </Typography>
                <div className="flex items-center justify-between gap-x-2">
                  <div className="flex flex-1 items-center gap-x-2">
                    <Typography asChild className="text-nowrap">
                      <span
                        className={cn(
                          '',
                          dateRange?.from && dateRange?.to
                            ? 'text-black'
                            : 'text-zinc-500',
                        )}
                      >
                        {dateRange?.from
                          ? format(dateRange.from, dateFormat)
                          : translate({
                              vi: 'Từ ngày',
                              en: 'From date',
                            })}
                      </span>
                    </Typography>
                    <span className="text-gray-400">|</span>
                    <Typography asChild className="text-nowrap">
                      <span
                        className={cn(
                          '',
                          dateRange?.from && dateRange?.to
                            ? 'text-black'
                            : 'text-zinc-500',
                        )}
                      >
                        {dateRange?.to
                          ? format(dateRange.to, dateFormat)
                          : translate({
                              vi: 'Đến ngày',
                              en: 'To date',
                            })}
                      </span>
                    </Typography>
                  </div>
                  <Icon
                    name="date"
                    className={cn(
                      'h-4 w-4',
                      dateRange?.from && dateRange?.to
                        ? 'fill-black'
                        : 'fill-pj-gray-light',
                    )}
                  />
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="pointer-events-auto relative top-2 z-[9999999] w-full min-w-[250px] p-0 md:max-w-[800px]">
              {/* <CustomCalendar
                mode="range"
                // timeZone="UTC"
                numberOfMonths={1}
                className="lg:hidden"
                defaultMonth={dateRange?.from || new Date()}
                selected={dateRange}
                onSelect={handleDateRangeSelect}
                disabled={date =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                startMonth={new Date()}
                endMonth={new Date(new Date().getFullYear() + 5, 11)}
              /> */}
              <CustomCalendar
                mode="range"
                // timeZone="UTC"
                numberOfMonths={isTablet ? 2 : 1}
                // className="hidden lg:block"
                defaultMonth={dateRange?.from || new Date()}
                selected={dateRange}
                onSelect={handleDateRangeSelect}
                // disabled={date =>
                //   date < new Date(new Date().setHours(0, 0, 0, 0))
                // }
                disabled={{ before: new Date() }}
                startMonth={new Date()}
                endMonth={new Date(new Date().getFullYear() + 5, 11)}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-full lg:w-auto">
          <Button
            text={
              processing
                ? translate({ vi: 'Đang tìm chuyến', en: 'Searching...' })
                : translate({ vi: 'Tìm chuyến', en: 'Search' })
            }
            className="w-full lg:min-h-12 lg:w-auto"
            disabled={
              processing ||
              hasSearched ||
              !selectedArrival ||
              !selectedDestination ||
              !dateRange?.from ||
              !dateRange?.to
            }
            onClick={handleSearchTrip}
          />
        </div>
      </div>
    </div>
  );
};

export default NavigationBooking;
