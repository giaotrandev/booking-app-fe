// lib/utils/path.ts
import { homePagePath } from '../constant';

export function extractUriFromParams(params: { all?: string[] }) {
  if (Array.isArray(params.all) && params.all.length > 0) {
    return `/${params.all.join('/')}`;
  }
  return homePagePath;
}
