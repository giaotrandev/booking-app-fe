'use client';
import { FormRenderBlock } from '#/components/dynamic-form/render';
import { FormFieldProps } from '#/components/dynamic-form/type';
import { useRef, useState } from 'react';
import { IntroductionContent } from '../introduction-content';
import { changePassword } from '#/lib/service/change-password';
import { useUserStore } from '#/store/user';
import { useToast } from '#/components/ui/use-toast';

interface ChangePasswordProps {}

const ChangePassword = ({}: ChangePasswordProps) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const formRenderRef = useRef<{ handleReset: () => void } | null>(null);

  const { user } = useUserStore();
  const { toast } = useToast();

  const handleChangePassword = async (formData: Record<string, any>) => {
    setProcessing(true);
    let data = { ...formData };
    try {
      if (!user) return;
      const responseCancel = await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });
      if (responseCancel?.success) {
        toast({
          title: 'Password changed successfully',
          description: 'Your password has been updated.',
          variant: 'success',
        });
        if (formRenderRef.current) {
          formRenderRef.current.handleReset();
        }
      } else {
        toast({
          title: 'Failed to change password',
          description: responseCancel?.message || 'Please try again later.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error refreshing token:', error);
      toast({
        title: 'Error changing password',
        description:
          'There was an error processing your request. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };
  return (
    <div className="flex flex-col gap-y-4">
      <IntroductionContent
        title="Personal Settings"
        description="Change password"
      />
      <div className="rounded-md bg-white px-6 py-10">
        <div className="w-full">
          <FormRenderBlock
            ref={formRenderRef}
            fields={formFields}
            containerClassName="-mx-3 -my-3.75"
            className="py-3.75"
            onSubmit={handleChangePassword}
            submitButton={{
              label: 'Save changes',
            }}
            processing={processing}
            buttonClassName="mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export { ChangePassword };
const formFields: FormFieldProps[] = [
  {
    id: 'change-password',
    name: 'currentPassword',
    type: 'password',
    label: 'Current password',
    required: true,
  },
  {
    id: 'change-password-password',
    name: 'newPassword',
    type: 'password',
    label: 'New password',
    required: true,
  },
  {
    id: 'change-password-confirm-password',
    name: 'confirmPassword',
    type: 'password',
    label: 'Confirm new password',
    required: true,
  },
];
