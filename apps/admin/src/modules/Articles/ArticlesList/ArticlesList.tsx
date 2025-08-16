import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ArticlesItem } from '@common';
import { useArticlesQuery } from '../../../hooks-query';
import { useViewLayoutContext, ListItems } from '../../../components';
import { getConfig } from '../../../utils';
import { registeredFormFields } from '../../../enums';

const ArticlesList = () => {
  const {
    admin: { routes },
  } = getConfig();
  const { t } = useTranslation(['modules']);
  const { setTitle } = useViewLayoutContext();
  const { articlesQuery } = useArticlesQuery();

  const { data: items, isLoading } = articlesQuery;

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
    <article>
      <div>
        <ListItems<ArticlesItem>
          name={routes.articles.path}
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
              value: registeredFormFields.categories,
              label: 'Categories',
              renderValue: (row) => JSON.stringify(row.categories),
            },
            {
              value: registeredFormFields.tags,
              label: 'Tags',
              renderValue: (row) => JSON.stringify(row.tags),
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
      </div>
    </article>
  );
};

export default ArticlesList;
