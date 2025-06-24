import { ProvincesResponseProps } from './provinces-response';

export interface ProvincesRequestProps extends ProvincesResponseProps {}
export interface ProvincesRequestListProps {
  list?: ProvincesRequestProps[];
}
