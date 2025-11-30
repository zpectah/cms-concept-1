import { useTranslation } from 'react-i18next';
import { newItemKey, Comments, CommentsContentType } from '@common';
import { useCommentsQuery } from '../../../../hooks-query';
import { useUserActions } from '../../../../hooks';
import { useAppStore } from '../../../../store';
import { TOAST_SUCCESS_TIMEOUT_DEFAULT } from '../../../../constants';
import { CommentsListItemProps } from '../types';
import { useCommentsManagerContext } from '../CommentsManager.context';

interface UseCommentsListProps {
  rawComments: Comments;
  contentType: CommentsContentType;
  contentId: number;
}

export const useCommentsList = ({ rawComments, contentType, contentId }: UseCommentsListProps) => {
  const { t } = useTranslation(['common']);
  const { setDetailId, setReplyTo } = useCommentsManagerContext();
  const { commentsQuery, commentsToggleMutation, commentsDeleteMutation } = useCommentsQuery({
    contentType,
    contentId,
  });
  const { comments: modelActions } = useUserActions();
  const { addToast, openConfirmDialog } = useAppStore();

  const { refetch, isLoading } = commentsQuery;
  const { mutate: onToggle } = commentsToggleMutation;
  const { mutate: onDelete } = commentsDeleteMutation;

  const replyHandler = (parent: number) => {
    setDetailId(newItemKey);
    setReplyTo(parent);
  };

  const detailHandler = (id: number | typeof newItemKey) => {
    setDetailId(id);
    setReplyTo(null);
  };

  const onError = (err: unknown) => {
    addToast(t('message.error.common'), 'error');
    console.warn(err);
  };

  const toggleSelectedHandler = (ids: number[]) => {
    if (!modelActions.modify) return;
    if (!ids || ids.length === 0) return;

    onToggle(ids, {
      onSuccess: (res) => {
        addToast(
          ids.length === 1 ? t('message.success.updateRow') : t('message.success.updateSelected'),
          'success',
          TOAST_SUCCESS_TIMEOUT_DEFAULT
        );
        refetch();
      },
      onError,
    });
  };

  const deleteConfirmSelectedHandler = (ids: number[]) => {
    onDelete(ids, {
      onSuccess: (res) => {
        addToast(
          ids.length === 1 ? t('message.success.deleteRow') : t('message.success.deleteSelected'),
          'success',
          TOAST_SUCCESS_TIMEOUT_DEFAULT
        );
        refetch();
      },
      onError,
    });
  };

  const deleteSelectedHandler = (ids: number[]) => {
    if (!modelActions.delete) return;
    if (!ids || ids.length === 0) return;

    openConfirmDialog({
      title: t('message.confirm.deleteRow.title'),
      content: t('message.confirm.deleteRow.content'),
      onConfirm: () => deleteConfirmSelectedHandler?.(ids),
    });
  };

  const getSortedComments = () => {
    const commentMap = new Map<number, CommentsListItemProps>();
    const rootComments: CommentsListItemProps[] = [];

    rawComments.forEach((comment) => {
      const formattedItem: CommentsListItemProps = {
        ...comment,
        onReply: replyHandler,
        onDetail: detailHandler,
        onToggle: (id) => toggleSelectedHandler([id]),
        onDelete: (id) => deleteSelectedHandler([id]),
        children: [],
      };
      commentMap.set(comment.id, formattedItem);
    });

    commentMap.forEach((comment) => {
      const parentId = comment.parent;

      if (parentId !== 0) {
        const parentComment = commentMap.get(parentId);

        if (parentComment) {
          parentComment.children?.push(comment);
        } else {
          rootComments.push(comment);
        }
      } else {
        rootComments.push(comment);
      }
    });

    rootComments.sort((a, b) => a.id - b.id);

    return rootComments;
  };

  return {
    formattedComments: getSortedComments(),
    onReply: replyHandler,
    onDetail: detailHandler,
    onToggle: (id: number) => toggleSelectedHandler([id]),
    onDelete: (id: number) => deleteSelectedHandler([id]),
    isLoading,
  };
};
