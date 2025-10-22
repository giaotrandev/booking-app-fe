import { SvgProps } from '#/types/global';
import { Address } from './address';
import Arrow from './arrow';
import { ArrowLeft } from './arrow-left';
import { ArrowRight } from './arrow-right';
import Check from './check';
import CheckCircle from './check-circle';
import { ChevronDown } from './chevron-down';
import { ChevronLeft } from './chevron-left';
import { ChevronRight } from './chevron-right';
import ChevronRightWithStick from './chevron-right-with-stick';
import { ChevronUp } from './chevron-up';
import Date from './date';
import Email from './email';
import ExclamationCircle from './exclamation-circle';
import Eye from './eye';
import FaceHuman from './face-human';
import Growth from './growth';
import { Hamburger } from './hamburger';
import Heart from './heart';
import HidePassword from './hide-password';
import Lock from './lock';
import Logout from './logout';
import Medal from './medal';
import Password from './password';
import Phone from './phone';
import Plane from './plane';
import Print from './print';
import { Seat } from './seat';
import { SelectChevronDown } from './select-chevron-down';
import Shield from './shield';
import Star from './star';
import { SteeringWheel } from './steering-wheel';
import { Swap } from './swap';
import Tag from './tag';
import Ticket from './ticket';
import Upload from './upload';
import User from './user';
import XCircle from './x-circle';
import { XMark } from './x-mark';

const icons = {
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  'chevron-up': ChevronUp,
  'chevron-down': ChevronDown,
  'x-mark': XMark,
  'hide-password': HidePassword,
  'select-chevron-down': SelectChevronDown,
  'check-circle': CheckCircle,
  'exclamation-circle': ExclamationCircle,
  'x-circle': XCircle,
  'steering-wheel': SteeringWheel,
  'chevron-right-with-sticky': ChevronRightWithStick,
  'face-human': FaceHuman,
  print: Print,
  seat: Seat,
  hamburger: Hamburger,
  eye: Eye,
  date: Date,
  arrow: Arrow,
  check: Check,
  upload: Upload,
  phone: Phone,
  email: Email,
  address: Address,
  swap: Swap,
  ticket: Ticket,
  logout: Logout,
  user: User,
  password: Password,
  plane: Plane,
  lock: Lock,
  medal: Medal,
  heart: Heart,
  shield: Shield,
  growth: Growth,
  star: Star,
  tag: Tag,
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
