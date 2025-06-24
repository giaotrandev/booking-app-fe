import FilterAccordion from '#/components/common/filter-accordion';
import { Container } from '#/components/ui/container';
import NavigationBooking, {
  // NavigationBooking,
  NavigationBookingProps,
} from '../../layout/filter-trip/navigation-booking/render';
// import { BookingItemProps } from './item';
import { BookingItemProps, BookingList } from './list';

export interface BookingRenderBlockProps extends NavigationBookingProps {
  bookingList?: BookingItemProps[];
}
const BookingRenderBlock = ({
  arrivalList,
  destinationList,
  bookingList,
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
            {Array.isArray(bookingList) && bookingList.length > 0 && (
              <div className="bg-pj-grey-lightest p-6 lg:p-10">
                <BookingList list={bookingList} />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export { BookingRenderBlock };
// const sampleBookingList: BookingItemProps[] = [
//   {
//     name: 'Luxury Seater Bus',
//     arrivalTime: '6:00',
//     departureTime: '10:00',
//     price: '170000',
//     numberOfSeats: 45,
//     arrivalDestination: 'Mega Market VT, Hai Thang Chin St',
//     departureDestination: '216 Tran Huynh St, Bac Lieu',
//     image: {
//       src: '/images/placeholder.jpg',
//       alt: 'placeholder',
//       width: 1200,
//       height: 800,
//     },
//     description: 'Ghế ngồi 45 chỗ',
//     seatsLeft: 30,
//     dropingList: [
//       {
//         id: 'mega-market',
//         time: '06:00',
//         locationName: 'Mega Market Vung Tau',
//         address: '800 Hai Thang Chin St, Ward 11, Vung Tau City',
//       },
//       {
//         id: 'thuy-duong-beach',
//         time: '06:20',
//         locationName: 'Thuy Duong Beach',
//         address: 'A3 Thuy Van St, Thang Tam Ward, Vung Tau City',
//       },
//       {
//         id: 'lotte-mart',
//         time: '06:30',
//         locationName: 'Lotte Mart Vung Tau',
//         address: 'Ba Thang Hai St Roundabout, Ward 8, Vung Tau City',
//       },
//       {
//         id: 'xom-luoi-market',
//         time: '06:45',
//         locationName: 'Xom Luoi Market',
//         address: '83RG+PPW Nguyen Cong Tru St, Ward 1, Vung Tau City',
//       },
//     ],
//     pickingList: [
//       {
//         id: 'main-bus-station',
//         time: '09:30',
//         locationName: 'Bac Lieu Main Bus Station',
//         address: '255 Tran Phu St, Ward 7, Bac Lieu City',
//       },
//       {
//         id: 'kinh-tu-market',
//         time: '09:45',
//         locationName: 'Kinh Tu Market',
//         address: 'Dien Hai Village, Dong Hai Town, Bac Lieu Province',
//       },
//       {
//         id: 'vn-roadtrip-office',
//         time: '10:00',
//         locationName: 'VN Roadtrip Bac Lieu Office',
//         address: '216 Tran Huynh St, Ward 3, Bac Lieu City',
//       },
//       {
//         id: 'ho-phong-bus-station',
//         time: '10:15',
//         locationName: 'Ho Phong Bus Station',
//         address: 'QL1A Ho Phong Village, Gia Rai Town, Bac Lieu Province',
//       },
//       {
//         id: 'tac-say-church',
//         time: '10:30',
//         locationName: 'Tac Say Church',
//         address:
//           'Group 2 - QL1A, Tan Phong Village, Gia Rai Town, Bac Lieu Province',
//       },
//     ],
//   },
//   {
//     name: 'Luxury Seater Bus',
//     arrivalTime: '06:00',
//     departureTime: '10:00',
//     price: '170000',
//     numberOfSeats: 45,
//     arrivalDestination: 'Mega Market VT, Hai Thang Chin St',
//     departureDestination: '216 Tran Huynh St, Bac Lieu',
//     image: {
//       src: '/images/placeholder.jpg',
//       alt: 'placeholder',
//       width: 1200,
//       height: 800,
//     },
//     description: 'Ghế ngồi 45 chỗ',
//     seatsLeft: 30,
//   },
//   {
//     name: 'Luxury Seater Bus',
//     arrivalTime: '06:00',
//     departureTime: '10:00',
//     price: '170000',
//     numberOfSeats: 45,
//     arrivalDestination: 'Mega Market VT, Hai Thang Chin St',
//     departureDestination: '216 Tran Huynh St, Bac Lieu',
//     image: {
//       src: '/images/placeholder.jpg',
//       alt: 'placeholder',
//       width: 1200,
//       height: 800,
//     },
//     description: 'Ghế ngồi 45 chỗ',
//     seatsLeft: 30,
//   },
//   {
//     name: 'Luxury Seater Bus',
//     arrivalTime: '06:00',
//     departureTime: '10:00',
//     price: '170000',
//     numberOfSeats: 45,
//     arrivalDestination: 'Mega Market VT, Hai Thang Chin St',
//     departureDestination: '216 Tran Huynh St, Bac Lieu',
//     image: {
//       src: '/images/placeholder.jpg',
//       alt: 'placeholder',
//       width: 1200,
//       height: 800,
//     },
//     description: 'Ghế ngồi 45 chỗ',
//     seatsLeft: 30,
//   },
//   {
//     name: 'Luxury Seater Bus',
//     arrivalTime: '06:00',
//     departureTime: '10:00',
//     price: '170000',
//     numberOfSeats: 45,
//     arrivalDestination: 'Mega Market VT, Hai Thang Chin St',
//     departureDestination: '216 Tran Huynh St, Bac Lieu',
//     image: {
//       src: '/images/placeholder.jpg',
//       alt: 'placeholder',
//       width: 1200,
//       height: 800,
//     },
//     description: 'Ghế ngồi 45 chỗ',
//     seatsLeft: 30,
//   },
// ];
