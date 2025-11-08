import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMaintenanceQuery } from '../../../../hooks-query';
import { MaintenanceAnalyzeResults, MaintenanceDeleteResults } from '../../../../types';
import { useAppStore } from '../../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../../constants';
import { getEnvironmentVariables } from '../../../../helpers';

export const useMaintenanceForm = () => {
  const [analyzedResults, setAnalyzedResults] = useState<MaintenanceAnalyzeResults | null>(null);
  const [deletedResults, setDeletedResults] = useState<MaintenanceDeleteResults | null>(null);
  const [rowsToDelete, setRowsToDelete] = useState<number>(0);
  const [deletedRows, setDeletedRows] = useState<number>(0);

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
    setAnalyzedResults(null);
    setRowsToDelete(0);

    onAnalyzeModel(
      {},
      {
        onSuccess: (res) => {
          let count = 0;
          count += res.articles.length;
          count += res.attachments.length;
          count += res.blacklist.length;
          count += res.categories.length;
          count += res.comments.length;
          count += res.members.length;
          count += res.menu.length;
          count += res.menuItems.length;
          count += res.messages.length;
          count += res.pages.length;
          count += res.requests.length;
          count += res.tags.length;
          count += res.translations.length;
          count += res.users.length;

          setAnalyzedResults(res);
          setRowsToDelete(count);
        },
        onError,
      }
    );
  };

  const onProceedConfirm = () => {
    if (!analyzedResults) return;

    setDeletedResults(null);

    onProceedModel(
      {
        results: analyzedResults,
        options: {
          uploadsPath,
        },
      },
      {
        onSuccess: (res) => {
          let count = 0;
          count += res.articles.rows;
          count += res.attachments.rows;
          count += res.blacklist.rows;
          count += res.categories.rows;
          count += res.comments.rows;
          count += res.members.rows;
          count += res.menu.rows;
          count += res.menuItems.rows;
          count += res.messages.rows;
          count += res.pages.rows;
          count += res.requests.rows;
          count += res.tags.rows;
          count += res.translations.rows;
          count += res.users.rows;

          setDeletedRows(count);
          setDeletedResults(res);
          setAnalyzedResults(null);
          addToast(
            t('modules:settings.tabs.maintenance.message.successDeleted'),
            'success',
            TOAST_SUCCESS_TIMEOUT_DEFAULT
          );
        },
        onError,
      }
    );
  };

  const onProceed = () => {
    openConfirmDialog({
      title: t('message.confirm.permanentDelete.title'),
      content: t('message.confirm.permanentDelete.content'),
      onConfirm: onProceedConfirm,
    });
  };

  return {
    onAnalyze,
    onProceed,
    analyzedResults,
    deletedResults,
    rowsToDelete,
    deletedRows,
  };
};
