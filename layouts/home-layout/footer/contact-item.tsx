import { StretchedLink } from '#/components/common/stretched-link';
import { Icon } from '#/components/icons';
import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';

export interface ContactItemProps {
  icon: 'phone' | 'email' | 'address';
  content: {
    url: string;
    text?: string;
  };
  title: string;
}

const iconMap = {
  phone: 'phone',
  email: 'email',
  address: 'address',
} as const;

const ContactItem = ({ icon, content }: ContactItemProps) => {
  return (
    <StretchedLink
      className="group flex items-center space-x-2"
      link={{
        url: content.url,
        target: '_blank',
      }}
    >
      <Icon
        name={iconMap[icon]}
        className={cn(
          'h-6 w-6 flex-none fill-black',
          'group-hocus-visible:fill-pj-red transition-[fill]',
        )}
      />
      <Typography
        asChild
        className={cn(
          'text-pj-gray-light',
          'group-hocus-visible:text-pj-red group-hocus-visible:transition-[color] before:bg-pj-red group-hocus-visible:before:scale-100 group-hocus-visible:before:origin-left relative before:absolute before:bottom-0 before:h-px before:w-full before:origin-right before:scale-x-0 before:transition-transform before:content-[""]',
        )}
      >
        <span>{content.text}</span>
      </Typography>
    </StretchedLink>
  );
};

export { ContactItem };
