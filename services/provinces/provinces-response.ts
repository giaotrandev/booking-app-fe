interface ProvinceItemResponseProps {
  id: string;
  name?: string;
  code?: string;
  latitude?: string;
  longitude?: string;
  status?: string;
}

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
  sourceProvince?: ProvinceItemResponseProps;
  destinationProvince?: ProvinceItemResponseProps;
}
export interface ProvincesResponseListProps {
  list?: ProvincesResponseProps[];
}
