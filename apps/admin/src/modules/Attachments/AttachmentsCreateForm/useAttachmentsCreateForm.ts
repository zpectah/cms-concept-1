import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { getConfig } from '../../../utils';
import { useAppStore } from '../../../store';
import { FEEDBACK_COMMON_TIMEOUT_DEFAULT, TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
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
  const navigate = useNavigate();
  const {
    admin: { routes },
  } = getConfig();
  const { setTitle } = useViewLayoutContext();
  const { addToast } = useAppStore();
  const { queue, inputElement, onInputChange, onQueueClear } = useFileUploader({});
  const { attachmentsQuery, attachmentsCreateMutation } = useAttachmentsQuery({});
  const { checkQueueDuplicities, isValidFileSize } = useAttachmentsHelpers();
  const form = useForm<IAttachmentsCreateForm>({
    defaultValues: getAttachmentsCreateFormDefaultValues(),
    resolver: zodResolver(AttachmentsCreateFormSchema),
  });
  const queueFieldArray = useFieldArray({ control: form.control, name: registeredFormFields.queue });

  const { data: attachments } = attachmentsQuery;
  const { mutate: onCreate } = attachmentsCreateMutation;

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

    //
    // TODO: create files on disk first !!!
    addToast(t('message.success.filesCreated'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
    console.log('master create', master);
    //

    onCreate(master, {
      onSuccess: (res) => {
        // TODO: response
        navigate(`/${routes.attachments.path}`);
        addToast(t('message.success.itemsCreated'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        form.resetField(registeredFormFields.queue);
      },
      onError: (err) => {
        addToast(t('message.error.common'), 'error');
        console.warn(err);
      },
    });
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
    isSubmitting: false,
  };
};
