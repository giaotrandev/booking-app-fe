import { SvgProps } from '#/types/global';
import Arrow from './arrow';
import Check from './check';
import { ChevronDown } from './chevron-down';
import { ChevronLeft } from './chevron-left';
import { ChevronRight } from './chevron-right';
import { ChevronUp } from './chevron-up';
import Upload from './upload';
import { XMark } from './x-mark';

const icons = {
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  'chevron-down': ChevronDown,
  'x-mark': XMark,
  arrow: Arrow,
  check: Check,
  upload: Upload,
};

export type IconNamesProps = keyof typeof icons;

export interface IconProps extends SvgProps {
  name?: IconNamesProps;
}

const Icon = ({ name, ...props }: IconProps) => {
  if (!name) {
    return null;
  }
  const Comp = icons[name];
  if (!Comp) {
    return null;
  }
  return <Comp {...props} />;
};

export { Icon };
