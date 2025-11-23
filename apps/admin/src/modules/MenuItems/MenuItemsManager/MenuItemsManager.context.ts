import { createContext, useContext } from 'react';

interface MenuItemsManagerContextProps {
  detailId: number | 'new' | null;
  setDetailId: (detailId: number | 'new' | null) => void;
}

const MenuItemsManagerContextDefaults: MenuItemsManagerContextProps = {
  detailId: null,
  setDetailId: () => null,
};

export const MenuItemsManagerContext = createContext(MenuItemsManagerContextDefaults);

export const MenuItemsManagerContextProvider = MenuItemsManagerContext.Provider;
export const MenuItemsManagerContextConsumer = MenuItemsManagerContext.Consumer;

export const useMenuItemsManagerContext = () => useContext(MenuItemsManagerContext);
