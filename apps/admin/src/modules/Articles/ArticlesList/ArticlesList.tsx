import { modelKeys, ArticlesItem } from '@common';
import { ListItems, ValueArray, ValueDate, ValueType } from '../../../components';
import { getConfig } from '../../../utils';
import { registeredFormFields } from '../../../enums';
import { useArticlesList } from './useArticlesList';

const ArticlesList = () => {
  const {
    admin: { routes },
  } = getConfig();
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
    />
  );
};

export default ArticlesList;
