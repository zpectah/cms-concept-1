import { useTranslation } from 'react-i18next';
import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { ItemBase } from '@common';
import { TableViewProps } from '../types';
import { checkboxStateKeys } from '../enums';

const TableView = <T extends ItemBase>({
  name,
  columns,
  onSelectAll,
  checkboxState,
  rows = [],
  pathPrefix,
  selected = [],
  onSelect,
  onDetail,
  onDelete,
  onDisable,
  isLoading,
}: TableViewProps<T>) => {
  const { t } = useTranslation(['common', 'form']);

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table aria-label={`${name} list table`}>
        <TableHead>
          <TableRow>
            <TableCell width="100">
              <Checkbox
                onClick={onSelectAll}
                indeterminate={checkboxState === checkboxStateKeys.indeterminate}
                checked={checkboxState === checkboxStateKeys.checked}
              />
            </TableCell>

            {columns?.map((col) => (
              <TableCell key={String(col.value)} variant="head" align="right">
                {col.label ? col.label : t(`form:label.${String(col.value)}`)}
              </TableCell>
            ))}

            <TableCell align="right">&nbsp;</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Checkbox checked={selected.includes(row.id)} onClick={() => onSelect(row.id)} />
              </TableCell>

              {columns?.map((col) => {
                const rawValue = row[col.value as keyof T];
                const value = String(rawValue);

                return (
                  <TableCell variant="body" key={String(col.value)} align="right">
                    {col.isTitle ? (
                      <Typography variant="button" onClick={() => onDetail(row.id)} sx={{ cursor: 'pointer' }}>
                        {value}
                      </Typography>
                    ) : col?.renderValue ? (
                      col?.renderValue(row)
                    ) : (
                      value
                    )}
                  </TableCell>
                );
              })}

              <TableCell align="right">
                <Stack direction="row" gap={1} sx={{ display: 'inline-flex' }}>
                  <Button onClick={() => onDelete(row.id)} variant="outlined" color="error" size="small">
                    {t('button.delete')}
                  </Button>
                  <Button onClick={() => onDisable(row.id)} variant="outlined" color="warning" size="small">
                    {t('button.disable')}
                  </Button>
                  <Button onClick={() => onDetail(row.id)} variant="contained" color="secondary" size="small">
                    {t('button.detail')}
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableView;
