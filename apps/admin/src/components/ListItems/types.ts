import { ReactNode } from 'react';
import { ItemBase, Categories, Tags, Model } from '@common';
import { checkboxStateKeys, listItemsSortOrderKeys, listItemsViewKeys } from './enums';

export type ListItemsView = keyof typeof listItemsViewKeys;

export type ListItemsSortOrder = keyof typeof listItemsSortOrderKeys;

export type CheckboxState = keyof typeof checkboxStateKeys;

export type ListItemsSelected = number[];

interface ListItemsBase<T extends ItemBase> {
  items: T[];
  // initialView?: ListItemsView;
}

interface ListItemsTableColumn<T extends ItemBase> {
  value: keyof T;
  label?: string;
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
  model: Model;

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
  model: Model;
  searchKeys: (keyof T)[];
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

export interface ListItemsFilter {
  types: string[];
  categories: number[];
  tags: number[];
}

export interface ListItemsPagination {
  page: number;
  pages: number;
  onPageNext: () => void;
  onPagePrev: () => void;
  onPageFirst: () => void;
  onPageLast: () => void;
  disabledButton: {
    first: boolean;
    prev: boolean;
    next: boolean;
    last: boolean;
  };
  onPageChange: (page: number) => void;
  perPage: number;
  onPerPageChange: (perPage: number) => void;
}

export interface ListItemsControlsProps<T extends ItemBase> {
  model: Model;
  disableViewToggle?: boolean;
  view: ListItemsView;
  onViewToggle: () => void;
  rawRows: T[];
  selected: ListItemsSelected;
  query: string;
  onQueryChange: (query: string) => void;
  orderBy?: ListItemsSortOrder;
  onOrderBy: (key: keyof T) => void;
  sortBy?: keyof T;
  orderKeys: (keyof T)[];
  onDeselectedSelected: () => void;
  onDeleteSelected: () => void;
  onDisableSelected: () => void;
  isCategories: boolean;
  categories: Categories;
  onCategoryToggle: (id: number) => void;
  isTags: boolean;
  tags: Tags;
  onTagToggle: (id: number) => void;
  selectedFilter: ListItemsFilter;
  onSelectAll: () => void;
  perPage: number;
  onPerPageChange: (perPage: number) => void;
  types: string[];
  onTypeToggle: (type: string) => void;
  onFilterReset: () => void;
  filterDirty: boolean;
  rowsOnPage: number;
}

export type ListItemsPaginationProps = ListItemsPagination & {};
