import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardActions, Typography, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AudioFileIcon from '@mui/icons-material/AudioFile';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DescriptionIcon from '@mui/icons-material/Description';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import { AttachmentsItem, attachmentsTypeKeys, ItemBase } from '@common';
import { AttachmentsViewItemProps } from '../types';
import { listItemsViewKeys } from '../enums';
import { IconButtonPlus } from '../../Button';
import { FavoritesStar } from '../../favorites';

const AttachmentsViewItem = <T extends ItemBase>({
  item,
  onDisable,
  onSelect,
  onDetail,
  onDelete,
  renderRowActions,
  isSelected,
  isLoading,
  disableFavorites,
  pathPrefix,
}: AttachmentsViewItemProps<T>) => {
  const { t } = useTranslation();

  const attachment = item as unknown as AttachmentsItem;

  const sourcePrefix = 'http://localhost:8080/'; // TODO

  const renderContent = () => {
    switch (attachment.type) {
      case attachmentsTypeKeys.image:
        return <img src={`${sourcePrefix}${attachment.file_name}`} alt={attachment.name} loading="lazy" />;

      case attachmentsTypeKeys.audio:
        return <AudioFileIcon sx={{ fontSize: '350%' }} />;

      case attachmentsTypeKeys.video:
        return <VideoFileIcon sx={{ fontSize: '350%' }} />;

      case attachmentsTypeKeys.document:
        return <PictureAsPdfIcon sx={{ fontSize: '350%' }} />;

      case attachmentsTypeKeys.archive:
        return <DescriptionIcon sx={{ fontSize: '350%' }} />;

      case attachmentsTypeKeys.unknown:
      default:
        return <HelpCenterIcon sx={{ fontSize: '350%' }} />;
    }
  };

  return (
    <Card
      sx={({ palette }) => ({
        borderColor: isSelected ? palette.info.main : palette.divider,
        // borderWidth: isSelected ? '4px' : '1px',
      })}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="button" onClick={() => onDetail(attachment.id)} sx={{ cursor: 'pointer' }}>
          {attachment.file_name}
        </Typography>
        {!disableFavorites && <FavoritesStar model={listItemsViewKeys.attachments} id={item.id} />}
      </CardContent>
      <CardContent
        sx={({ palette }) => ({
          height: {
            xs: '80vw',
            sm: '45vw',
            md: '250px',
          },
          padding: 0,
          backgroundColor: 'transparent',
          borderTop: `1px solid ${palette.divider}`,
          borderBottom: `1px solid ${palette.divider}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',

          '& img': {
            maxWidth: '100%',
            height: 'auto',
            maxHeight: '100%',
            width: 'auto',
          },
        })}
      >
        {renderContent()}
      </CardContent>
      <CardActions sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Stack direction="row" gap={1}>
          <IconButtonPlus tooltip={t('button.select')} onClick={() => onSelect(item.id)} size="small">
            {isSelected ? <CheckCircleIcon fontSize="small" /> : <RadioButtonUncheckedIcon fontSize="small" />}
          </IconButtonPlus>
          {renderRowActions?.(item)}
        </Stack>
        <Stack direction="row" gap={1}>
          <IconButtonPlus tooltip={t('button.delete')} onClick={() => onDelete(item.id)} size="small" color="error">
            <DeleteIcon fontSize="small" />
          </IconButtonPlus>
          <IconButtonPlus tooltip={t('button.disable')} onClick={() => onDisable(item.id)} size="small" color="warning">
            {item.active ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
          </IconButtonPlus>
          <IconButtonPlus tooltip={t('button.detail')} onClick={() => onDetail(item.id)} size="small" color="primary">
            <FileOpenIcon fontSize="small" />
          </IconButtonPlus>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default AttachmentsViewItem;
