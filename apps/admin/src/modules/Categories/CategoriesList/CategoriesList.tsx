import { useTranslation } from 'react-i18next';
import RemoveIcon from '@mui/icons-material/Remove';
import { modelKeys, CategoriesItem } from '@common';
import { ListItems, ValueType, ValueBoolean, ValueDate, ValueArray } from '../../../components';
import { getConfig } from '../../../utils';
import { registeredFormFields } from '../../../enums';
import { useCategoriesList } from './useCategoriesList';

const CategoriesList = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation(['components']);
  const { categories, isLoading, onDeleteSelected, onDisableSelected } = useCategoriesList();

  return (
    <ListItems<CategoriesItem>
      name={modelKeys.categories}
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
          label: t('components:ListItems.label.name'),
          isTitle: true,
        },
        {
          value: registeredFormFields.type,
          label: t('components:ListItems.label.type'),
          renderValue: (row) => <ValueType value={row.type} />,
        },
        {
          value: registeredFormFields.active,
          label: t('components:ListItems.label.active'),
          renderValue: (row) => <ValueBoolean value={row.active} />,
        },
        {
          value: registeredFormFields.parent,
          label: t('components:ListItems.label.parent'),
          renderValue: (row) =>
            row.parent === 0 ? <RemoveIcon fontSize="inherit" /> : <ValueArray value={[row.parent]} />,
        },
        {
          value: registeredFormFields.updated,
          label: t('components:ListItems.label.updated'),
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

export default CategoriesList;
