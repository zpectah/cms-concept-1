import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { fileUploaderSupportedFileExtensions } from '../../constants';

interface VideoPlayerProps {
  source: string;
}

const VideoPlayer = ({ source }: VideoPlayerProps) => {
  const { t } = useTranslation(['common']);

  const getMimeType = (format: string) => {
    switch (format) {
      case 'mp4':
        return 'video/mp4';
      case 'webm':
        return 'video/webm';
      case 'mov':
        return 'video/quicktime';
      case 'avi':
        return 'video/x-msvideo';
      case 'mpeg':
        return 'video/mpeg';
      default:
        return `video/${format}`;
    }
  };

  return (
    <Box sx={{ maxWidth: '100%', my: 2 }}>
      <Box sx={{ maxWidth: '100%', position: 'relative' }}>
        <Box component="video" controls sx={{}}>
          {fileUploaderSupportedFileExtensions.video.map((format) => (
            <source key={format} src={source.replace(/\.[^/.]+$/, `.${format}`)} type={getMimeType(format)} />
          ))}
          <p>{t('message.info.videoNotSupported')}</p>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
