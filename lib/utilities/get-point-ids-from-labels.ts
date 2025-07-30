import {
  DropoffPointsRequestProps,
  PickUpPointRequestProps,
} from '#/services/trip/filter/bus-stop/bus-stop-request';
import { sanitizeTitle } from './sanitize-title';

const getPointIdsFromLabels = (
  labelString: string | null,
  filterList: Array<PickUpPointRequestProps | DropoffPointsRequestProps>,
): string[] => {
  return (labelString?.split(',') ?? [])
    .map(label => label.trim())
    .map(sanitizedLabel => {
      const match = filterList.find(
        item => item.name && sanitizeTitle(item.name) === sanitizedLabel,
      );
      return match?.id;
    })
    .filter((id): id is string => Boolean(id));
};
export { getPointIdsFromLabels };
