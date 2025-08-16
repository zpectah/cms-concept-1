import AppProvider from './AppProvider';
import AppRouter from './AppRouter';
import { useAppInit } from './useAppInit';
import '../i18n';

const App = () => {
  useAppInit();

  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
};

export default App;
