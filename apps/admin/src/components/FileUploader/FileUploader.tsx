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
}: FileUploaderProps) => {
  const { queue, inputElement, onInputChange } = useFileUploader({
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
        renderInput?.((files: FileList) => onInputChange(files))
      ) : (
        <Button variant="contained" color="secondary" component="label">
          Select files to upload
          <input
            type="file"
            multiple={multiple}
            onChange={(e) => onInputChange(e.target.files)}
            ref={inputElement}
            hidden
          />
        </Button>
      )}
      {renderQueue?.(queue)}
    </Box>
  );
};

export default FileUploader;
