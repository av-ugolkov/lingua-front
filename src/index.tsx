import ReactDOM from 'react-dom/client';
import '@/index.css';

import { RouterProvider } from 'react-router-dom';
import { router } from './Router';
import NotificationContainer from './components/notification/container';

const root = document.getElementById('root');

ReactDOM.createRoot(root!).render(
  <>
    <NotificationContainer
      position='bottom'
      side='right'
      timeout={7000}
      max={5}
    />
    <RouterProvider router={router} />
  </>
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
