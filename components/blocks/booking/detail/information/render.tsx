import { FormRenderBlock } from '#/components/dynamic-form/render';
import { FormFieldProps } from '#/components/dynamic-form/type';
import { Typography } from '#/components/ui/typography';
import { useBookingSelection } from '#/context/booking/booking-selection-context';

export interface InformationRenderProps {}
const InformationRender = () => {
  // const formDataRef = useRef<any>(null); // giả định có cách lấy dữ liệu form
  const { isSubmit, setIsSubmit } = useBookingSelection();
  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-y-4 lg:mt-0">
      <Typography asChild variant="h4">
        <p>PLEASE FILL IN YOUR PASSENGER INFORMATION</p>
      </Typography>
      <div>
        <FormRenderBlock
          // ref={formRenderRef}
          fields={formFields}
          containerClassName="gap-y-8"
          isLoginLayout
          // submitButton={{ label: 'Sign in' }}
          onSubmit={data => {
            // formDataRef.current = data;
            console.log('Form internal submit:', data);
          }}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          // processing={processing || turnstileLoading || !canSubmit}
        />
      </div>
    </div>
  );
};

export { InformationRender };
const formFields: FormFieldProps[] = [
  {
    id: 'fullname',
    name: 'fullname',
    type: 'text',
    label: 'Full name',
    required: true,
  },
  {
    id: 'phone-number',
    name: 'phone-number',
    type: 'text',
    label: 'Phone number',
    required: true,
  },
  {
    id: 'email',
    name: 'email',
    type: 'email',
    label: 'Email',
    required: true,
  },
  {
    id: 'note',
    name: 'note',
    type: 'textarea',
    label: 'Note',
  },
];
