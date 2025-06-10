'use client';
import { cn } from '#/lib/utilities/cn';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { ComponentProps, useEffect, useState } from 'react';

function Popover({ ...props }: ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverArrow({
  ...props
}: ComponentProps<typeof PopoverPrimitive.Arrow>) {
  return <PopoverPrimitive.Arrow data-slot="popover-arrow" {...props} />;
}

function PopoverPortal({
  ...props
}: ComponentProps<typeof PopoverPrimitive.Portal>) {
  return <PopoverPrimitive.Portal data-slot="popover-portal" {...props} />;
}

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 0,
  portal,
  ...props
}: ComponentProps<typeof PopoverPrimitive.Content> & {
  portal?: Omit<ComponentProps<typeof PopoverPrimitive.Portal>, 'container'> & {
    elementId?: string;
  };
}) {
  const [container, setContainer] = useState<Element | null>(null);
  useEffect(() => {
    const siteContainer = document.getElementById(
      portal?.elementId ?? 'site-wrapper',
    );
    if (siteContainer) {
      setContainer(siteContainer);
    }
  }, [portal?.elementId]);
  return (
    <PopoverPortal container={container}>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-100 data-[state=open]:zoom-in-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          className,
        )}
        {...props}
      />
    </PopoverPortal>
  );
}

function PopoverAnchor({
  ...props
}: ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export {
  Popover,
  PopoverAnchor,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
  PopoverArrow,
};
