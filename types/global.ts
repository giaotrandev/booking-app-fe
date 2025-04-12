import { LocaleProps } from "#/i18n/config";
import { HTMLAttributeAnchorTarget, SVGProps } from 'react';

export interface PageProps {
    params: Promise<{
      locale?: LocaleProps;
      all?: string[];
      uri?: string;
      slug?: string;
      id?: string;
    }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}
export type SvgProps = SVGProps<SVGSVGElement>;
