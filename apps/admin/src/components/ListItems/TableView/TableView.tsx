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
  Stack,
  SvgIconProps,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { ItemBase } from '@common';
import { TableViewProps } from '../types';
import { checkboxStateKeys } from '../enums';
import { IconButtonPlus, IconButtonPlusProps } from '../../Button';

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

  const getActions = (id: number, active?: boolean) => {
    const iconProps: SvgIconProps = {
      fontSize: 'inherit',
    };
    const buttonCommonProps: Partial<IconButtonPlusProps> = {
      size: 'small',
      color: 'inherit',
    };

    return [
      {
        ...buttonCommonProps,
        onClick: () => onDelete(id),
        tooltip: t('button.delete'),
        children: <DeleteIcon {...iconProps} />,
        hidden: false,
      },
      {
        ...buttonCommonProps,
        onClick: () => onDisable(id),
        tooltip: t('button.disable'),
        children: active ? <VisibilityOffIcon fontSize="inherit" /> : <VisibilityIcon fontSize="inherit" />,
        hidden: false,
      },
      {
        ...buttonCommonProps,
        onClick: () => onDetail(id),
        tooltip: t('button.detail'),
        children: <FileOpenIcon {...iconProps} />,
        hidden: false,
      },
    ] as (IconButtonPlusProps & { hidden: boolean })[];
  };

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
              <TableCell
                key={String(col.value)}
                variant="head"
                align={col.isTitle ? 'left' : 'right'}
                width={col.isTitle ? '100%' : 'auto'}
              >
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
                  <TableCell variant="body" key={String(col.value)} align={col.isTitle ? 'left' : 'right'}>
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
                  {getActions(row.id, row.active).map(
                    ({ hidden, ...button }, index) => !hidden && <IconButtonPlus key={index} {...button} />
                  )}
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
