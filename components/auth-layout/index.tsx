// app/auth/layout.tsx
import { LayoutMain } from '../layout/main';
import { LayoutHeader, LayoutHeaderProps } from '../layout/header';
import { LayoutFooter, LayoutFooterProps } from '../layout/footer/footer';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const result = await verifyTokenAction();
  // if (!result.valid) {
  //   redirect('/login');
  // }
  const header: LayoutHeaderProps = {};
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
