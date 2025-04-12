import { i18n } from '#/i18n/config';
import { redirect } from 'next/navigation';

const RootPage = () => {
  redirect(i18n.defaultLocale);
};

export default RootPage;
