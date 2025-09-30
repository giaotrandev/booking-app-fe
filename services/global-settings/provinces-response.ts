export interface ProvincesResponseProps {
  id: string;
  name?: string;
  code?: string;
  latitude?: string;
  longitude?: string;
  status?: string;
  image?: string;
}
export interface ProvincesResponseListProps {
  list?: ProvincesResponseProps[];
}
