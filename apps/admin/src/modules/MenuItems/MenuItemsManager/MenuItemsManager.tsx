import { useEffect } from 'react';
import { newItemKey } from '@common';
import { useMenuItemsQuery } from '../../../hooks-query';
import { MenuItemsList } from './MenuItemsList';
import { MenuItemsDetailForm } from './MenuItemsDetailForm';

interface MenuItemsManagerProps {
  isEnabled: boolean;
  menuId?: string;
}

const MenuItemsManager = ({ isEnabled, menuId }: MenuItemsManagerProps) => {
  const { menuItemsQuery } = useMenuItemsQuery({ menuId });

  const { data: items } = menuItemsQuery;

  useEffect(() => {
    console.log('items', items);
  }, [items]);

  if (!isEnabled) return null;

  if (menuId === newItemKey) {
    return <div>You must create menu before adding menu items</div>;
  }

  return (
    <div>
      ...MenuItemsManager...menu id #{menuId}...
      <MenuItemsList items={items ?? []} />
      <MenuItemsDetailForm open />
    </div>
  );
};

export default MenuItemsManager;
