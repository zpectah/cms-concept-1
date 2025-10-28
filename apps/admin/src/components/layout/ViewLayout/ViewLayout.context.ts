import { createContext, ReactNode, useContext } from 'react';

interface IViewLayoutContext {
  setTitle: (title: string | undefined) => void;
  setTitleAction: (action: ReactNode | undefined) => void;
}

const ViewLayoutContext = createContext<IViewLayoutContext>({
  setTitle: () => null,
  setTitleAction: () => null,
});

const ViewLayoutContextProvider = ViewLayoutContext.Provider;
const ViewLayoutContextConsumer = ViewLayoutContext.Consumer;

const useViewLayoutContext = () => useContext<IViewLayoutContext>(ViewLayoutContext);

export { ViewLayoutContext, ViewLayoutContextProvider, ViewLayoutContextConsumer, useViewLayoutContext };
