import { convertTripItem } from './trip-item';
import { TripsRequestProps } from './trips-request';
import { TripResponseProps } from './trips-response';

export const convertTripList = async (trips: TripResponseProps[]) => {
  const _trips: TripsRequestProps[] = [];
  for (const trip of trips ?? []) {
    if (!trip) continue;
    const _trip: TripsRequestProps = await convertTripItem(trip);
    _trips.push(_trip);
  }
  return _trips;
};
