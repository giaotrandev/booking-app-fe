import RegisterRenderBlock from '#/components/blocks/register/render';
import { FormFieldProps } from '#/components/dynamic-form/type';
import {
  getStaticParams,
  getTranslate,
  setStaticParamsLocale,
} from '#/i18n/server';
import { PageProps } from '#/types/global';
import { Metadata } from 'next';

// Thêm dòng này
export const generateStaticParams = getStaticParams;
// ✅ Dynamic metadata cho trang Đăng ký
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const { translate } = await getTranslate();

  const title = await translate({
    vi: 'Đăng ký tài khoản - Vietnam Road Trip',
    en: 'Register Account - Vietnam Road Trip',
  });

  const description = await translate({
    vi: 'Tạo tài khoản Vietnam Road Trip để đặt vé xe liên tỉnh, theo dõi hành trình và quản lý thông tin cá nhân của bạn.',
    en: 'Create a Vietnam Road Trip account to book intercity bus tickets, track your trips, and manage your profile.',
  });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  const url =
    locale === 'vi'
      ? 'https://vietnamroadtrip.vn/vi/register'
      : 'https://vietnamroadtrip.vn/en/register';

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Vietnam Road Trip',
      type: 'website',
      images: [
        {
          url: '/images/logo.png',
          width: 1200,
          height: 630,
          alt: await translate({
            vi: 'Vietnam Road Trip - Đăng ký tài khoản',
            en: 'Vietnam Road Trip - Register Account',
          }),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/images/logo.png'],
    },
    alternates: {
      canonical: url,
      languages: {
        vi: 'https://vietnamroadtrip.vn/vi/register',
        en: 'https://vietnamroadtrip.vn/en/register',
      },
    },
  };
}
const RegisterPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  setStaticParamsLocale(locale);

  const { translate } = await getTranslate();

  const formFields: FormFieldProps[] = [
    {
      id: 'login-email',
      name: 'email',
      type: 'email',
      label: await translate({
        vi: 'Email',
        en: 'Email',
      }),
      required: true,
    },
    {
      id: 'first-name',
      name: 'firstName',
      type: 'text',
      label: await translate({
        vi: 'Tên',
        en: 'First name',
      }),
      required: true,
    },
    {
      id: 'last-name',
      name: 'lastName',
      type: 'text',
      label: await translate({
        vi: 'Họ',
        en: 'Last name',
      }),
      required: true,
    },
    {
      id: '67b53c380c32252cb540c1b1',
      name: 'gender',
      required: true,
      options: [
        {
          id: '67b53c440c32252cb540c1b3',
          value: 'MALE',
          label: await translate({
            vi: 'Nam',
            en: 'Male',
          }),
        },
        {
          id: '67b53c4c0c32252cb540c1b5',
          value: 'FEMALE',
          label: await translate({
            vi: 'Nữ',
            en: 'Female',
          }),
        },
      ],
      type: 'radio',
      label: await translate({
        vi: 'Giới tính',
        en: 'Gender',
      }),
      placeholder: await translate({
        vi: 'Giới tính',
        en: 'Gender',
      }),
    },
    {
      id: 'birthday',
      name: 'birthday',
      type: 'date',
      label: await translate({
        vi: 'Ngày sinh',
        en: 'Birthday',
      }),
      required: true,
      placeholder: await translate({
        vi: 'Ngày sinh',
        en: 'Birthday',
      }),
    },
    {
      id: 'register-password',
      name: 'password',
      type: 'password',
      label: await translate({
        vi: 'Mật khẩu',
        en: 'Password',
      }),
      required: true,
    },
    {
      id: 'register-confirm-password',
      name: 'confirmPassword',
      type: 'password',
      label: await translate({
        vi: 'Xác nhận mật khẩu',
        en: 'Confirm password',
      }),
      required: true,
    },
  ];

  return (
    <section>
      <RegisterRenderBlock fields={formFields} />
    </section>
  );
};

export default RegisterPage;
