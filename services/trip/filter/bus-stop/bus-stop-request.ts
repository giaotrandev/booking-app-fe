export interface PickUpPointRequestProps {
  id: string;
  name?: string;
  address?: string;
  wardId?: string;
  wardName?: string;
  districtId?: string;
  districtname?: string;
  provinceId?: string;
  provinceName?: string;
}
export interface DropoffPointsRequestProps {
  id: string;
  name?: string;
  address?: string;
  wardId?: string;
  wardName?: string;
  districtId?: string;
  districtname?: string;
  provinceId?: string;
  provinceName?: string;
}
export interface BusStopRequestProps {
  pickupPoints: PickUpPointRequestProps[];
  dropoffPoints: DropoffPointsRequestProps[];
}
