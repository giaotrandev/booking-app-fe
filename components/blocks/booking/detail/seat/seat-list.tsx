import { Icon } from '#/components/icons';
import { Col } from '#/components/ui/col';
import { Row } from '#/components/ui/row';
import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';
import { SeatConfiguration } from '#/services/trip/trips-request';
import { SeatLayout } from './seat-layout';
export interface SeatListProps extends SeatConfiguration {}
const SeatList = ({ decks }: SeatListProps) => {
  return (
    <div>
      <Row>
        <Col className="col-span-full mt-4 lg:col-span-4 lg:mt-0">
          <div className="flex flex-col gap-y-4 lg:gap-y-2">
            <Typography asChild variant="h6" className="font-medium">
              <p>Please select your desired seat</p>
            </Typography>
            <Typography asChild variant="h6" className="font-bold uppercase">
              <p>Note:</p>
            </Typography>
          </div>
          <ul className="mt-6 flex flex-col gap-y-3">
            {sampleSeatItemCategoryList.map((item, index) => (
              <li key={index} className="flex items-center gap-x-6">
                <Icon
                  name="seat"
                  className={cn(
                    index === 1 && 'fill-pj-grey-light',
                    index === 2 && 'fill-pj-green',
                  )}
                />
                <Typography asChild variant="small-label">
                  <span>{item}</span>
                </Typography>
              </li>
            ))}
          </ul>
        </Col>
        {Array.isArray(decks) && decks.length > 0 && (
          <Col
            className={cn(
              'col-span-full mt-4 lg:mt-0',
              decks.length === 1
                ? 'lg:col-span-5 lg:col-start-8'
                : 'lg:col-span-6 lg:col-start-7',
            )}
          >
            <SeatLayout decks={decks} />
          </Col>
        )}
      </Row>
    </div>
  );
};

export { SeatList };
const sampleSeatItemCategoryList = [
  'Unavailable Seat',
  'Available Seat',
  'Your Selecting Seat',
];

// const tripId = '6822e17be29951b9424a63b2';

// const seats = [
//   {
//     id: '1',
//     tripId,
//     seatNumber: 'A1',
//     seatType: 'DRIVER',
//     status: 'AVAILABLE',
//     isDeleted: false,
//     bookingTripId: null,
//     createdAt: '2025-05-13T06:06:52.768Z',
//     updatedAt: '2025-05-13T06:06:52.768Z',
//     deletedAt: null,
//   },
//   {
//     id: '2',
//     tripId,
//     seatNumber: 'A2',
//     seatType: 'PREMIUM',
//     status: 'AVAILABLE',
//     isDeleted: false,
//     bookingTripId: null,
//     createdAt: '2025-05-13T06:06:52.768Z',
//     updatedAt: '2025-05-13T06:06:52.768Z',
//     deletedAt: null,
//   },
//   {
//     id: '3',
//     tripId,
//     seatNumber: 'B1',
//     seatType: 'PREMIUM',
//     status: 'AVAILABLE',
//     isDeleted: false,
//     bookingTripId: null,
//     createdAt: '2025-05-13T06:06:52.768Z',
//     updatedAt: '2025-05-13T06:06:52.768Z',
//     deletedAt: null,
//   },
//   {
//     id: '4',
//     tripId,
//     seatNumber: 'C1',
//     seatType: 'PREMIUM',
//     status: 'AVAILABLE',
//     isDeleted: false,
//     bookingTripId: null,
//     createdAt: '2025-05-13T06:06:52.768Z',
//     updatedAt: '2025-05-13T06:06:52.768Z',
//     deletedAt: null,
//   },
//   {
//     id: '5',
//     tripId,
//     seatNumber: 'C2',
//     seatType: 'PREMIUM',
//     status: 'AVAILABLE',
//     isDeleted: false,
//     bookingTripId: null,
//     createdAt: '2025-05-13T06:06:52.768Z',
//     updatedAt: '2025-05-13T06:06:52.768Z',
//     deletedAt: null,
//   },
//   {
//     id: '6',
//     tripId,
//     seatNumber: 'C3',
//     seatType: 'PREMIUM',
//     status: 'AVAILABLE',
//     isDeleted: false,
//     bookingTripId: null,
//     createdAt: '2025-05-13T06:06:52.768Z',
//     updatedAt: '2025-05-13T06:06:52.768Z',
//     deletedAt: null,
//   },
//   {
//     id: '7',
//     tripId,
//     seatNumber: 'C4',
//     seatType: 'PREMIUM',
//     status: 'AVAILABLE',
//     isDeleted: false,
//     bookingTripId: null,
//     createdAt: '2025-05-13T06:06:52.768Z',
//     updatedAt: '2025-05-13T06:06:52.768Z',
//     deletedAt: null,
//   },
//   {
//     id: '8',
//     tripId,
//     seatNumber: 'D1',
//     seatType: 'PREMIUM',
//     status: 'AVAILABLE',
//     isDeleted: false,
//     bookingTripId: null,
//     createdAt: '2025-05-13T06:06:52.768Z',
//     updatedAt: '2025-05-13T06:06:52.768Z',
//     deletedAt: null,
//   },
//   {
//     id: '9',
//     tripId,
//     seatNumber: 'D2',
//     seatType: 'PREMIUM',
//     status: 'AVAILABLE',
//     isDeleted: false,
//     bookingTripId: null,
//     createdAt: '2025-05-13T06:06:52.768Z',
//     updatedAt: '2025-05-13T06:06:52.768Z',
//     deletedAt: null,
//   },
// ];
