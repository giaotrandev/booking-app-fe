import { create } from 'zustand';
import { DateRange } from 'react-day-picker';

interface FilterItem {
  label: string;
  value: string;
}

interface BookingFilterState {
  selectedArrival?: FilterItem;
  selectedDestination?: FilterItem;
  dateRange?: DateRange;
  setSelectedArrival: (arrival?: FilterItem) => void;
  setSelectedDestination: (destination?: FilterItem) => void;
  setDateRange: (range?: DateRange) => void; // ✅ sửa type ở đây luôn
  clearFilter: () => void;
}

export const useBookingFilterStore = create<BookingFilterState>(set => ({
  selectedArrival: undefined,
  selectedDestination: undefined,
  dateRange: undefined,
  setSelectedArrival: arrival => set({ selectedArrival: arrival }),
  setSelectedDestination: destination =>
    set({ selectedDestination: destination }),
  setDateRange: range => set({ dateRange: range }),
  clearFilter: () =>
    set({
      selectedArrival: undefined,
      selectedDestination: undefined,
      dateRange: undefined,
    }),
}));
