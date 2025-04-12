'use client';
import { create } from 'zustand';

type GlobalsStateProps = {
  sidenavOpen: boolean;
};

type GlobalsActionsProps = {
  setSidenavOpen: (payload: GlobalsStateProps['sidenavOpen']) => void;
};

const initialGlobalsState = {
  sidenavOpen: false,
};

const useGlobalsStore = create<GlobalsStateProps & GlobalsActionsProps>(
  (set, get) => ({
    ...initialGlobalsState,
    setSidenavOpen: payload => set(() => ({ sidenavOpen: payload })),
  }),
);

export { useGlobalsStore };
