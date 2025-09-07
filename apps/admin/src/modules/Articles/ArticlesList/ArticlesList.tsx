import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { modelKeys, ArticlesItem } from '@common';
import { useArticlesQuery, useCategoriesQuery, useTagsQuery } from '../../../hooks-query';
import { useViewLayoutContext, ListItems, ValueBoolean, ValueArray, ValueDate, ValueType } from '../../../components';
import { getConfig } from '../../../utils';
import { registeredFormFields } from '../../../enums';

const ArticlesList = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation(['modules', 'components']);
  const { setTitle } = useViewLayoutContext();
  const { articlesQuery } = useArticlesQuery();
  const { categoriesQuery } = useCategoriesQuery();
  const { tagsQuery } = useTagsQuery();

  const { data: items, isLoading } = articlesQuery;
  const { data: categories } = categoriesQuery;
  const { data: tags } = tagsQuery;

  const deleteSelectedHandler = (ids: number[]) => {
    // TODO #api-call
    console.log('deleteSelectedHandler', ids);
  };

  const disableSelectedHandler = (ids: number[]) => {
    // TODO #api-call
    console.log('disableSelectedHandler', ids);
  };

  useEffect(() => {
    setTitle(t('modules:articles.listTitle'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ListItems<ArticlesItem>
      name={modelKeys.articles}
      items={items ?? []}
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
      onDeleteSelected={deleteSelectedHandler}
      onDisableSelected={disableSelectedHandler}
      onRowDelete={(id) => deleteSelectedHandler([id])}
      onRowDisable={(id) => disableSelectedHandler([id])}
      categories={categories}
      tags={tags}
    />
  );
};

export default ArticlesList;
