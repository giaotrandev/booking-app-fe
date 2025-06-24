import NavigationBooking, {
  NavigationBookingProps,
} from '#/components/layout/filter-trip/navigation-booking/render';
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
    <div className="absolute inset-0 flex h-full w-full justify-center">
      <div className="sticky -top-1/6 left-0 z-[1] flex h-screen w-full items-center justify-center px-5 lg:-top-1/4">
        <NavigationBooking
          arrivalList={arrivalList}
          destinationList={destinationList}
        />
      </div>
    </div>
  );
};

export { LayoutFilterTrip };
