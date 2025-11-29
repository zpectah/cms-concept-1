import { Comments } from '@common';
import { CommentsListItemProps } from '../types';

export const useCommentsList = (
  rawComments: Comments,
  onReply: (parent: number) => void,
  onDetail: (id: number) => void
) => {
  const commentMap = new Map<number, CommentsListItemProps>();
  const rootComments: CommentsListItemProps[] = [];

  rawComments.forEach((comment) => {
    const formattedItem: CommentsListItemProps = {
      ...comment,
      onReply: onReply,
      onDetail: onDetail,
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

  return {
    formattedComments: rootComments,
  };
};
