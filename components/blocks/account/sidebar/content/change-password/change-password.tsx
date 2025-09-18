import { FormRenderBlock } from '#/components/dynamic-form/render';
import { FormFieldProps } from '#/components/dynamic-form/type';
import { IntroductionContent } from '../introduction-content';

interface ChangePasswordProps {}

const ChangePassword = ({}: ChangePasswordProps) => {
  return (
    <div>
      <IntroductionContent
        title="Personal Settings"
        description="Change password"
      />
      {/* <div className="rounded-md bg-white px-6 py-10">
        <div className="w-full">
          <FormRenderBlock
            fields={formFields}
            containerClassName="-mx-3 -my-3.75"
            className="px-3 py-3.75"
            isLoginLayout
            onSubmit={handleSubmitForm}
            submitButton={{
              label: 'Save changes',
            }}
            processing={processing}
            initialDefaultValues={defaultValues}
            buttonClassName="mt-4"
          />
        </div>
      </div> */}
    </div>
  );
};

export { ChangePassword };
const formFields: FormFieldProps[] = [
  {
    id: 'login-password',
    name: 'password',
    type: 'password',
    label: 'Password',
    required: true,
  },
];
