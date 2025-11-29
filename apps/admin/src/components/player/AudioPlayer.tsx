import { useTranslation } from 'react-i18next';
import { Box } from '@mui/material';
import { fileUploaderSupportedFileExtensions } from '../../constants';

interface AudioPlayerProps {
  source: string;
}

const AudioPlayer = ({ source }: AudioPlayerProps) => {
  const { t } = useTranslation(['common']);

  const getMimeType = (format: string) => {
    switch (format) {
      case 'mp3':
        return 'audio/mpeg';
      case 'ogg':
        return 'audio/ogg';
      default:
        return `audio/${format}`;
    }
  };

  return (
    <Box sx={{ width: '100%', my: 2 }}>
      <audio controls style={{ width: '100%' }}>
        {fileUploaderSupportedFileExtensions.audio.map((format) => (
          <source key={format} src={source.replace(/\.[^/.]+$/, `.${format}`)} type={getMimeType(format)} />
        ))}
        <p>{t('message.info.audioNotSupported')}</p>
      </audio>
    </Box>
  );
};

export default AudioPlayer;
