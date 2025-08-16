import { ReactNode } from 'react';
import { ItemBase } from '@common';
import { listItemsSortOrderKeys, listItemsViewKeys } from './enums';

export type ListItemsView = keyof typeof listItemsViewKeys;

export type ListItemsSortOrder = keyof typeof listItemsSortOrderKeys;

interface ListItemsBase<T extends ItemBase> {
  items: T[];
  initialView?: ListItemsView;
}

interface ListItemsTableColumn<T extends ItemBase> {
  value: keyof T;
  label: string;
  renderValue?: (row: T) => ReactNode;
  isTitle?: boolean;
}

export interface ListItemsProps<T extends ItemBase> extends ListItemsBase<T> {
  name: string;
  columns: ListItemsTableColumn<T>[];
  searchKeys: (keyof T)[];
  orderKeys: (keyof T)[];
  isLoading?: boolean;
  itemsPerPage?: number;
  pathPrefix: string;

  // Optional callback when selected changes
  onRowSelect?: (selected: number[]) => void;

  // Callback for delete when action is confirmed
  onDeleteSelected?: (selected: number[]) => void;

  // Callback for disable selected
  onDisableSelected?: (selected: number[]) => void;

  // Callback for delete when action is confirmed
  onRowDelete?: (id: number) => void;

  // Callback for disable selected
  onRowDisable?: (id: number) => void;

  // Optional callback when detail shows
  onRowDetail?: (id: number) => void;
}

export interface useListItemsControlProps<T extends ItemBase> extends ListItemsBase<T> {
  initialOrderBy?: ListItemsSortOrder;
  initialSortBy?: keyof T;
  searchKeys: (keyof T)[];
  itemsPerPage?: number;
  onRowSelect?: (selected: number[]) => void;
}
