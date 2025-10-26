import { useEffect, useMemo, useRef, useState } from 'react';
import mapboxgl, { Map } from 'mapbox-gl';
import { useTranslation } from 'react-i18next';
import { styled, Box, Stack, Button } from '@mui/material';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import ClearIcon from '@mui/icons-material/Clear';
import { GpsLocation } from '@common';
import { LOCATION_CENTER_DEFAULT, LOCATION_CENTER_INITIAL, LOCATION_ZOOM_DEFAULT } from '../../constants';
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

const THUMB_ZOOM_DEFAULT = 15;

const GpsPicker = ({
  value = [0, 0],
  onChange,
  isError,
  onMapChange,
  disableThumbMap,
  thumbZoom = THUMB_ZOOM_DEFAULT,
}: GpsPickerProps) => {
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
  const [center, setCenter] = useState<GpsLocation>(LOCATION_CENTER_DEFAULT);
  const [zoom, setZoom] = useState<number>(LOCATION_ZOOM_DEFAULT);
  const [temporaryCenter, setTemporaryCenter] = useState<GpsLocation>(value);
  const [selectedCenter, setSelectedCenter] = useState<GpsLocation>(value);

  const mainSelectedMarker = new mapboxgl.Marker();
  const thumbSelectedMarker = new mapboxgl.Marker();

  const isTemporaryValueSet = useMemo(
    () => JSON.stringify(temporaryCenter) !== JSON.stringify(LOCATION_CENTER_INITIAL),
    [temporaryCenter]
  );
  const isSelectedValueSet = useMemo(
    () => JSON.stringify(selectedCenter) !== JSON.stringify(LOCATION_CENTER_INITIAL),
    [selectedCenter]
  );
  const isValueSet = useMemo(() => JSON.stringify(value) !== JSON.stringify(LOCATION_CENTER_INITIAL), [value]);

  const initialCenter = useMemo(
    () => (isTemporaryValueSet ? temporaryCenter : isSelectedValueSet ? selectedCenter : isValueSet ? value : center),
    [isTemporaryValueSet, temporaryCenter, isSelectedValueSet, selectedCenter, isValueSet, value, center]
  );

  useEffect(() => {
    if (disableThumbMap) return;
    if (!isSelectedValueSet || !thumbMapContainerRef.current) return;

    thumbMapRef.current = new mapboxgl.Map({
      container: thumbMapContainerRef.current as HTMLElement,
      center: selectedCenter,
      zoom: thumbZoom,
    });

    thumbMapRef.current.on('load', (event) => {
      if (selectedCenter && thumbMapRef.current) {
        thumbSelectedMarker.setLngLat(selectedCenter).addTo(thumbMapRef.current);
      }
    });
  }, [selectedCenter, disableThumbMap, isSelectedValueSet]);

  useEffect(() => {
    if (!dialogOpen || !mainMapContainerRef.current) return;

    mainMapRef.current = new mapboxgl.Map({
      container: mainMapContainerRef.current,
      center: initialCenter,
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

      setTemporaryCenter(newLocation);

      if (!mainMapRef.current) return;

      mainSelectedMarker.setLngLat(newLocation).addTo(mainMapRef.current);
    });

    return () => mainMapRef?.current?.remove();
  }, [dialogOpen]);

  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(LOCATION_CENTER_INITIAL)) {
      setTemporaryCenter(value);
      setSelectedCenter(value);
    }
  }, [value]);

  const cleanMainMapHandler = () => {
    // Only way to reload (clean) map
    if (mainMapRef.current) {
      mainMapRef.current.remove();
      mainMapRef.current = new mapboxgl.Map({
        container: mainMapContainerRef.current as HTMLElement,
        center: initialCenter,
        zoom,
      });
    }
  };

  const resetHandler = (isMain?: boolean) => {
    mainSelectedMarker.remove();
    thumbSelectedMarker.remove();
    setSelectedCenter(LOCATION_CENTER_INITIAL);
    setTemporaryCenter(LOCATION_CENTER_INITIAL);
    if (isMain) cleanMainMapHandler();
  };

  const openHandler = () => setDialogOpen(true);

  const closeHandler = () => setDialogOpen(false);

  const saveHandler = () => {
    setSelectedCenter(temporaryCenter);
    closeHandler();
    onChange(temporaryCenter);
  };

  return (
    <>
      <Stack direction="column" gap={1}>
        {isSelectedValueSet && !disableThumbMap && (
          <MapThumbWrapper id="thumb-map-container" ref={thumbMapContainerRef} />
        )}
        <Stack direction="row" gap={1}>
          <Input value={JSON.stringify(selectedCenter)} readOnly fullWidth error={isError} />
          <Button variant="outlined" color="warning" onClick={() => resetHandler()} disabled={!isSelectedValueSet}>
            <ClearIcon />
          </Button>
          <Button variant="contained" color="inherit" onClick={openHandler}>
            <AddLocationIcon />
          </Button>
        </Stack>
      </Stack>
      <DialogBase
        open={dialogOpen}
        onClose={closeHandler}
        dialogProps={{ keepMounted: true, maxWidth: 'md', fullWidth: true }}
        actions={
          <>
            <Button onClick={saveHandler} variant="contained" disabled={!isTemporaryValueSet}>
              {t('button.save')}
            </Button>
            <Button
              onClick={() => resetHandler(true)}
              variant="outlined"
              color="warning"
              disabled={!isTemporaryValueSet}
            >
              {t('button.reset')}
            </Button>
            <Button onClick={closeHandler} variant="outlined" color="inherit">
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
