'use client';
import { useTripSearchParams } from '#/lib/hooks/use-search-params';
import { useEffect, useMemo, useState } from 'react';
import Accordion from '../abstract-accordion';
import FilterList, { FilterAccordionItemProps } from './filter-accordion-item';
import { fetchBusStopFilter } from '#/lib/service/fetch-bus-stop-filter';
import {
  DropoffPointsRequestProps,
  PickUpPointRequestProps,
} from '#/services/trip/filter/bus-stop/bus-stop-request';
import { useFilterStore } from '#/store/filter-store';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  maxPriceDefault,
  maxTimeDefault,
  minPriceDefault,
  minTimeDefault,
} from '#/lib/constant';
import { FilterItemProps } from '#/layouts/home-layout/filter-trip/navigation-booking/item';
import { sanitizeTitle } from '#/lib/utilities/sanitize-title';
import { useDebounce } from '#/lib/hooks/use-debounce';
import { formatTime } from '#/lib/utilities/format-time';
export interface FilterAccordionListProps {
  pickUpFilterList?: PickUpPointRequestProps[];
  dropOffFilterList?: DropoffPointsRequestProps[];
}
const FilterAccordionList = ({
  pickUpFilterList,
  dropOffFilterList,
}: FilterAccordionListProps) => {
  const { filters } = useFilterStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  // ✅ So sánh để biết người dùng đã filter chưa
  const isPriceFiltered =
    filters.price[0] !== minPriceDefault ||
    filters.price[1] !== maxPriceDefault;

  const isTimeFiltered =
    filters.time[0] !== minTimeDefault || filters.time[1] !== maxTimeDefault;
  // 👇 debounce chỉ time & price
  const priceString = useMemo(
    () => JSON.stringify(filters.price),
    [filters.price],
  );
  const timeString = useMemo(
    () => JSON.stringify(filters.time),
    [filters.time],
  );

  const debouncedPriceString = useDebounce(priceString, 1000);
  const debouncedTimeString = useDebounce(timeString, 1000);
  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());

    // Pickup
    if (Array.isArray(filters.pickup) && filters.pickup.length > 0) {
      params.set(
        'pickup-points',
        filters.pickup.map(p => sanitizeTitle(p.label)).join(','),
      );
    } else {
      params.delete('pickup-points');
    }

    // Dropoff
    if (Array.isArray(filters.dropoff) && filters.dropoff.length > 0) {
      params.set(
        'dropoff-points',
        filters.dropoff.map(p => sanitizeTitle(p.label)).join(','),
      );
    } else {
      params.delete('dropoff-points');
    }

    router.replace(`?${params.toString()}`);
  }, [filters.pickup, filters.dropoff]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams?.toString());

    // Parse back from JSON string
    const [minPrice, maxPrice] = JSON.parse(debouncedPriceString);
    const [minTime, maxTime] = JSON.parse(debouncedTimeString);

    const isPriceChanged =
      minPrice !== minPriceDefault || maxPrice !== maxPriceDefault;
    if (isPriceChanged) {
      params.set('minPrice', minPrice.toString());
      params.set('maxPrice', maxPrice.toString());
    } else {
      params.delete('minPrice');
      params.delete('maxPrice');
    }

    const isTimeChanged =
      minTime !== minTimeDefault || maxTime !== maxTimeDefault;
    if (isTimeChanged) {
      params.set('minTime', formatTime(minTime));
      params.set('maxTime', formatTime(maxTime));
    } else {
      params.delete('minTime');
      params.delete('maxTime');
    }

    router.replace(`?${params.toString()}`);
  }, [debouncedPriceString, debouncedTimeString]);

  // if (isLoading) return null;

  const filterList = [
    ...(Array.isArray(pickUpFilterList) && pickUpFilterList.length > 0
      ? [
          {
            filterKey: 'pickup',
            title: 'Pick-up points',
            filterType: 'checkbox',
            optionList: pickUpFilterList.map(item => ({
              id: item.id,
              label: item.name ?? '',
              value: item.id,
            })),
            isMultiple: true,
          },
        ]
      : []),
    ...(Array.isArray(dropOffFilterList) && dropOffFilterList.length > 0
      ? [
          {
            filterKey: 'dropoff',
            title: 'Drop-off point',
            filterType: 'checkbox',
            optionList: dropOffFilterList.map(item => ({
              id: item.id,
              label: item.name ?? '',
              value: item.id,
            })),
            isMultiple: true,
          },
        ]
      : []),
    {
      filterKey: 'price',
      title: 'Price',
      filterType: 'range-price',
      initialMin: isPriceFiltered ? filters.price[0] : minPriceDefault,
      initialMax: isPriceFiltered ? filters.price[1] : maxPriceDefault,
      min: minPriceDefault,
      max: maxPriceDefault,
      step: 500,
      priceGap: 1000,
    },
    {
      filterKey: 'time',
      title: 'Departure time',
      filterType: 'range-time',
      initialMin: isTimeFiltered ? filters.time[0] : minTimeDefault,
      initialMax: isTimeFiltered ? filters.time[1] : maxTimeDefault,
      min: minTimeDefault,
      max: maxTimeDefault,
      step: 15,
      priceGap: 15,
    },
  ];

  return (
    <div className="custom-scrollbar lg:max-h-135 lg:overflow-y-auto">
      <div className="pb-6 lg:mr-2">
        <Accordion
          list={filterList
            .filter(item => item.title?.trim())
            .map((item, index) => {
              return {
                title: item.title,
                id: `filter-accordion-${index}`,
                children: (
                  <FilterList
                    filterType={
                      item.filterType as FilterAccordionItemProps['filterType']
                    }
                    filterKey={
                      item.filterKey as FilterAccordionItemProps['filterKey']
                    }
                    options={item.optionList}
                    isMultiple={item.isMultiple}
                    initialMin={item.initialMin}
                    initialMax={item.initialMax}
                    min={item.min}
                    max={item.max}
                    step={item.step}
                    priceGap={item.priceGap}
                  />
                ),
              };
            })}
        />
      </div>
    </div>
  );
};

export default FilterAccordionList;
