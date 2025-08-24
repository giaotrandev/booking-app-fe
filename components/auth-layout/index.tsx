// app/auth/layout.tsx
import { LayoutMain } from '../layout/main';
import { LayoutHeader, LayoutHeaderProps } from '../layout/header';
import { LayoutFooter, LayoutFooterProps } from '../layout/footer/footer';
import { fetchProfileInformation } from '#/lib/service/fetch-profile-information';

export default async function StandardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const result = await verifyTokenAction();
  // if (!result.valid) {
  //   redirect('/login');
  // }
  const userInformation = await fetchProfileInformation();
  const header: LayoutHeaderProps = {
    userInformation: userInformation,
  };
  const footer: LayoutFooterProps = {};

  return (
    <>
      <LayoutHeader {...header} />
      <div className="mt-16 lg:mt-23.75">
        <LayoutMain>{children}</LayoutMain>
      </div>
      <LayoutFooter {...footer} />
    </>
  );
}
