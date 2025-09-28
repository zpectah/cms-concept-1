import { useModelFavoritesStore } from '../store';
import { Model } from '@common';

export const useModelFavorites = (model: Model) => {
  const { model: modelStore, setFavorite, clearFavoriteModel } = useModelFavoritesStore();

  const isItemFavoriteHandler = (id: number) => {
    const items = [...modelStore[model]];
    const index = items.indexOf(id);

    return index > -1;
  };

  const toggleFavoriteItemHandler = (id: number) => {
    const items = [...modelStore[model]];
    const index = items.indexOf(id);

    if (index > -1) {
      items.splice(index, 1);
    } else {
      items.push(id);
    }

    setFavorite(model, items);
  };

  const removeItemFromFavoritesHandler = (id: number) => {
    const items = [...modelStore[model]];
    const index = items.indexOf(id);

    if (index > -1) {
      items.splice(index, 1);
    }

    setFavorite(model, items);
  };

  return {
    toggleFavoriteItem: toggleFavoriteItemHandler,
    isItemFavorite: isItemFavoriteHandler,
    removeItemFromFavorites: removeItemFromFavoritesHandler,
    clearFavoriteModel,
  };
};
