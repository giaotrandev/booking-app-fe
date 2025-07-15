'use client';
import { create } from 'zustand';

type GlobalsStateProps = {
  sidenavOpen: boolean;
  sideFilterOpen: boolean;
};

type GlobalsActionsProps = {
  setSidenavOpen: (payload: GlobalsStateProps['sidenavOpen']) => void;
  setFilterOpen: (payload: GlobalsStateProps['sideFilterOpen']) => void;
};

const initialGlobalsState: GlobalsStateProps = {
  sidenavOpen: false,
  sideFilterOpen: false,
};

const useGlobalsStore = create<GlobalsStateProps & GlobalsActionsProps>(
  set => ({
    ...initialGlobalsState,
    setSidenavOpen: payload => set(() => ({ sidenavOpen: payload })),
    setFilterOpen: payload => set(() => ({ sideFilterOpen: payload })),
  }),
);

export { useGlobalsStore };
