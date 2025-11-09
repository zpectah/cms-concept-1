import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import { fileUploaderQueueItemContextKeys } from '../../enums';
import { getEnvironmentVariables } from '../../helpers';
import { ImageCropper } from '../ImageCropper';
import { useAvatarUploader } from './useAvatarUploader';
import { AvatarUploaderProps } from './types';

const AvatarUploader = ({
  onLoad,
  onLoadEnd,
  onError,
  onFinish,
  current,
  name,
  hash,
  onRemove,
  size = '175px',
}: AvatarUploaderProps) => {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation(['common']);
  const { uploadsSource } = getEnvironmentVariables();
  const { result, inputElementRef, onInputChange, setResult, timestamp } = useAvatarUploader({
    onLoad,
    onLoadEnd,
    onError,
    onFinish,
  });

  const isCurrent = current !== '';

  const inputElement = (
    <input
      type="file"
      onChange={(e) => {
        onInputChange(e.target.files);
        setOpen(true);
      }}
      ref={inputElementRef}
      hidden
      accept={'image/*'}
    />
  );

  return (
    <>
      <Box
        className="avatar-container"
        sx={({ palette, shape, spacing }) => ({
          width: size,
          height: size,
          border: isCurrent ? `1px solid ${palette.text.secondary}` : `2px dashed ${palette.divider}`,
          borderRadius: size,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          position: 'relative',
          flexDirection: 'column',
          gap: spacing(1),

          '& img': {
            position: 'absolute',
            zIndex: -1,
            maxWidth: '100%',
            height: 'auto',
          },
        })}
      >
        {isCurrent ? (
          <>
            <img
              src={`${uploadsSource}${fileUploaderQueueItemContextKeys['avatar-user']}/${current}?${hash ?? timestamp}`}
              alt={name}
              loading="lazy"
            />
            <Button
              variant="contained"
              color="secondary"
              component="label"
              size="small"
              sx={{ opacity: 0, '.avatar-container:hover &': { opacity: 1 } }}
            >
              {t('button.change')}
              {inputElement}
            </Button>
            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{ opacity: 0, '.avatar-container:hover &': { opacity: 1 } }}
              onClick={onRemove}
            >
              {t('button.delete')}
            </Button>
          </>
        ) : (
          <>
            {result?.content ? (
              <>
                <img src={result.content} alt={name} loading="lazy" />
                <Button variant="contained" color="secondary" component="label" size="small">
                  {t('button.change')}
                  {inputElement}
                </Button>
                <Button variant="contained" color="error" size="small" onClick={() => setResult(null)}>
                  {t('button.delete')}
                </Button>
              </>
            ) : (
              <Button variant="contained" color="secondary" component="label" size="small">
                {t('button.select')}
                {inputElement}
              </Button>
            )}
          </>
        )}
      </Box>
      <ImageCropper
        open={open}
        onClose={() => setOpen(false)}
        onSave={(res) => {
          if (result) {
            const cropped = {
              ...result,
              content: res,
            };

            setResult(cropped);
            onFinish?.(cropped);
          }
          setOpen(false);
        }}
        cropSource={{ source: result?.content, index: 0 }}
      />
    </>
  );
};

export default AvatarUploader;
