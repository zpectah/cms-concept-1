import { useState } from 'react';
import { newItemKey } from '@common';
import { MenuItemsList } from './MenuItemsList';
import { MenuItemsDetailForm } from './MenuItemsDetailForm';
import { MenuItemsManagerContextProvider } from './MenuItemsManager.context';

interface MenuItemsManagerProps {
  isEnabled: boolean;
  menuId?: string;
}

const MenuItemsManager = ({ isEnabled, menuId }: MenuItemsManagerProps) => {
  const [detailId, setDetailId] = useState<number | typeof newItemKey | null>(null);

  if (!isEnabled) return null;

  if (menuId === newItemKey) {
    return <div>You must create menu before adding menu items</div>;
  }

  return (
    <MenuItemsManagerContextProvider
      value={{
        detailId,
        setDetailId: setDetailId,
      }}
    >
      <MenuItemsList menuId={menuId} />
      <MenuItemsDetailForm menuId={menuId} />
    </MenuItemsManagerContextProvider>
  );
};

export default MenuItemsManager;
