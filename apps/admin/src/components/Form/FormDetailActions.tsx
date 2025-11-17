import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { newItemKey, WithChildren } from '@common';
import { ModelActions } from '../../types';
import { LinkButton, SecondaryButton, SubmitButton } from '../Button';

type FormDetailActionsProps = Partial<WithChildren> & {
  detailId?: string;
  listPath: string;
  disableActions?: boolean;
  disableResetButton?: boolean;
  modelActions: ModelActions;
};

const FormDetailActions = ({
  children,
  detailId,
  listPath,
  disableActions,
  disableResetButton,
  modelActions,
}: FormDetailActionsProps) => {
  const { t } = useTranslation();
  const form = useForm();

  return (
    <>
      {!disableActions && (
        <>
          {detailId === newItemKey ? (
            <SubmitButton disabled={!modelActions.create}>{t('button.create')}</SubmitButton>
          ) : (
            <SubmitButton disabled={!modelActions.modify}>{t('button.update')}</SubmitButton>
          )}
          {!disableResetButton && (
            <SecondaryButton size="large" onClick={() => form.reset()}>
              {t('button.reset')}
            </SecondaryButton>
          )}
        </>
      )}
      <LinkButton size="large" to={listPath}>
        {t('button.cancel')}
      </LinkButton>
      {children}
    </>
  );
};

export default FormDetailActions;
