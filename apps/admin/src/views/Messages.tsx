import { Outlet } from 'react-router-dom';
import { ViewLayout } from '../components';

const MessagesView = () => <ViewLayout id="messages-view" type="list" children={<Outlet />} />;

export default MessagesView;
