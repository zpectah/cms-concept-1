import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { modelKeys, MembersItem } from '@common';
import { useMembersQuery } from '../../../hooks-query';
import { useViewLayoutContext, ListItems, ValueType, ValueBoolean, ValueDate } from '../../../components';
import { getConfig } from '../../../utils';
import { registeredFormFields } from '../../../enums';

const MembersList = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation(['modules', 'components']);
  const { setTitle } = useViewLayoutContext();
  const { membersQuery } = useMembersQuery();

  const { data: items, isLoading } = membersQuery;

  const deleteSelectedHandler = (ids: number[]) => {
    // TODO #api-call
    console.log('deleteSelectedHandler', ids);
  };

  const disableSelectedHandler = (ids: number[]) => {
    // TODO #api-call
    console.log('disableSelectedHandler', ids);
  };

  useEffect(() => {
    setTitle(t('modules:members.listTitle'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ListItems<MembersItem>
      name={modelKeys.members}
      items={items ?? []}
      isLoading={isLoading}
      searchKeys={[registeredFormFields.name, registeredFormFields.type]}
      orderKeys={[
        registeredFormFields.id,
        registeredFormFields.name,
        registeredFormFields.type,
        registeredFormFields.active,
      ]}
      pathPrefix={`/${routes.members.path}`}
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
          value: registeredFormFields.updated,
          label: t('components:ListItems.label.updated'),
          renderValue: (row) => <ValueDate value={row.updated} />,
        },
      ]}
      onDeleteSelected={deleteSelectedHandler}
      onDisableSelected={disableSelectedHandler}
      onRowDelete={(id) => deleteSelectedHandler([id])}
      onRowDisable={(id) => disableSelectedHandler([id])}
    />
  );
};

export default MembersList;
