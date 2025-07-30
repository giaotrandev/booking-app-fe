export interface ProvinceResponseProps {
  id: string;
  name?: string;
}
export interface DistrictResponseProps {
  id: string;
  name?: string;
  provinceId?: string;
  province?: ProvinceResponseProps;
}
export interface WardResponseProps {
  id: string;
  name?: string;
  districtId?: string;
  district?: DistrictResponseProps;
}
export interface PickUpPointResponseProps {
  id: string;
  name?: string;
  wardId?: string;
  address?: string;
  ward?: WardResponseProps;
}
export interface DropoffPointsResponseProps {
  id: string;
  name?: string;
  wardId?: string;
  address?: string;
  ward?: WardResponseProps;
}
export interface BusStopResponseProps {
  pickupPoints: PickUpPointResponseProps[];
  dropoffPoints: DropoffPointsResponseProps[];
}
