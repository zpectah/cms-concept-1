import { GpsLocation } from '@common';

export interface GpsPickerProps {
  value: GpsLocation;
  onChange: (value: GpsLocation) => void;
  isError?: boolean;
  disableThumbMap?: boolean;
  onMapChange?: (center: GpsLocation, zoom: number) => void;
}
