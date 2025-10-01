import { useTranslation } from 'react-i18next';
import { Box, Button } from '@mui/material';
import { FileUploaderProps } from './types';
import { useFileUploader } from './useFileUploader';

const FileUploader = ({
  initialQueue,
  renderQueue,
  multiple = true,
  boxProps,
  onQueueUpdate,
  onLoad,
  onLoadEnd,
  onError,
  renderInput,
  buttonLabel,
}: FileUploaderProps) => {
  const { t } = useTranslation();
  const { queue, inputElement, onInputChange, onQueueClear } = useFileUploader({
    initialQueue,
    multiple,
    onQueueUpdate,
    onLoad,
    onLoadEnd,
    onError,
  });

  return (
    <Box {...boxProps}>
      {renderInput ? (
        renderInput?.((files: FileList) => onInputChange(files), onQueueClear)
      ) : (
        <Box
          sx={({ palette, shape }) => ({
            width: '100%',
            height: queue.length > 0 ? '25vh' : '50vh',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: `2px dashed ${palette.divider}`,
            borderRadius: shape.borderRadius,
          })}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            onInputChange(event.dataTransfer.files);
          }}
        >
          <Button variant="contained" color="secondary" component="label">
            {buttonLabel ? buttonLabel : t('button.selectOrDropFiles')}
            <input type="file" multiple onChange={(e) => onInputChange(e.target.files)} ref={inputElement} hidden />
          </Button>
        </Box>
      )}
      {renderQueue?.(queue)}
    </Box>
  );
};

export default FileUploader;
