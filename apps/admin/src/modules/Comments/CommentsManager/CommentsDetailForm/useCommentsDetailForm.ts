import { useCallback, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';
import { newItemKey, CommentsContentType, CommentsDetail } from '@common';
import { useCommentsQuery, useUserQuery } from '../../../../hooks-query';
import { useUserActions } from '../../../../hooks';
import { useAppStore } from '../../../../store';
import { ICommentsItemDetailForm } from './types';
import { getCommentsDefaultValues, getCommentsDetailFormMapper, getCommentsDetailFormMapperToMaster } from './helpers';
import { CommentsItemDetailFormSchema } from './schema';
import { useCommentsManagerContext } from '../CommentsManager.context';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../../constants';

interface UseCommentsDetailFormProps {
  id: number | 'new'; // ID detailu komentáře
  parent: number;
  contentType: CommentsContentType;
  contentId: number;
}

export const useCommentsDetailForm = ({ id, parent, contentId, contentType }: UseCommentsDetailFormProps) => {
  const { t } = useTranslation(['common']);
  const { setDetailId } = useCommentsManagerContext();
  const { commentsQuery, commentsDetailQuery, commentsCreateMutation, commentsPatchMutation } = useCommentsQuery({
    id: String(id),
    contentId,
    contentType,
  });
  const { comments: modelActions } = useUserActions();
  const { addToast, openConfirmDialog } = useAppStore();
  const { userQuery } = useUserQuery();
  const form = useForm<ICommentsItemDetailForm>({
    defaultValues: getCommentsDefaultValues({
      sender: '', // TODO
      content_id: contentId, // TODO
      content_type: contentType, // TODO
      parent: parent, // TODO
    }),
    resolver: zodResolver(CommentsItemDetailFormSchema),
  });

  const { data } = userQuery;
  const { refetch } = commentsQuery;
  const { data: detailData, isLoading } = commentsDetailQuery;
  const { mutate: onCreate } = commentsCreateMutation;
  const { mutate: onPatch } = commentsPatchMutation;

  const user = data?.user;
  const sender = user?.email as string;

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const createHandler = (master: ICommentsItemDetailForm) => {
    if (!modelActions.create) return;

    onCreate(master as CommentsDetail, {
      onSuccess: (res) => {
        addToast(t('message.success.createDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        setDetailId(null);
        refetch();
      },
      onError,
    });
  };

  const patchHandler = (master: ICommentsItemDetailForm) => {
    if (!modelActions.modify) return;

    onPatch(master as CommentsDetail, {
      onSuccess: (res) => {
        addToast(t('message.success.updateDetail'), 'success', TOAST_SUCCESS_TIMEOUT_DEFAULT);
        setDetailId(null);
        refetch();
      },
      onError,
    });
  };

  const deleteConfirmHandler = () => {
    const master = Object.assign({
      ...detailData,
      deleted: true,
    });

    patchHandler(master);
  };

  const submitHandler: SubmitHandler<ICommentsItemDetailForm> = (data) => {
    if (!data) return;

    if (data.deleted === true) {
      if (!modelActions.delete) return;

      openConfirmDialog({
        title: t('message.confirm.deleteDetail.title'),
        content: t('message.confirm.deleteDetail.content'),
        onConfirm: deleteConfirmHandler,
      });

      return;
    }

    const master = getCommentsDetailFormMapperToMaster(data);

    if (data.id === 0) {
      createHandler(master);
    } else {
      patchHandler(master);
    }
  };

  const resetHandler = useCallback(() => {
    if (id === newItemKey) {
      form.reset(
        getCommentsDefaultValues({
          sender: sender, // TODO
          content_id: contentId, // TODO
          content_type: contentType, // TODO
          parent: parent, // TODO
        })
      );
    } else if (detailData) {
      form.reset(getCommentsDetailFormMapper(detailData));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, detailData, contentId, contentType, parent, sender]);

  useEffect(() => {
    if (id && !isLoading) resetHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isLoading]);

  return {
    form,
    onSubmit: form.handleSubmit(submitHandler),
    onReset: resetHandler,
    detailData,
    isSubmitting: false,
    isLoading,
  };
};
