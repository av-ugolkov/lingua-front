import { useEffect, useState } from 'react';

import api, {
  AuthStore,
  IRequestData,
  IResponseData,
  RequestMethod,
} from '@/scripts/api';

const useFetch = (
  url: string,
  method: RequestMethod,
  useAuth: AuthStore = AuthStore.NO,
  data?: IRequestData
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState<IResponseData>(api.emptyResponse);

  useEffect(() => {
    setIsLoading(true);

    const fetch = async function asyncFetchData() {
      try {
        switch (method) {
          case RequestMethod.GET:
            api.get(url, useAuth, { query: data?.query }).then((respData) => {
              setResponse(respData);
              setIsLoading(false);
            });
            break;
          case RequestMethod.POST:
            api
              .post(url, useAuth, {
                body: data?.body,
                query: data?.query,
              })
              .then((respData) => {
                setResponse(respData);
                setIsLoading(false);
              });
            break;
          case RequestMethod.PUT:
            api
              .put(url, useAuth, {
                body: data?.body,
                query: data?.query,
              })
              .then((respData) => {
                setResponse(respData);
                setIsLoading(false);
              });
            break;
          case RequestMethod.DELETE:
            api
              .delete(url, useAuth, {
                body: data?.body,
                query: data?.query,
              })
              .then((respData) => {
                setResponse(respData);
                setIsLoading(false);
              });
            break;
          default:
            throw new Error('Invalid method');
        }
      } catch (error: any) {
        setResponse({ ok: false, status: 0, data: error });
        setIsLoading(false);
      }
    };

    fetch();
  }, [url, method, useAuth, data?.body, data?.query]);

  return { isLoading, response };
};

export default useFetch;
