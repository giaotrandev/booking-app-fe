'use client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/components/headless/popover';
import { Button } from '#/components/ui/button';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ButtonIcon } from '#/components/ui/button-icon';
import { cn } from '#/lib/utilities/cn';
import { CustomProvincesSelect } from '#/components/ui/custom-provinces-select';
import { CustomCalendar } from '#/components/ui/custom-calendar';
import { Icon } from '#/components/icons';
import { DateRange } from 'react-day-picker';
import { Typography } from '#/components/ui/typography';
import { useRouter, useSearchParams } from 'next/navigation';
import { parseISO } from 'date-fns';
import { useGlobalsStore } from '#/store/globals';

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
  const { setFilterOpen } = useGlobalsStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sourceProvinceId = searchParams.get('sourceProvinceId');
  const destinationProvinceId = searchParams.get('destinationProvinceId');
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

  const [arrivalOptions, setArrivalOptions] = useState(arrivalList);
  const [destinationOptions, setDestinationOptions] = useState(destinationList);

  const [arrivalPlaceholder, setArrivalPlaceholder] =
    useState('Departure Point');
  const [destinationPlaceholder, setDestinationPlaceholder] =
    useState('Destination Point');

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
      params.append('sourceProvinceId', selectedArrival.value);
    }
    if (selectedDestination) {
      params.append('destinationProvinceId', selectedDestination.value);
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
    if (sourceProvinceId && !selectedArrival) {
      const foundArrival = arrivalList.find(
        arrivalItem => arrivalItem.value === sourceProvinceId,
      );
      if (foundArrival) {
        setSelectedArrival(foundArrival);
      }
    }

    if (destinationProvinceId && !selectedDestination) {
      const foundDestination = destinationList.find(
        destinationItem => destinationItem.value === destinationProvinceId,
      );
      if (foundDestination) {
        setSelectedDestination(foundDestination);
      }
    }

    if ((departureDate || arrivalDate) && !dateRange?.from && !dateRange?.to) {
      setDateRange({
        from: departureDate ? parseISO(departureDate) : undefined,
        to: arrivalDate ? parseISO(arrivalDate) : undefined,
      });
    }
  }, [
    sourceProvinceId,
    destinationProvinceId,
    departureDate,
    arrivalDate,
    arrivalList,
    destinationList,
  ]);
  useEffect(() => {
    setProcessing(false);
  }, [sourceProvinceId, destinationProvinceId, departureDate, arrivalDate]);
  return (
    <div
      className={cn(
        'pointer-events-auto relative flex w-full flex-col items-center gap-y-6 rounded-[20px] bg-white px-4 pt-15 pb-8 lg:max-w-232 lg:flex-row lg:space-y-0 lg:gap-x-3 lg:px-3 lg:py-5',
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
      <div className="flex w-full flex-col items-center justify-between gap-x-2 gap-y-2 md:flex-row md:gap-y-0 lg:w-1/2">
        {arrivalOptions.length > 0 && (
          <div className="w-full">
            <CustomProvincesSelect
              searchable
              disabled={processing}
              options={arrivalOptions}
              multiple={false}
              placeholder={arrivalPlaceholder}
              subPlaceholder="Departure Point"
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
            icon={{ name: 'swap' }}
            aria-label="swap-arrival-and-destination"
            onClick={handleSwap}
          />
        </div>

        {destinationOptions.length > 0 && (
          <div className="w-full">
            <CustomProvincesSelect
              searchable
              disabled={processing}
              options={destinationOptions}
              multiple={false}
              placeholder={destinationPlaceholder}
              subPlaceholder="Destination Point"
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

      <div className="flex w-full flex-col gap-y-6 lg:w-1/2 lg:flex-row lg:gap-x-3 lg:gap-y-0">
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
                className={cn(
                  'relative h-14 w-full rounded-xl border px-4 py-3 text-left lg:h-12',
                )}
                onClick={() => setIsDatePickerOpen(true)}
              >
                <div className="flex items-center justify-between gap-x-2">
                  <div className="flex flex-1 items-center gap-x-2">
                    <Typography asChild className="text-nowrap">
                      <span>
                        {dateRange?.from
                          ? format(dateRange.from, dateFormat)
                          : 'Departure date'}
                      </span>
                    </Typography>
                    <span className="text-gray-400">|</span>
                    <Typography asChild className="text-nowrap">
                      <span>
                        {dateRange?.to
                          ? format(dateRange.to, dateFormat)
                          : 'Departure date'}
                      </span>
                    </Typography>
                  </div>
                  <Icon name="date" className="fill-pj-grey-light h-4 w-4" />
                </div>
              </button>
            </PopoverTrigger>
            <PopoverContent className="pointer-events-auto relative z-[1094] mt-4 w-[var(--radix-popover-trigger-width)] p-0 lg:w-auto">
              <CustomCalendar
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
              />
              <CustomCalendar
                mode="range"
                // timeZone="UTC"
                numberOfMonths={2}
                className="hidden lg:block"
                defaultMonth={dateRange?.from || new Date()}
                selected={dateRange}
                onSelect={handleDateRangeSelect}
                disabled={date =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                startMonth={new Date()}
                endMonth={new Date(new Date().getFullYear() + 5, 11)}
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="w-full lg:w-auto">
          <Button
            text={processing ? 'Searching…' : 'Search'}
            className="w-full lg:min-h-12 lg:w-auto"
            disabled={
              processing ||
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
