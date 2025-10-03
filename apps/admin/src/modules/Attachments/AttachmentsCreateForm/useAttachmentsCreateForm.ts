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
import { useUniqueAttachments } from '../../../helpers';
import { FileUploaderQueue } from '../../../types';
import { Attachments } from '@common';
import { useAttachmentsQuery } from '../../../hooks-query';
import { fileUploaderMaxFileSize } from '../../../constants/fileUploader';

export const useAttachmentsCreateForm = () => {
  const { t } = useTranslation();
  const { setTitle } = useViewLayoutContext();
  const { addToast } = useAppStore();
  const { queue, inputElement, onInputChange, onQueueClear } = useFileUploader({});
  const { attachmentsQuery } = useAttachmentsQuery();
  const { isAttributeUnique } = useUniqueAttachments();
  const form = useForm<IAttachmentsCreateForm>({
    defaultValues: getAttachmentsCreateFormDefaultValues(),
    resolver: zodResolver(AttachmentsCreateFormSchema),
  });
  const queueFieldArray = useFieldArray({ control: form.control, name: 'queue' });

  const { data: attachments } = attachmentsQuery;

  const isValidFileSize = (size: number) => size <= fileUploaderMaxFileSize;

  const checkValidQueue = (queue: FileUploaderQueue, attachments: Attachments) => {
    const duplicities: number[] = [];
    const seen = new Map<string, number>();

    queue.forEach((item, index) => {
      const { isUnique } = isAttributeUnique(attachments, 'file_name', `${item.name}.${item.extension}`);

      if (!isUnique) {
        duplicities.push(index);
      }
    });

    queue.forEach((item, index) => {
      const fileName = `${item.name}.${item.extension}`;
      if (seen.has(fileName)) {
        duplicities.push(index);
        duplicities.push(seen.get(fileName)!);
      } else {
        seen.set(fileName, index);
      }
    });

    if (duplicities.length > 0) {
      return { isValid: false, duplicities };
    }

    return { isValid: true };
  };

  const submitHandler: SubmitHandler<IAttachmentsCreateForm> = (data) => {
    const master = Object.assign({
      queue: data.queue,
      options: data.options,
    });

    if (!attachments) return;

    const { isValid, duplicities } = checkValidQueue(data.queue as FileUploaderQueue, attachments);

    if (!isValid && duplicities) {
      duplicities.forEach((index) => {
        form.setError(`queue.${index}.name`, { message: 'duplicity' });
      });

      return;
    }

    // TODO #submit

    // 1. First request - create file on disk

    // 2. Second request (by first response) save data to DB

    console.log('master create', master);

    // TODO: Reset field as callback
    form.resetField('queue');
  };

  useEffect(() => {
    if (queue.length > 0) {
      queue.forEach((item, index) => {
        const isSizeValid = isValidFileSize(item.size);

        if (!isSizeValid) {
          addToast(`Překročena maximální velikost souboru`, 'warning', FEEDBACK_COMMON_TIMEOUT_DEFAULT);
        } else if (item.type === 'unsupported') {
          addToast(`Unsupported file extension "${item.extension}"`, 'warning', FEEDBACK_COMMON_TIMEOUT_DEFAULT);
        } else if (item.type === 'unknown') {
          // Just in case
          addToast(`Unknown file extension "${item.extension}"`, 'warning', FEEDBACK_COMMON_TIMEOUT_DEFAULT);
        } else {
          queueFieldArray.insert(index, item);
        }
      });

      onQueueClear();
    }
  }, [queue, queueFieldArray]);

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
