import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, newItemKey, MessagesDetail, messagesTypeDefault } from '@common';
import { getConfig } from '../../../utils';
import { useSelectOptions } from '../../../helpers';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useMessagesQuery } from '../../../hooks-query';
import { useModelFavorites } from '../../../hooks';
import { MessagesDetailFormSchema } from './schema';
import { IMessagesDetailForm } from './types';
import { getMessagesDetailFormDefaultValues, getMessagesDetailFormMapper } from './helpers';

export const useMessagesDetailForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    admin: { routes },
  } = getConfig();
  const { addToast } = useAppStore();
  const { setTitle, openConfirmDialog } = useViewLayoutContext();
  const { messagesQuery, messagesDetailQuery, messagesPatchMutation, messagesCreateMutation } = useMessagesQuery({
    id,
  });
  const { getTypeFieldOptions } = useSelectOptions();
  const { removeItemFromFavorites } = useModelFavorites(modelKeys.messages);
  const form = useForm<IMessagesDetailForm>({
    resolver: zodResolver(MessagesDetailFormSchema),
    defaultValues: getMessagesDetailFormDefaultValues(),
  });

  const { refetch } = messagesQuery;
  const { data: detailData, ...detailQuery } = messagesDetailQuery;
  const { mutate: onCreate } = messagesCreateMutation;
  const { mutate: onPatch } = messagesPatchMutation;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const createHandler = (master: IMessagesDetailForm) =>
    onCreate(master as MessagesDetail, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        navigate(`/${routes.messages.path}`);
        addToast(t('message.success.createDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        refetch();
      },
      onError,
    });

  const patchHandler = (master: IMessagesDetailForm) =>
    onPatch(master as MessagesDetail, {
      onSuccess: (res) => {
        // TODO: result
        console.log('res', res);
        navigate(`/${routes.messages.path}`);
        addToast(t('message.success.updateDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        refetch();
      },
      onError,
    });

  const deleteConfirmHandler = () => {
    const master = Object.assign({
      ...detailData,
      deleted: true,
    });

    removeItemFromFavorites(master.id);
    patchHandler(master);
  };

  const submitHandler: SubmitHandler<IMessagesDetailForm> = (data) => {
    if (!data) return;

    if (data.deleted === true) {
      openConfirmDialog({
        title: t('message.confirm.deleteDetail.title'),
        content: t('message.confirm.deleteDetail.content'),
        onConfirm: deleteConfirmHandler,
      });

      return;
    }

    const master = Object.assign({
      ...data,
    });

    if (data.id === 0) {
      createHandler(master);
    } else {
      patchHandler(master);
    }
  };

  const readHandler = (id: number | string) => {
    if (id === '0') return;

    const values = form.getValues();
    const master = Object.assign({ ...values, read: true });

    patchHandler(master);
  };

  useEffect(() => {
    if (id) {
      if (id === newItemKey) {
        setTitle(t('button.new.messages'));
        form.reset(getMessagesDetailFormDefaultValues());
      } else if (detailData) {
        if (form.formState.isDirty) return;

        setTitle(detailData.name);
        form.reset(getMessagesDetailFormMapper(detailData));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailData, form]);

  return {
    form,
    typeFieldOptions: getTypeFieldOptions(modelKeys.messages),
    typeFieldDefault: messagesTypeDefault,
    onSubmit: form.handleSubmit(submitHandler),
    onRead: readHandler,
    detailData,
    detailQuery,
    detailId: id,
    isSubmitting: false,
  };
};
