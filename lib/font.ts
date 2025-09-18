// import { Poppins as Sans } from 'next/font/google';
import { Armata } from 'next/font/google';
import localFont from 'next/font/local';
const fontGabriela = localFont({
  src: [
    {
      path: '../public/fonts/gabriela/Gabriela-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  variable: '--font-gabriela',
  display: 'swap',
});

// TODO: Recheck again, the font weight is a bit bolder than design
const fontStrada = localFont({
  src: [
    {
      // path: '../public/fonts/strada/StradaOT.woff2',
      path: '../public/fonts/strada/StradaOT-Light.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
  variable: '--font-strada',
  display: 'swap',
});

export { fontStrada, fontGabriela };
