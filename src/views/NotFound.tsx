import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div>
      <h1>Not Found</h1>
      <strong>404</strong>
      <Link to='/'>go back</Link>
    </div>
  );
}
