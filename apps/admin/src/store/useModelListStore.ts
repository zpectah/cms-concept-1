import { create } from 'zustand';
import { Model } from '@common';
import { ListItemsView, ListItemsSortOrder, ListItemsFilter } from '../components';
import { createModelListFilterCommonDefaults } from '../helpers';
import { CMS_MODEL_FILTER_KEY } from '../constants';

interface ListItemModel {
  view: ListItemsView;
  query: string;
  orderBy: ListItemsSortOrder;
  sortBy: string;
  page: number;
  perPage: number;
  selected: number[];
  filter: ListItemsFilter;
}

type ListModel = Record<Model, ListItemModel>;

interface ModelListStore {
  model: ListModel;
  setView: (model: Model, view: ListItemsView) => void;
  setQuery: (model: Model, query: string) => void;
  setOrderBy: (model: Model, orderBy: ListItemsSortOrder) => void;
  setSortBy: (model: Model, sortBy: string) => void;
  setPage: (model: Model, page: number) => void;
  setPerPage: (model: Model, perPage: number) => void;
  setSelected: (model: Model, selected: number[]) => void;
  setFilter: (model: Model, filter: Partial<ListItemsFilter>) => void;
  resetModel: (model: Model) => void;
}

const modelDefaults = {
  articles: createModelListFilterCommonDefaults(),
  attachments: createModelListFilterCommonDefaults('attachments'),
  categories: createModelListFilterCommonDefaults(),
  comments: createModelListFilterCommonDefaults(),
  members: createModelListFilterCommonDefaults(),
  menu: createModelListFilterCommonDefaults(),
  menuItems: createModelListFilterCommonDefaults(),
  messages: createModelListFilterCommonDefaults(),
  pages: createModelListFilterCommonDefaults(),
  tags: createModelListFilterCommonDefaults(),
  translations: createModelListFilterCommonDefaults(),
  users: createModelListFilterCommonDefaults(),
};

const useModelListStore = create<ModelListStore>((set, getState) => {
  const storageString = window.localStorage.getItem(CMS_MODEL_FILTER_KEY);
  const storageJson = storageString ? JSON.parse(storageString) : Object.assign(modelDefaults);

  const modelStore = {
    ...storageJson,
  };

  const saveToStorage = (object: ModelListStore['model']) =>
    window.localStorage.setItem(CMS_MODEL_FILTER_KEY, JSON.stringify(object));

  const resetModel = (model: Model) => {
    const tmpModel = Object.assign({ ...getState().model });

    tmpModel[model] = {
      ...createModelListFilterCommonDefaults(model === 'attachments' ? 'attachments' : undefined),
    };

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  const setViewHandler = (model: Model, view: ListItemsView) => {
    const tmpModel = Object.assign({ ...getState().model });

    tmpModel[model].view = view;

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  const setQueryHandler = (model: Model, query: string) => {
    const tmpModel = Object.assign({ ...getState().model });

    tmpModel[model].query = query;

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  const setOrderByHandler = (model: Model, orderBy: ListItemsSortOrder) => {
    const tmpModel = Object.assign({ ...getState().model });

    tmpModel[model].orderBy = orderBy;

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  const setSortByHandler = (model: Model, sortBy: string) => {
    const tmpModel = Object.assign({ ...getState().model });

    tmpModel[model].sortBy = sortBy;

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  const setPageHandler = (model: Model, page: number) => {
    const tmpModel = Object.assign({ ...getState().model });

    tmpModel[model].page = page;

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  const setPerPageHandler = (model: Model, perPage: number) => {
    const tmpModel = Object.assign({ ...getState().model });

    tmpModel[model].perPage = perPage;

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  const setSelectedHandler = (model: Model, selected: number[]) => {
    const tmpModel = Object.assign({ ...getState().model });

    tmpModel[model].selected = selected;

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  const setFilterHandler = (model: Model, filter: Partial<ListItemsFilter>) => {
    const tmpModel = Object.assign({ ...getState().model });

    tmpModel[model].filter = { ...tmpModel[model].filter, ...filter };

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  return {
    model: modelStore,
    setView: setViewHandler,
    setQuery: setQueryHandler,
    setOrderBy: setOrderByHandler,
    setSortBy: setSortByHandler,
    setPage: setPageHandler,
    setPerPage: setPerPageHandler,
    setSelected: setSelectedHandler,
    setFilter: setFilterHandler,
    resetModel,
  };
});

export default useModelListStore;
