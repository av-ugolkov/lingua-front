import { useNavigate } from 'react-router-dom';

export default function HeaderBtn({
  name,
  url,
}: {
  name: string;
  url: string;
}) {
  const navigate = useNavigate();

  return (
    <button
      className='mx-1 hover:shadow-sm hover:duration-200 hover:shadow-blue-400 duration-1000 text-gray-600 font-bold py-1 px-3'
      onClick={() => navigate(url)}>
      {name}
    </button>
  );
}
