'use client';
import IntroductionForm from '#/components/common/introduction-form';
import {
  FormRenderBlock,
  FormRenderBlockProps,
} from '#/components/dynamic-form/render';
import { Button } from '#/components/ui/button';
import { ButtonLink } from '#/components/ui/button-link';
import { Typography } from '#/components/ui/typography';
import { Link } from '#/i18n/routing';
import { useUserStore } from '#/store/user';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '#/components/ui/use-toast';

export interface LoginRenderBlockProps
  extends Pick<FormRenderBlockProps, 'fields'> {}

const LoginRenderBlock = ({ fields }: LoginRenderBlockProps) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const router = useRouter();
  const { toast } = useToast();

  const formRenderRef = useRef<{ handleReset: () => void } | null>(null);
  const handleSubmit = async (formData: Record<string, any>) => {
    try {
      setProcessing(true);
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const resultResponse = await response.json();
      if (!response.ok) {
        const message = resultResponse.message || 'Login failed';
        toast({
          title: 'Login failed',
          description: message,
          variant: 'error',
        });

        setProcessing(false);
        return;
      }

      useUserStore.getState().setAuth({
        user: resultResponse.user,
        rememberMe: formData.rememberMe,
      });

      toast({
        variant: 'success',
        title: 'Login successful',
        description: 'You have successfully signed in.',
      });

      if (formRenderRef.current) {
        formRenderRef.current.handleReset();
      }

      router.push('/');
    } catch (error) {
      console.error('Unexpected login error:', error);

      toast({
        title: 'Login failed',
        description: 'Something went wrong. Please try again later.',
        variant: 'error',
      });
    } finally {
      setProcessing(false);
    }
  };
  const handleSubmitWithGoogle = () => {
    // window.location.href =
    //   'https://booking-app-s5m3.onrender.com/api/auth/google';
    const width1 = 500;
    const height1 = 600;
    const left2 = window.screenX + (window.outerWidth - width1) / 2;
    const top2 = window.screenY + (window.outerHeight - height1) / 2.5;
    window.open(
      'https://booking-app-s5m3.onrender.com/api/auth/google',
      'googleLogin',
      `width=${width1},height=${height1},left=${left2},top=${top2},toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0`,
    );
  };
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      console.log('🔥 Message received:', e.data);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);
  // useEffect(() => {
  //   const handleMessage = (event: MessageEvent) => {
  //     if (event.origin !== 'http://localhost:3000') return;

  //     const { success, type, user, error } = event.data;
  //     console.log('Received user data:', event);
  //     if (type === 'GOOGLE_AUTH_SUCCESS' && success && user) {
  //       // Cập nhật Zustand store
  //       // setUser({
  //       //   id: user.id,
  //       //   name: user.name,
  //       //   email: user.email,
  //       //   role: user.role,
  //       // });
  //       useUserStore.getState().setAuth({
  //         user,
  //       });
  //       toast({
  //         variant: 'success',
  //         title: 'Login successful',
  //         description: 'You have successfully signed in.',
  //       });
  //     } else if (type === 'GOOGLE_AUTH_ERROR') {
  //       console.error('Authentication error:', error);
  //       toast({
  //         title: 'Login failed',
  //         description: 'Something went wrong. Please try again later.',
  //         variant: 'error',
  //       });
  //     }
  //   };

  //   window.addEventListener('message', handleMessage);

  //   return () => {
  //     window.removeEventListener('message', handleMessage);
  //   };
  // }, []);
  return (
    <div className="bg-pj-brown flex h-screen w-full items-center lg:flex-row lg:justify-between lg:gap-x-3">
      <div className="w-full px-5 py-6 lg:flex lg:w-1/2 lg:items-center lg:justify-center lg:p-0">
        <div className="flex w-full flex-col rounded-[10px] bg-white p-4 lg:max-w-150 lg:py-12 lg:pr-15 lg:pl-8.5">
          <div className="mb-6 flex items-center justify-between lg:mb-12">
            <Image height={62} width={157} src="/images/logo.png" alt="logo" />
          </div>
          <div className="mb-4.5">
            <IntroductionForm
              title="Sign in"
              description="Please enter valid email and password to Sign In"
            />
          </div>
          <div className="relative">
            <FormRenderBlock
              fields={fields}
              containerClassName="gap-y-8"
              isLoginLayout
              submitButton={{
                label: 'Sign in',
              }}
              onSubmit={handleSubmit}
              processing={processing}
            />
            <div className="mt-3 flex justify-center lg:absolute lg:right-0 lg:bottom-22.5">
              <ButtonLink
                asChild
                colors="grey-light"
                className="font-normal"
                text="Forgot Password?"
              >
                <Link href="/forgot-password" />
              </ButtonLink>
            </div>
          </div>
          <div className="mt-3 flex flex-col justify-center gap-y-3 lg:mt-4 lg:gap-y-4">
            <ButtonLink
              asChild
              colors="blue"
              variant="small"
              text="Don’t have an account ? Click to SIGN UP"
            >
              <Link href="/register" />
            </ButtonLink>
            <div className="flex items-center justify-center space-x-1">
              <span className="block h-px w-12 bg-black" />
              <Typography asChild variant="h6" className="font-semibold">
                <p>OR</p>
              </Typography>
              <span className="block h-px w-12 bg-black" />
            </div>
            <div className="flex justify-center">
              {/* TODO: Improve this button */}
              <Button
                asChild
                colors="none"
                shape="special"
                variant="special"
                className="text-pj-grey-light"
                onClick={handleSubmitWithGoogle}
              >
                <span className="relative flex items-center overflow-hidden">
                  <span className="group-hocus-visible/button:-translate-y-[130%] inline-flex items-center space-x-4.5 transition-transform duration-500 ease-[cubic-bezier(.4,0,0,1)]">
                    <Image
                      src="/images/icons/google.svg"
                      height={31}
                      width={31}
                      className="h-6 w-6 lg:h-7.75 lg:w-7.75"
                      alt="logo-google"
                    />
                    <Typography asChild variant="h6">
                      <p>Sign in with Google</p>
                    </Typography>
                  </span>
                  <span className="group-hocus-visible/button:translate-y-0 absolute inset-0 flex translate-y-[130%] items-center justify-center space-x-4.5 transition-transform duration-500 ease-[cubic-bezier(.4,0,0,1)]">
                    <Image
                      src="/images/icons/google.svg"
                      height={31}
                      width={31}
                      className="h-6 w-6 lg:h-7.75 lg:w-7.75"
                      alt="logo-google"
                    />
                    <Typography asChild variant="h6">
                      <p>Sign in with Google</p>
                    </Typography>
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden h-screen w-full lg:block lg:w-1/2">
        <Image
          src="/images/template-form.webp"
          alt=""
          fill
          className="h-full object-cover"
        />
        <div className="absolute bottom-25 left-7.5 max-w-103.5 bg-[linear-gradient(90.4deg,_#2E2E2E_0.32%,_rgba(29,27,32,0)_98.09%)] px-2.5 py-1.5">
          <Typography asChild variant="h1" className="text-white uppercase">
            <p>EXPLORE NEW DESINATION WITH US</p>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default LoginRenderBlock;
