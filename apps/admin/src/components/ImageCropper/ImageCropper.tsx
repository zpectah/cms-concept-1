import { useEffect, useState } from 'react';
import { Cropper, CropperRef } from 'react-advanced-cropper';
import { useTranslation } from 'react-i18next';
import { Button, Box } from '@mui/material';
import { cropBase64Image } from '@common';
import { DialogBase } from '../Dialog';
import { ImageCropperProps } from './type';

import 'react-advanced-cropper/dist/style.css';

const ImageCropper = ({ open, onClose, cropSource, onSave }: ImageCropperProps) => {
  const [source, setSource] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<string | undefined>(undefined);

  const { t } = useTranslation();

  const closeHandler = () => {
    onClose();
    setImage(undefined);
    setSource(undefined);
  };

  const saveHandler = () => {
    if (!cropSource) return;

    if (source && cropSource?.index > -1) {
      onSave(source, cropSource.index);
    }

    closeHandler();
  };

  const cropperChangeHandler = async (cropper: CropperRef) => {
    if (!cropSource?.source) return;

    const coordinates = cropper.getCoordinates();
    const croppedImage = await cropBase64Image({
      base64: cropSource.source,
      y: coordinates?.top ?? 0,
      x: coordinates?.left ?? 0,
      width: coordinates?.width ?? 0,
      height: coordinates?.height ?? 0,
    });

    setSource(croppedImage);
  };

  useEffect(() => {
    if (cropSource?.source) setImage(cropSource?.source);
  }, [cropSource]);

  return (
    <DialogBase
      open={open}
      onClose={onClose}
      dialogProps={{ keepMounted: true, maxWidth: 'lg', fullWidth: true }}
      actions={
        <>
          <Button variant="contained" color="primary" onClick={saveHandler}>
            {t('button.saveAndExit')}
          </Button>
          <Button variant="outlined" onClick={closeHandler}>
            {t('button.cancel')}
          </Button>
        </>
      }
      content={
        <Box sx={{ p: 1 }}>
          <Cropper
            src={image}
            onChange={cropperChangeHandler}
            className="cropper"
            style={{
              maxHeight: '50vh',
            }}
          />
        </Box>
      }
    />
  );
};

export default ImageCropper;
