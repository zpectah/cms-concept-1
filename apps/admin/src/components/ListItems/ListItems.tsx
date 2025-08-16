import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToggleButtonGroup, ToggleButton, Stack } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ItemBase } from '@common';
import { useViewLayoutContext } from '../layout';
import { Search } from '../input';
import { Card } from '../Card';
import { ListItemsProps } from './types';
import { listItemsSortOrderKeys, listItemsViewKeys } from './enums';
import { useListItemsControl } from './useListItemsControl';
import { LIST_ITEMS_PER_PAGE_OPTIONS } from './constants';
import { TableView } from './TableView';
import { TilesView } from './TilesView';

const ListItems = <T extends ItemBase>({
  name,
  initialView = listItemsViewKeys.table,
  isLoading, // TODO
  itemsPerPage,
  items = [],
  columns = [],
  searchKeys = [],
  orderKeys = [],
  onRowSelect,
  onDeleteSelected,
  onDisableSelected,
  onRowDelete,
  onRowDisable,
  onRowDetail,
  pathPrefix,
  disableViewToggle,
}: ListItemsProps<T>) => {
  const {
    rows,
    rawRows,
    query,
    onQueryChange,
    orderBy,
    onOrderBy,
    sortBy,
    view,
    onViewToggle,
    selected,
    checkboxState,
    onSelect,
    onSelectAll,
    onDeselect,
    pagination,
  } = useListItemsControl({
    items,
    initialView,
    searchKeys,
    itemsPerPage,
    onRowSelect,
  });
  const { openConfirmDialog } = useViewLayoutContext();
  const navigate = useNavigate();

  const { pages, page, onPageNext, onPagePrev, onPageFirst, onPageLast, disabledButton, perPage, onPerPageChange } =
    pagination;

  const deselectedSelectedHandler = () => onDeselect();

  const rowDisableHandler = (id: number) => onRowDisable?.(id);

  const rowDetailHandler = (id: number) => {
    onRowDetail?.(id);
    navigate(`${pathPrefix}/${id}`);
  };

  const disableSelectedHandler = useCallback(() => onDisableSelected?.(selected), [onDisableSelected, selected]);

  const deleteSelectedHandler = useCallback(() => {
    openConfirmDialog({
      title: 'Opravdu chcete smazat tyto položky?', // TODO #i18n
      content: 'Tyto vybrané položky budou smazány', // TODO #i18n
      onConfirm: () => onDeleteSelected?.(selected),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onDeleteSelected, selected]);

  const rowDeleteHandler = (id: number) => {
    openConfirmDialog({
      title: 'Opravdu chcete smazat tuto položku?', // TODO #i18n
      content: 'Tato položk abude natrvalo smazána', // TODO #i18n
      onConfirm: () => onRowDelete?.(id),
    });
  };

  return (
    <Stack gap={2}>
      <Card>
        {!disableViewToggle && (
          <Stack>
            <div>
              <button onClick={onViewToggle}>toggle view: {view}</button>
            </div>
          </Stack>
        )}
        <Stack>
          <Search value={query} onChange={(event) => onQueryChange(event.target.value)} fullWidth />
        </Stack>
        <Stack>
          <ToggleButtonGroup value={sortBy} size="small">
            {orderKeys?.map((key, index) => (
              <ToggleButton key={index} value={key} onClick={() => onOrderBy(key)}>
                &nbsp;{String(key)}&nbsp;
                {key === sortBy && (
                  <>
                    {orderBy === listItemsSortOrderKeys.asc ? (
                      <ArrowUpwardIcon fontSize="inherit" />
                    ) : (
                      <ArrowDownwardIcon fontSize="inherit" />
                    )}
                  </>
                )}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>
        <div>
          Selected {selected.length} of {rawRows.length} &nbsp;{' '}
          <button onClick={deselectedSelectedHandler} disabled={selected.length === 0}>
            deselect all
          </button>
          <button onClick={deleteSelectedHandler} disabled={selected.length === 0}>
            delete selected
          </button>
          <button onClick={disableSelectedHandler} disabled={selected.length === 0}>
            disable selected
          </button>
        </div>
        <Stack>
          <div>
            <button onClick={onPageFirst} disabled={disabledButton.first}>
              first
            </button>
            <button onClick={onPagePrev} disabled={disabledButton.prev}>
              prev
            </button>
            &nbsp;
            <button onClick={onPageNext} disabled={disabledButton.next}>
              next
            </button>
            <button onClick={onPageLast} disabled={disabledButton.last}>
              last
            </button>
          </div>
          <Stack>
            Page {page} of {pages}
          </Stack>
          <div>
            <select value={perPage} onChange={(event) => onPerPageChange(Number(event.target.value))}>
              {LIST_ITEMS_PER_PAGE_OPTIONS.map((item) => (
                <option key={item} value={item} label={String(item)} />
              ))}
            </select>
          </div>
        </Stack>
      </Card>

      <div>
        {view === listItemsViewKeys.table ? (
          <TableView
            name={name}
            pathPrefix={pathPrefix}
            rows={rows}
            selected={selected}
            onSelect={onSelect}
            onDetail={rowDetailHandler}
            onDelete={rowDeleteHandler}
            onDisable={rowDisableHandler}
            onSelectAll={onSelectAll}
            columns={columns}
            checkboxState={checkboxState}
            isLoading={isLoading}
          />
        ) : (
          <TilesView
            name={name}
            pathPrefix={pathPrefix}
            rows={rows}
            selected={selected}
            onSelect={onSelect}
            onDetail={rowDetailHandler}
            onDelete={rowDeleteHandler}
            onDisable={rowDisableHandler}
            isLoading={isLoading}
          />
        )}
      </div>
    </Stack>
  );
};

export default ListItems;
