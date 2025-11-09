import { useTranslation } from 'react-i18next';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import { modelKeys, ArticlesItem } from '@common';
import { ListItems, ValueArray, ValueDate, ValueType, IconButtonPlus } from '../../../components';
import { getConfig } from '../../../utils';
import { registeredFormFields } from '../../../enums';
import { useArticlesList } from './useArticlesList';

const ArticlesList = () => {
  const {
    admin: { routes },
  } = getConfig();

  const { t } = useTranslation(['common']);
  const { articles, categories, tags, isLoading, onDeleteSelected, onDisableSelected, onClone } = useArticlesList();

  return (
    <ListItems<ArticlesItem>
      name={`${modelKeys.articles}-list-items`}
      model={modelKeys.articles}
      items={articles}
      isLoading={isLoading}
      searchKeys={[registeredFormFields.name, registeredFormFields.type]}
      orderKeys={[
        registeredFormFields.id,
        registeredFormFields.name,
        registeredFormFields.type,
        registeredFormFields.active,
      ]}
      pathPrefix={`/${routes.articles.path}`}
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
          value: registeredFormFields.categories,
          renderValue: (row) => <ValueArray value={row.categories} />,
        },
        {
          value: registeredFormFields.tags,
          renderValue: (row) => <ValueArray value={row.tags} />,
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
      categories={categories}
      tags={tags}
      renderRowActions={(row) => (
        <IconButtonPlus tooltip={t('button.clone')} onClick={() => onClone(row.id)} size="small">
          <CopyAllIcon fontSize="small" />
        </IconButtonPlus>
      )}
    />
  );
};

export default ArticlesList;
