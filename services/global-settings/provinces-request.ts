import { ImageProps } from '#/types/global';
import { ProvincesResponseProps } from './provinces-response';
export interface ProvincesRequestProps {
  id: string;
  name?: string;
  code?: string;
  latitude?: string;
  longitude?: string;
  status?: string;
  image?: string;
  description?: string;
  distanceUnit?: string;
  distance?: number;
  minPrice?: number;
  maxPrice?: number;
  estimatedDuration?: number;
}

// export interface ProvincesRequestProps extends ProvincesResponseProps {}
export interface ProvincesRequestListProps {
  list?: ProvincesRequestProps[];
}
