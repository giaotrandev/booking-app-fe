'use client';

import { FormRenderBlock } from '#/components/dynamic-form/render';
import { FormFieldProps } from '#/components/dynamic-form/type';
import { Typography } from '#/components/ui/typography';
import { useToast } from '#/components/ui/use-toast';
import { useBookingSelection } from '#/context/booking/booking-selection-context';
import { createBooking } from '#/lib/service/create-booking';
import { useUserStore } from '#/store/user';
import { useRouter } from '#/i18n/routing';
import { useTranslate } from '#/i18n/client';

export interface InformationRenderProps {
  tripId: string;
}

const InformationRender = ({ tripId }: InformationRenderProps) => {
  const { toast } = useToast();
  const router = useRouter();
  const { translate } = useTranslate();
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
        title: translate({
          vi: 'Một số ghế đã bị đặt',
          en: 'Some seats have already been booked',
        }),
        description: translate({
          vi: `Ghế ${validation.unavailableSeats.join(', ')} đã được người khác đặt. Vui lòng chọn lại.`,
          en: `Seats ${validation.unavailableSeats.join(', ')} have already been booked. Please select again.`,
        }),
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
      console.error('Error refreshing token:', error);
      toast({
        title: translate({
          vi: 'Đặt vé thất bại',
          en: 'Booking failed',
        }),
        description: translate({
          vi: 'Đã có lỗi xảy ra. Vui lòng thử lại sau.',
          en: 'An error occurred. Please try again later.',
        }),
        variant: 'destructive',
      });
    }
  };

  const defaultValues =
    isLoggedIn && user
      ? {
          fullname: user.name ?? '',
          email: user.email ?? '',
          phoneNumber: user.phoneNumber ?? '',
          note: '',
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
        <p>
          {translate({
            vi: 'Vui lòng điền thông tin hành khách',
            en: 'Please fill in your passenger information',
          })}
        </p>
      </Typography>

      <div className="w-full">
        <FormRenderBlock
          fields={formFields(translate)}
          containerClassName="gap-y-8"
          isLoginLayout
          onSubmit={handleSubmitForm}
          isSubmit={isSubmit}
          setIsSubmit={setIsSubmit}
          initialDefaultValues={defaultValues}
        />
      </div>
    </div>
  );
};

export { InformationRender };

// Dùng hàm để có thể truyền translate vào field labels
const formFields = (
  translate: ReturnType<typeof useTranslate>['translate'],
): FormFieldProps[] => [
  {
    id: 'fullname',
    name: 'fullname',
    type: 'text',
    label: translate({
      vi: 'Họ và tên',
      en: 'Full name',
    }),
    required: true,
  },
  {
    id: 'phone-number',
    name: 'phoneNumber',
    type: 'text',
    label: translate({
      vi: 'Số điện thoại',
      en: 'Phone number',
    }),
    required: true,
  },
  {
    id: 'email',
    name: 'email',
    type: 'email',
    label: translate({
      vi: 'Email',
      en: 'Email',
    }),
    required: true,
  },
  {
    id: 'note',
    name: 'note',
    type: 'textarea',
    label: translate({
      vi: 'Ghi chú',
      en: 'Note',
    }),
  },
];
