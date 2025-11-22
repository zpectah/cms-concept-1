import { modelKeys, UsersItem } from '@common';
import { ListItems, ValueType, ValueDate } from '../../../components';
import { getConfig } from '../../../config';
import { registeredFormFields } from '../../../enums';
import { useUserActions } from '../../../hooks';
import { useUsersList } from './useUsersList';

const UsersList = () => {
  const { routes } = getConfig();

  const { users: modelActions } = useUserActions();
  const { users, isLoading, onDeleteSelected, onDisableSelected } = useUsersList();

  return (
    <ListItems<UsersItem>
      name={`${modelKeys.users}-list-items`}
      model={modelKeys.users}
      items={users}
      isLoading={isLoading}
      searchKeys={[
        registeredFormFields.name,
        registeredFormFields.email,
        registeredFormFields.first_name,
        registeredFormFields.last_name,
        registeredFormFields.type,
      ]}
      orderKeys={[
        registeredFormFields.id,
        registeredFormFields.name,
        registeredFormFields.email,
        registeredFormFields.first_name,
        registeredFormFields.last_name,
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
          value: registeredFormFields.access_rights,
          renderValue: (row) => row.access_rights,
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
      modelActions={modelActions}
      disableFavorites
    />
  );
};

export default UsersList;
