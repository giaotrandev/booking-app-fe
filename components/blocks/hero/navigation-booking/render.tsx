'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '#/components/headless/popover';
import { Button } from '#/components/ui/button';
import { Calendar } from '#/components/ui/calendar';
import { Select } from '#/components/ui/select';
import { useState } from 'react';
import { format } from 'date-fns';
import { ButtonIcon } from '#/components/ui/button-icon';
import { cn } from '#/lib/utilities/cn';
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
  arrivalList,
  destinationList,
  className,
  dateContainerClassName,
}: NavigationBookingProps) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [selectedArrival, setSelectedArrival] = useState<FilterItemProps>();
  const [selectedDestination, setSelectedDestination] =
    useState<FilterItemProps>();
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={cn(
        'flex w-full flex-col items-center space-y-6 rounded-[20px] bg-white p-4 lg:max-w-263.75 lg:flex-row lg:space-y-0 lg:p-7',
        className,
      )}
    >
      <div className="flex w-full flex-col items-center gap-y-6 lg:flex-row lg:space-x-8 lg:gap-y-0">
        {Array.isArray(arrivalList) && arrivalList.length > 0 && (
          <div className="w-full min-w-[263px]">
            <Select
              disabled={processing}
              options={arrivalList}
              multiple={false}
              placeholder="Chọn điểm đến"
              value={selectedArrival}
              onChange={value => {
                if (!Array.isArray(value)) {
                  setSelectedArrival(value as FilterItemProps);
                }
              }}
            />
          </div>
        )}
        <div>
          <ButtonIcon
            icon={{ name: 'swap' }}
            aria-label={'swap-arrival-and-destionation'}
          />
        </div>
        {Array.isArray(destinationList) && destinationList.length > 0 && (
          <div className="w-full min-w-[263px]">
            <Select
              disabled={processing}
              options={destinationList}
              multiple={false}
              placeholder="Chọn điểm đi"
              value={selectedDestination}
              onChange={value => {
                if (!Array.isArray(value)) {
                  setSelectedDestination(value as FilterItemProps);
                }
              }}
            />
          </div>
        )}
      </div>
      <div
        className={cn(
          'relative z-[12] w-full lg:ml-4.5 lg:min-w-[180px]',
          dateContainerClassName,
        )}
      >
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              type="button"
              className="relative w-full rounded-md border border-gray-300 px-4 py-2 text-left"
              onClick={() => setIsOpen(true)}
            >
              <span className="text-gray-700">
                {selectedDate ? format(selectedDate, dateFormat) : 'Choose day'}
              </span>
            </button>
          </PopoverTrigger>
          <PopoverContent className="z-[12] mt-4 w-auto p-0">
            <Calendar
              mode="single"
              captionLayout="dropdown"
              selected={selectedDate}
              onSelect={date => {
                setSelectedDate(date);
                setIsOpen(false);
              }}
              startMonth={new Date(new Date().getFullYear() - 100, 0)}
              endMonth={new Date()}
              defaultMonth={selectedDate}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="ml-4.5">
        <Button text="search" />
      </div>
    </div>
  );
};

export { NavigationBooking };
