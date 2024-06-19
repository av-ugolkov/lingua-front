import { useParams } from 'react-router-dom';

import SearchAndOrder from '@/components/vocabulary/SearchAndOrder';
import Words from '@/components/vocabulary/Words';

export default function Vocabulary() {
  const { name } = useParams<'name'>();
  return (
    <>
      <h2 className='pt-5 px-5 text-2xl font-bold'>{name}</h2>
      <div className='pt-5 px-5'>
        <SearchAndOrder />
      </div>
      <div className='px-2 py-5'>
        <Words />
      </div>
    </>
  );
}
