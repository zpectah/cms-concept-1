import { modelKeys, MessagesItem } from '@common';
import { ListItems, ValueType, ValueBoolean, ValueDate } from '../../../components';
import { getConfig } from '../../../utils';
import { registeredFormFields } from '../../../enums';
import { useMessagesList } from './useMessagesList';

const MessagesList = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { messages, isLoading, onDeleteSelected, onDisableSelected } = useMessagesList();

  return (
    <ListItems<MessagesItem>
      name={modelKeys.messages}
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
          value: registeredFormFields.read,
          renderValue: (row) => <ValueBoolean value={row.read} />,
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
    />
  );
};

export default MessagesList;
