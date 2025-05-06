import { Link } from '#/i18n/routing';
import { LinkProps } from '#/types/global';
import { Slot } from '@radix-ui/react-slot';
import { ComponentProps } from 'react';

interface StretchedLinkProps extends ComponentProps<'a'> {
  link?: LinkProps;
  asChild?: boolean;
  dataCursor?: string;
}

const StretchedLink = ({
  link,
  asChild,
  dataCursor = 'default',
  ...props
}: StretchedLinkProps) => {
  if (link?.url) {
    return (
      <Link
        data-cursor={dataCursor}
        data-slot="stretched-link"
        href={link.url}
        target={link.target}
        rel={link.rel}
        aria-label={link.text}
        {...props}
      >
        {props.children}
      </Link>
    );
  }
  const Comp = asChild ? Slot : 'div';
  // @ts-ignore: Shadcn UI v4 Comp
  return <Comp data-slot="stretched-link" {...props} />;
};

export { StretchedLink };
