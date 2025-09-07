import { useTranslation } from 'react-i18next';
import { modelKeys, ArticlesItem } from '@common';
import { ListItems, ValueBoolean, ValueArray, ValueDate, ValueType } from '../../../components';
import { getConfig } from '../../../utils';
import { registeredFormFields } from '../../../enums';
import { useArticlesList } from './useArticlesList';

const ArticlesList = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation(['components']);
  const { articles, categories, tags, isLoading, onDeleteSelected, onDisableSelected } = useArticlesList();

  return (
    <ListItems<ArticlesItem>
      name={modelKeys.articles}
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
          value: registeredFormFields.categories,
          label: t('components:ListItems.label.categories'),
          renderValue: (row) => <ValueArray value={row.categories} />,
        },
        {
          value: registeredFormFields.tags,
          label: t('components:ListItems.label.tags'),
          renderValue: (row) => <ValueArray value={row.tags} />,
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
      categories={categories}
      tags={tags}
    />
  );
};

export default ArticlesList;
