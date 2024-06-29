import { useEffect, useState } from 'react';

import { emptyResponse, fetchData } from '@/scripts/fetch/fetchData';
import { refreshToken } from '@/scripts/middleware/refreshToken';
import { useAuthStore } from '@/hooks/stores/useAuthStore';

export function useGetFetchWithToken(
  url: string,
  queries?: Map<string, string>
) {
  const [response, setResponse] = useState(emptyResponse);
  const [loading, setLoading] = useState(true);
  const authStore = useAuthStore();

  useEffect(() => {
    setLoading(true);

    async function asyncFetchData() {
      if (authStore.getAccessToken() === '') {
        const respToken = await refreshToken();
        if (respToken.ok) {
          authStore.setAccessToken(respToken.data);
        } else {
          return;
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
          return;
        }
      }
      const init: RequestInit = {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const respData = await fetchData(url, init, queries);
        setResponse(respData);
      } catch (error: any) {
        setResponse({ ok: false, status: 0, data: error });
      } finally {
        setLoading(false);
      }
    }

    asyncFetchData();
  }, [url]);

  return { response, loading };
}

export function usePostFetchWithToken(
  url: string,
  body: any,
  queries?: Map<string, string>
) {
  const [response, setResponse] = useState(emptyResponse);
  const [loading, setLoading] = useState(true);
  const authStore = useAuthStore();

  useEffect(() => {
    setLoading(true);

    async function asyncFetchData() {
      if (authStore.accessToken === '') {
        const respToken = await refreshToken();
        if (respToken.ok) {
          authStore.setAccessToken(respToken.data);
        } else {
          return;
        }
      }

      const token = useAuthStore.getState().accessToken;
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload['exp'];
      const dateNow = Date.now();

      if (dateNow > exp * 1000) {
        const respToken = await refreshToken();
        if (respToken.ok) {
          authStore.setAccessToken(respToken.data);
        } else {
          return;
        }
      }
      const init: RequestInit = {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: body,
      };
      try {
        const respData = await fetchData(url, init, queries);
        setResponse(respData);
      } catch (error: any) {
        setResponse({ ok: false, status: 0, data: error });
      } finally {
        setLoading(false);
      }
    }
    asyncFetchData();
  }, [url]);

  return { response, loading };
}
