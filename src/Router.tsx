import { createBrowserRouter } from 'react-router-dom';

import Root from '@/layouts/Root';
import Main from '@/pages/main';
import About from '@/pages/about';
import SignUp from '@/pages/SignUp';
import SignIn from '@/pages/SignIn';
import Contact from '@/pages/contact';
import AccountVocabularies from '@/pages/account/vocabularies';
import Vocabulary from '@/pages/vocabulary';
import Vocabularies from '@/pages/vocabularies';
import Users from './pages/users';
import AccountNotifications from "@/pages/account/notifications";

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
]);
