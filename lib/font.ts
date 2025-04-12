// import { Poppins as Sans } from 'next/font/google';
import localFont from 'next/font/local';

// const fontSans = Sans({
//   subsets: ['latin'],
//   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
//   variable: '--font-sans',
//   display: 'swap',
// });
const fontSans = localFont({
  src: [
    {
      path: '../public/fonts/plexsans/IBMPlexSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/plexsans/IBMPlexSans_Condensed-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sans',
  display: 'swap',
});

export { fontSans };
