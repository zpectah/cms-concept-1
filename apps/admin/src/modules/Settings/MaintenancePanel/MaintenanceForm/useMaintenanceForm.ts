import { useState } from 'react';
import { useMaintenanceQuery } from '../../../../hooks-query';
import { MaintenanceAnalyzeResults } from '../../../../types';

export const useMaintenanceForm = () => {
  const [analyzedResults, setAnalyzedResults] = useState<MaintenanceAnalyzeResults | null>(null);

  const { analyzeModelItemsMutation, deletePermanentModelItemsMutation } = useMaintenanceQuery();

  const { mutate: onAnalyzeModel } = analyzeModelItemsMutation;
  const { mutate: onProceedModel } = deletePermanentModelItemsMutation;

  const onAnalyze = () => {
    onAnalyzeModel(
      {},
      {
        onSuccess: (res) => {
          // TODO: results
          console.log('res', res);

          setAnalyzedResults(res);
        },
        onError: (err) => {
          console.warn(err);
        },
      }
    );
  };

  const onProceed = () => {
    if (!analyzedResults) return;

    onProceedModel(analyzedResults, {
      onSuccess: (res) => {
        // TODO: results
        console.log('res', res);

        setAnalyzedResults(null);
      },
      onError: (err) => {
        console.warn(err);
      },
    });
  };

  return {
    onAnalyze,
    onProceed,
    analyzedResults,
  };
};
