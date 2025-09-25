import { useTheme } from '../../hooks';

const ThemeToggle = () => {
  const { mode, toggleMode } = useTheme();

  // TODO

  return (
    <div>
      <button type="button" onClick={toggleMode}>
        {mode}
      </button>
    </div>
  );
};

export default ThemeToggle;
