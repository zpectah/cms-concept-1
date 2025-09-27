import { create } from 'zustand';
import { Model } from '@common';
import { ListItemsView, ListItemsSortOrder, ListItemsFilter } from '../components';

interface ListItemModel {
  view: ListItemsView;
  query: string;
  orderBy: ListItemsSortOrder;
  sortBy: string;
  page: number;
  perPage: number;
  selected: number[];
  filter: ListItemsFilter;
  dirty: boolean;
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

const createModelCommonDefaults = () => ({
  view: 'table',
  query: '',
  orderBy: 'asc',
  sortBy: 'id',
  page: 1,
  perPage: 10,
  selected: [],
  filter: { types: [], categories: [], tags: [] },
  dirty: false,
});

const modelDefaults = {
  articles: createModelCommonDefaults(),
  attachments: createModelCommonDefaults(),
  categories: createModelCommonDefaults(),
  comments: createModelCommonDefaults(),
  members: createModelCommonDefaults(),
  menu: createModelCommonDefaults(),
  menuItems: createModelCommonDefaults(),
  messages: createModelCommonDefaults(),
  pages: createModelCommonDefaults(),
  tags: createModelCommonDefaults(),
  translations: createModelCommonDefaults(),
  users: createModelCommonDefaults(),
};

const useModelListStore = create<ModelListStore>((set, getState) => {
  const storageString = window.localStorage.getItem('model-list');
  const storageJson = storageString ? JSON.parse(storageString) : Object.assign(modelDefaults);

  const modelStore = {
    ...storageJson,
  };

  const saveToStorage = (object: ModelListStore['model']) =>
    window.localStorage.setItem('model-list', JSON.stringify(object));

  const resetModel = (model: Model) => {
    const tmpModel = Object.assign({ ...modelStore });

    tmpModel[model] = {
      ...createModelCommonDefaults(),
      dirty: false,
    };

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  const areObjectsEqual = (obj1: object) => JSON.stringify(obj1) === JSON.stringify(createModelCommonDefaults());

  const setViewHandler = (model: Model, view: ListItemsView) => {
    const tmpModel = Object.assign({ ...modelStore });

    tmpModel[model].view = view;
    tmpModel[model].dirty = areObjectsEqual(tmpModel[model]);

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  const setQueryHandler = (model: Model, query: string) => {
    const tmpModel = Object.assign({ ...modelStore });

    tmpModel[model].query = query;
    tmpModel[model].dirty = areObjectsEqual(tmpModel[model]);

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  const setOrderByHandler = (model: Model, orderBy: ListItemsSortOrder) => {
    const tmpModel = Object.assign({ ...modelStore });

    tmpModel[model].orderBy = orderBy;
    tmpModel[model].dirty = areObjectsEqual(tmpModel[model]);

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  const setSortByHandler = (model: Model, sortBy: string) => {
    const tmpModel = Object.assign({ ...modelStore });

    tmpModel[model].sortBy = sortBy;
    tmpModel[model].dirty = areObjectsEqual(tmpModel[model]);

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  const setPageHandler = (model: Model, page: number) => {
    const tmpModel = Object.assign({ ...modelStore });

    tmpModel[model].page = page;
    tmpModel[model].dirty = areObjectsEqual(tmpModel[model]);

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  const setPerPageHandler = (model: Model, perPage: number) => {
    const tmpModel = Object.assign({ ...modelStore });

    tmpModel[model].perPage = perPage;
    tmpModel[model].dirty = areObjectsEqual(tmpModel[model]);

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  const setSelectedHandler = (model: Model, selected: number[]) => {
    const tmpModel = Object.assign({ ...modelStore });

    tmpModel[model].selected = selected;
    tmpModel[model].dirty = areObjectsEqual(tmpModel[model]);

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  const setFilterHandler = (model: Model, filter: Partial<ListItemsFilter>) => {
    const tmpModel = Object.assign({ ...modelStore });

    tmpModel[model].filter = { ...tmpModel[model].filter, ...filter };
    tmpModel[model].dirty = areObjectsEqual(tmpModel[model]);

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
