import { FormRenderBlock } from '#/components/dynamic-form/render';
import { FormFieldProps } from '#/components/dynamic-form/type';
import { Typography } from '#/components/ui/typography';
import { useToast } from '#/components/ui/use-toast';
import { useBookingSelection } from '#/context/booking/booking-selection-context';

export interface InformationRenderProps {}
const InformationRender = () => {
  const { toast } = useToast();
  const { isSubmit, setIsSubmit, validateSelectedSeats, setPassengerInfo } =
    useBookingSelection();
  const handleSubmitForm = (formData: Record<string, any>) => {
    const validation = validateSelectedSeats();
    if (!validation.isValid) {
      toast({
        title: 'Một số ghế đã bị đặt',
        description: `Ghế ${validation.unavailableSeats.join(', ')} đã được người khác đặt. Vui lòng chọn lại.`,
        variant: 'destructive',
      });
      return;
    }
    setPassengerInfo({
      fullname: formData.fullname,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      note: formData.note,
    });
  };
  return (
    <div className="mt-4 flex flex-col items-center justify-center gap-y-4 lg:mt-0">
      <Typography asChild variant="h4">
        <p>PLEASE FILL IN YOUR PASSENGER INFORMATION</p>
      </Typography>
      <div className="w-full">
        <FormRenderBlock
          // ref={formRenderRef}
          fields={formFields}
          containerClassName="gap-y-8"
          isLoginLayout
          // submitButton={{ label: 'Sign in' }}
          onSubmit={handleSubmitForm}
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
    name: 'phoneNumber',
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
