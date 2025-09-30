import { NavigationSidebar } from '#/components/blocks/account/sidebar/navigation-sidebar';
import { AccountSideBar } from '#/components/blocks/account/sidebar/user-sidebar';
import { Col } from '#/components/ui/col';
import { Container } from '#/components/ui/container';
import { Row } from '#/components/ui/row';
import AuthLayout from '#/layouts/auth-layout';
import StandardLayout from '#/layouts/standard-layout';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  return (
    <AuthLayout>
      <Container>
        <Row className="bg-pj-grey-lightest gap-y-4 px-8 py-10 lg:gap-y-0 lg:p-10">
          <Col className="col-span-full lg:col-span-3">
            <div className="flex flex-col gap-y-4">
              <AccountSideBar />
              <NavigationSidebar />
            </div>
          </Col>
          <Col className="col-span-full lg:col-span-8 lg:col-start-5">
            {children}
          </Col>
        </Row>
      </Container>
    </AuthLayout>
  );
};

export default Layout;
