import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  // TODO
  useEffect(() => {
    console.log('Check authorization here');
  }, []);

  return <Outlet />;
};

export default AuthLayout;
