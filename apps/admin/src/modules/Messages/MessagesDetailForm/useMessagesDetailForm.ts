import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { modelKeys, newItemKey, MessagesDetail } from '@common';
import { getConfig } from '../../../utils';
import { useSelectOptions } from '../../../helpers';
import { useAppStore } from '../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../constants';
import { useViewLayoutContext } from '../../../components';
import { useMessagesQuery } from '../../../hooks-query';
import { useModelFavorites } from '../../../hooks';
import { MessagesDetailFormSchema } from './schema';
import { IMessagesDetailForm } from './types';
import { getMessagesDetailFormDefaultValues, getMessagesTypeDefaultValue } from './helpers';

export const useMessagesDetailForm = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    admin: { routes },
  } = getConfig();
  const { addToast } = useAppStore();
  const { setTitle, openConfirmDialog } = useViewLayoutContext();
  const { messagesDetailQuery, messagesPatchQuery } = useMessagesQuery(id);
  const { getTypeFieldOptions } = useSelectOptions();
  const { removeItemFromFavorites } = useModelFavorites(modelKeys.messages);
  const form = useForm<IMessagesDetailForm>({
    resolver: zodResolver(MessagesDetailFormSchema),
    defaultValues: getMessagesDetailFormDefaultValues(),
  });

  const { data: detailData, ...detailQuery } = messagesDetailQuery;
  const { mutate: patchMutate } = messagesPatchQuery;

  const createHandler = (master: IMessagesDetailForm) => {
    // TODO #submit

    console.log('master create', master);
  };

  const patchHandler = (master: IMessagesDetailForm) => {
    patchMutate(master as MessagesDetail, {
      onSuccess: () => {
        navigate(`/${routes.messages.path}`);
        addToast(t('message.success.updateDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        console.info('onSuccess', master);
      },
      onError: () => {
        addToast(t('message.error.common'), 'error');
        console.info('onError', master);
      },
    });
  };

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

  const readHandler = (ids: number[]) => {
    // TODO
    console.log('Marked as read', ids);
    navigate(`/${routes.messages.path}`);
    addToast(t('message.success.updateDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
  };

  useEffect(() => {
    if (id) {
      if (id === newItemKey) {
        setTitle(t('button.new.messages'));
        form.reset(getMessagesDetailFormDefaultValues());
      } else if (detailData) {
        if (form.formState.isDirty) return;

        setTitle(detailData.name);
        form.reset(detailData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailData, form]);

  return {
    form,
    typeFieldOptions: getTypeFieldOptions(modelKeys.messages),
    typeFieldDefault: getMessagesTypeDefaultValue(),
    onSubmit: form.handleSubmit(submitHandler),
    onRead: readHandler,
    detailData,
    detailQuery,
    detailId: id,
  };
};
