import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Words from '@/components/vocabulary/Words';
import { RequestMethod, AuthStore, useFetch } from '@/hooks/fetch/useFetch';
import SearchInput from '@/components/elements/SearchPanel/SearchInput';
import SortedPanel from '@/components/elements/SortAndOrder/SortedPanel';
import { SortWordTypes } from '@/models/Sorted';
import { useSortedStore } from '@/components/elements/SortAndOrder/useSortedStore';
import { useSearchStore } from '@/components/elements/SearchPanel/useSearchStore';

export default function Vocabulary() {
  const { id } = useParams();
  const [name, setName] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchStore = useSearchStore();
  const sortedStore = useSortedStore();
  const { funcFetch: fetchGetVocabulary } = useFetch(
    `/vocabulary`,
    RequestMethod.GET,
    AuthStore.USE
  );

  useEffect(() => {
    async function asyncFetchVocabulary() {
      if (id) {
        const response = await fetchGetVocabulary({
          queries: new Map([['id', id]]),
        });
        if (response.ok) {
          setName(response.data['name']);
        }
      }
      setLoading(false);
    }

    asyncFetchVocabulary();

    return () => {
      searchStore.setSearchValue('');
      sortedStore.setDefaultOrderType();
    };
  }, [id]);

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      <h2 className='pt-5 pb-2 text-2xl font-bold'>{name}</h2>
      <div className='flex justify-between'>
        <SearchInput />
        <SortedPanel
          sortedType={sortedStore.sort}
          sortedTypes={SortWordTypes}
          order={sortedStore.order}
          setSorted={sortedStore.setOrderType}
        />
      </div>
      <div className='py-5'>
        <Words />
      </div>
    </>
  );
}
