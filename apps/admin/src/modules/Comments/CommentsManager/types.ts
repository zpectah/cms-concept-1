import { newItemKey, Comments, CommentsContentType, CommentsItem } from '@common';

export type CommentsListItemProps = CommentsItem & {
  onReply: (parent: number) => void;
  onDetail: (id: number | typeof newItemKey) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  children?: CommentsListItemProps[];
};

export interface CommentsListProps {
  comments: Comments;
  contentType: CommentsContentType;
  contentId: number;
}
