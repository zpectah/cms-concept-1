import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { modelKeys, CategoriesItem } from '@common';
import { useCategoriesQuery } from '../../../hooks-query';
import { useViewLayoutContext, ListItems } from '../../../components';
import { getConfig } from '../../../utils';
import { registeredFormFields } from '../../../enums';

const CategoriesList = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation(['modules']);
  const { setTitle } = useViewLayoutContext();
  const { categoriesQuery } = useCategoriesQuery();

  const { data: items, isLoading } = categoriesQuery;

  const deleteSelectedHandler = (ids: number[]) => {
    // TODO #api-call
    console.log('deleteSelectedHandler', ids);
  };

  const disableSelectedHandler = (ids: number[]) => {
    // TODO #api-call
    console.log('disableSelectedHandler', ids);
  };

  useEffect(() => {
    setTitle(t('modules:categories.listTitle'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ListItems<CategoriesItem>
      name={modelKeys.categories}
      items={items ?? []}
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
          label: 'Name',
          isTitle: true,
        },
        {
          value: registeredFormFields.type,
          label: 'Type',
        },
        {
          value: registeredFormFields.active,
          label: 'Active',
          renderValue: (row) => `__${row.active ? 'Yes' : 'Nope'}__`, // TODO
        },
        {
          value: registeredFormFields.parent,
          label: 'Parent',
        },
        {
          value: registeredFormFields.updated,
          label: 'Updated',
        },
      ]}
      onDeleteSelected={deleteSelectedHandler}
      onDisableSelected={disableSelectedHandler}
      onRowDelete={(id) => deleteSelectedHandler([id])}
      onRowDisable={(id) => disableSelectedHandler([id])}
    />
  );
};

export default CategoriesList;
