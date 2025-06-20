'use client';
import { Toaster } from '#/components/ui/toaster';
import { ToastProvider } from '#/components/ui/use-toast';
// import { GoogleReCaptchaProvider } from '#/lib/google/recaptcha/v3/provider'; // SETUP - Provider: Enable this component if your site is using Google reCAPTCHA
import { ThemeProvider } from 'next-themes';
import { PropsWithChildren } from 'react';
// import { Tracking } from './tracking'; // SETUP - Provider: Enable this component if your site has a tracking

interface ProvidersProps extends PropsWithChildren {}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {/* <GoogleReCaptchaProvider> */}
      <ToastProvider>
        <div id="site-wrapper">
          {/* <Tracking /> */}
          {children}
        </div>
      </ToastProvider>
      {/* </GoogleReCaptchaProvider> */}
    </ThemeProvider>
  );
};

export { Providers };
