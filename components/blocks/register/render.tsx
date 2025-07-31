'use client';

import IntroductionForm from '#/components/common/introduction-form';
import { Notification } from '#/components/ui/notification';
import {
  FormRenderBlock,
  FormRenderBlockProps,
} from '#/components/dynamic-form/render';
import { ButtonLink } from '#/components/ui/button-link';
import { Link } from '#/i18n/routing';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { Button } from '#/components/ui/button';
import { Typography } from '#/components/ui/typography';
import { useToast } from '#/components/ui/use-toast';

export interface RegisterRenderBlock
  extends Pick<FormRenderBlockProps, 'fields'> {}

const RegisterRenderBlock = ({ fields }: RegisterRenderBlock) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState(true);
  const [submittedData, setSubmittedData] = useState<Record<
    string,
    any
  > | null>(null);
  const formRenderRef = useRef<{ handleReset: () => void } | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (formData: Record<string, any>) => {
    setProcessing(true);
    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        const message = result.message || 'Register failed';
        toast({
          title: 'Registration failed',
          description: message,
          variant: 'error',
        });

        setProcessing(false);
        return;
      }

      setSubmittedData(formData);
      setSuccess(true);
      if (formRenderRef.current) {
        formRenderRef.current.handleReset();
      }
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Unexpected register error:', error);
      toast({
        title: 'Registration Failed',
        description:
          'Something went wrong. We couldn’t complete your registration. Please try again.',
        variant: 'error',
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleResendVerification = async () => {
    if (!submittedData?.email) {
      toast({
        variant: 'error',
        title: 'Missing Email',
        description: 'Email address is required to proceed.',
      });
      return;
    }

    setProcessing(true);
    try {
      const res = await fetch('/api/resend-verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: submittedData.email }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Resend verification failed');
      }
      toast({
        variant: 'success',
        title: 'Verification Email Sent',
        description: 'A new verification email has been sent to your inbox.',
      });
    } catch (error: any) {
      toast({
        title: 'Resend Failed',
        description: 'Failed to resend verification email.',
        variant: 'error',
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <div className="relative flex justify-center p-8">
        <Image
          src="/images/template-form.webp"
          className="-z-1 h-full w-full object-cover"
          fill
          alt=""
        />
        <div className="relative z-0 flex w-full flex-col rounded-[10px] bg-white px-10 py-8 lg:max-w-173.5 lg:px-16 lg:py-10">
          <div className="mb-6 flex items-center justify-center lg:mb-8">
            <Image height={80} width={180} src="/images/logo.png" alt="logo" />
          </div>
          <div className="mb-2">
            <IntroductionForm
              title="Sign Up"
              description="Enter information to register an account"
            />
          </div>
          <div>
            <FormRenderBlock
              ref={formRenderRef}
              fields={fields}
              containerClassName="gap-y-12 lg:gap-y-8"
              submitButton={{
                label: 'Register',
              }}
              processing={processing}
              onSubmit={handleSubmit}
            />
          </div>
          <div className="mt-4 flex items-center justify-center">
            <ButtonLink
              asChild
              colors="blue"
              variant="small"
              text=" You already have an account. Go back to the homepage."
              className={processing ? 'pointer-events-none opacity-50' : ''}
            >
              <Link href="/login" />
            </ButtonLink>
          </div>
        </div>
      </div>

      {success && (
        <Notification
          open={showNotification}
          onClose={() => setShowNotification(false)}
          children={
            <div className="flex w-full max-w-140 flex-col items-center justify-center gap-y-4 rounded-xl bg-white p-6 shadow-lg transition-[opacity,transform]">
              <Typography asChild variant="h3">
                <p>Confirm Your Account</p>
              </Typography>
              <Typography asChild className="text-pj-grey-light text-center">
                <p>
                  We’ve sent a confirmation email to the address you registered
                  with.
                  <br />
                  Please check your inbox and click the link to activate your
                  account.
                </p>
              </Typography>
              <Image
                src="/images/icons/mailing.webp"
                alt="Email confirmation"
                className="h-16 w-16"
                width={64}
                height={64}
              />
              <div className="flex flex-col items-center lg:flex-row lg:gap-x-1">
                <Typography asChild variant="sub-body">
                  <p>Didn’t receive the email? Check your spam folder or</p>
                </Typography>
                <ButtonLink
                  onClick={handleResendVerification}
                  colors="blue"
                  variant="supper-small"
                  text="resend it"
                />
              </div>
              <div className="flex w-full justify-center">
                <Button
                  onClick={() => setShowNotification(false)}
                  variant="big"
                  text="Back to login"
                  asChild
                >
                  <Link href="/login" />
                </Button>
              </div>
            </div>
          }
        />
      )}
    </>
  );
};

export default RegisterRenderBlock;
