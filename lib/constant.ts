export const languages = {
  vi: 'Vi',
  en: 'En',
};

export const collections = [
  // {
  //   name: 'pages',
  //   path: '',
  // },
  {
    name: 'booking',
    path: '/booking',
  },
]; // SETUP - Collections: Add/remove list of collections here

export const homePagePath = '/';

export const blurDataUrl =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNksAIAAEAAPGP8nrgAAAAASUVORK5CYII=';
export const dateFormat = 'dd.MM.yyyy'; // SETUP - Constants: Set the format display for date (refs: https://date-fns.org/docs/Getting-Started)
export const dateNewsFormat = 'd. MMMM yyyy';
export const pageSize = '5';
export const defaultPage = '1';
export const minPriceDefault = 0;
export const maxPriceDefault = 10000;
export const minTimeDefault = 0;
export const maxTimeDefault = 1425;
export const protectedRoutes = [
  '/my-account/profile',
  '/my-account/my-booking',
];
export const BOOKING_EXPIRE_MINUTES = parseInt(
  process.env.BOOKING_EXPIRE_MINUTES ?? '120',
);
