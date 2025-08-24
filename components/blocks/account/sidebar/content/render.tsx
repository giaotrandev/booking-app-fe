'use client';

import { ProfileContentSidebar } from './profile';
import { InformationProfileRequestProps } from '#/services/user/information-profile-request';
import { useSearchParams } from 'next/navigation';
import { BookingHistory } from './booking-history/booking-history';

export interface ContentSidebarProps {}

const ContentSidebar = ({}: ContentSidebarProps) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');

  return (
    <div>
      {tab === 'profile' && <ProfileContentSidebar />}

      {tab === 'my-booking' && <BookingHistory />}
    </div>
  );
};

export { ContentSidebar };
