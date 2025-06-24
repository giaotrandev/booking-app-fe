// app/auth/layout.tsx
import { redirect } from 'next/navigation';
import { verifyTokenAction } from './actions/verify-token';
import { LayoutMain } from '../layout/main';
import { LayoutHeader, LayoutHeaderProps } from '../layout/header';
import { LayoutFooter, LayoutFooterProps } from '../layout/footer/footer';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const result = await verifyTokenAction();
  if (!result.valid) {
    redirect('/login');
  }
  const header: LayoutHeaderProps = {};
  const footer: LayoutFooterProps = {};

  return (
    <>
      <LayoutHeader {...header} />
      <LayoutMain>{children}</LayoutMain>
      <LayoutFooter {...footer} />
    </>
  );
}
