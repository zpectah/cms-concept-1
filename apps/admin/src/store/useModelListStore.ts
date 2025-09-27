import { create } from 'zustand';
import { Model } from '@common';
import {
  listItemsViewKeys,
  listItemsSortOrderKeys,
  ListItemsView,
  ListItemsSortOrder,
  ListItemsFilter,
} from '../components';

interface ListModel {
  view: ListItemsView;
  query: string;
  orderBy: ListItemsSortOrder;
  sortBy: string;
  page: number;
  perPage: number;

  selected: number[];
  filter: ListItemsFilter;
}
interface ModelListStore {
  model: {
    articles: ListModel;
    attachments: ListModel;
    categories: ListModel;
    comments: ListModel;
    members: ListModel;
    menu: ListModel;
    menuItems: ListModel;
    messages: ListModel;
    pages: ListModel;
    tags: ListModel;
    translations: ListModel;
    users: ListModel;
  };

  setView: (model: Model, view: ListItemsView) => void;
  setQuery: (model: Model, query: string) => void;
  setOrderBy: (model: Model, orderBy: ListItemsSortOrder) => void;
  setSortBy: (model: Model, sortBy: string) => void;
  setPage: (model: Model, page: number) => void;
  setPerPage: (model: Model, perPage: number) => void;

  setSelected: (model: Model, selected: number[]) => void;
  setFilter: (model: Model, filter: ListItemsFilter) => void;
}

const MODEL_COMMON_DEFAULTS = {
  view: listItemsViewKeys.table,
  query: '',
  orderBy: listItemsSortOrderKeys.asc,
  sortBy: 'id',
  page: 1,
  perPage: 10,

  selected: [],
  filter: { types: [], categories: [], tags: [] },
};
const MODEL_DEFAULTS = {
  articles: MODEL_COMMON_DEFAULTS,
  attachments: MODEL_COMMON_DEFAULTS,
  categories: MODEL_COMMON_DEFAULTS,
  comments: MODEL_COMMON_DEFAULTS,
  members: MODEL_COMMON_DEFAULTS,
  menu: MODEL_COMMON_DEFAULTS,
  menuItems: MODEL_COMMON_DEFAULTS,
  messages: MODEL_COMMON_DEFAULTS,
  pages: MODEL_COMMON_DEFAULTS,
  tags: MODEL_COMMON_DEFAULTS,
  translations: MODEL_COMMON_DEFAULTS,
  users: MODEL_COMMON_DEFAULTS,
};

const useModelListStore = create<ModelListStore>((set, getState) => {
  const storageString = window.localStorage.getItem('model-list');
  const storageJson = storageString ? JSON.parse(storageString) : MODEL_DEFAULTS;

  const model = {
    ...storageJson,
  };

  const setViewHandler = (model: Model, view: ListItemsView) => {
    const tmpModel = Object.assign({ ...getState().model });

    tmpModel[model].view = view;

    set({ model: tmpModel });
    window.localStorage.setItem('model-list', JSON.stringify(tmpModel));

    console.log('#view', view, 'new model', tmpModel);
  };

  const setQueryHandler = (model: Model, query: string) => {
    const tmpModel = Object.assign({ ...getState().model });

    tmpModel[model].query = query;

    set({ model: tmpModel });
    window.localStorage.setItem('model-list', JSON.stringify(tmpModel));

    console.log('#query', query, 'new model', tmpModel);
  };

  const setOrderByHandler = (model: Model, orderBy: ListItemsSortOrder) => {
    const tmpModel = Object.assign({ ...getState().model });

    tmpModel[model].orderBy = orderBy;

    set({ model: tmpModel });
    window.localStorage.setItem('model-list', JSON.stringify(tmpModel));

    console.log('#orderBy', orderBy, 'new model', tmpModel);
  };

  const setSortByHandler = (model: Model, sortBy: string) => {
    const tmpModel = Object.assign({ ...getState().model });

    tmpModel[model].sortBy = sortBy;

    set({ model: tmpModel });
    window.localStorage.setItem('model-list', JSON.stringify(tmpModel));

    console.log('#sortBy', sortBy, 'new model', tmpModel);
  };

  const setPageHandler = (model: Model, page: number) => {
    const tmpModel = Object.assign({ ...getState().model });

    tmpModel[model].page = page;

    set({ model: tmpModel });
    window.localStorage.setItem('model-list', JSON.stringify(tmpModel));

    console.log('#page', page, 'new model', tmpModel);
  };

  const setPerPageHandler = (model: Model, perPage: number) => {
    const tmpModel = Object.assign({ ...getState().model });

    tmpModel[model].perPage = perPage;

    set({ model: tmpModel });
    window.localStorage.setItem('model-list', JSON.stringify(tmpModel));

    console.log('#perPage', perPage, 'new model', tmpModel);
  };

  const setSelectedHandler = (model: Model, selected: number[]) => {
    const tmpModel = Object.assign({ ...getState().model });

    tmpModel[model].selected = selected;

    set({ model: tmpModel });
    window.localStorage.setItem('model-list', JSON.stringify(tmpModel));

    console.log('#selected', selected, 'new model', tmpModel);
  };

  const setFilterHandler = (model: Model, filter: ListItemsFilter) => {
    const tmpModel = Object.assign({ ...getState().model });

    tmpModel[model].filter = filter;

    set({ model: tmpModel });
    window.localStorage.setItem('model-list', JSON.stringify(tmpModel));

    console.log('#filter', filter, 'new model', tmpModel);
  };

  return {
    model,

    setView: setViewHandler,
    setQuery: setQueryHandler,
    setOrderBy: setOrderByHandler,
    setSortBy: setSortByHandler,
    setPage: setPageHandler,
    setPerPage: setPerPageHandler,

    setSelected: setSelectedHandler,
    setFilter: setFilterHandler,
  };
});

export default useModelListStore;
