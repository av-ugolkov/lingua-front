import { createBrowserRouter } from 'react-router-dom';

import Root from '@/layouts/Root';
import Main from '@/pages/main';
import About from '@/pages/about';
import SignUp from '@/pages/sign_up';
import SignIn from '@/pages/sign_in';
import Contact from '@/pages/contact';
import AccountVocabularies from '@/pages/account/vocabularies';
import Vocabulary from '@/pages/vocabulary';
import Vocabularies from '@/pages/vocabularies';
import Users from './pages/users';
import AccountNotifications from '@/pages/account/notifications';
import AccountSettings from './pages/account/settings';
import GoogleAuth from './pages/google_auth';
import { Dictionary } from './pages/dictionary';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Main />,
        // loader: async () => {
        //   const data = await mainLoading();
        //   return data;
        // },
      },
      {
        path: 'users',
        element: <Users />,
      },
      {
        path: 'vocabularies',
        element: <Vocabularies />,
      },
      {
        path: 'account/vocabularies',
        element: <AccountVocabularies />,
      },
      {
        path: 'account/notifications',
        element: <AccountNotifications />,
      },
      {
        path: 'account/settings',
        element: <AccountSettings />,
      },
      {
        path: 'vocabulary/:id',
        element: <Vocabulary />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'Dictionaries',
        element: <Dictionary />,
      },
      {
        path: '*',
        element: <Main />,
      },
    ],
  },
  {
    path: '/sign_up',
    element: <SignUp />,
  },
  {
    path: '/sign_in',
    element: <SignIn />,
  },
  {
    path: '/auth/google',
    element: <GoogleAuth />,
  },
]);
