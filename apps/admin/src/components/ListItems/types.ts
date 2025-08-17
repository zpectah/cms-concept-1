import { ReactNode } from 'react';
import { ItemBase, Categories, Tags } from '@common';
import { checkboxStateKeys, listItemsSortOrderKeys, listItemsViewKeys } from './enums';

export type ListItemsView = keyof typeof listItemsViewKeys;

export type ListItemsSortOrder = keyof typeof listItemsSortOrderKeys;

export type CheckboxState = keyof typeof checkboxStateKeys;

export type ListItemsSelected = number[];

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

interface ListItemsInitialProps {
  name: string;
  isLoading?: boolean;
  pathPrefix: string;
}

export interface ListItemsProps<T extends ItemBase> extends ListItemsBase<T>, ListItemsInitialProps {
  columns: ListItemsTableColumn<T>[];
  searchKeys: (keyof T)[];
  orderKeys: (keyof T)[];
  itemsPerPage?: number;
  disableViewToggle?: boolean;

  /**
   * Optional callback when selected changes
   **/
  onRowSelect?: (selected: ListItemsSelected) => void;

  /**
   * Optional callback when selected changes
   **/
  onSelectAll?: (selected: ListItemsSelected) => void;

  /**
   * Callback for delete when action is confirmed
   **/
  onDeleteSelected?: (selected: ListItemsSelected) => void;

  /**
   * Callback for disable selected
   **/
  onDisableSelected?: (selected: ListItemsSelected) => void;

  /**
   * Callback for delete when action is confirmed
   **/
  onRowDelete?: (id: number) => void;

  /**
   * Callback for disable selected
   **/
  onRowDisable?: (id: number) => void;

  /**
   * Optional callback when detail shows
   **/
  onRowDetail?: (id: number) => void;

  /**
   * Categories for Articles filter
   **/
  categories?: Categories;

  /**
   * Tags for Articles filter
   **/
  tags?: Tags;
}

export interface useListItemsControlProps<T extends ItemBase> extends ListItemsBase<T> {
  initialOrderBy?: ListItemsSortOrder;
  initialSortBy?: keyof T;
  searchKeys: (keyof T)[];
  itemsPerPage?: number;
  onRowSelect?: (selected: ListItemsSelected) => void;
  onSelectAll?: (selected: ListItemsSelected) => void;
  categories?: Categories;
  tags?: Tags;
}

interface ViewBaseProps<T extends ItemBase> extends ListItemsInitialProps {
  rows: T[];
  selected: ListItemsSelected;
  onSelect: (id: number) => void;
  onDetail: (id: number) => void;
  onDelete: (id: number) => void;
  onDisable: (id: number) => void;
}

export interface TableViewProps<T extends ItemBase> extends ViewBaseProps<T> {
  columns: ListItemsTableColumn<T>[];
  onSelectAll: () => void;
  checkboxState: CheckboxState;
}

export type TilesViewProps<T extends ItemBase> = ViewBaseProps<T> & {};

export interface ListItemsFilterProps {
  categories: number[];
  tags: number[];
}
