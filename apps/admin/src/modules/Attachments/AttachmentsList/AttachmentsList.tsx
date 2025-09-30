import { modelKeys, AttachmentsItem } from '@common';
import { ListItems, ValueType, ValueDate, listItemsViewKeys } from '../../../components';
import { getConfig } from '../../../utils';
import { registeredFormFields } from '../../../enums';
import { useAttachmentsList } from './useAttachmentsList';

const AttachmentsList = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { attachments, isLoading, onDeleteSelected, onDisableSelected } = useAttachmentsList();

  return (
    <ListItems<AttachmentsItem>
      name={`${modelKeys.attachments}-list-items`}
      model={modelKeys.attachments}
      initialView={listItemsViewKeys.attachments}
      items={attachments}
      isLoading={isLoading}
      searchKeys={[registeredFormFields.name, registeredFormFields.type]}
      orderKeys={[
        registeredFormFields.id,
        registeredFormFields.name,
        registeredFormFields.type,
        registeredFormFields.active,
      ]}
      pathPrefix={`/${routes.attachments.path}`}
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

export default AttachmentsList;
