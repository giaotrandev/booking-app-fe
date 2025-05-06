'use client';
import { StretchedLink } from '#/components/common/stretched-link';
import { ButtonLink } from '#/components/ui/button-link';
import { Typography } from '#/components/ui/typography';
import { usePathname } from '#/i18n/routing';
import { cn } from '#/lib/utilities/cn';
import { useGlobalsStore } from '#/store/globals';
import { LinkProps } from '#/types/global';

export interface LayoutHeaderMenuProps {
  list?: LinkProps[];
}

const LayoutHeaderMenu = ({ list }: LayoutHeaderMenuProps) => {
  const pathname = usePathname();
  const { setSidenavOpen } = useGlobalsStore();
  if (!(Array.isArray(list) && list.length > 0)) {
    return null;
  }
  return (
    <nav>
      <ul className="-my-3.25 flex w-auto shrink-0 grow-0 basis-auto flex-col px-4 lg:flex-row lg:flex-wrap lg:space-x-8">
        {list.map((item, key) => {
          const active = pathname === item.url;
          return (
            <li className="relative flex py-3.25" key={key}>
              <Typography
                variant="label"
                className={cn(
                  "hocus:text-pj-blue hocus:transition-[color] before:bg-pj-blue hocus:before:scale-100 hocus:before:origin-left before:absolute before:bottom-0 before:h-px before:w-full before:origin-right before:scale-x-0 before:transition-transform before:content-['']",
                  active && 'text-pj-blue hocus:before:scale-0 before:w-0',
                )}
                asChild
                onClick={() => setSidenavOpen(false)}
              >
                <StretchedLink link={item} className="relative">
                  {item.text}
                  {active && (
                    <span className="bg-pj-blue absolute top-full left-0 h-px w-full content-['']" />
                  )}
                </StretchedLink>
              </Typography>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export { LayoutHeaderMenu };
