'use client';
import { FormRenderBlock } from '#/components/dynamic-form/render';
import { FormFieldProps } from '#/components/dynamic-form/type';
import { updateProfile } from '#/lib/service/update-profile';
import { parseDate } from '#/lib/utilities/format-time';
import { InformationProfileRequestProps } from '#/services/user/information-profile-request';
import { useUserStore } from '#/store/user';
import { useState } from 'react';
import { IntroductionContent } from '../introduction-content';
import { useTranslate } from '#/i18n/client'; // thêm dòng này

interface ProfileContentSidebarProps {
  userInformation?: InformationProfileRequestProps;
}

const ProfileContentSidebar = ({
  userInformation,
}: ProfileContentSidebarProps) => {
  const { translate } = useTranslate();

  const { user, setUser } = useUserStore();
  const [processing, setProcessing] = useState<boolean>(false);
  if (!user) return null;

  const handleSubmitForm = async (formData: Record<string, any>) => {
    setProcessing(true);
    let data = { ...formData };
    for (const key in data) {
      const currentValue = data[key];

      // Nếu là FileList (avatar mới được chọn)
      if (currentValue instanceof FileList || Array.isArray(currentValue)) {
        const files = currentValue as FileList;
        let uploadedAvatarUrl: string | null = null;

        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          try {
            const uploadFormData = new FormData();
            uploadFormData.append('avatar', file);
            uploadFormData.append('id', user.id);
            const res = await fetch('/api/upload-avatar', {
              method: 'POST',
              body: uploadFormData,
            });
            if (!res.ok) {
              continue;
            }
            const result = await res.json();
            if (result?.data?.avatarUrl) {
              uploadedAvatarUrl = result.data.avatarUrl;
              break;
            }
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error(`Error uploading ${file.name}:`, err);
          }
        }

        if (uploadedAvatarUrl) {
          data[key] = uploadedAvatarUrl;
        } else {
          delete data[key];
        }
      }
      // Nếu trường avatar là null (tức là avatar bị xóa)
      else if (key === 'avatar' && currentValue === null) {
        data[key] = '';
      }
    }
    // Gọi API update user
    const responseUppdateProfile = await updateProfile({
      ...data,
      id: user.id,
    });
    if (responseUppdateProfile.success) {
      const updatedUser = responseUppdateProfile.data.user;
      setUser({
        ...updatedUser,
      });
      setProcessing(false);
    }
  };
  const defaultValues = user
    ? {
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        phoneNumber: user.phoneNumber ?? '',
        gender: user.gender ?? '',
        address: user.address ?? '',
        birthday: parseDate(user.birthday ?? '') ?? null,
        avatar: user.avatarUrl ?? '',
      }
    : {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        gender: undefined,
        birthday: undefined,
        avatar: '',
        address: '',
      };

  return (
    <div className="flex flex-col gap-y-4">
      <IntroductionContent
        title={translate({
          vi: 'Cài đặt cá nhân',
          en: 'Personal Settings',
        })}
        description={translate({
          vi: 'Tài khoản',
          en: 'Account',
        })}
      />
      <div className="rounded-md bg-white px-6 py-10">
        <div className="w-full">
          <FormRenderBlock
            fields={formFields(translate)}
            containerClassName="-mx-3 -my-3.75"
            className="px-3 py-3.75"
            isLoginLayout
            onSubmit={handleSubmitForm}
            submitButton={{
              label: translate({
                vi: 'Lưu thay đổi',
                en: 'Save changes',
              }),
            }}
            processing={processing}
            initialDefaultValues={defaultValues}
            buttonClassName="mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export { ProfileContentSidebar };

const formFields = (translate: any): FormFieldProps[] => [
  {
    id: '67b46cf06293d92354c09802',
    name: 'avatar',
    width: 100,
    type: 'custom-file',
  },
  {
    id: 'firstname',
    name: 'firstName',
    type: 'text',
    label: translate({
      vi: 'Tên',
      en: 'First name',
    }),
    width: 50,
  },
  {
    id: 'lastname',
    name: 'lastName',
    type: 'text',
    label: translate({
      vi: 'Họ',
      en: 'Last name',
    }),
    width: 50,
  },
  {
    id: 'phone-number',
    name: 'phoneNumber',
    type: 'text',
    label: translate({
      vi: 'Số điện thoại',
      en: 'Phone number',
    }),
    width: 50,
  },
  {
    id: 'address',
    name: 'address',
    type: 'text',
    label: translate({
      vi: 'Địa chỉ',
      en: 'Address',
    }),
    width: 50,
  },
  {
    id: '67b53c380c32252cb540c1b1',
    name: 'gender',
    width: 50,
    options: [
      {
        id: '67b53c440c32252cb540c1b3',
        value: 'MALE',
        label: translate({
          vi: 'Nam',
          en: 'Male',
        }),
      },
      {
        id: '67b53c4c0c32252cb540c1b5',
        value: 'FEMALE',
        label: translate({
          vi: 'Nữ',
          en: 'Female',
        }),
      },
    ],
    type: 'radio',
    label: translate({
      vi: 'Giới tính',
      en: 'Gender',
    }),
    placeholder: translate({
      vi: 'Giới tính',
      en: 'Gender',
    }),
  },
  {
    id: 'birthday',
    name: 'birthday',
    type: 'date',
    label: translate({
      vi: 'Ngày sinh',
      en: 'Birthday',
    }),
    placeholder: translate({
      vi: 'Ngày sinh',
      en: 'Birthday',
    }),
    width: 50,
  },
];
