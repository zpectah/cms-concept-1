import { useEffect, useMemo, useRef, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import { GpsLocation } from '@common';
import { styled, Box, Stack, Button } from '@mui/material';
import { getConfig } from '../../utils';
import { GpsPickerProps } from './types';
import { DialogBase } from '../Dialog';
import { Input } from '../input';

import 'mapbox-gl/dist/mapbox-gl.css';

const MapWrapper = styled('div')(() => ({
  width: '100%',
  height: '100%',
  minHeight: '50vh',
  backgroundColor: 'grey',
}));

const CENTER_INITIAL: GpsLocation = [0, 0];
const CENTER_DEFAULT: GpsLocation = [14.420780083888587, 50.087045878155095];
const ZOOM_DEFAULT = 10.15;

const GpsPicker = ({ value = [0, 0], onChange, isError, onMapChange }: GpsPickerProps) => {
  const {
    apps: { mapbox },
  } = getConfig();

  mapboxgl.accessToken = mapbox.token;

  const mapRef = useRef<Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [center, setCenter] = useState<GpsLocation>(CENTER_DEFAULT);
  const [zoom, setZoom] = useState<number>(ZOOM_DEFAULT);

  const [selectedCenter, setSelectedCenter] = useState<GpsLocation>(value);

  const isValueSet = useMemo(() => JSON.stringify(selectedCenter) !== JSON.stringify(CENTER_INITIAL), [selectedCenter]);

  useEffect(() => {
    if (!dialogOpen || !mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: isValueSet ? value : center,
      zoom,
    });

    mapRef.current.on('move', () => {
      const newCenter = mapRef?.current?.getCenter() ?? { lat: 0, lng: 0 };
      const newZoom = mapRef?.current?.getZoom() ?? 1;

      setCenter([newCenter?.lng, newCenter?.lat]);
      setZoom(newZoom);

      onMapChange?.([newCenter?.lng, newCenter?.lat], newZoom);
    });

    mapRef.current.on('click', (event) => {
      setSelectedCenter([event.lngLat.lng, event.lngLat.lat]);

      // TODO: create some sort of pin
    });

    return () => mapRef?.current?.remove();
  }, [dialogOpen]);

  return (
    <>
      <Stack direction="row" gap={1}>
        <Input value={JSON.stringify(selectedCenter)} readOnly fullWidth />
        <Button variant="contained" color="inherit" onClick={() => setDialogOpen(true)}>
          Open
        </Button>
      </Stack>

      <DialogBase
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        dialogProps={{ keepMounted: true, maxWidth: 'md', fullWidth: true }}
      >
        <Box sx={{ width: '100%', height: '100%' }}>
          <MapWrapper id="map-container" ref={mapContainerRef} />
        </Box>
        <Stack>
          <Button
            onClick={() => {
              onChange(selectedCenter);

              setDialogOpen(false);
            }}
            disabled={!isValueSet}
          >
            Save
          </Button>
          <Button
            onClick={() => {
              setSelectedCenter(CENTER_INITIAL);
            }}
            disabled={!isValueSet}
          >
            Reset
          </Button>
          <Button
            onClick={() => {
              // setSelectedCenter(CENTER_INITIAL);
              setDialogOpen(false);
            }}
          >
            Cancel
          </Button>
        </Stack>
      </DialogBase>
    </>
  );
};

export default GpsPicker;
