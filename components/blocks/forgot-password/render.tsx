'use client';
import IntroductionForm from '#/components/common/introduction-form';
import {
  FormRenderBlock,
  FormRenderBlockProps,
} from '#/components/dynamic-form/render';
import Image from 'next/image';

export interface ForgotPasswordRenderBlock
  extends Pick<FormRenderBlockProps, 'fields'> {}
const ForgotPasswordRenderBlock = ({ fields }: ForgotPasswordRenderBlock) => {
  return (
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
            fields={fields}
            submitButton={{
              label: 'Reset password',
            }}
            onSubmit={() => console.log('do')}
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordRenderBlock;
