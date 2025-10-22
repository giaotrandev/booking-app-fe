interface ProvinceItemRequestProps {
  id: string;
  name?: string;
  code?: string;
  latitude?: string;
  longitude?: string;
  status?: string;
}
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
  sourceProvince?: ProvinceItemRequestProps;
  destinationProvince?: ProvinceItemRequestProps;
}

// export interface ProvincesRequestProps extends ProvincesResponseProps {}
export interface ProvincesRequestListProps {
  list?: ProvincesRequestProps[];
}
