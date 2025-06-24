import { SeatConfiguration } from '#/types/vehicle';
import { FilterItemProps } from '../../layout/filter-trip/navigation-booking/render';
import { BookingItemProps } from './list';
// import { BookingItemProps } from './item';
import { BookingRenderBlock } from './render';

const BookingBlock = () => {
  const convertToSelectOptions = (list: string[]) =>
    list.map(item => ({ label: item, value: item }));

  const arrivalListSample: FilterItemProps[] =
    convertToSelectOptions(arrivalList);
  const destinationListSample: FilterItemProps[] =
    convertToSelectOptions(destinationList);
  return (
    <BookingRenderBlock
      arrivalList={arrivalListSample}
      destinationList={destinationListSample}
      bookingList={sampleBookingList}
    />
  );
};

export default BookingBlock;
const arrivalList: string[] = [
  'Hanoi',
  'Ho Chi Minh City',
  'Da Nang',
  'Hue',
  'Nha Trang',
];

const destinationList: string[] = [
  'Sapa',
  'Ha Long Bay',
  'Phu Quoc',
  'Da Lat',
  'Can Tho',
];

const sampleBookingList: BookingItemProps[] = [
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
    dropingList: [
      {
        id: 'mega-market',
        time: '06:00',
        locationName: 'Mega Market Vung Tau',
        address: '800 Hai Thang Chin St, Ward 11, Vung Tau City',
      },
      {
        id: 'thuy-duong-beach',
        time: '06:20',
        locationName: 'Thuy Duong Beach',
        address: 'A3 Thuy Van St, Thang Tam Ward, Vung Tau City',
      },
      {
        id: 'lotte-mart',
        time: '06:30',
        locationName: 'Lotte Mart Vung Tau',
        address: 'Ba Thang Hai St Roundabout, Ward 8, Vung Tau City',
      },
      {
        id: 'xom-luoi-market',
        time: '06:45',
        locationName: 'Xom Luoi Market',
        address: '83RG+PPW Nguyen Cong Tru St, Ward 1, Vung Tau City',
      },
    ],
    pickingList: [
      {
        id: 'main-bus-station',
        time: '09:30',
        locationName: 'Bac Lieu Main Bus Station',
        address: '255 Tran Phu St, Ward 7, Bac Lieu City',
      },
      {
        id: 'kinh-tu-market',
        time: '09:45',
        locationName: 'Kinh Tu Market',
        address: 'Dien Hai Village, Dong Hai Town, Bac Lieu Province',
      },
      {
        id: 'vn-roadtrip-office',
        time: '10:00',
        locationName: 'VN Roadtrip Bac Lieu Office',
        address: '216 Tran Huynh St, Ward 3, Bac Lieu City',
      },
      {
        id: 'ho-phong-bus-station',
        time: '10:15',
        locationName: 'Ho Phong Bus Station',
        address: 'QL1A Ho Phong Village, Gia Rai Town, Bac Lieu Province',
      },
      {
        id: 'tac-say-church',
        time: '10:30',
        locationName: 'Tac Say Church',
        address:
          'Group 2 - QL1A, Tan Phong Village, Gia Rai Town, Bac Lieu Province',
      },
    ],
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
  },
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
const mockSingleDeckConfiguration: SeatConfiguration = {
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

              x: 0,
              y: 0,
            },
            {
              number: 'A1',
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
  ],
};
