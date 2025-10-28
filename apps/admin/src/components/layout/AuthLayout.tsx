import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { getConfig } from '../../utils';
import { useUserQuery } from '../../hooks-query';

const AuthLayout = () => {
  const {
    admin: { routes },
  } = getConfig();
  const navigate = useNavigate();
  const { userQuery } = useUserQuery();

  const { data: user, isLoading } = userQuery;

  useEffect(() => {
    if (!user?.active && !isLoading) {
      navigate(`/${routes.login.path}?reason=expired-session`);
    } else {
      // TODO: delete before deployment
      if (user?.user) console.log('session ok', user.user);
    }
  }, [user, isLoading]);

  return <Outlet />;
};

export default AuthLayout;
