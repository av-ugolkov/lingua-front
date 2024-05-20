import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './views/Home';
import About from './views/About';
import NotFound from './views/NotFound';

export default function App() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Outlet />}>
        <Route
          index
          element={<Home />}
        />
        <Route
          path='about'
          element={<About />}
        />
        <Route
          path='*'
          element={<NotFound />}
        />
      </Route>
    </Routes>
  );
}
