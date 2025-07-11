import { Typography } from '#/components/ui/typography';
import { Link } from '#/i18n/routing';
import Image from 'next/image';
import { Col } from '../../ui/col';
import { Container } from '../../ui/container';
import { Row } from '../../ui/row';
import { ContactItemProps } from './contact-item';
import ContactList from './contact-list';
import { blurDataUrl } from '#/lib/constant';

export interface LayoutFooterProps {}

const LayoutFooter = ({}: LayoutFooterProps) => {
  return (
    <footer id="site-footer" className="py-17.5">
      <Container>
        <Row className="gap-y-10 lg:grid-cols-20 lg:gap-y-0">
          <Col className="col-span-full lg:col-span-4">
            <Link href="/" className="relative block h-[85px] w-full">
              <Image
                src="/images/logo.png"
                alt="Vietnam Road Trip Logo"
                fill
                className="object-contain object-center"
                placeholder="blur"
                blurDataURL={blurDataUrl}
              />
            </Link>
          </Col>
          <Col className="col-span-full lg:col-span-5 lg:col-start-7">
            <ContactList list={contactItemList as ContactItemProps[]} />
          </Col>
          <Col className="col-span-full lg:col-span-3 lg:col-start-13">
            <ul className="space-y-3">
              <li>
                <Typography asChild className="font-semibold" variant="label">
                  <span>{linkItemList.title}</span>
                </Typography>
              </li>
              {linkItemList.linkList.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.url}
                    className='hocus-visible:text-pj-blue hocus-visible:transition-[color] before:bg-pj-blue hocus-visible:before:scale-100 hocus-visible:before:origin-left relative before:absolute before:bottom-0 before:h-px before:w-full before:origin-right before:scale-x-0 before:transition-transform before:content-[""]'
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>
          <Col className="col-span-full lg:col-span-4 lg:col-start-17">
            <div className="flex flex-col space-y-6">
              <Typography asChild className="font-semibold" variant="label">
                <span>{socialItemList.title}</span>
              </Typography>
              <ul className="flex space-x-5">
                {socialItemList.icons.map((item, index) => (
                  <li key={index}>
                    <Link href="#">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        width={24}
                        height={24}
                        sizes="(max-width: 1023px) 100vw, 24px"
                        className="size-6"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export { LayoutFooter };
const contactItemList = [
  {
    title: 'Hotline',
    icon: 'phone',
    content: 'Monday - Sunday (8:30 - 23:00)',
  },
  {
    title: 'Email',
    icon: 'email',
    content: 'giaotrandev@gmail.com',
  },
  {
    title: 'Address',
    icon: 'address',
    content:
      '277 Bis Au Duong Lan Street, Rach Ong Ward, District 8, Ho Chi Minh City, Vietnam',
  },
];
const socialItemList = {
  title: 'follow us',
  icons: [
    {
      image: {
        src: '/images/icons/Facebook.png',
        alt: 'facebook-icon',
        width: 32,
        height: 32,
      },
    },
    {
      image: {
        src: '/images/icons/Instagram.png',
        alt: 'instagram-icon',
        width: 32,
        height: 32,
      },
    },
    {
      image: {
        src: '/images/icons/LinkedIn.png',
        alt: 'linkedin-icon',
        width: 32,
        height: 32,
      },
    },
  ],
};
const linkItemList = {
  title: 'Terms of Use',
  linkList: [
    {
      text: 'Terms and Conditions',
      url: '#',
    },
    {
      text: 'Privacy Policy',
      url: '#',
    },
    {
      text: 'Cookies Policy',
      url: '#',
    },
  ],
};
