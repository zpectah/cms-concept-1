import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardActions, Typography, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { AttachmentsItem, ItemBase } from '@common';
import { AttachmentsViewItemProps } from '../types';
import { listItemsViewKeys } from '../enums';
import { IconButtonPlus } from '../../Button';
import { FavoritesStar } from '../../favorites';
import { useAttachmentTypeElement } from '../../../helpers';

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
  const { getElementByType } = useAttachmentTypeElement();

  const attachment = item as unknown as AttachmentsItem;

  const sourcePrefix = `http://localhost:8080/${attachment.type}/`; // TODO

  const renderContent = () =>
    getElementByType(attachment.type, {
      source: `${sourcePrefix}${attachment.file_name}`,
      alt: attachment.name,
      iconProps: { sx: { fontSize: '350%' } },
    });

  return (
    <Card
      sx={({ palette }) => ({
        borderColor: isSelected ? palette.info.main : palette.divider,
        position: 'relative',

        '&::before': {
          content: '""',
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          border: `2px solid ${isSelected ? palette.info.main : 'transparent'}`,
          borderRadius: '4px',
        },
      })}
    >
      <CardContent
        sx={({ palette }) => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        })}
      >
        <Typography variant="button" onClick={() => onDetail(attachment.id)} sx={{ cursor: 'pointer', zIndex: 99 }}>
          {attachment.file_name}
        </Typography>
        {!disableFavorites && <FavoritesStar model={listItemsViewKeys.attachments} id={item.id} />}
      </CardContent>
      <CardContent
        sx={() => ({
          height: {
            xs: '80vw',
            sm: '45vw',
            md: '250px',
          },
          padding: 0,
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
            {isSelected ? (
              <CheckCircleIcon fontSize="small" color="primary" />
            ) : (
              <RadioButtonUncheckedIcon fontSize="small" />
            )}
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
