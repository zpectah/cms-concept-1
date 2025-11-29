import { createContext, useContext } from 'react';

interface CommentsManagerContextProps {
  detailId: number | 'new' | null;
  setDetailId: (id: number | 'new' | null) => void;
  replyTo: number | null;
  setReplyTo: (id: number | null) => void;
}

const CommentsManagerContextDefaults: CommentsManagerContextProps = {
  detailId: null,
  setDetailId: () => null,
  replyTo: null,
  setReplyTo: () => null,
};

export const CommentsManagerContext = createContext(CommentsManagerContextDefaults);

export const CommentsManagerContextProvider = CommentsManagerContext.Provider;
export const CommentsManagerContextConsumer = CommentsManagerContext.Consumer;

export const useCommentsManagerContext = () => useContext(CommentsManagerContext);
