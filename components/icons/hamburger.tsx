'use client';

import { cn } from '#/lib/utilities/cn';
import { useGlobalsStore } from '#/store/globals';

const Hamburger = () => {
  const { sidenavOpen, setSidenavOpen } = useGlobalsStore();
  const dataState = sidenavOpen ? 'open' : 'closed';

  return (
    <span className="inline-flex size-10 items-center justify-end overflow-hidden">
      <span className="relative h-2.5 w-5">
        <span
          data-state={dataState}
          className={cn(
            'absolute left-1/2 h-0.5 w-5 origin-center -translate-x-1/2 rounded-full bg-black transition-[rotate] duration-300',
            'data-[state=open]:animate-in data-[state=open]:top-1/2 data-[state=open]:-translate-y-1/2 data-[state=open]:rotate-45',
            'data-[state=closed]:animate-out data-[state=closed]:top-0 data-[state=closed]:translate-y-0 data-[state=closed]:rotate-0',
          )}
        />
        <span
          data-state={dataState}
          className={cn(
            'absolute left-1/2 h-0.5 w-5 origin-center -translate-x-1/2 rounded-full bg-black transition-[rotate] duration-300',
            'data-[state=open]:animate-in data-[state=open]:bottom-1/2 data-[state=open]:translate-y-1/2 data-[state=open]:-rotate-45',
            'data-[state=closed]:animate-out data-[state=closed]:bottom-0 data-[state=closed]:translate-y-0 data-[state=closed]:rotate-0',
          )}
        />
      </span>
    </span>
  );
};
export { Hamburger };
