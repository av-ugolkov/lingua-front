import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Words from '@/components/vocabulary/Words';
import { RequestMethod, AuthStore, useFetch } from '@/hooks/fetch/useFetch';
import SearchInput from '@/components/elements/SearchPanel/SearchInput';
import SortedPanel from '@/components/elements/SortAndOrder/SortedPanel';
import { SortWordTypes } from '@/models/Sorted';
import { useSortedStore } from '@/components/elements/SortAndOrder/useSortedStore';

export default function Vocabulary() {
  const { id } = useParams();
  const [name, setName] = useState(false);
  const sortedStore = useSortedStore();
  const { isLoading, response } = useFetch(
    `/vocabulary`,
    RequestMethod.GET,
    AuthStore.USE,
    { query: `id=${id}` }
  );

  useEffect(() => {
    if (response.ok) {
      setName(response.data['name']);
    }
    return () => {
      sortedStore.setDefaultOrderType();
    };
  }, [response, sortedStore]);

  if (isLoading) {
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
