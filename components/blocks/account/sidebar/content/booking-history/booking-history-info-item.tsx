import { Typography } from '#/components/ui/typography';

interface BookingInfoItemProps {
  label: string;
  value: string | number;
}

const BookingInfoItem = ({ label, value }: BookingInfoItemProps) => {
  return (
    <div className="flex flex-col">
      <Typography className="text-pj-grey" asChild>
        <p>{label}</p>
      </Typography>
      <Typography className="text-[20px] font-medium" variant="h5">
        {value}
      </Typography>
    </div>
  );
};

export { BookingInfoItem };
