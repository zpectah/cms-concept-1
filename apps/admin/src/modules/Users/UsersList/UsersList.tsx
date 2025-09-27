import { modelKeys, UsersItem } from '@common';
import { ListItems, ValueType, ValueDate } from '../../../components';
import { getConfig } from '../../../utils';
import { registeredFormFields } from '../../../enums';
import { useUsersList } from './useUsersList';

const UsersList = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { users, isLoading, onDeleteSelected, onDisableSelected } = useUsersList();

  return (
    <ListItems<UsersItem>
      name={`${modelKeys.users}-list-items`}
      model={modelKeys.users}
      items={users}
      isLoading={isLoading}
      searchKeys={[registeredFormFields.name, registeredFormFields.type]}
      orderKeys={[
        registeredFormFields.id,
        registeredFormFields.name,
        registeredFormFields.email,
        registeredFormFields.firstName,
        registeredFormFields.lastName,
        registeredFormFields.type,
        registeredFormFields.active,
      ]}
      pathPrefix={`/${routes.users.path}`}
      columns={[
        {
          value: registeredFormFields.email,
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
    />
  );
};

export default UsersList;
