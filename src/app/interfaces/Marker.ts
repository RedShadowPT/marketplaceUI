export interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  country_code: string;
  country_name: string;
  city: string;
  geo: string;
}
