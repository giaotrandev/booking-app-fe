import { Typography } from '#/components/ui/typography';
import { ContactItem, ContactItemProps } from './contact-item';

export interface ContactListProps {
  list: ContactItemProps[];
}
const ContactList = ({ list }: ContactListProps) => {
  return (
    <ul className="flex flex-col space-y-6">
      {list.map((item, index) => (
        <li key={index} className="flex flex-col space-y-2">
          <Typography asChild className="font-semibold" variant="label">
            <span>{item.title}</span>
          </Typography>
          <span className="flex">
            <ContactItem {...item} />
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;
