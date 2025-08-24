import { MenuItems } from '@common';

interface MenuItemsListProps {
  items: MenuItems;
}

const MenuItemsList = ({ items = [] }: MenuItemsListProps) => {
  return <div>...MenuItemsList...</div>;
};

export default MenuItemsList;
