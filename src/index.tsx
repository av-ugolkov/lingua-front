import ReactDOM from 'react-dom/client';
import '@/index.css';

import { RouterProvider } from 'react-router-dom';
import { router } from './Router';

const root = document.getElementById('root');
ReactDOM.createRoot(root!).render(<RouterProvider router={router} />);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}
