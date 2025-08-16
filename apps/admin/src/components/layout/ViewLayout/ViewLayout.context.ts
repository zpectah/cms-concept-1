import { createContext, ReactNode, useContext } from 'react';
import { ConfirmDialogBaseProps } from '../../Dialog';

interface IViewLayoutContext {
  setTitle: (title: string | undefined) => void;
  setTitleAction: (action: ReactNode | undefined) => void;
  openConfirmDialog: (dialog: ConfirmDialogBaseProps) => void;
}

const ViewLayoutContext = createContext<IViewLayoutContext>({
  setTitle: () => null,
  setTitleAction: () => null,
  openConfirmDialog: () => null,
});

const ViewLayoutContextProvider = ViewLayoutContext.Provider;
const ViewLayoutContextConsumer = ViewLayoutContext.Consumer;

const useViewLayoutContext = () => useContext<IViewLayoutContext>(ViewLayoutContext);

export { ViewLayoutContext, ViewLayoutContextProvider, ViewLayoutContextConsumer, useViewLayoutContext };
