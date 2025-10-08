'use client';
import IntroductionForm from '#/components/common/introduction-form';
import {
  FormRenderBlock,
  FormRenderBlockProps,
} from '#/components/dynamic-form/render';
import { Button } from '#/components/ui/button';
import { ButtonLink } from '#/components/ui/button-link';
import { Typography } from '#/components/ui/typography';
import { Link, useRouter } from '#/i18n/routing';
import { useUserStore } from '#/store/user';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { useToast } from '#/components/ui/use-toast';
import { dynamicFormSubmissionsAction } from '#/components/dynamic-form/action/submission';
import { Row } from '#/components/ui/row';
import { Col } from '#/components/ui/col';
import { useTranslate } from '#/i18n/client';

export interface LoginRenderBlockProps
  extends Pick<FormRenderBlockProps, 'fields'> {}

const LoginRenderBlock = ({ fields }: LoginRenderBlockProps) => {
  const router = useRouter();
  const { toast } = useToast();
  const { translate } = useTranslate();
  const formRenderRef = useRef<{ handleReset: () => void } | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleSubmit = async (formData: Record<string, any>) => {
    try {
      setProcessing(true);

      const result = await dynamicFormSubmissionsAction({
        token: '',
        data: formData,
      });

      if (!result.success) {
        toast({
          title: await translate({
            vi: 'Đăng nhập thất bại',
            en: 'Login failed',
          }),
          description: result.message,
          variant: 'error',
        });
        return;
      }

      useUserStore.getState().setAuth({
        user: {
          id: result.data.data.id,
          email: result.data.data.email,
          name: `${result.data.data.lastName} ${result.data.data.firstName}`,
          firstName: result.data.data.firstName,
          lastName: result.data.data.lastName,
          avatarUrl: result.data.data.avatarUrl,
          gender: result.data.data.gender,
          birthday: result.data.data.birthday,
          phoneNumber: result.data.data.phoneNumber,
        },
        rememberMe: formData.rememberMe,
      });

      toast({
        variant: 'success',
        title: await translate({
          vi: 'Đăng nhập thành công',
          en: 'Login successful',
        }),
        description: await translate({
          vi: 'Bạn đã đăng nhập thành công.',
          en: 'You have successfully signed in.',
        }),
      });

      router.push('/');
    } catch (error) {
      toast({
        title: await translate({
          vi: 'Đăng nhập thất bại',
          en: 'Login failed',
        }),
        description: await translate({
          vi: 'Đã có lỗi xảy ra.',
          en: 'Something went wrong.',
        }),
        variant: 'error',
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleSubmitWithGoogle = () => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2.5;
    window.open(
      'https://booking-app-s5m3.onrender.com/api/auth/google',
      'googleLogin',
      `width=${width},height=${height},left=${left},top=${top},toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0`,
    );
    window.close();
  };

  return (
    <Row className="bg-pj-brown relative lg:gap-x-3">
      <Col className="relative z-[2] col-span-full flex min-h-dvh justify-center p-6 lg:col-span-6 lg:px-0">
        <div className="flex w-full max-w-160 flex-col rounded-[10px] bg-white p-4 lg:py-8 lg:pr-15 lg:pl-8.5">
          <div className="mb-6 flex items-center justify-between lg:mb-12">
            <Image height={62} width={157} src="/images/logo.png" alt="logo" />
          </div>
          <div className="mb-4.5">
            <IntroductionForm
              title={translate({
                vi: 'Đăng nhập',
                en: 'Sign in',
              })}
              description={translate({
                vi: 'Vui lòng nhập email và mật khẩu hợp lệ để đăng nhập',
                en: 'Please enter valid email and password to Sign In',
              })}
            />
          </div>
          <div className="relative">
            <FormRenderBlock
              ref={formRenderRef}
              fields={fields}
              containerClassName="gap-y-8"
              isLoginLayout
              submitButton={{
                label: translate({
                  vi: 'Đăng nhập',
                  en: 'Sign in',
                }),
              }}
              onSubmit={handleSubmit}
              processing={processing}
            />
            <div className="mt-3 flex justify-center lg:absolute lg:right-0 lg:bottom-27.5">
              <ButtonLink
                asChild
                colors="gray-light"
                className="font-normal"
                text={translate({
                  vi: 'Quên mật khẩu?',
                  en: 'Forgot Password?',
                })}
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
              text={translate({
                vi: 'Chưa có tài khoản? Nhấn để đăng ký',
                en: "Don't have an account? Click to SIGN UP",
              })}
            >
              <Link href="/register" />
            </ButtonLink>
            <div className="flex items-center justify-center space-x-1">
              <span className="block h-px w-12 bg-black" />
              <Typography asChild variant="h6" className="font-semibold">
                <p>
                  {translate({
                    vi: 'HOẶC',
                    en: 'OR',
                  })}
                </p>
              </Typography>
              <span className="block h-px w-12 bg-black" />
            </div>
            <div className="flex justify-center">
              <Button
                asChild
                colors="none"
                shape="special"
                variant="special"
                className="text-pj-gray-light"
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
                      <p>
                        {translate({
                          vi: 'Đăng nhập bằng Google',
                          en: 'Sign in with Google',
                        })}
                      </p>
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
                      <p>
                        {translate({
                          vi: 'Đăng nhập bằng Google',
                          en: 'Sign in with Google',
                        })}
                      </p>
                    </Typography>
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Col>
      <Col className="absolute inset-0 z-[1] col-span-full lg:static lg:col-span-6">
        <div className="relative h-full min-h-dvh w-full">
          <Image
            src="/images/template-form.webp"
            alt=""
            fill
            className="object-cover"
          />
          <div className="absolute bottom-25 left-7.5 hidden max-w-103.5 bg-[linear-gradient(90.4deg,_#2E2E2E_0.32%,_rgba(29,27,32,0)_98.09%)] px-2.5 py-1.5 lg:block">
            <Typography asChild variant="h1" className="text-white uppercase">
              <p>
                {translate({
                  vi: 'KHÁM PHÁ NHỮNG ĐIỂM ĐẾN MỚI CÙNG CHÚNG TÔI',
                  en: 'EXPLORE NEW DESTINATION WITH US',
                })}
              </p>
            </Typography>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default LoginRenderBlock;
