import { useEffect, useMemo, useRef, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import { useTranslation } from 'react-i18next';
import { styled, Box, Stack, Button } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ClearIcon from '@mui/icons-material/Clear';
import { GpsLocation } from '@common';
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

const MapThumbWrapper = styled('div')(() => ({
  width: '100%',
  height: '250px',
  backgroundColor: 'grey',
  position: 'relative',

  '&::before': {
    content: '""',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 999,
  },
}));

const CENTER_INITIAL: GpsLocation = [0, 0];
const CENTER_DEFAULT: GpsLocation = [14.420780083888587, 50.087045878155095];
const ZOOM_DEFAULT = 10.15;

const GpsPicker = ({ value = [0, 0], onChange, isError, onMapChange, disableThumbMap }: GpsPickerProps) => {
  const {
    apps: { mapbox },
  } = getConfig();
  const { t } = useTranslation();

  mapboxgl.accessToken = mapbox.token;

  const mainMapRef = useRef<Map | null>(null);
  const mainMapContainerRef = useRef<HTMLDivElement | null>(null);
  const thumbMapRef = useRef<Map | null>(null);
  const thumbMapContainerRef = useRef<HTMLDivElement | null>(null);

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [center, setCenter] = useState<GpsLocation>(CENTER_DEFAULT);
  const [zoom, setZoom] = useState<number>(ZOOM_DEFAULT);
  const [selectedCenter, setSelectedCenter] = useState<GpsLocation>(value);

  const mainSelectedMarker = new mapboxgl.Marker();
  const thumbSelectedMarker = new mapboxgl.Marker();

  const isValueSet = useMemo(() => JSON.stringify(selectedCenter) !== JSON.stringify(CENTER_INITIAL), [selectedCenter]);

  useEffect(() => {
    if (disableThumbMap) return;
    if (!isValueSet || !thumbMapContainerRef.current) return;

    thumbMapRef.current = new mapboxgl.Map({
      container: thumbMapContainerRef.current as HTMLElement,
      center: selectedCenter,
      zoom: ZOOM_DEFAULT,
    });

    thumbMapRef.current.on('load', (event) => {
      if (selectedCenter && thumbMapRef.current) {
        thumbSelectedMarker.setLngLat(selectedCenter).addTo(thumbMapRef.current);
      }
    });
  }, [disableThumbMap, isValueSet]);

  useEffect(() => {
    if (!dialogOpen || !mainMapContainerRef.current) return;

    mainMapRef.current = new mapboxgl.Map({
      container: mainMapContainerRef.current,
      center: isValueSet ? value : center,
      zoom,
    });

    mainMapRef.current.on('load', (event) => {
      if (selectedCenter && mainMapRef.current) {
        mainSelectedMarker.setLngLat(selectedCenter).addTo(mainMapRef.current);
      }
    });

    mainMapRef.current.on('move', () => {
      const newCenter = mainMapRef?.current?.getCenter() ?? { lat: 0, lng: 0 };
      const newZoom = mainMapRef?.current?.getZoom() ?? 1;

      setCenter([newCenter?.lng, newCenter?.lat]);
      setZoom(newZoom);

      onMapChange?.([newCenter?.lng, newCenter?.lat], newZoom);
    });

    mainMapRef.current.on('click', (event) => {
      const newLocation: GpsLocation = [event.lngLat.lng, event.lngLat.lat];

      setSelectedCenter(newLocation);

      if (!mainMapRef.current) return;

      mainSelectedMarker.setLngLat(newLocation).addTo(mainMapRef.current);
    });

    return () => mainMapRef?.current?.remove();
  }, [dialogOpen]);

  return (
    <>
      <Stack direction="column" gap={1}>
        {isValueSet && !disableThumbMap && <MapThumbWrapper id="thumb-map-container" ref={thumbMapContainerRef} />}
        <Stack direction="row" gap={1}>
          <Input value={JSON.stringify(selectedCenter)} readOnly fullWidth />
          <Button variant="outlined" color="warning" onClick={() => setSelectedCenter([0, 0])} disabled={!isValueSet}>
            <ClearIcon />
          </Button>
          <Button variant="contained" color="inherit" onClick={() => setDialogOpen(true)}>
            <AddLocationIcon />
          </Button>
        </Stack>
      </Stack>

      <DialogBase
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        dialogProps={{ keepMounted: true, maxWidth: 'md', fullWidth: true }}
        actions={
          <>
            <Button
              onClick={() => {
                onChange(selectedCenter);

                setDialogOpen(false);
              }}
              variant="contained"
              disabled={!isValueSet}
            >
              {t('button.save')}
            </Button>
            <Button
              onClick={() => {
                setSelectedCenter(CENTER_INITIAL);
                mainSelectedMarker.remove();
              }}
              variant="outlined"
              color="warning"
              disabled={!isValueSet}
            >
              {t('button.reset')}
            </Button>
            <Button
              onClick={() => {
                // setSelectedCenter(CENTER_INITIAL);
                setDialogOpen(false);
              }}
              variant="outlined"
              color="inherit"
            >
              {t('button.cancel')}
            </Button>
          </>
        }
      >
        <Box sx={{ width: '100%', height: '100%' }}>
          <MapWrapper id="main-map-container" ref={mainMapContainerRef} />
        </Box>
      </DialogBase>
    </>
  );
};

export default GpsPicker;
