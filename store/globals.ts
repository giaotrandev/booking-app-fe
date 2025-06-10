'use client';
import { create } from 'zustand';

type GlobalsStateProps = {
  sidenavOpen: boolean;
  tabBookingActive: number;
};

type GlobalsActionsProps = {
  setSidenavOpen: (payload: GlobalsStateProps['sidenavOpen']) => void;
  setTabBookingActive: (payload: GlobalsStateProps['tabBookingActive']) => void;
};

const initialGlobalsState: GlobalsStateProps = {
  sidenavOpen: false,
  tabBookingActive: 1,
};

const useGlobalsStore = create<GlobalsStateProps & GlobalsActionsProps>(
  set => ({
    ...initialGlobalsState,
    setSidenavOpen: payload => set(() => ({ sidenavOpen: payload })),
    setTabBookingActive: payload => set(() => ({ tabBookingActive: payload })),
  }),
);

export { useGlobalsStore };
