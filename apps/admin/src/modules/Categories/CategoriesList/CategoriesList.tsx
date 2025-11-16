import RemoveIcon from '@mui/icons-material/Remove';
import { modelKeys, CategoriesItem } from '@common';
import { ListItems, ValueType, ValueDate, ValueArray } from '../../../components';
import { getConfig } from '../../../utils';
import { registeredFormFields } from '../../../enums';
import { useUserActions } from '../../../hooks';
import { useCategoriesList } from './useCategoriesList';

const CategoriesList = () => {
  const {
    admin: { routes },
  } = getConfig();

  const { categories: modelActions } = useUserActions();
  const { categories, isLoading, onDeleteSelected, onDisableSelected } = useCategoriesList();

  return (
    <ListItems<CategoriesItem>
      name={`${modelKeys.categories}-list-items`}
      model={modelKeys.categories}
      items={categories}
      isLoading={isLoading}
      searchKeys={[registeredFormFields.name, registeredFormFields.type]}
      orderKeys={[
        registeredFormFields.id,
        registeredFormFields.name,
        registeredFormFields.type,
        registeredFormFields.active,
      ]}
      pathPrefix={`/${routes.categories.path}`}
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
          value: registeredFormFields.parent,
          renderValue: (row) =>
            row.parent === 0 ? <RemoveIcon fontSize="inherit" /> : <ValueArray value={[row.parent]} />,
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
    />
  );
};

export default CategoriesList;
