import { Icon } from '#/components/icons';
import { Col } from '#/components/ui/col';
import { Row } from '#/components/ui/row';
import { Typography } from '#/components/ui/typography';
import { cn } from '#/lib/utilities/cn';
import { SeatConfiguration } from '#/types/vehicle';
import { SeatItem } from './seat-item';

export interface SeatListProps {}
const SeatList = () => {
  return (
    <div>
      <Row>
        <Col className="col-span-full lg:col-span-4">
          <div className="flex flex-col gap-y-2">
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
        <Col className="col-span-full lg:col-span-6 lg:col-start-7">
          <SeatItem decks={mockDoubleSeatConfiguration.decks} />
        </Col>
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
const mockDoubleSeatConfiguration: SeatConfiguration = {
  decks: [
    {
      deckId: 'lower',
      name: 'Lower Deck',
      rows: [
        {
          rowId: 'A',
          seats: [
            {
              number: 'A1',
              exists: true,
              type: 'DRIVER',
              position: 'window',
              status: 'AVAILABLE',
              x: 0,
              y: 0,
            },
            {
              number: 'A2',
              exists: true,
              type: 'PASSENGER',
              position: 'aisle',
              status: 'AVAILABLE',
              x: 1,
              y: 0,
            },
          ],
        },
        {
          rowId: 'B',
          seats: [
            {
              number: 'B1',
              exists: true,
              type: 'PASSENGER',
              position: 'window',
              status: 'AVAILABLE',
              x: 0,
              y: 1,
            },
            {
              number: 'B2',
              exists: false,
              type: 'PASSENGER',
              position: 'middle',
              status: 'AVAILABLE',
              x: 1,
              y: 1,
            },
          ],
        },
      ],
    },
    {
      deckId: 'upper',
      name: 'Upper Deck',
      rows: [
        {
          rowId: 'C',
          seats: [
            {
              number: 'C1',
              exists: true,
              type: 'PASSENGER',
              position: 'window',
              status: 'AVAILABLE',
              x: 0,
              y: 0,
            },
            {
              number: 'C2',
              exists: true,
              type: 'PASSENGER',
              position: 'aisle',
              status: 'AVAILABLE',
              x: 1,
              y: 0,
            },
            {
              number: 'C3',
              exists: true,
              type: 'PASSENGER',
              position: 'aisle',
              status: 'AVAILABLE',
              x: 1,
              y: 0,
            },
            {
              number: 'C4',
              exists: true,
              type: 'PASSENGER',
              status: 'AVAILABLE',
              position: 'aisle',
              x: 1,
              y: 0,
            },
          ],
        },
        {
          rowId: 'D',
          seats: [
            {
              number: 'D1',
              exists: true,
              type: 'PASSENGER',
              status: 'AVAILABLE',
              position: 'aisle',
              x: 0,
              y: 1,
            },
            {
              number: 'D2',
              exists: true,
              type: 'PASSENGER',
              status: 'AVAILABLE',
              position: 'window',
              x: 1,
              y: 1,
            },
          ],
        },
      ],
    },
  ],
};
const tripId = '6822e17be29951b9424a63b2';

const seats = [
  {
    id: '1',
    tripId,
    seatNumber: 'A1',
    seatType: 'DRIVER',
    status: 'AVAILABLE',
    isDeleted: false,
    bookingTripId: null,
    createdAt: '2025-05-13T06:06:52.768Z',
    updatedAt: '2025-05-13T06:06:52.768Z',
    deletedAt: null,
  },
  {
    id: '2',
    tripId,
    seatNumber: 'A2',
    seatType: 'PREMIUM',
    status: 'AVAILABLE',
    isDeleted: false,
    bookingTripId: null,
    createdAt: '2025-05-13T06:06:52.768Z',
    updatedAt: '2025-05-13T06:06:52.768Z',
    deletedAt: null,
  },
  {
    id: '3',
    tripId,
    seatNumber: 'B1',
    seatType: 'PREMIUM',
    status: 'AVAILABLE',
    isDeleted: false,
    bookingTripId: null,
    createdAt: '2025-05-13T06:06:52.768Z',
    updatedAt: '2025-05-13T06:06:52.768Z',
    deletedAt: null,
  },
  {
    id: '4',
    tripId,
    seatNumber: 'C1',
    seatType: 'PREMIUM',
    status: 'AVAILABLE',
    isDeleted: false,
    bookingTripId: null,
    createdAt: '2025-05-13T06:06:52.768Z',
    updatedAt: '2025-05-13T06:06:52.768Z',
    deletedAt: null,
  },
  {
    id: '5',
    tripId,
    seatNumber: 'C2',
    seatType: 'PREMIUM',
    status: 'AVAILABLE',
    isDeleted: false,
    bookingTripId: null,
    createdAt: '2025-05-13T06:06:52.768Z',
    updatedAt: '2025-05-13T06:06:52.768Z',
    deletedAt: null,
  },
  {
    id: '6',
    tripId,
    seatNumber: 'C3',
    seatType: 'PREMIUM',
    status: 'AVAILABLE',
    isDeleted: false,
    bookingTripId: null,
    createdAt: '2025-05-13T06:06:52.768Z',
    updatedAt: '2025-05-13T06:06:52.768Z',
    deletedAt: null,
  },
  {
    id: '7',
    tripId,
    seatNumber: 'C4',
    seatType: 'PREMIUM',
    status: 'AVAILABLE',
    isDeleted: false,
    bookingTripId: null,
    createdAt: '2025-05-13T06:06:52.768Z',
    updatedAt: '2025-05-13T06:06:52.768Z',
    deletedAt: null,
  },
  {
    id: '8',
    tripId,
    seatNumber: 'D1',
    seatType: 'PREMIUM',
    status: 'AVAILABLE',
    isDeleted: false,
    bookingTripId: null,
    createdAt: '2025-05-13T06:06:52.768Z',
    updatedAt: '2025-05-13T06:06:52.768Z',
    deletedAt: null,
  },
  {
    id: '9',
    tripId,
    seatNumber: 'D2',
    seatType: 'PREMIUM',
    status: 'AVAILABLE',
    isDeleted: false,
    bookingTripId: null,
    createdAt: '2025-05-13T06:06:52.768Z',
    updatedAt: '2025-05-13T06:06:52.768Z',
    deletedAt: null,
  },
];
// const sampleSeats = [
//   {
//     id: '6822e17ce29951b9424a63b3',
//     tripId: '6822e17be29951b9424a63b2',
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
//     id: '6822e17ce29951b9424a63b4',
//     tripId: '6822e17be29951b9424a63b2',
//     seatNumber: 'A3',
//     seatType: 'PREMIUM',
//     status: 'AVAILABLE',
//     isDeleted: false,
//     bookingTripId: null,
//     createdAt: '2025-05-13T06:06:52.768Z',
//     updatedAt: '2025-05-13T06:06:52.768Z',
//     deletedAt: null,
//   },
// ];

// const mockSingleDeckConfiguration: SeatConfiguration = {
//   decks: [
//     {
//       deckId: 'lower',
//       name: 'Lower Deck',
//       rows: [
//         {
//           rowId: 'A',
//           seats: [
//             {
//               number: 'A1',
//               exists: true,
//               type: 'DRIVER',
//               position: 'window',
//               x: 0,
//               y: 0,
//             },
//             {
//               number: 'A1',
//               exists: true,
//               type: 'PASSENGER',
//               position: 'aisle',
//               x: 1,
//               y: 0,
//             },
//           ],
//         },
//         {
//           rowId: 'B',
//           seats: [
//             {
//               number: 'B1',
//               exists: true,
//               type: 'PASSENGER',
//               position: 'window',
//               x: 0,
//               y: 1,
//             },
//             {
//               number: 'B2',
//               exists: false,
//               type: 'PASSENGER',
//               position: 'middle',
//               x: 1,
//               y: 1,
//             },
//           ],
//         },
//       ],
//     },
//   ],
// };
