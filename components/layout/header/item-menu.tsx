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
    <Typography
      variant="label"
      className={cn(
        "lg:hocus:text-pj-blue lg:hocus:transition-[color] lg:before:bg-pj-blue lg:hocus:before:scale-100 lg:hocus:before:origin-left text-[36px] lg:before:absolute lg:before:bottom-0 lg:before:h-px lg:before:w-full lg:before:origin-right lg:before:scale-x-0 lg:before:transition-transform lg:before:content-['']",
        active && 'text-pj-blue lg:hocus:before:scale-0 before:w-0',
      )}
      asChild
      onClick={() => setSidenavOpen(false)}
    >
      <StretchedLink link={cta} className="relative">
        {cta.text}
        {active && (
          <span className="bg-pj-blue absolute top-full left-0 h-px w-full content-['']" />
        )}
      </StretchedLink>
    </Typography>
  );
};

export { ItemMenu };
