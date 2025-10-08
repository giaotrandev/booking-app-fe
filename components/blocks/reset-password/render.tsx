'use client';
import IntroductionForm from '#/components/common/introduction-form';
import { FormRenderBlock } from '#/components/dynamic-form/render';
import { FormFieldProps } from '#/components/dynamic-form/type';
import { useToast } from '#/components/ui/use-toast';
import Image from 'next/image';
import { useRouter } from '#/i18n/routing';
import { useRef, useState } from 'react';

export interface ResetPasswordProps {
  token: string;
  isValid: boolean;
}

const ResetPassword = ({ token, isValid }: ResetPasswordProps) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const formRenderRef = useRef<{ handleReset: () => void } | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (formData: Record<string, any>) => {
    setProcessing(true);
    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, token }),
      });
      const result = await res.json();

      if (!res.ok) {
        const message = result.message || 'Failed to reset your password.';
        toast({
          title: 'Reset Password Failed',
          description: message,
          variant: 'error',
        });

        setProcessing(false);
        return;
      }

      toast({
        title: 'Password Reset Successful',
        description: 'Your password has been updated successfully.',
        variant: 'success',
      });

      if (formRenderRef.current) {
        formRenderRef.current.handleReset();
      }
      router.push('/login');
    } catch (error: any) {
      // eslint-disable-next-line no-console
      console.error('Unexpected error during password reset:', error);
      toast({
        title: 'Something went wrong',
        description: 'Unable to reset your password. Please try again later.',
        variant: 'error',
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <>
      <div className="z-0 flex w-full flex-col rounded-[10px] bg-white px-10 py-8 lg:max-w-173.5 lg:px-16 lg:py-10">
        <div className="mb-6 flex items-center justify-center lg:mb-8">
          <Image height={80} width={180} src="/images/logo.png" alt="logo" />
        </div>
        <div className="mb-4">
          <IntroductionForm
            title="Reset Password"
            description="Enter your new password to reset your account"
          />
        </div>
        <div>
          <FormRenderBlock
            ref={formRenderRef}
            fields={formFields}
            containerClassName="gap-y-8"
            submitButton={{
              label: 'Reset Password',
            }}
            processing={processing}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </>
  );
};

export { ResetPassword };

const formFields: FormFieldProps[] = [
  {
    id: 'register-password',
    name: 'password',
    type: 'password',
    label: 'Password',
    required: true,
  },
  {
    id: 'register-confirm-password',
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm Password',
    required: true,
  },
];
