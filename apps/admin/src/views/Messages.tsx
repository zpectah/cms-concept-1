import { Outlet } from 'react-router-dom';
import { ViewLayout } from '../components';
import { useUserActions } from '../hooks';

const MessagesView = () => {
  const { messages } = useUserActions();

  if (!messages.view) return;

  return <ViewLayout id="messages-view" type="list" children={<Outlet />} />;
};

export default MessagesView;
