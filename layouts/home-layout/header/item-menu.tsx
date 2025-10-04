import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';
import { useGlobalsStore } from '#/store/globals';
import { StretchedLink } from '#/components/common/stretched-link';
import { LinkProps } from '#/types/global';

interface ItemMenuProps {
  active?: boolean;
  cta: LinkProps;
}

const ItemMenu = ({ active, cta }: ItemMenuProps) => {
  const { setSidenavOpen } = useGlobalsStore();

  return (
    <Typography variant="label" asChild onClick={() => setSidenavOpen(false)}>
      <StretchedLink
        link={cta}
        className={cn(
          `lg:hocus:text-pj-red lg:hocus:transition-[color] relative text-[36px]`,
          `lg:before:bg-pj-red lg:hocus:before:scale-100 lg:hocus:before:origin-left lg:before:absolute lg:before:bottom-0 lg:before:left-0 lg:before:h-px lg:before:w-full lg:before:origin-right lg:before:scale-x-0 lg:before:transition-[scale] lg:before:content-['']`,
          active && 'text-pj-red',
        )}
      >
        {cta.text}
        {active && (
          <span className="bg-pj-red absolute bottom-0 left-0 h-px w-full content-['']" />
        )}
      </StretchedLink>
    </Typography>
  );
};

export { ItemMenu };
