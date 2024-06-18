import ReactDOM from 'react-dom/client';
import '@/index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Main from '@/pages/main/Main';
import About from '@/pages/about/about';
import SignUp from '@/pages/sign_up/page';
import SignIn from '@/pages/sign_in/page';
import Contact from '@/pages/contact/contact';

const router = createBrowserRouter([
  {
    path: '/',
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
    path: '/sign_up',
    element: <SignUp />,
  },
  {
    path: '/sign_in',
    element: <SignIn />,
  },
]);

const root = document.getElementById('root');
ReactDOM.createRoot(root!).render(<RouterProvider router={router} />);
