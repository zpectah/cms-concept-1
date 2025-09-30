import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, useFieldArray, SubmitHandler } from 'react-hook-form';
import { FileUploaderQueue } from '../../../types';
import { useViewLayoutContext } from '../../../components';
import { IAttachmentsCreateForm } from './types';

export const useAttachmentsCreateForm = () => {
  const { t } = useTranslation();
  const { setTitle } = useViewLayoutContext();
  const form = useForm<IAttachmentsCreateForm>({
    defaultValues: {
      queue: [],
      options: {
        path: '',
      },
    },
  });
  const queueFieldArray = useFieldArray({ control: form.control, name: 'queue' });

  const submitHandler: SubmitHandler<IAttachmentsCreateForm> = (data) => {
    const master = Object.assign({
      ...data,
    });

    // TODO #submit

    console.log('master create', master);
  };

  const queueUpdateHandler = (queue: FileUploaderQueue) => {
    console.log('on queue update ... write to model', queue);

    form.resetField('queue');
    queueFieldArray.insert(0, queue);
  };

  useEffect(() => {
    setTitle(t('button.new.attachments'));
  }, []);

  return {
    form,
    queueFieldArray,
    onSubmit: form.handleSubmit(submitHandler),
    onQueueUpdate: queueUpdateHandler,
  };
};
