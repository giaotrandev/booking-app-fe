import '#/styles/globals.css';
import { PropsWithChildren } from 'react';

interface RootLayoutProps extends PropsWithChildren {}

const RootLayout = ({ children }: RootLayoutProps) => {
  return children;
};

export default RootLayout;
