import { ListItemsView } from '../components';

export const createModelListFilterCommonDefaults = (view?: ListItemsView) => ({
  view: view ? view : 'table',
  query: '',
  orderBy: 'desc',
  sortBy: 'id',
  page: 1,
  perPage: 15,
  selected: [],
  filter: { types: [], categories: [], tags: [] },
});

export const areModelFilterEqual = (filter: object) =>
  JSON.stringify(filter) === JSON.stringify(createModelListFilterCommonDefaults());
