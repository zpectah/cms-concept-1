import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  // TODO
  useEffect(() => {
    console.info('Check authorization here');
  }, []);

  return <Outlet />;
};

export default AuthLayout;
