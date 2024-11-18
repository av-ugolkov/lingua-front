import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';

import '@/index.css';
import '@/styles/globals.css';

import { router } from '@/Router';
import { store } from '@/redux/store/store';
import ToastContainer from '@/components/toast/container';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = document.getElementById('root');

ReactDOM.createRoot(root!).render(
  <Provider store={store}>
    <ToastContainer
      position='bottom'
      side='right'
      timeout={7000}
      max={5}
    />
    <GoogleOAuthProvider clientId='607353670047-2pkmqt96sh34v1btffb776h3im4ftb0q.apps.googleusercontent.com'>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </Provider>
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
