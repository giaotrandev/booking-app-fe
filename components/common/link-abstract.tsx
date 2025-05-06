import { Link } from '#/i18n/routing';
import { AnchorOrButtonProps } from '#/types/global';
import React, { ElementType, forwardRef } from 'react';

interface LinkAbstractProps extends AnchorOrButtonProps {
  otherAs?: ElementType;
  href?: string;
  children: React.ReactNode;
}

const LinkAbstract = forwardRef<HTMLAnchorElement, LinkAbstractProps>(
  ({ otherAs = 'button', href, children, ...props }, ref) => {
    if (href) {
      return (
        <Link href={href} ref={ref} {...props}>
          {children}
        </Link>
      );
    }

    const Tag = otherAs;
    // Render other tags
    return (
      <Tag {...props} ref={ref}>
        {children}
      </Tag>
    );
  },
);
LinkAbstract.displayName = 'LinkAbstract';

export default LinkAbstract;
