// app/auth/layout.tsx
import { LayoutMain } from '../home-layout/main';
import { LayoutHeader, LayoutHeaderProps } from '../home-layout/header';
import { LayoutFooter, LayoutFooterProps } from '../home-layout/footer/footer';
import { fetchProfileInformation } from '#/lib/service/fetch-profile-information';
import { AuthProvider } from '#/providers/auth-provider';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
