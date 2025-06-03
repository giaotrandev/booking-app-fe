import FilterAccordion from '#/components/common/filter-accordion';
import { Container } from '#/components/ui/container';
import {
  NavigationBooking,
  NavigationBookingProps,
} from '../hero/navigation-booking/render';
import { BookingList } from './list';

export interface BookingRenderBlockProps extends NavigationBookingProps {}
const BookingRenderBlock = ({
  arrivalList,
  destinationList,
}: BookingRenderBlockProps) => {
  return (
    <section>
      <Container>
        <div className="flex flex-col gap-y-8 xl:flex-row xl:gap-y-0">
          <div className="w-full lg:mt-12 xl:max-w-59.25">
            <div className="sticky top-[100px] left-0">
              <FilterAccordion />
            </div>
          </div>
          <div className="w-full flex-1 xl:pl-14">
            {((Array.isArray(arrivalList) && arrivalList.length > 0) ||
              (Array.isArray(destinationList) &&
                destinationList.length > 0)) && (
              <div className="mb-8">
                <NavigationBooking
                  arrivalList={arrivalList}
                  destinationList={destinationList}
                  className="lg:max-w-full lg:p-0"
                  dateContainerClassName="lg:ml-6 lg:max-w-[180px]"
                />
              </div>
            )}
            <div className="bg-pj-grey-lightest p-6 lg:p-10">
              <BookingList list={sampleBookingList} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export { BookingRenderBlock };
const sampleBookingList = [
  {
    name: 'Luxury Seater Bus',
    arrivalTime: '6:00',
    departureTime: '10:00',
    price: '170000',
    numberOfSeats: 45,
    arrivalDestination: 'Mega Market VT, Hai Thang Chin St',
    departureDestination: '216 Tran Huynh St, Bac Lieu',
    image: {
      src: '/images/placeholder.jpg',
      alt: 'placeholder',
      width: 1200,
      height: 800,
    },
    description: 'Ghế ngồi 45 chỗ',
    seatsLeft: 30,
  },
  {
    name: 'Luxury Seater Bus',
    arrivalTime: '06:00',
    departureTime: '10:00',
    price: '170000',
    numberOfSeats: 45,
    arrivalDestination: 'Mega Market VT, Hai Thang Chin St',
    departureDestination: '216 Tran Huynh St, Bac Lieu',
    image: {
      src: '/images/placeholder.jpg',
      alt: 'placeholder',
      width: 1200,
      height: 800,
    },
    description: 'Ghế ngồi 45 chỗ',
    seatsLeft: 30,
  },
  {
    name: 'Luxury Seater Bus',
    arrivalTime: '06:00',
    departureTime: '10:00',
    price: '170000',
    numberOfSeats: 45,
    arrivalDestination: 'Mega Market VT, Hai Thang Chin St',
    departureDestination: '216 Tran Huynh St, Bac Lieu',
    image: {
      src: '/images/placeholder.jpg',
      alt: 'placeholder',
      width: 1200,
      height: 800,
    },
    description: 'Ghế ngồi 45 chỗ',
    seatsLeft: 30,
  },
  {
    name: 'Luxury Seater Bus',
    arrivalTime: '06:00',
    departureTime: '10:00',
    price: '170000',
    numberOfSeats: 45,
    arrivalDestination: 'Mega Market VT, Hai Thang Chin St',
    departureDestination: '216 Tran Huynh St, Bac Lieu',
    image: {
      src: '/images/placeholder.jpg',
      alt: 'placeholder',
      width: 1200,
      height: 800,
    },
    description: 'Ghế ngồi 45 chỗ',
    seatsLeft: 30,
  },
  {
    name: 'Luxury Seater Bus',
    arrivalTime: '06:00',
    departureTime: '10:00',
    price: '170000',
    numberOfSeats: 45,
    arrivalDestination: 'Mega Market VT, Hai Thang Chin St',
    departureDestination: '216 Tran Huynh St, Bac Lieu',
    image: {
      src: '/images/placeholder.jpg',
      alt: 'placeholder',
      width: 1200,
      height: 800,
    },
    description: 'Ghế ngồi 45 chỗ',
    seatsLeft: 30,
  },
];
