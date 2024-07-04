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

export function useFetchWithToken(url: string, method: RequestMethod) {
  const authStore = useAuthStore();

  const funcFetch = async function asyncFetchData({
    body,
    queries,
  }: {
    body?: string;
    queries?: Map<string, string>;
  }): Promise<IResponseData> {
    if (authStore.getAccessToken() === '') {
      const respToken = await refreshToken();
      if (respToken.ok) {
        authStore.setAccessToken(respToken.data);
      } else {
        return {
          ok: respToken.ok,
          status: respToken.status,
          data: respToken.data,
        };
      }
    }
    const token = authStore.getAccessToken();
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload['exp'];
    const dateNow = Date.now();

    if (dateNow > exp * 1000) {
      const respToken = await refreshToken();
      if (respToken.ok) {
        authStore.setAccessToken(respToken.data);
      } else {
        return {
          ok: respToken.ok,
          status: respToken.status,
          data: respToken.data,
        };
      }
    }
    const init: RequestInit = {
      method: method.toString(),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: body,
    };
    try {
      const respData = await fetchData(url, init, queries);
      return respData;
    } catch (error: any) {
      return { ok: false, status: 0, data: error };
    }
  };

  return { funcFetch };
}
