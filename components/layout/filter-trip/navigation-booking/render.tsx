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
}

const NavigationBooking = ({
  arrivalList = [],
  destinationList = [],
  className,
  dateContainerClassName,
}: NavigationBookingProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sourceProvinceId = searchParams.get('sourceProvinceId');
  const destinationProvinceId = searchParams.get('destinationProvinceId');
  const departureDate = searchParams.get('departureDate');
  const returnDate = searchParams.get('returnDate');
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
      params.append('returnDate', format(dateRange.to, 'yyyy-MM-dd'));
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

    if ((departureDate || returnDate) && !dateRange?.from && !dateRange?.to) {
      setDateRange({
        from: departureDate ? parseISO(departureDate) : undefined,
        to: returnDate ? parseISO(returnDate) : undefined,
      });
    }
  }, [
    sourceProvinceId,
    destinationProvinceId,
    departureDate,
    returnDate,
    arrivalList,
    destinationList,
  ]);
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center space-y-6 rounded-[20px] bg-white p-4 lg:max-w-280 lg:flex-row lg:space-y-0 lg:p-7',
        className,
      )}
    >
      <div className="flex w-full flex-col items-center gap-y-6 lg:flex-row lg:space-x-8 lg:gap-y-0">
        {arrivalOptions.length > 0 && (
          <div className="w-full min-w-[263px]">
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
          <div className="w-full min-w-[263px]">
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

      {/* Date Range Input */}
      <div
        className={cn(
          'relative z-[1091] w-full lg:ml-4.5 lg:min-w-[250px]',
          dateContainerClassName,
        )}
      >
        <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className={cn(
                'relative w-full rounded-md border px-4 py-3 text-left',
              )}
              onClick={() => setIsDatePickerOpen(true)}
            >
              <div className="flex items-center justify-between">
                <div className="flex flex-1 items-center space-x-2">
                  <Typography asChild variant="sub-body">
                    <span>
                      {dateRange?.from
                        ? format(dateRange.from, dateFormat)
                        : 'Arrival date'}
                    </span>
                  </Typography>
                  <span className="text-gray-400">|</span>
                  <Typography asChild variant="sub-body">
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
          <PopoverContent className="relative z-[1091] mt-4 w-auto p-0">
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

      <div className="ml-4.5">
        <Button
          text="search"
          disabled={
            !selectedArrival ||
            !selectedDestination ||
            !dateRange?.from ||
            !dateRange?.to
          }
          onClick={handleSearchTrip}
        />
      </div>
    </div>
  );
};

export default NavigationBooking;
