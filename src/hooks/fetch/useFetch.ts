import { useEffect, useState } from 'react';

import { emptyResponse, fetchData } from '@/scripts/fetch/fetchData';

export function useFetch(
  url: string,
  init: RequestInit,
  queries?: Map<string, string>
) {
  const [response, setResponse] = useState(emptyResponse);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    async function asyncfetchData() {
      try {
        const response = await fetchData(url, init, queries);
        setResponse(response);
      } catch (error: any) {
        setResponse({ ok: false, status: 0, data: error });
      } finally {
        setLoading(false);
      }
    }
    asyncfetchData();
  }, [url]);

  return { response, loading };
}
