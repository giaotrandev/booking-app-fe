import { FormRenderBlock } from '#/components/dynamic-form/render';
import { FormFieldProps } from '#/components/dynamic-form/type';
import { Typography } from '#/components/ui/typography';
import { useToast } from '#/components/ui/use-toast';
import { useBookingSelection } from '#/context/booking/booking-selection-context';
import { createBooking } from '#/lib/service/create-booking';
import { useUserStore } from '#/store/user';
import { useRouter } from 'next/navigation';

export interface InformationRenderProps {
  tripId: string;
}
const InformationRender = ({ tripId }: InformationRenderProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const {
    isSubmit,
    setIsSubmit,
    validateSelectedSeats,
    selectedPickingId,
    selectedDropingId,
    getAvailableSeats,
  } = useBookingSelection();
  const { user, isLoggedIn } = useUserStore();
  const handleSubmitForm = async (formData: Record<string, any>) => {
    const validation = validateSelectedSeats();
    if (!validation.isValid) {
      toast({
        title: 'Một số ghế đã bị đặt',
        description: `Ghế ${validation.unavailableSeats.join(', ')} đã được người khác đặt. Vui lòng chọn lại.`,
        variant: 'destructive',
      });
      return;
    }
    try {
      const availableSeatIds = getAvailableSeats().map(seat => seat.id);

      const response = await createBooking({
        tripId: tripId,
        seatIds: availableSeatIds,
        passengerName: formData?.fullname ?? '',
        passengerEmail: formData?.email ?? '',
        passengerPhone: formData?.phoneNumber ?? '',
        passengerNote: formData?.note,
        pickupId: selectedPickingId ?? '',
        dropoffId: selectedDropingId ?? '',
      });
      const bookingId = response;
      router.push(`/checkout?bookingId=${bookingId}`);
    } catch (error) {
      toast({
        title: 'Đặt vé thất bại',
        description: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
        variant: 'destructive',
      });
    }
  };
  // HotFix tam thoi
  const defaultValues =
    isLoggedIn && user
      ? {
          fullname: user.name ?? '',
          email: user.email ?? '',
          phoneNumber: user.phoneNumber ?? '', // Thêm trường này
          note: '', // Thêm trường này
        }
      : {
          fullname: '',
          email: '',
          phoneNumber: '',
          note: '',
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
          onSubmit={handleSubmitForm}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          initialDefaultValues={defaultValues}
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
