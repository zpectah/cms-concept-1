import { useTranslation } from 'react-i18next';
import { List, ListItem, ListItemText, ListItemAvatar, Stack, Avatar, Button } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { newItemKey, menuItemsTypeKeys, MenuItemTreeItem } from '@common';
import { IconButtonPlus } from '../../../../components';
import { useMenuItemsList } from './useMenuItemsList';
import { sortMenuItems } from './helpers';

interface RecursiveMenuListItemProps extends MenuItemTreeItem {
  onDetail: (id: number) => void;
  onToggle: (id: number[]) => void;
  onDelete: (id: number[]) => void;
}

interface MenuItemsListProps {
  menuId?: string;
}

const RecursiveMenuListItem = ({ onDetail, onDelete, onToggle, ...item }: RecursiveMenuListItemProps) => {
  const { t } = useTranslation(['common']);

  const label = {
    [menuItemsTypeKeys.default]: `Page #${item.link_page}`,
    [menuItemsTypeKeys.external]: item.link_url,
    [menuItemsTypeKeys.section]: `-`,
  };

  return (
    <>
      <ListItem
        key={item.id}
        secondaryAction={
          <Stack direction="row" gap={1}>
            <IconButtonPlus onClick={() => onDelete([item.id])} size="small" tooltip={t('button.delete')}>
              <DeleteOutlineIcon fontSize="inherit" />
            </IconButtonPlus>
            <IconButtonPlus onClick={() => onToggle([item.id])} size="small" tooltip={t('button.toggle')}>
              {item.active ? <VisibilityIcon fontSize="inherit" /> : <VisibilityOffIcon fontSize="inherit" />}
            </IconButtonPlus>
            <IconButtonPlus onClick={() => onDetail(item.id)} size="small" tooltip={t('button.detail')}>
              <ArrowOutwardIcon fontSize="inherit" />
            </IconButtonPlus>
          </Stack>
        }
        divider
      >
        <ListItemAvatar>
          <Avatar variant="rounded">{item.item_order}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={item.name}
          secondary={label[item.type]}
          onClick={() => onDetail(item.id)}
          slotProps={{
            primary: {
              sx: { cursor: 'pointer' },
            },
            secondary: {
              sx: { cursor: 'pointer' },
            },
          }}
        />
      </ListItem>
      {item.children.length > 0 && (
        <List component="div" disablePadding sx={{ paddingLeft: 4 }}>
          {sortMenuItems(item.children).map(({ children, ...sub }) => (
            <RecursiveMenuListItem
              key={`${item.id}.${sub.id}`}
              onDetail={onDetail}
              onDelete={onDelete}
              onToggle={onToggle}
              children={children}
              {...sub}
            />
          ))}
        </List>
      )}
    </>
  );
};

const MenuItemsList = ({ menuId }: MenuItemsListProps) => {
  const { t } = useTranslation(['common']);
  const { items, onDetailOpen, onDisableSelected, onDeleteSelected } = useMenuItemsList({ menuId });

  return (
    <Stack direction="column" gap={2}>
      <Stack direction="row">
        <Button onClick={() => onDetailOpen(newItemKey)} variant="contained" color="success">
          {t('button.newItem')}
        </Button>
      </Stack>
      {items.length > 0 ? (
        <List
          sx={({ palette }) => ({
            borderTop: `1px solid ${palette.divider}`,
            pt: 0,
          })}
        >
          {sortMenuItems(items).map(({ children, ...item }) => (
            <RecursiveMenuListItem
              key={item.id}
              onDetail={onDetailOpen}
              onDelete={onDeleteSelected}
              onToggle={onDisableSelected}
              children={children}
              {...item}
            />
          ))}
        </List>
      ) : (
        <p>{t('label.noItemsCreated')}</p>
      )}
    </Stack>
  );
};

export default MenuItemsList;
