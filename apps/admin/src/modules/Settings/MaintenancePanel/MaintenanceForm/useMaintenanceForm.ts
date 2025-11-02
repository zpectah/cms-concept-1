import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMaintenanceQuery } from '../../../../hooks-query';
import { MaintenanceAnalyzeResults } from '../../../../types';
import { useAppStore } from '../../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../../constants';
import { getEnvironmentVariables } from '../../../../helpers';

export const useMaintenanceForm = () => {
  const [analyzedResults, setAnalyzedResults] = useState<MaintenanceAnalyzeResults | null>(null);

  const { t } = useTranslation(['common', 'modules']);
  const { addToast, openConfirmDialog } = useAppStore();
  const { analyzeModelItemsMutation, deletePermanentModelItemsMutation } = useMaintenanceQuery();
  const { uploadsPath } = getEnvironmentVariables();

  const { mutate: onAnalyzeModel } = analyzeModelItemsMutation;
  const { mutate: onProceedModel } = deletePermanentModelItemsMutation;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const onAnalyze = () => {
    onAnalyzeModel(
      {},
      {
        onSuccess: (res) => {
          setAnalyzedResults(res);
        },
        onError,
      }
    );
  };

  const onProceedConfirm = () => {
    if (!analyzedResults) return;

    onProceedModel(
      {
        results: analyzedResults,
        options: {
          uploadsPath,
        },
      },
      {
        onSuccess: (res) => {
          // TODO: results
          console.log('res', res);
          setAnalyzedResults(null);
          addToast('Data byla úspěšně vymazána...', 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        },
        onError,
      }
    );
  };

  const onProceed = () => {
    openConfirmDialog({
      title: 'Pokračovat?', // TODO
      content: 'Jste si jisti že chcete nenávratně smazat tyto položky?', // TODO
      onConfirm: onProceedConfirm,
    });
  };

  return {
    onAnalyze,
    onProceed,
    analyzedResults,
  };
};
