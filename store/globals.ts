'use client';
import { create } from 'zustand';

type GlobalsStateProps = {
  sidenavOpen: boolean;
  sideFilterOpen: boolean;
  sideUserDropDown: boolean;
};

type GlobalsActionsProps = {
  setSidenavOpen: (payload: GlobalsStateProps['sidenavOpen']) => void;
  setFilterOpen: (payload: GlobalsStateProps['sideFilterOpen']) => void;
  setSideUserDropDown: (payload: GlobalsStateProps['sideUserDropDown']) => void;
};

const initialGlobalsState: GlobalsStateProps = {
  sidenavOpen: false,
  sideFilterOpen: false,
  sideUserDropDown: false,
};

const useGlobalsStore = create<GlobalsStateProps & GlobalsActionsProps>(
  set => ({
    ...initialGlobalsState,
    setSidenavOpen: payload => set(() => ({ sidenavOpen: payload })),
    setFilterOpen: payload => set(() => ({ sideFilterOpen: payload })),
    setSideUserDropDown: payload => set(() => ({ sideUserDropDown: payload })),
  }),
);

export { useGlobalsStore };
