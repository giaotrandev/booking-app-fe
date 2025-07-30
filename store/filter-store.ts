import {
  maxPriceDefault,
  maxTimeDefault,
  minPriceDefault,
  minTimeDefault,
} from '#/lib/constant';
import { OptionType } from '#/types/global';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type FilterState = {
  pickup: OptionType[];
  dropoff: OptionType[];
  price: [number, number];
  time: [number, number];
};

type FilterStore = {
  filters: FilterState;
  changedKeys: Set<keyof FilterState>;
  setFilter: <K extends keyof FilterState>(
    key: K,
    value: FilterState[K],
  ) => void;
  resetFilters: () => void;
  resetChangedKeys: () => void;
};

const initialFilters: FilterState = {
  pickup: [],
  dropoff: [],
  price: [minPriceDefault, maxPriceDefault],
  time: [minTimeDefault, maxTimeDefault],
};

export const useFilterStore = create<FilterStore>()(
  persist(
    set => ({
      filters: initialFilters,
      changedKeys: new Set(),

      setFilter: (key, value) =>
        set(state => ({
          filters: {
            ...state.filters,
            [key]: value,
          },
          changedKeys: new Set([...state.changedKeys, key]),
        })),

      resetFilters: () =>
        set(() => ({
          // filters: initialFilters,
          filters: { ...initialFilters },
          changedKeys: new Set(),
        })),

      resetChangedKeys: () => set(() => ({ changedKeys: new Set() })),
    }),
    {
      name: 'trip-filters',

      // 💡 chỉ persist phần filters, bỏ qua changedKeys
      partialize: state => ({
        filters: state.filters,
      }),
    },
  ),
);
