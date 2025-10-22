import { LayoutMain } from '../home-layout/main';
import { LayoutHeader, LayoutHeaderProps } from '../home-layout/header';
import { LayoutFooter, LayoutFooterProps } from '../home-layout/footer/footer';
import { fetchProfileInformation } from '#/lib/service/fetch-profile-information';

export default async function StandardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const header: LayoutHeaderProps = {
  //   userInformation: userInformation,
  // };
  // const footer: LayoutFooterProps = {};

  return (
    <>
      <LayoutHeader />
      <div className="mt-16 lg:mt-23.75">
        <LayoutMain>{children}</LayoutMain>
      </div>
      <LayoutFooter />
    </>
  );
}
