import { getAddr } from '@/config';
import getBrowserFingerprint from './get-browser-fingerprint';
import { IRequestData } from '@/hooks/fetch/useFetch';
import {
  deleteAccessToken,
  getAccessToken,
  isActiveToken,
  setAccessToken,
} from './AuthToken';
import { refreshToken } from './middleware/refreshToken';

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

export interface IResponseData {
  status: number;
  data: any;
  ok: boolean;
}

export const emptyResponse: IResponseData = {
  status: 0,
  data: null,
  ok: false,
};

export const fetchData = async (
  url: string,
  init: RequestInit,
  query?: string
): Promise<IResponseData> => {
  const fullUrl = new URL(getAddr() + url);
  if (query && query !== '') {
    fullUrl.search += query;
  }
  const finger = getBrowserFingerprint() || '';
  init.headers = {
    ...init.headers,
    Fingerprint: finger,
  };
  return fetch(fullUrl, init)
    .then(async (resp) => {
      const dataJson = await resp.json();
      return {
        status: resp.status,
        data: dataJson,
        ok: resp.ok,
      };
    })
    .catch((error) => {
      return {
        status: 0,
        data: error,
        ok: false,
      };
    });
};

function fetchFunc(
  url: string,
  method: RequestMethod,
  useAuth: AuthStore = AuthStore.NO
) {
  const fetchFunc = async function asyncFetchData(
    data?: IRequestData
  ): Promise<IResponseData> {
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
      const respData = await fetchData(url, init, data?.query);
      return respData;
    } catch (error: any) {
      return { ok: false, status: 0, data: error };
    }
  };

  return { fetchFunc };
}

export default {
  get: (url: string, useAuth: AuthStore) =>
    fetchFunc(url, RequestMethod.GET, useAuth),
  post: (url: string, useAuth: AuthStore) =>
    fetchFunc(url, RequestMethod.POST, useAuth),
  put: (url: string, useAuth: AuthStore) =>
    fetchFunc(url, RequestMethod.PUT, useAuth),
  patch: (url: string, useAuth: AuthStore) =>
    fetchFunc(url, RequestMethod.PATCH, useAuth),
  delete: (url: string, useAuth: AuthStore) =>
    fetchFunc(url, RequestMethod.DELETE, useAuth),
};
