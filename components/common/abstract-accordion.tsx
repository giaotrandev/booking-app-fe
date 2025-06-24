'use client';

import { ReactNode, useState } from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Accordion as AccordionWrapper,
} from '../headless/accordion';
import { Typography } from '../ui/typography';
import { cn } from '#/lib/utilities/cn';
import { Icon } from '../icons';
export interface AccordionItemCommonProps {
  title?: string;
  children?: ReactNode;
  id: string;
}

interface AccordionProps {
  list: AccordionItemCommonProps[];
  className?: string;
  triggerClassName?: string;
  containerClassName?: string;
  childrenClassName?: string;
  onAccordionToggle?: (openItems: string[]) => void;
}

const Accordion = ({
  list,
  className,
  triggerClassName,
  containerClassName,
  childrenClassName,
  onAccordionToggle,
}: AccordionProps) => {
  const [value, setValue] = useState<string[]>([]);
  const handleValueChange = (newValue: string[] | undefined) => {
    const updatedValue = newValue || [];
    setValue(newValue || []);
    onAccordionToggle?.(updatedValue);
  };
  return (
    <AccordionWrapper
      type="multiple"
      value={value}
      onValueChange={handleValueChange}
    >
      <div className={cn('flex flex-col gap-y-6', containerClassName)}>
        {list
          .filter(item => item !== null)
          .map((item, key) => (
            <AccordionItem
              value={item.id}
              key={key}
              className={cn('', className)}
            >
              <AccordionTrigger
                asChild
                className={cn('border-b border-black pb-4', triggerClassName)}
                onClick={item.children ? undefined : e => e.preventDefault()}
              >
                <div
                  className={cn(
                    'flex w-full items-center justify-between px-4',
                    item.children && 'cursor-pointer',
                  )}
                >
                  {item.title && (
                    <Typography
                      asChild
                      variant="small-label"
                      className="text-pj-grey-light uppercase"
                    >
                      <p>{item.title}</p>
                    </Typography>
                  )}
                  {item.children && (
                    <span className="flex-none pl-1 lg:pl-0">
                      <Icon
                        name="chevron-down"
                        className={cn(
                          'h-4 w-4',
                          value.includes(item.id) ? 'rotate-180' : 'rotate-0',
                        )}
                      />
                    </span>
                  )}
                </div>
              </AccordionTrigger>
              {item.children && (
                <AccordionContent
                  className={cn('pt-4 pl-4', childrenClassName)}
                >
                  {item.children}
                </AccordionContent>
              )}
            </AccordionItem>
          ))}
      </div>
    </AccordionWrapper>
  );
};

export default Accordion;
