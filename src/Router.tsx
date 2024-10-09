import { createBrowserRouter } from 'react-router-dom';

import Root from '@/layouts/Root';
import Main from '@/pages/main';
import About from '@/pages/About';
import SignUp from '@/pages/SignUp';
import SignIn from '@/pages/SignIn';
import Contact from '@/pages/Contact';
import AccountVocabularies from '@/pages/AccountVocabularies';
import Vocabulary from '@/pages/Vocabulary';
import Vocabularies from '@/pages/vocabularies';
import Users from './pages/users';

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
        path: 'vocabulary/:id',
        element: <Vocabulary />,
      },
      {
        path: '*',
        element: <Main />,
      },
    ],
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
    path: '/sign_up',
    element: <SignUp />,
  },
  {
    path: '/sign_in',
    element: <SignIn />,
  },
]);
