import { Typography } from '#/components/ui/typography';

export interface PaymentRouteItemProps {
  route?: string;
  time?: string;
}

const PaymentRouteItem = ({ route, time }: PaymentRouteItemProps) => {
  if (!route && !time) return null;
  return (
    <div className="text-center">
      <Typography asChild variant="h5" className="font-medium">
        <p>{route}</p>
      </Typography>
      <Typography
        asChild
        variant="small-label"
        className="text-pj-grey-light font-sans"
      >
        <p>{time}</p>
      </Typography>
    </div>
  );
};

export { PaymentRouteItem };
