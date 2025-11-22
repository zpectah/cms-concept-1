import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardActions, Typography, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { AttachmentsItem, getShortenedFilename, ItemBase } from '@common';
import { AttachmentsViewItemProps } from '../types';
import { listItemsViewKeys } from '../enums';
import { IconButtonPlus } from '../../Button';
import { FavoritesStar } from '../../favorites';
import { getEnvironmentVariables, useAttachmentTypeElement } from '../../../helpers';

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
  modelActions,
}: AttachmentsViewItemProps<T>) => {
  const { t } = useTranslation();
  const { getElementByType } = useAttachmentTypeElement();
  const { uploadsSource } = getEnvironmentVariables();

  const attachment = item as unknown as AttachmentsItem;

  const sourcePrefix = `${uploadsSource}${attachment.type}/thumbnail/`; // TODO

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
          borderBottom: `1px solid ${palette.divider}`,
        })}
      >
        <Typography variant="button" onClick={() => onDetail(attachment.id)} sx={{ cursor: 'pointer', zIndex: 99 }}>
          {getShortenedFilename(attachment.file_name, 20)}
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
      <CardActions
        sx={({ palette }) => ({
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: `1px solid ${palette.divider}`,
        })}
      >
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
          <IconButtonPlus
            tooltip={t('button.delete')}
            onClick={() => onDelete(item.id)}
            size="small"
            // color="error"
            disabled={!modelActions.delete}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButtonPlus>
          <IconButtonPlus
            tooltip={item.active ? t('button.disable') : t('button.active')}
            onClick={() => onDisable(item.id)}
            size="small"
            // color="warning"
            disabled={!modelActions.modify}
          >
            {item.active ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
          </IconButtonPlus>
          <IconButtonPlus
            tooltip={t('button.detail')}
            onClick={() => onDetail(item.id)}
            size="small"
            // color="primary"
            disabled={!modelActions.view}
          >
            <ArrowOutwardIcon fontSize="small" />
          </IconButtonPlus>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default AttachmentsViewItem;
