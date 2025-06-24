import { Fragment, ReactNode } from 'react';
import {
  Breadcrumb as HeadlessBreadcrumb,
  BreadcrumbList as HeadlessBreadcrumbList,
  BreadcrumbItem as HeadlessBreadcrumbItem,
  BreadcrumbLink as HeadlessBreadcrumbLink,
  BreadcrumbPage as HeadlessBreadcrumbPage,
  BreadcrumbSeparator as HeadlessBreadcrumbSeparator,
} from '../headless/breadcrumb';
import { getTranslate } from '#/i18n/server';
import { Link } from '#/i18n/routing';

export interface BreadcrumbItemProps {
  label: ReactNode | string;
  link?: string;
}

export interface BreadcrumbProps {
  list: BreadcrumbItemProps[];
  separator?: ReactNode | string;
}

const Breadcrumb = async ({ list, separator = '/' }: BreadcrumbProps) => {
  const { translate } = await getTranslate();
  return (
    <HeadlessBreadcrumb>
      <HeadlessBreadcrumbList>
        <HeadlessBreadcrumbItem>
          <HeadlessBreadcrumbLink asChild>
            <Link href="/">
              {await translate({ vi: 'Startseite', en: 'Home' })}
            </Link>
          </HeadlessBreadcrumbLink>
        </HeadlessBreadcrumbItem>
        {list.map((item, key) => {
          const { label, link } = item ?? {};
          return (
            <Fragment key={key}>
              <HeadlessBreadcrumbSeparator>
                {separator}
              </HeadlessBreadcrumbSeparator>
              <HeadlessBreadcrumbItem>
                {key < list.length - 1 ? (
                  <>
                    {link ? (
                      <HeadlessBreadcrumbLink asChild>
                        <Link href={link}>{label}</Link>
                      </HeadlessBreadcrumbLink>
                    ) : (
                      label
                    )}
                  </>
                ) : (
                  <HeadlessBreadcrumbPage>{label}</HeadlessBreadcrumbPage>
                )}
              </HeadlessBreadcrumbItem>
            </Fragment>
          );
        })}
      </HeadlessBreadcrumbList>
    </HeadlessBreadcrumb>
  );
};

export { Breadcrumb };
