'use client';

import { FormRenderBlock } from '#/components/dynamic-form/render';
import { FormFieldProps } from '#/components/dynamic-form/type';
import { useRef, useState } from 'react';
import { IntroductionContent } from '../introduction-content';
import { changePassword } from '#/lib/service/change-password';
import { useUserStore } from '#/store/user';
import { useToast } from '#/components/ui/use-toast';
import { useTranslate } from '#/i18n/client'; // 👈 thêm i18n hook client

interface ChangePasswordProps {}

export const ChangePassword = ({}: ChangePasswordProps) => {
  const [processing, setProcessing] = useState<boolean>(false);
  const formRenderRef = useRef<{ handleReset: () => void } | null>(null);

  const { user } = useUserStore();
  const { toast } = useToast();
  const { translate } = useTranslate(); // 👈 lấy hàm translate client-side

  const handleChangePassword = async (formData: Record<string, any>) => {
    setProcessing(true);
    try {
      if (!user) return;
      const response = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword,
      });

      if (response?.success) {
        toast({
          title: translate({
            vi: 'Đổi mật khẩu thành công',
            en: 'Password changed successfully',
          }),
          description: translate({
            vi: 'Mật khẩu của bạn đã được cập nhật.',
            en: 'Your password has been updated.',
          }),
          variant: 'success',
        });

        formRenderRef.current?.handleReset?.();
      } else {
        toast({
          title: translate({
            vi: 'Không thể đổi mật khẩu',
            en: 'Failed to change password',
          }),
          description:
            response?.message ||
            translate({
              vi: 'Vui lòng thử lại sau.',
              en: 'Please try again later.',
            }),
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error changing password:', error);
      toast({
        title: translate({
          vi: 'Lỗi khi đổi mật khẩu',
          en: 'Error changing password',
        }),
        description: translate({
          vi: 'Đã xảy ra lỗi trong quá trình xử lý. Vui lòng thử lại.',
          en: 'There was an error processing your request. Please try again.',
        }),
        variant: 'destructive',
      });
    } finally {
      setProcessing(false);
    }
  };

  const formFields: FormFieldProps[] = [
    {
      id: 'change-password',
      name: 'currentPassword',
      type: 'password',
      label: translate({
        vi: 'Mật khẩu hiện tại',
        en: 'Current password',
      }),
      required: true,
    },
    {
      id: 'change-password-password',
      name: 'newPassword',
      type: 'password',
      label: translate({
        vi: 'Mật khẩu mới',
        en: 'New password',
      }),
      required: true,
    },
    {
      id: 'change-password-confirm-password',
      name: 'confirmPassword',
      type: 'password',
      label: translate({
        vi: 'Xác nhận mật khẩu mới',
        en: 'Confirm new password',
      }),
      required: true,
    },
  ];

  return (
    <div className="flex flex-col gap-y-4">
      <IntroductionContent
        title={translate({
          vi: 'Cài đặt cá nhân',
          en: 'Personal Settings',
        })}
        description={translate({
          vi: 'Đổi mật khẩu',
          en: 'Change password',
        })}
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
              label: translate({
                vi: 'Lưu thay đổi',
                en: 'Save changes',
              }),
            }}
            processing={processing}
            buttonClassName="mt-4"
          />
        </div>
      </div>
    </div>
  );
};
