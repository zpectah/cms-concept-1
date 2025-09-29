import { modelKeys, TranslationsItem } from '@common';
import { ListItems, ValueType, ValueDate } from '../../../components';
import { getConfig } from '../../../utils';
import { registeredFormFields } from '../../../enums';
import { useTranslationsList } from './useTranslationsList';

const TranslationsList = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { translations, isLoading, onDeleteSelected, onDisableSelected } = useTranslationsList();

  return (
    <ListItems<TranslationsItem>
      name={`${modelKeys.translations}-list-items`}
      model={modelKeys.translations}
      items={translations}
      isLoading={isLoading}
      searchKeys={[registeredFormFields.name, registeredFormFields.type]}
      orderKeys={[
        registeredFormFields.id,
        registeredFormFields.name,
        registeredFormFields.type,
        registeredFormFields.active,
      ]}
      pathPrefix={`/${routes.translations.path}`}
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
      disableFavorites
    />
  );
};

export default TranslationsList;
