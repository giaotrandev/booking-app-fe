'use client';

import { useChangeLocale, useCurrentLocale } from '#/i18n/client';
import { i18n } from '#/i18n/config';
import { collections, languages } from '#/lib/constant';
import { cn } from '#/lib/utilities/cn';
import { useRef, useState, useEffect } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../headless/collapsible';
import { Typography } from './typography';
import { Icon } from '../icons';
import { usePathname } from '#/i18n/routing';

export function LanguageSwitcher() {
  const currentLocale = useCurrentLocale();
  const { isChangingLocale, changeLocale } = useChangeLocale();
  const [open, setOpen] = useState<boolean>(false);
  const collapsibleRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const href = typeof window !== 'undefined' ? window.location.href : '';
  const queryString = href.includes('?') ? href.split('?')[1] : '';

  const onOpenChange = (open: boolean) => {
    setOpen(open);
  };

  useEffect(() => {
    if (!open) return; // Only listen when open

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        collapsibleRef.current &&
        !collapsibleRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={collapsibleRef}>
      <Collapsible
        open={open}
        onOpenChange={onOpenChange}
        className={cn(
          'lg:ease-ev-easing border-pj-gray-light overflow-hidden rounded-[10px] border bg-white lg:transition-[background-color] lg:duration-300',
          open ? 'lg:hocus-visible:bg-white' : 'lg:hocus-visible:bg-white-70',
        )}
      >
        <CollapsibleTrigger
          className={cn(
            'group pointer-events-auto inline-flex h-8 flex-nowrap items-center space-x-2 px-2.75 text-left text-black uppercase lg:h-10 lg:cursor-pointer lg:px-3.75',
            'disabled:pointer-events-none disabled:opacity-50 lg:space-x-3 data-[state=open]:[&_[data-slot="icon"]]:-rotate-180',
          )}
        >
          <span className="block w-auto shrink-0 grow-0 basis-auto">
            <Typography asChild variant="button-label" className="block">
              <span>{languages[currentLocale]}</span>
            </Typography>
          </span>
          <span className="block w-auto shrink-0 grow-0 basis-auto">
            <Icon
              data-slot="icon"
              name="chevron-down"
              className="ease-ev-easing h-4 w-4 origin-center fill-black stroke-black transition-[rotate] duration-300"
            />
          </span>
        </CollapsibleTrigger>
        <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down data-[state=closed]:duration-300 data-[state=open]:duration-300">
          <div className="space-y-3.75 px-2.75 pb-3.75 lg:px-3.75 lg:pt-1">
            {i18n.locales
              .filter(locale => locale !== currentLocale)
              .map((locale, key) => {
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      changeLocale({
                        locale,
                        pathname: `${pathname}?${queryString}`,
                      });
                    }}
                    disabled={isChangingLocale}
                    className="text-pj-gray lg:hocus-visible:text-pj-red lg:ease-ev-easing block w-full text-left uppercase disabled:cursor-not-allowed disabled:opacity-50 lg:cursor-pointer lg:transition-[color] lg:duration-300"
                  >
                    <Typography asChild variant="button-label">
                      <span>{languages[locale]}</span>
                    </Typography>
                  </button>
                );
              })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
