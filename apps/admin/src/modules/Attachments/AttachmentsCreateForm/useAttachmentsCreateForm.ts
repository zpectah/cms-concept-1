import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useViewLayoutContext } from '../../../components';
import { IAttachmentsCreateForm } from './types';
import { useForm } from 'react-hook-form';

export const useAttachmentsCreateForm = () => {
  const { t } = useTranslation();
  const { setTitle } = useViewLayoutContext();
  const form = useForm<IAttachmentsCreateForm>({});

  useEffect(() => {
    setTitle(t('button.new.attachments'));
  }, []);

  return { form };
};
