import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore } from '../../../store';
import { FEEDBACK_COMMON_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext, useFileUploader } from '../../../components';
import { IAttachmentsCreateForm } from './types';
import { AttachmentsCreateFormSchema } from './schema';
import { getAttachmentsCreateFormDefaultValues } from './helpers';

export const useAttachmentsCreateForm = () => {
  const { t } = useTranslation();
  const { setTitle } = useViewLayoutContext();
  const { addToast } = useAppStore();
  const { queue, inputElement, onInputChange, onQueueClear } = useFileUploader({});
  const form = useForm<IAttachmentsCreateForm>({
    defaultValues: getAttachmentsCreateFormDefaultValues(),
    resolver: zodResolver(AttachmentsCreateFormSchema),
  });
  const queueFieldArray = useFieldArray({ control: form.control, name: 'queue' });

  const submitHandler: SubmitHandler<IAttachmentsCreateForm> = (data) => {
    const master = Object.assign({
      ...data,
    });

    // TODO #submit

    // 1. First request - create file on disk

    // 2. Second request (by first response) save data to DB

    console.log('master create', master);

    // TODO: Reset field as callback
    form.resetField('queue');
  };

  useEffect(() => {
    if (queue.length > 0) {
      queue.forEach((item) => {
        // TODO: Check duplicity a) in queue, b) in attachments

        if (item.type === 'unsupported') {
          addToast(`Unsupported file extension "${item.extension}"`, 'warning', FEEDBACK_COMMON_TIMEOUT_DEFAULT);
        } else if (item.type === 'unknown') {
          // Just in case
          addToast(`Unknown file extension "${item.extension}"`, 'warning', FEEDBACK_COMMON_TIMEOUT_DEFAULT);
        } else {
          queueFieldArray.prepend(item);
        }
      });

      onQueueClear();
    }
  }, [queue]);

  useEffect(() => {
    setTitle(t('button.new.attachments'));
  }, []);

  return {
    form,
    queueFieldArray,
    onSubmit: form.handleSubmit(submitHandler),
    onReset: () => form.reset(getAttachmentsCreateFormDefaultValues()),

    inputElement,
    onInputChange,
  };
};
