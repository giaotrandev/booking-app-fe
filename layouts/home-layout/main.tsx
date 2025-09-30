import { PropsWithChildren } from 'react';

interface LayoutMainProps extends PropsWithChildren {}

const LayoutMain = ({ children }: LayoutMainProps) => {
  return <main id="site-content">{children}</main>;
};

export { LayoutMain };
