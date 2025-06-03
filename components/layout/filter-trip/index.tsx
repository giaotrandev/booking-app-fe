import {
  NavigationBooking,
  NavigationBookingProps,
} from '#/components/blocks/hero/navigation-booking/render';
export interface LayoutFilterTripProps extends NavigationBookingProps {}
const LayoutFilterTrip = ({
  arrivalList,
  destinationList,
}: LayoutFilterTripProps) => {
  if (
    !(
      (Array.isArray(arrivalList) && arrivalList.length > 0) ||
      (Array.isArray(destinationList) && destinationList.length > 0)
    )
  )
    return null;
  return (
    <div className="sticky top-1/2 left-0 z-1090 -translate-y-1/2">
      <NavigationBooking
        arrivalList={arrivalList}
        destinationList={destinationList}
      />
    </div>
  );
};

export { LayoutFilterTrip };
