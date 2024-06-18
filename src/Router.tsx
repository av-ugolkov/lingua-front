import { createBrowserRouter } from 'react-router-dom';

import Main from '@/pages/main/Main';
import About from '@/pages/about/about';
import SignUp from '@/pages/sign_up/page';
import SignIn from '@/pages/sign_in/page';
import Contact from '@/pages/contact/contact';
import Vocabularies from '@/pages/vocabularies/page';
import Root from '@/pages/Root';

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
