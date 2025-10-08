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
import { useTranslate } from '#/i18n/client';

export interface ForgotPasswordRenderBlock
  extends Pick<FormRenderBlockProps, 'fields'> {}

const ForgotPasswordRenderBlock = ({ fields }: ForgotPasswordRenderBlock) => {
  const { translate } = useTranslate();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        const message =
          result.message ||
          translate({
            vi: 'Vui lòng kiểm tra thông tin và thử lại.',
            en: 'Please check your information and try again.',
          });

        toast({
          title: translate({
            vi: 'Đặt lại mật khẩu thất bại',
            en: 'Reset password failed',
          }),
          description: message,
          variant: 'error',
        });

        setProcessing(false);
        return;
      }

      setSubmittedData(formData);
      setSuccess(true);

      formRenderRef.current?.handleReset();
    } catch (error) {
      console.error('Unexpected reset password error:', error);
      toast({
        title: translate({
          vi: 'Đặt lại mật khẩu thất bại',
          en: 'Reset password failed',
        }),
        description: translate({
          vi: 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.',
          en: 'An unexpected error occurred. Please try again later.',
        }),
        variant: 'error',
      });
    } finally {
      setProcessing(false);
    }
  };

  const handleResendForgotPassword = async () => {
    if (!submittedData?.email) {
      toast({
        title: translate({
          vi: 'Thiếu email',
          en: 'Missing Email',
        }),
        description: translate({
          vi: 'Không tìm thấy địa chỉ email. Vui lòng thử lại sau.',
          en: 'We could not find the email address. Please try again later.',
        }),
        variant: 'error',
      });
      return;
    }

    setProcessing(true);
    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: submittedData.email }),
      });

      const result = await res.json();

      if (!res.ok) {
        const message =
          result.message ||
          translate({
            vi: 'Không thể gửi lại liên kết đặt lại. Vui lòng thử lại sau.',
            en: 'Unable to resend the reset link. Please try again later.',
          });

        toast({
          title: translate({
            vi: 'Gửi lại thất bại',
            en: 'Resend Failed',
          }),
          description: message,
          variant: 'error',
        });
        return;
      }

      toast({
        title: translate({
          vi: 'Đã gửi lại liên kết đặt lại',
          en: 'Reset Link Resent',
        }),
        description: translate({
          vi: 'Chúng tôi đã gửi lại liên kết đặt lại mật khẩu. Vui lòng kiểm tra email của bạn.',
          en: 'We’ve resent the password reset link. Please check your email inbox.',
        }),
        variant: 'success',
      });
    } catch (error) {
      console.error('Error resending reset link:', error);
      toast({
        title: translate({
          vi: 'Gửi lại thất bại',
          en: 'Resend Failed',
        }),
        description: translate({
          vi: 'Đã xảy ra lỗi. Vui lòng thử lại sau.',
          en: 'Something went wrong. Please try again shortly.',
        }),
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
          <Link
            href={'/'}
            className="mb-6 flex items-center justify-between lg:mb-12"
          >
            <Image height={62} width={157} src="/images/logo.png" alt="logo" />
          </Link>
          <div className="mb-8">
            <IntroductionForm
              title={translate({
                vi: 'Quên mật khẩu',
                en: 'Forgot Password',
              })}
              description={translate({
                vi: 'Nhập thông tin để đặt lại mật khẩu của bạn',
                en: 'Enter information to reset your password',
              })}
            />
          </div>

          <div>
            <FormRenderBlock
              ref={formRenderRef}
              fields={fields}
              submitButton={{
                label: translate({
                  vi: 'Đặt lại mật khẩu',
                  en: 'Reset password',
                }),
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
                <p>
                  {translate({
                    vi: 'Kiểm tra email của bạn',
                    en: 'Check Your Email',
                  })}
                </p>
              </Typography>

              <Typography asChild className="text-pj-gray-light text-center">
                <p>
                  {translate({
                    vi: 'Chúng tôi đã gửi liên kết đặt lại mật khẩu đến địa chỉ email của bạn.',
                    en: 'We’ve sent a password reset link to your email address.',
                  })}
                  <br />
                  {translate({
                    vi: 'Vui lòng kiểm tra hộp thư và làm theo hướng dẫn để đặt lại mật khẩu.',
                    en: 'Please check your inbox and follow the instructions to reset your password.',
                  })}
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
                  <p>
                    {translate({
                      vi: 'Không nhận được email? Kiểm tra thư rác hoặc',
                      en: 'Didn’t receive the email? Check your spam folder or',
                    })}
                  </p>
                </Typography>

                <ButtonLink
                  onClick={handleResendForgotPassword}
                  colors="blue"
                  variant="supper-small"
                  text={translate({
                    vi: 'gửi lại',
                    en: 'resend it',
                  })}
                />
              </div>

              <div className="flex w-full justify-center">
                <Button
                  onClick={() => setShowNotification(false)}
                  variant="big"
                  text={translate({
                    vi: 'Quay lại đăng nhập',
                    en: 'Back to login',
                  })}
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
