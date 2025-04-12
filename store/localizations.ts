'use client';
import { LocalizationProps } from '#/types/globals';
import { create } from 'zustand';

type LocalizationsStateProps = {
  localizations: LocalizationProps[];
};

type LocalizationsActionsProps = {
  setLocalizations: (payload: LocalizationsStateProps['localizations']) => void;
};

const initialLocalizationsState = {
  localizations: [],
};

const useLocalizationsStore = create<
  LocalizationsStateProps & LocalizationsActionsProps
>((set, get) => ({
  ...initialLocalizationsState,
  setLocalizations: payload => set(() => ({ localizations: payload })),
}));

export { useLocalizationsStore };
