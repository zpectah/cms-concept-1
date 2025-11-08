import { useState } from 'react';
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

  const { uploadsSource } = getEnvironmentVariables();
  const { result, inputElement, onInputChange, setResult } = useAvatarUploader({
    onLoad,
    onLoadEnd,
    onError,
    onFinish,
  });

  return (
    <>
      <Box
        className="avatar-container"
        sx={({ palette, shape, spacing }) => ({
          width: size,
          height: size,
          border: `2px dashed ${palette.divider}`,
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
        {current !== '' ? (
          <>
            <img
              src={`${uploadsSource}${fileUploaderQueueItemContextKeys['avatar-user']}/${current}?${hash ?? 'hash'}`}
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
              {'Změnit'}
              <input
                type="file"
                onChange={(e) => {
                  onInputChange(e.target.files);
                  setOpen(true);
                }}
                ref={inputElement}
                hidden
                accept={'image/*'}
              />
            </Button>

            <Button
              variant="contained"
              color="error"
              size="small"
              sx={{ opacity: 0, '.avatar-container:hover &': { opacity: 1 } }}
              onClick={onRemove}
            >
              Smazat
            </Button>
          </>
        ) : (
          <>
            {result?.content ? (
              <>
                <img src={result.content} alt={name} loading="lazy" />

                <Button variant="contained" color="secondary" component="label" size="small">
                  {'Změnit'}
                  <input
                    type="file"
                    onChange={(e) => {
                      onInputChange(e.target.files);
                      setOpen(true);
                    }}
                    ref={inputElement}
                    hidden
                    accept={'image/*'}
                  />
                </Button>

                <Button variant="contained" color="error" size="small" onClick={() => setResult(null)}>
                  Smazat
                </Button>
              </>
            ) : (
              <Button variant="contained" color="secondary" component="label" size="small">
                {'Vyberte soubor'}
                <input
                  type="file"
                  onChange={(e) => {
                    onInputChange(e.target.files);
                    setOpen(true);
                  }}
                  ref={inputElement}
                  hidden
                  accept={'image/*'}
                />
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
