'use client';
import IntroductionForm from '#/components/common/introduction-form';
import {
  FormRenderBlock,
  FormRenderBlockProps,
} from '#/components/dynamic-form/render';
import { Button } from '#/components/ui/button';
import { ButtonLink } from '#/components/ui/button-link';
import { Notification } from '#/components/ui/notification';
import { Typography } from '#/components/ui/typography';
import { useToast } from '#/components/ui/use-toast';
import { Link } from '#/i18n/routing';
import Image from 'next/image';
import { useRef, useState } from 'react';

export interface ForgotPasswordRenderBlock
  extends Pick<FormRenderBlockProps, 'fields'> {}
const ForgotPasswordRenderBlock = ({ fields }: ForgotPasswordRenderBlock) => {
  const { toast } = useToast();
  const [processing, setProcessing] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<Record<
    string,
    any
  > | null>(null);
  const [showNotification, setShowNotification] = useState(true);

  const formRenderRef = useRef<{ handleReset: () => void } | null>(null);
  const handleSubmit = async (formData: Record<string, any>) => {
    setProcessing(true);
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        const message =
          result.message || 'Please check your information and try again.';
        toast({
          title: 'Reset password failed',
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
      console.error('Unexpected reset password error:', error);
      toast({
        title: 'Reset password failed',
        description: 'An unexpected error occurred. Please try again later.',
        variant: 'error',
      });
    } finally {
      setProcessing(false);
    }
  };
  const handleResendForgotPassword = async () => {
    if (!submittedData?.email) {
      toast({
        title: 'Missing Email',
        description:
          'We could not find the email address. Please try again later.',
        variant: 'error',
      });
      return;
    }

    setProcessing(true);
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: submittedData.email }),
      });

      const result = await res.json();

      if (!res.ok) {
        const message =
          result.message ||
          'Unable to resend the reset link. Please try again later.';
        toast({
          title: 'Resend Failed',
          description: message,
          variant: 'error',
        });
        return;
      }

      toast({
        title: 'Reset Link Resent',
        description:
          'We’ve resent the password reset link. Please check your email inbox.',
        variant: 'success',
      });
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Error resending reset link:', error);
      toast({
        title: 'Resend Failed',
        description: 'Something went wrong. Please try again shortly.',
        variant: 'error',
      });
    } finally {
      setProcessing(false);
    }
  };
  return (
    <>
      <div className="relative flex h-screen justify-center px-8 py-8">
        <Image
          src="/images/template-form.webp"
          className="-z-1 h-full w-full object-cover"
          fill
          alt=""
        />
        <div className="relative z-0 flex w-full flex-col rounded-[10px] bg-white px-10 py-8 lg:max-w-173.5 lg:px-16 lg:py-3">
          <div className="mb-6 flex items-center justify-between lg:mb-12">
            <Image height={62} width={157} src="/images/logo.png" alt="logo" />
          </div>
          <div className="mb-8">
            <IntroductionForm
              title="Forgot Password"
              description="Enter information to register an account"
            />
          </div>
          <div>
            <FormRenderBlock
              ref={formRenderRef}
              fields={fields}
              submitButton={{
                label: 'Reset password',
              }}
              onSubmit={handleSubmit}
              processing={processing}
            />
          </div>
        </div>
      </div>
      {success && (
        <Notification
          clickOutsideToClose={false}
          open={showNotification}
          onClose={() => setShowNotification(false)}
          className="max-w-140"
          children={
            <div className="flex w-full flex-col items-center justify-center gap-y-4 rounded-xl bg-white p-6 shadow-lg transition-[opacity,transform]">
              <Typography asChild variant="h3">
                <p>Check Your Email</p>
              </Typography>
              <Typography asChild className="text-pj-grey-light text-center">
                <p>
                  We’ve sent a password reset link to your email address.
                  <br />
                  Please check your inbox and follow the instructions to reset
                  your password.
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
                  onClick={handleResendForgotPassword}
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

export default ForgotPasswordRenderBlock;
