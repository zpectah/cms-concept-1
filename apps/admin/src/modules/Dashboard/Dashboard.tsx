import { ThemeToggle, useViewLayoutContext } from '../../components';
import { useEffect } from 'react';

const Dashboard = () => {
  const { setTitle } = useViewLayoutContext();

  useEffect(() => {
    setTitle('Dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      ...Dashboard page view...
      <div>
        <ThemeToggle />
      </div>
    </>
  );
};

export default Dashboard;
