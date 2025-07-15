// stores/trip-ui-store.ts
import { TripsRequestProps } from '#/services/trip/trips-request';
import { create } from 'zustand';

interface TripUIStore {
  trips: TripsRequestProps[];
  setTrips: (trips: TripsRequestProps[]) => void;
  appendTrips: (trips: TripsRequestProps[]) => void;
  resetTrips: () => void;
}

export const useTripUIStore = create<TripUIStore>(set => ({
  trips: [],
  setTrips: trips => set({ trips }),
  appendTrips: trips => set(state => ({ trips: [...state.trips, ...trips] })),
  resetTrips: () => set({ trips: [] }),
}));
