import { Button, Stack, Table, TableContainer, TableBody, TableRow, TableCell, Typography } from '@mui/material';
import { Section } from '../../../../components';
import { useMaintenanceForm } from './useMaintenanceForm';
import { useTranslation } from 'react-i18next';

const MaintenanceForm = () => {
  const { t } = useTranslation(['common', 'modules']);
  const { onAnalyze, onProceed, analyzedResults, deletedResults, rowsToDelete, deletedRows } = useMaintenanceForm();

  return (
    <Section
      title={t('modules:settings.tabs.maintenance.section.title')}
      subtitle={t('modules:settings.tabs.maintenance.section.subtitle')}
      cardContent
    >
      <TableContainer>
        <Table sx={{ width: '100%' }}>
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography variant="button">
                  {t('modules:settings.tabs.maintenance.section.label.permanentDeletion')}
                </Typography>
              </TableCell>
              <TableCell width="auto">
                {analyzedResults &&
                  (rowsToDelete > 0
                    ? rowsToDelete
                    : t('modules:settings.tabs.maintenance.section.label.noItemsToDelete'))}
                {deletedResults &&
                  t('modules:settings.tabs.maintenance.section.label.itemsDeleted', { count: deletedRows })}
              </TableCell>
              <TableCell align="right" width="350px">
                <Stack direction="row" alignItems="center" justifyContent="end" gap={1}>
                  <Button variant="contained" color="primary" onClick={onAnalyze} size="small">
                    {t('modules:settings.tabs.maintenance.section.button.analyzeRows')}
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={onProceed}
                    disabled={rowsToDelete === 0}
                    size="small"
                  >
                    {t('modules:settings.tabs.maintenance.section.button.deleteAnalyzedRows')}
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Section>
  );
};

export default MaintenanceForm;
