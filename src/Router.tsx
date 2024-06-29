import { createBrowserRouter } from 'react-router-dom';

import Root from '@/layouts/Root';
import Main from '@/pages/Main';
import About from '@/pages/About';
import SignUp from '@/pages/SignUp';
import SignIn from '@/pages/SignIn';
import Contact from '@/pages/Contact';
import Vocabularies from '@/pages/Vocabularies';
import Vocabulary from './pages/Vocabulary';

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
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'vocabularies',
        element: <Vocabularies />,
      },
      {
        path: 'vocabulary/:name',
        element: <Vocabulary />,
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
