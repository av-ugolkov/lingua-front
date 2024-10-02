import { useEffect, useState } from 'react';

import {
  AuthStore,
  IResponseData,
  RequestMethod,
  emptyResponse,
  fetchData,
} from '@/scripts/api';
import { refreshToken } from '@/scripts/middleware/refreshToken';
import {
  deleteAccessToken,
  getAccessToken,
  isActiveToken,
  setAccessToken,
} from '@/scripts/AuthToken';

export interface IRequestData {
  body?: string | undefined;
  query?: string | undefined;
}

export default function useFetch(
  url: string,
  method: RequestMethod,
  useAuth: AuthStore = AuthStore.NO,
  data?: IRequestData
) {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState<IResponseData>(emptyResponse);

  useEffect(() => {
    setIsLoading(true);
    const fetch = async function asyncFetchData() {
      const init: RequestInit = {
        method: method,
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: data?.body,
      };

      if (useAuth !== AuthStore.NO) {
        let token = getAccessToken();
        if (token === '' || !isActiveToken()) {
          const respToken = await refreshToken();
          if (respToken.ok) {
            setAccessToken(respToken.data);
            token = respToken.data;
          } else {
            deleteAccessToken();
            if (useAuth == AuthStore.USE) {
              setResponse(respToken);
              setIsLoading(false);
            }
          }
        }

        if (isActiveToken()) {
          init.headers = {
            ...init.headers,
            Authorization: `Bearer ${token}`,
          };
        }
      }

      try {
        const respData = await fetchData(url, init, data?.query);
        setResponse(respData);
        setIsLoading(false);
      } catch (error: any) {
        setResponse({ ok: false, status: 0, data: error });
        setIsLoading(false);
      }
    };

    fetch();
  }, [url, method, useAuth, data?.body, data?.query]);

  return { isLoading, response };
}
