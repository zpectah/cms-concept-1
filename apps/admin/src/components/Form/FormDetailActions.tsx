import { newItemKey, WithChildren } from '@common';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { LinkButton, SecondaryButton, SubmitButton } from '../Button';

type FormDetailActionsProps = Partial<WithChildren> & {
  detailId?: string;
  listPath: string;
};

const FormDetailActions = ({ children, detailId, listPath }: FormDetailActionsProps) => {
  const { t } = useTranslation();
  const form = useForm();

  return (
    <>
      <SubmitButton>{detailId === newItemKey ? t('button.create') : t('button.update')}</SubmitButton>
      <SecondaryButton size="large" onClick={() => form.reset()}>
        {t('button.reset')}
      </SecondaryButton>
      <LinkButton size="large" to={listPath}>
        {t('button.cancel')}
      </LinkButton>
      {children}
    </>
  );
};

export default FormDetailActions;
