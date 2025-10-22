'use client';
import { PropsWithChildren } from 'react';
import { TheMediaContextProvider } from './context';

type TheMediaProviderProps = PropsWithChildren;

const TheMediaProvider = (props: TheMediaProviderProps) => {
  return <TheMediaContextProvider {...props} />;
};

export { TheMediaProvider };
