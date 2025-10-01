import { useTranslation } from 'react-i18next';
import { Button, Stack, Grid } from '@mui/material';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import { getOptionValue } from '../../../helpers';
import { Card, InputField, Literal, FormContent } from '../../../components';
import { AttachmentsQueueProps } from './types';

const AttachmentsQueue = ({ queue, onRemove }: AttachmentsQueueProps) => {
  const { t } = useTranslation(['common', 'form']);

  return (
    <>
      {queue.map((file, index) => {
        return (
          <Card key={index}>
            <FormContent>
              <Stack alignItems="center" justifyContent="center" sx={{ p: 2 }}>
                {
                  {
                    image: (
                      <img
                        src={file.content}
                        alt={file.name}
                        style={{ maxWidth: '100%', height: 'auto' }}
                        loading="lazy"
                      />
                    ),
                    audio: <AudioFileIcon sx={{ fontSize: '350%' }} />,
                    video: <VideoFileIcon sx={{ fontSize: '350%' }} />,
                    document: <PictureAsPdfIcon sx={{ fontSize: '350%' }} />,
                    archive: <DescriptionIcon sx={{ fontSize: '350%' }} />,
                    unsupported: null,
                    unknown: null,
                  }[file.type]
                }
              </Stack>
              <Grid container spacing={1}>
                <Grid size={{ xs: 12, md: 12 }}>
                  <InputField
                    name={`queue[${index}].name`}
                    label={t('form:label.fileName')}
                    fieldProps={{
                      endAdornment: <span>.{file.extension}</span>,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Literal label={t('form:label.fileType')} value={getOptionValue(file.type, 'model')} />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Literal label={t('form:label.fileMime')} value={file.mime} />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Literal label={t('form:label.fileSize')} value={`${file.size} b`} />
                </Grid>
                <Grid size={{ xs: 12, sm: 3 }}>
                  <Literal label="Uid" value={file.uid} />
                </Grid>
              </Grid>
              <Stack direction="row" sx={{ mt: { xs: 2 } }}>
                <Button onClick={() => onRemove(index)} variant="outlined" color="warning">
                  {t('button.removeFromQueue')}
                </Button>
              </Stack>
            </FormContent>
          </Card>
        );
      })}
    </>
  );
};

export default AttachmentsQueue;
