import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppStore } from '../../../store';
import { FEEDBACK_COMMON_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext, useFileUploader } from '../../../components';
import { useAttachmentsHelpers } from '../../../helpers';
import { FileUploaderQueue } from '../../../types';
import { useAttachmentsQuery } from '../../../hooks-query';
import { registeredFormFields } from '../../../enums';
import { IAttachmentsCreateForm } from './types';
import { AttachmentsCreateFormSchema } from './schema';
import { getAttachmentsCreateFormDefaultValues } from './helpers';

export const useAttachmentsCreateForm = () => {
  const { t } = useTranslation(['common', 'form']);
  const { setTitle } = useViewLayoutContext();
  const { addToast } = useAppStore();
  const { queue, inputElement, onInputChange, onQueueClear } = useFileUploader({});
  const { attachmentsQuery } = useAttachmentsQuery();
  const { checkQueueDuplicities, isValidFileSize } = useAttachmentsHelpers();
  const form = useForm<IAttachmentsCreateForm>({
    defaultValues: getAttachmentsCreateFormDefaultValues(),
    resolver: zodResolver(AttachmentsCreateFormSchema),
  });
  const queueFieldArray = useFieldArray({ control: form.control, name: registeredFormFields.queue });

  const { data: attachments } = attachmentsQuery;

  const submitHandler: SubmitHandler<IAttachmentsCreateForm> = (data) => {
    const master = Object.assign({
      queue: data.queue,
      options: data.options,
    });

    if (!attachments) return;

    const { duplicities } = checkQueueDuplicities(data.queue as FileUploaderQueue, attachments);

    if (duplicities) {
      duplicities.forEach((index) => {
        form.setError(`${registeredFormFields.queue}.${index}.${registeredFormFields.name}`, {
          message: t('form:message.error.duplicityName'),
        });
      });

      return;
    }

    console.log('master create', master);

    // TODO #submit
    // 1. First request - create file on disk
    // 2. Second request (by first response) save data to DB
    // TODO: Reset field as callback
    form.resetField(registeredFormFields.queue);
  };

  useEffect(() => {
    if (queue.length > 0) {
      queue.forEach((item, index) => {
        if (!isValidFileSize(item.size)) {
          addToast(t('message.error.maxFileSize'), 'warning', FEEDBACK_COMMON_TIMEOUT_DEFAULT);
        } else if (item.type === 'unsupported') {
          addToast(
            t('message.error.unsupportedFileExt', { value: item.extension }),
            'warning',
            FEEDBACK_COMMON_TIMEOUT_DEFAULT
          );
        } else if (item.type === 'unknown') {
          addToast(
            t('message.error.unknownFileExt', { value: item.extension }),
            'warning',
            FEEDBACK_COMMON_TIMEOUT_DEFAULT
          );
        } else {
          queueFieldArray.insert(index, item);
        }
      });

      onQueueClear();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue, queueFieldArray]);

  useEffect(() => {
    setTitle(t('button.new.attachments'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
