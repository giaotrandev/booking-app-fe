'use client';
import { useLocalizationsStore } from '#/store/localizations';
import { LocalizationProps } from '#/types/global';
import { useEffect } from 'react';

interface LocalizationsProps {
  list?: LocalizationProps[];
}

const Localizations = ({ list }: LocalizationsProps) => {
  const { setLocalizations } = useLocalizationsStore();
  useEffect(() => {
    if (Array.isArray(list) && list.length > 0) {
      setLocalizations(list);
    } else {
      setLocalizations([]);
    }
  }, [list, setLocalizations]);
  return <></>;
};

export { Localizations };
