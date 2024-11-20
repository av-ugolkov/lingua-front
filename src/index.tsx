import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import '@/index.css';
import '@/styles/globals.css';

import { router } from '@/Router';
import { store } from '@/redux/store/store';
import ToastContainer from '@/components/toast/container';

const root = document.getElementById('root');

ReactDOM.createRoot(root!).render(
  <Provider store={store}>
    <ToastContainer
      position='bottom'
      side='right'
      timeout={7000}
      max={5}
    />
    <RouterProvider router={router} />
  </Provider>
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
