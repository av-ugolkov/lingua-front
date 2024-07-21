import { IResponseData, fetchData } from '@/scripts/fetch/fetchData';
import { refreshToken } from '@/scripts/middleware/refreshToken';
import { useAuthStore } from '@/hooks/stores/useAuthStore';

export enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export enum AuthStore {
  USE = 'USE',
  NO = 'NO',
  OPTIONAL = 'OPTIONAL',
}

export function useFetch(
  url: string,
  method: RequestMethod,
  authStore: AuthStore = AuthStore.NO
) {
  const { getAccessToken, setAccessToken, clearAccessToken, isActiveToken } =
    useAuthStore();

  const funcFetch = async function asyncFetchData({
    body,
    queries,
  }: {
    body?: string;
    queries?: Map<string, string>;
  }): Promise<IResponseData> {
    const init: RequestInit = {
      method: method.toString(),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: body,
    };

    if (authStore !== AuthStore.NO) {
      let token = getAccessToken();
      if (token === '' || !isActiveToken()) {
        const respToken = await refreshToken();
        if (respToken.ok) {
          setAccessToken(respToken.data);
          token = respToken.data;
        } else {
          clearAccessToken();
          if (authStore == AuthStore.USE) {
            return respToken;
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
      const respData = await fetchData(url, init, queries);
      return respData;
    } catch (error: any) {
      return { ok: false, status: 0, data: error };
    }
  };

  return { funcFetch };
}
