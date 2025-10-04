export interface ProvincesResponseProps {
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
export interface ProvincesResponseListProps {
  list?: ProvincesResponseProps[];
}
