import { createBrowserRouter } from 'react-router-dom';

import Main from '@/pages/Main';
import About from '@/pages/About';
import SignUp from '@/pages/SignUp';
import SignIn from '@/pages/SignIn';
import Contact from '@/pages/Contact';
import Vocabularies from '@/pages/Vocabularies';
import Root from '@/layouts/Root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/vocabularies',
        element: <Vocabularies />,
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
