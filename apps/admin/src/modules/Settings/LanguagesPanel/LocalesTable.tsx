import { useTranslation } from 'react-i18next';
import { Button, Paper, Radio, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import { getConfig } from '../../../utils';

interface LocalesTableProps {
  onLocaleInstall: (locale: string) => void;
  onLocaleToggle: (locale: string) => void;
  onLocaleDefault: (locale: string) => void;
  isInstalling: boolean;
  isUpdating: boolean;
  isLocaleInstalled: (locale: string) => boolean | undefined;
  isLocaleActive: (locale: string) => boolean | undefined;
  isLocaleDefault: (locale: string) => boolean | undefined;
}

const LocalesTable = ({
  onLocaleInstall,
  onLocaleToggle,
  onLocaleDefault,
  isInstalling,
  isUpdating,
  isLocaleInstalled,
  isLocaleActive,
  isLocaleDefault,
}: LocalesTableProps) => {
  const { t } = useTranslation(['common', 'modules']);

  const { locales } = getConfig();

  const availableLocales = Object.keys(locales);

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t('modules:settings.tabs.language.section.table.language')}</TableCell>
            <TableCell>{t('modules:settings.tabs.language.section.table.installed')}</TableCell>
            <TableCell>{t('modules:settings.tabs.language.section.table.active')}</TableCell>
            <TableCell>{t('modules:settings.tabs.language.section.table.default')}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isUpdating && (
            <tr>
              <td>{t('label.loading')}</td>
            </tr>
          )}
          {availableLocales.map((locale) => {
            const isInstalled = isLocaleInstalled(locale);

            return (
              <TableRow key={locale} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component="th" scope="row" width="auto">
                  {(locales as Record<string, { label: string }>)[locale].label}
                </TableCell>
                <TableCell width="20%">
                  {isInstalled ? (
                    <CheckIcon fontSize="small" color="success" />
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => onLocaleInstall(locale)}
                      loading={isInstalling}
                    >
                      {t('modules:settings.tabs.language.section.button.install')}
                    </Button>
                  )}
                </TableCell>
                <TableCell width="20%">
                  <Radio
                    checked={isLocaleActive(locale)}
                    onClick={() => onLocaleToggle(locale)}
                    size="small"
                    disabled={!isInstalled}
                  />
                </TableCell>
                <TableCell width="20%">
                  <Radio
                    checked={isLocaleDefault(locale)}
                    onClick={() => onLocaleDefault(locale)}
                    size="small"
                    disabled={!isInstalled}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LocalesTable;
