'use client';
import Accordion from './abstract-accordion';
import FilterList from './filter-list';

const FilterAccordion = () => {
  return (
    <div className="w-full">
      <Accordion
        list={sampleFilterList.map((item, index) => {
          return {
            title: item.title,
            id: `filter-accordion-${index}`,
            children:
              Array.isArray(item.list) && item.list.length > 0 ? (
                <div>
                  <FilterList
                    options={item.list}
                    isMultiple={item.isMultiple}
                  />
                </div>
              ) : undefined,
          };
        })}
      />
    </div>
  );
};

export default FilterAccordion;
const sampleFilterList = [
  {
    title: 'sort by',
    list: [
      {
        label: 'Earliest Arrival ',
        value: 'earliest-arrival',
      },
      {
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
    list: [
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
  },
];
