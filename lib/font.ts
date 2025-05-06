// import { Poppins as Sans } from 'next/font/google';
import { Baloo_2, Archivo_Black, Montserrat, Roboto } from 'next/font/google'
import { Armata } from 'next/font/google'

const fontArmata = Armata({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-armata',
})

const fontArchivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-archivo',
})

const fontMontserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-montserrat',
})

const fontSans = Baloo_2({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-sans',
})

const fontRoboto = Roboto({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-roboto',
})

export { fontSans, fontArchivoBlack, fontMontserrat, fontArmata, fontRoboto };

// import localFont from 'next/font/local';

// // const fontSans = Sans({
// //   subsets: ['latin'],
// //   weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
// //   variable: '--font-sans',
// //   display: 'swap',
// // });
// const fontSans = localFont({
//   src: [
//     {
//       path: '../public/fonts/plexsans/IBMPlexSans-Regular.woff2',
//       weight: '400',
//       style: 'normal',
//     },
//     {
//       path: '../public/fonts/plexsans/IBMPlexSans_Condensed-Bold.woff2',
//       weight: '700',
//       style: 'normal',
//     },
//   ],
//   variable: '--font-sans',
//   display: 'swap',
// });

