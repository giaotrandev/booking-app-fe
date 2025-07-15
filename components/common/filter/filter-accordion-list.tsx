'use client';
import Accordion from '../abstract-accordion';
import FilterList, { FilterItemProps } from './filter-item';
export interface FilterAccordionListProps {}
const FilterAccordionList = ({}: FilterAccordionListProps) => {
  return (
    <div className="custom-scrollbar lg:max-h-135 lg:overflow-y-auto">
      <div className="pb-6 lg:mr-2">
        <Accordion
          list={sampleFilterList.map((item, index) => {
            return {
              title: item.title,
              id: `filter-accordion-${index}`,
              children: (
                <FilterList
                  filterType={item.filterType as FilterItemProps['filterType']}
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
const sampleFilterList = [
  {
    title: 'sort by',
    filterType: 'checkbox',
    optionList: [
      {
        id: '1',
        label: 'Earliest Arrival ',
        value: 'earliest-arrival',
      },
      {
        id: '1',
        label: 'Latest Arrival ',
        value: 'latest-arrival',
      },
      {
        label: 'Cheapest Price',
        value: 'cheapest-price',
      },
    ],
    isMultiple: true,
  },
  {
    title: 'sort by',
    filterType: 'radio',
    optionList: [
      {
        label: 'Earliest Arrival 2',
        value: 'earliest-arrival-2',
      },
      {
        label: 'Latest Arrival 3',
        value: 'latest-arrival-3',
      },
      {
        label: 'Cheapest Price 4',
        value: 'cheapest-price-4',
      },
    ],
    isMultiple: false,
  },
  {
    title: 'sort by',
    filterType: 'radio',
    optionList: [
      {
        label: 'Earliest Arrival 2',
        value: 'earliest-arrival-2',
      },
      {
        label: 'Latest Arrival 3',
        value: 'latest-arrival-3',
      },
      {
        label: 'Cheapest Price 4',
        value: 'cheapest-price-4',
      },
    ],
    isMultiple: false,
  },
  {
    title: 'Giá vé',
    filterType: 'range',
    initialMin: 0,
    initialMax: 10000,
    min: 0,
    max: 10000,
    step: 500,
    priceGap: 1000,
  },
];
