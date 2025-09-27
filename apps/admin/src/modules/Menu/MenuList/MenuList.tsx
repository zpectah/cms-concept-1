import { modelKeys, MenuItem } from '@common';
import { ListItems, ValueType, ValueDate } from '../../../components';
import { getConfig } from '../../../utils';
import { registeredFormFields } from '../../../enums';
import { useMenuList } from './useMenuList';

const MenuList = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { menu, isLoading, onDeleteSelected, onDisableSelected } = useMenuList();

  return (
    <ListItems<MenuItem>
      name={`${modelKeys.menu}-list-items`}
      model={modelKeys.menu}
      items={menu}
      isLoading={isLoading}
      searchKeys={[registeredFormFields.name, registeredFormFields.type]}
      orderKeys={[
        registeredFormFields.id,
        registeredFormFields.name,
        registeredFormFields.type,
        registeredFormFields.active,
      ]}
      pathPrefix={`/${routes.menu.path}`}
      columns={[
        {
          value: registeredFormFields.name,
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

export default MenuList;
