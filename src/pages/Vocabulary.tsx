import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Words from '@/components/vocabulary/Words';
import { RequestMethod, AuthStore, useFetch } from '@/hooks/fetch/useFetch';
import SearchInput from '@/components/elements/SearchInput';
import SortedPanel from '@/components/elements/SortedPanel';
import { SortWordTypes } from '@/models/Sorted';
import { useSortedWordsStore } from '@/hooks/stores/useSortedWordsStore';
import { useSearchWordStore } from '@/hooks/stores/useSearchWordStore';

export default function Vocabulary() {
  const { id } = useParams();
  const [name, setName] = useState(false);
  const [loading, setLoading] = useState(true);
  const searchWordStore = useSearchWordStore();
  const sortedWordsStore = useSortedWordsStore();
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
  }, [id]);

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      <h2 className='pt-5 pb-2 text-2xl font-bold'>{name}</h2>
      <div className='flex justify-between'>
        <SearchInput
          searchValue={searchWordStore.searchWord}
          onChange={searchWordStore.setSearchWord}
        />
        <SortedPanel
          sortedType={sortedWordsStore.sort}
          sortedTypes={SortWordTypes}
          order={sortedWordsStore.order}
          setSorted={sortedWordsStore.setOrderType}
        />
      </div>
      <div className='py-5'>
        <Words />
      </div>
    </>
  );
}
