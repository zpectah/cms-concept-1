import { useTranslation } from 'react-i18next';
import { Button } from '@mui/material';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import { modelKeys, MessagesItem } from '@common';
import { ListItems, ValueType, ValueDate, IconButtonPlus } from '../../../components';
import { getConfig } from '../../../utils';
import { registeredFormFields } from '../../../enums';
import { useUserActions } from '../../../hooks';
import { useMessagesList } from './useMessagesList';

const MessagesList = () => {
  const {
    admin: { routes },
  } = getConfig();

  const { t } = useTranslation(['common']);
  const { messages: modelActions } = useUserActions();
  const { messages, isLoading, onDeleteSelected, onDisableSelected, onMarkSelected } = useMessagesList();

  return (
    <ListItems<MessagesItem>
      name={`${modelKeys.messages}-list-items`}
      model={modelKeys.messages}
      items={messages}
      isLoading={isLoading}
      searchKeys={[registeredFormFields.name, registeredFormFields.type]}
      orderKeys={[
        registeredFormFields.id,
        registeredFormFields.sender,
        registeredFormFields.type,
        registeredFormFields.active,
      ]}
      pathPrefix={`/${routes.messages.path}`}
      columns={[
        {
          value: registeredFormFields.sender,
          isTitle: true,
        },
        {
          value: registeredFormFields.type,
          renderValue: (row) => <ValueType value={row.type} />,
        },
        {
          value: registeredFormFields.updated,
          renderValue: (row) => <ValueDate value={row.updated} />,
        },
      ]}
      onDeleteSelected={onDeleteSelected}
      onDisableSelected={onDisableSelected}
      onRowDelete={(id) => onDeleteSelected([id])}
      onRowDisable={(id) => onDisableSelected([id])}
      disableFavorites
      renderSelectedActions={(selected) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => onMarkSelected(selected)}
          disabled={selected.length === 0}
        >
          Mark as read
        </Button>
      )}
      renderRowActions={(row) => (
        <IconButtonPlus
          tooltip={t('button.markRead')}
          onClick={() => onMarkSelected([row.id])}
          disabled={!modelActions.modify}
        >
          {row.read ? <MarkAsUnreadIcon fontSize="small" /> : <MarkunreadIcon fontSize="small" />}
        </IconButtonPlus>
      )}
      modelActions={modelActions}
    />
  );
};

export default MessagesList;
