import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import SearchAndOrder from '@/components/vocabulary/SearchAndOrder';
import Words from '@/components/vocabulary/Words';
import { useGetFetchWithToken } from '@/hooks/fetch/useFetchWithToken';

export default function Vocabulary() {
  const { id } = useParams();
  const [name, setName] = useState(false);
  const [loading, setLoading] = useState(true);
  const { funcGetFetch: fetchVocabulary } =
    useGetFetchWithToken(`/account/vocabulary`);

  useEffect(() => {
    async function asyncFetchVocabulary() {
      const response = await fetchVocabulary(new Map([['id', id || '']]));
      if (response.ok) {
        setName(response.data['name']);
      }
      setLoading(false);
    }

    asyncFetchVocabulary();
  }, [id]);

  if (loading) {
    return <div></div>;
  }

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
