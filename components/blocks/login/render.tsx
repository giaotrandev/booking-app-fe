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
import Image from 'next/image';
import { useState } from 'react';

export interface LoginRenderBlockProps
  extends Pick<FormRenderBlockProps, 'fields'> {}

const LoginRenderBlock = ({ fields }: LoginRenderBlockProps) => {
  const [processing, setProcessing] = useState<boolean>(false);

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
        throw new Error('Login failed');
      }
      setProcessing(true);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

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
                <Link href="/register" />
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
              <Button
                colors="none"
                shape="special"
                variant="special"
                className="text-pj-grey-light"
              >
                <Link href="/google" className="flex items-center space-x-4.5">
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
                </Link>
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
