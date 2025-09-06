import { useTheme } from '../../hooks';

const ThemeToggle = () => {
  const { mode, toggleMode } = useTheme();

  // TODO

  return (
    <button type="button" onClick={toggleMode}>
      {mode}
    </button>
  );
};

export default ThemeToggle;
