import { ReactNode } from 'react';
import { ItemBase, Categories, Tags, Model } from '@common';
import { checkboxStateKeys, listItemsSortOrderKeys, listItemsViewKeys } from './enums';

export type ListItemsView = keyof typeof listItemsViewKeys;

export type ListItemsSortOrder = keyof typeof listItemsSortOrderKeys;

export type CheckboxState = keyof typeof checkboxStateKeys;

export type ListItemsSelected = number[];

interface ListItemsBase<T extends ItemBase> {
  items: T[];
}

interface ListItemsTableColumn<T extends ItemBase> {
  isTitle?: boolean;
  label?: string;
  renderValue?: (row: T) => ReactNode;
  value: keyof T;
}

interface ListItemsInitialProps {
  isLoading?: boolean;
  name: string;
  pathPrefix: string;
}

export interface ListItemsProps<T extends ItemBase> extends ListItemsBase<T>, ListItemsInitialProps {
  columns: ListItemsTableColumn<T>[];
  disableViewToggle?: boolean;
  initialView?: ListItemsView;
  itemsPerPage?: number;
  model: Model;
  orderKeys: (keyof T)[];
  searchKeys: (keyof T)[];

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
  categories?: Categories;
  initialView?: ListItemsView;
  model: Model;
  onRowSelect?: (selected: ListItemsSelected) => void;
  onSelectAll?: (selected: ListItemsSelected) => void;
  searchKeys: (keyof T)[];
  tags?: Tags;
}

interface ViewBaseProps<T extends ItemBase> extends ListItemsInitialProps {
  onDelete: (id: number) => void;
  onDetail: (id: number) => void;
  onDisable: (id: number) => void;
  onSelect: (id: number) => void;
  rows: T[];
  selected: ListItemsSelected;
}

export interface TableViewProps<T extends ItemBase> extends ViewBaseProps<T> {
  checkboxState: CheckboxState;
  columns: ListItemsTableColumn<T>[];
  model: Model;
  onSelectAll: () => void;
}

export interface TilesViewProps<T extends ItemBase> extends ViewBaseProps<T> {
  model: Model;
}

export interface ListItemsFilter {
  categories: number[];
  tags: number[];
  types: string[];
}

export interface ListItemsPagination {
  disabledButton: {
    first: boolean;
    prev: boolean;
    next: boolean;
    last: boolean;
  };
  onPageChange: (page: number) => void;
  onPageFirst: () => void;
  onPageLast: () => void;
  onPageNext: () => void;
  onPagePrev: () => void;
  onPerPageChange: (perPage: number) => void;
  page: number;
  pages: number;
  perPage: number;
}

export interface ListItemsControlsProps<T extends ItemBase> {
  categories: Categories;
  disableViewToggle?: boolean;
  isCategories: boolean;
  isTags: boolean;
  model: Model;
  onCategoryToggle: (id: number) => void;
  onDeleteSelected: () => void;
  onDeselectedSelected: () => void;
  onDisableSelected: () => void;
  onFilterReset: () => void;
  onOrderBy: (key: keyof T) => void;
  onPerPageChange: (perPage: number) => void;
  onQueryChange: (query: string) => void;
  onSelectAll: () => void;
  onTagToggle: (id: number) => void;
  onTypeToggle: (type: string) => void;
  onViewToggle: () => void;
  orderBy?: ListItemsSortOrder;
  orderKeys: (keyof T)[];
  perPage: number;
  query: string;
  rawRows: T[];
  rowsOnPage: number;
  selected: ListItemsSelected;
  selectedFilter: ListItemsFilter;
  sortBy?: keyof T;
  tags: Tags;
  types: string[];
  view: ListItemsView;
}

export type ListItemsPaginationProps = ListItemsPagination & {};
