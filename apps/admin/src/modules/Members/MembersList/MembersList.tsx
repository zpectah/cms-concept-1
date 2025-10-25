import { modelKeys, MembersItem } from '@common';
import { ListItems, ValueType, ValueDate } from '../../../components';
import { getConfig } from '../../../utils';
import { registeredFormFields } from '../../../enums';
import { useMembersList } from './useMembersList';

const MembersList = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { members, isLoading, onDeleteSelected, onDisableSelected } = useMembersList();

  return (
    <ListItems<MembersItem>
      name={`${modelKeys.members}-list-items`}
      model={modelKeys.members}
      items={members}
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
      pathPrefix={`/${routes.members.path}`}
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

export default MembersList;
