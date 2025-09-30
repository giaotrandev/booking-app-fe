import { Icon } from '#/components/icons';
import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';

export interface ContactItemProps {
  icon: 'phone' | 'email' | 'address';
  content: string;
  title: string;
}

const iconMap = {
  phone: 'phone',
  email: 'email',
  address: 'address',
} as const;

const ContactItem = ({ icon, content }: ContactItemProps) => {
  const Wrapper = icon === 'email' ? 'a' : 'span';
  const wrapperProps = icon === 'email' ? { href: `mailto:${content}` } : {};

  return (
    <Wrapper className="group flex items-center space-x-2" {...wrapperProps}>
      <Icon
        name={iconMap[icon]}
        className={cn(
          'h-6 w-6 flex-none fill-black',
          icon === 'email' &&
            'group-hocus-visible:fill-pj-blue transition-[fill]',
        )}
      />
      <Typography
        asChild
        className={cn(
          'text-pj-grey-light',
          icon === 'email' &&
            'group-hocus-visible:text-pj-blue group-hocus-visible:transition-[color] before:bg-pj-blue group-hocus-visible:before:scale-100 group-hocus-visible:before:origin-left relative before:absolute before:bottom-0 before:h-px before:w-full before:origin-right before:scale-x-0 before:transition-transform before:content-[""]',
        )}
      >
        <span>{content}</span>
      </Typography>
    </Wrapper>
  );
};

export { ContactItem };
