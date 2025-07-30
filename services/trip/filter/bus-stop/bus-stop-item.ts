import {
  BusStopRequestProps,
  DropoffPointsRequestProps,
} from './bus-stop-request';
import {
  BusStopResponseProps,
  DropoffPointsResponseProps,
} from './bus-stop-response';
const convertPointItem = (
  point: DropoffPointsResponseProps,
): DropoffPointsRequestProps => ({
  id: point.id,
  name: point.name ?? undefined,
  address: point.address ?? undefined,
  wardId: point.wardId ?? undefined,
  wardName: point.ward?.name ?? undefined,
  districtId: point.ward?.districtId ?? undefined,
  districtname: point.ward?.district?.name ?? undefined,
  provinceId: point.ward?.district?.provinceId ?? undefined,
  provinceName: point.ward?.district?.province?.name ?? undefined,
});
export const convertBusStopFilter = async (
  trip: BusStopResponseProps,
): Promise<BusStopRequestProps> => {
  return {
    dropoffPoints: trip.dropoffPoints.map(convertPointItem),
    pickupPoints: trip.pickupPoints.map(convertPointItem),
  };
};
