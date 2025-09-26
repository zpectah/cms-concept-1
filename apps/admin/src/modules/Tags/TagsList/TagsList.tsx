import { modelKeys, TagsItem } from '@common';
import { ListItems, ValueType, ValueDate } from '../../../components';
import { getConfig } from '../../../utils';
import { registeredFormFields } from '../../../enums';
import { useTagsList } from './useTagsList';

const TagsList = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { tags, isLoading, onDeleteSelected, onDisableSelected } = useTagsList();

  return (
    <ListItems<TagsItem>
      name={modelKeys.tags}
      items={tags}
      isLoading={isLoading}
      searchKeys={[registeredFormFields.name, registeredFormFields.type]}
      orderKeys={[
        registeredFormFields.id,
        registeredFormFields.name,
        registeredFormFields.type,
        registeredFormFields.active,
      ]}
      pathPrefix={`/${routes.tags.path}`}
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

export default TagsList;
