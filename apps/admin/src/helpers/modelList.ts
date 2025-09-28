export const createModelListFilterCommonDefaults = () => ({
  view: 'table',
  query: '',
  orderBy: 'desc',
  sortBy: 'id',
  page: 1,
  perPage: 10,
  selected: [],
  filter: { types: [], categories: [], tags: [] },
});

export const areModelFilterEqual = (filter: object) =>
  JSON.stringify(filter) === JSON.stringify(createModelListFilterCommonDefaults());
