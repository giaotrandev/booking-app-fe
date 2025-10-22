import { PropsWithChildren } from 'react';
import { HomeTemplate, HomeTemplateProps } from './home';
import { NotFoundTemplate } from './not-found';
import { StandardTemplate, StandardTemplateProps } from './standard';
import { PostDetailsTemplate, PostDetailsTemplateProps } from './post-details';

const templates = {
  notFound: NotFoundTemplate,
  standard: StandardTemplate,
  home: HomeTemplate,
  postDetails: PostDetailsTemplate,
};

export type TemplateNamesProps = keyof typeof templates;

export interface TemplateProps extends PropsWithChildren {
  name?: TemplateNamesProps;
  standard?: StandardTemplateProps;
  home?: HomeTemplateProps;
  postDetails?: PostDetailsTemplateProps;
}

const Template = ({
  name,
  standard,
  home,
  postDetails,
  children,
}: TemplateProps) => {
  if (!name) {
    return null;
  }
  const Comp = templates[name as TemplateNamesProps];
  if (!Comp) {
    return null;
  }
  let props;
  switch (name) {
    case 'home':
      props = home;
      break;
    case 'postDetails':
      props = postDetails;
      break;
    default:
      props = standard;
  }
  return <Comp {...props}>{children}</Comp>;
};

export { Template };
