import { useTranslation } from 'react-i18next';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Stack } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButtonPlus, Search } from '../../../components';
import { muiCommonColorVariantKeys } from '../../../enums';
import { useBlacklist } from './useBlacklist';

const BlacklistTable = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { rows, rawRows, onRowDelete, onRowToggle, query, setQuery } = useBlacklist();

  return (
    <Stack gap={2}>
      <Search
        fullWidth
        placeholder={t('modules:settings.tabs.blacklist.section.table.placeholder.search')}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        endAdornment={
          query.length > 0 && (
            <IconButtonPlus onClick={() => setQuery('')}>
              <ClearIcon fontSize="small" />
            </IconButtonPlus>
          )
        }
        disabled={rawRows.length === 0}
      />

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width="auto">{t('modules:settings.tabs.blacklist.section.table.label.email')}</TableCell>
              <TableCell width="auto">{t('modules:settings.tabs.blacklist.section.table.label.ipaddress')}</TableCell>
              <TableCell width="20%">{t('modules:settings.tabs.blacklist.section.table.label.created')}</TableCell>
              <TableCell width="20%" align="right">
                {t('modules:settings.tabs.blacklist.section.table.label.action')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.email}
                </TableCell>
                <TableCell component="th">{row.ipaddress}</TableCell>
                <TableCell>{row.created}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" gap={1} sx={{ display: 'inline-flex' }}>
                    <IconButtonPlus
                      size="small"
                      color={muiCommonColorVariantKeys.error}
                      onClick={() => onRowDelete(row.id)}
                      tooltip={t('button.delete')}
                    >
                      <DeleteIcon fontSize="inherit" />
                    </IconButtonPlus>
                    <IconButtonPlus
                      size="small"
                      color={muiCommonColorVariantKeys.warning}
                      onClick={() => onRowToggle(row.id)}
                      tooltip={t('button.disable')}
                    >
                      {row.active ? <VisibilityOffIcon fontSize="inherit" /> : <VisibilityIcon fontSize="inherit" />}
                    </IconButtonPlus>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default BlacklistTable;
