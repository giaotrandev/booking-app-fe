import { HTMLAttributes, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cn } from '#/lib/utilities/cn';

interface BlockWrapperProps extends HTMLAttributes<HTMLDivElement> {
  asChild?: boolean;
}

const BlockWrapper = forwardRef<HTMLDivElement, BlockWrapperProps>(
  ({ className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'section';
    return (
      <Comp className={cn('py-12 lg:py-20', className)} ref={ref} {...props} />
    );
  },
);
BlockWrapper.displayName = 'BlockWrapper';

export { BlockWrapper };
