import { IResponseData, fetchData } from '@/scripts/fetch/fetchData';
import { refreshToken } from '@/scripts/middleware/refreshToken';
import { useAuthStore } from '@/hooks/stores/useAuthStore';

export function useGetFetchWithToken(url: string) {
  const authStore = useAuthStore();

  const funcGetFetch = async function asyncFetchData(
    queries?: Map<string, string>
  ): Promise<IResponseData> {
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
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const respData = await fetchData(url, init, queries);
      return respData;
    } catch (error: any) {
      return { ok: false, status: 0, data: error };
    }
  };

  return { funcGetFetch };
}

export function usePostFetchWithToken(url: string) {
  const authStore = useAuthStore();

  const funcPostFetch = async function asyncFetchData(
    body: any,
    queries?: Map<string, string>
  ): Promise<IResponseData> {
    if (authStore.accessToken === '') {
      const respToken = await refreshToken();
      if (respToken.ok) {
        authStore.setAccessToken(respToken.data);
      } else {
        return respToken;
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
        return respToken;
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
      return respData;
    } catch (error: any) {
      return { ok: false, status: 0, data: error };
    }
  };

  return { funcPostFetch };
}

export function useDeleteFetchWithToken(url: string) {
  const authStore = useAuthStore();

  const funcDeleteFetch = async function asyncFetchData(
    body: any,
    queries?: Map<string, string>
  ): Promise<IResponseData> {
    if (authStore.accessToken === '') {
      const respToken = await refreshToken();
      if (respToken.ok) {
        authStore.setAccessToken(respToken.data);
      } else {
        return respToken;
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
        return respToken;
      }
    }

    const init: RequestInit = {
      method: 'delete',
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

  return { funcDeleteFetch };
}
