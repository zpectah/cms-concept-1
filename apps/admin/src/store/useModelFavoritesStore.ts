import { create } from 'zustand';
import { Model } from '@common';
import { CMS_MODEL_FAVORITES } from '../constants';

type FavoriteValue = number[];
type FavoriteModel = Record<Model, FavoriteValue>;

interface ModelFavoritesStore {
  model: FavoriteModel;
  setFavorite: (model: Model, value: FavoriteValue) => void;
  clearFavoriteModel: (model: Model) => void;
}

const modelDefaults: FavoriteModel = {
  articles: [],
  attachments: [],
  categories: [],
  comments: [],
  members: [],
  menu: [],
  menuItems: [],
  messages: [],
  pages: [],
  tags: [],
  translations: [],
  users: [],
};

const useModelFavoritesStore = create<ModelFavoritesStore>((set, getState) => {
  const storageString = window.localStorage.getItem(CMS_MODEL_FAVORITES);
  const storageJson = storageString ? JSON.parse(storageString) : Object.assign(modelDefaults);

  const model: FavoriteModel = {
    ...storageJson,
  };

  const saveToStorage = (object: FavoriteModel) =>
    window.localStorage.setItem(CMS_MODEL_FAVORITES, JSON.stringify(object));

  const setFavoriteHandler = (model: Model, value: FavoriteValue) => {
    const tmpModel: FavoriteModel = { ...getState().model };

    tmpModel[model] = value;

    set({ model: tmpModel });
    saveToStorage(tmpModel);
  };

  return {
    model,
    setFavorite: setFavoriteHandler,
    clearFavoriteModel: (model: Model) => setFavoriteHandler(model, []),
  };
});

export default useModelFavoritesStore;
