import { useEffect } from 'react';
import { useViewLayoutContext, Content } from '../../components';

const Dashboard = () => {
  const { setTitle } = useViewLayoutContext();

  useEffect(() => {
    // TODO
    setTitle('Dashboard');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Content>
      ...Dashboard page view...
      <div>...</div>
      <div>
        <pre>
          <code>...TODO...</code>
        </pre>
      </div>
    </Content>
  );
};

export default Dashboard;
