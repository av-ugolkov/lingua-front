import { getFullAddr } from '@/config';
import getBrowserFingerprint from './get-browser-fingerprint';
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

export interface IRequestData {
  headers?: HeadersInit | undefined;
  body?: string | undefined;
  query?: IQueryType | undefined;
}

export type IQueryType = [string, any][];

export interface IResponseData {
  status: number;
  data: any;
  err: string | undefined;
  ok: boolean;
}

const emptyResponse: IResponseData = {
  status: 0,
  data: null,
  err: undefined,
  ok: false,
};

const fetchData = async (
  url: string,
  init: RequestInit,
  query?: IQueryType
): Promise<IResponseData> => {
  const fullUrl = new URL(getFullAddr(url));
  if (query && query.length > 0) {
    query.forEach((v) => {
      fullUrl.searchParams.append(v[0], v[1]);
    });
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
        data: dataJson.data,
        err: dataJson.msg,
        ok: resp.ok,
      };
    })
    .catch((error) => {
      return {
        status: 0,
        data: null,
        err: error,
        ok: false,
      };
    });
};

async function fetchFunc(
  url: string,
  method: RequestMethod,
  useAuth: AuthStore = AuthStore.NO,
  data?: IRequestData
) {
  const init: RequestInit = {
    method: method,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...data?.headers,
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
    return {
      ok: false,
      status: 0,
      data: null,
      err: error,
    };
  }
}

export default {
  get: (url: string, useAuth: AuthStore, data?: IRequestData) =>
    fetchFunc(url, RequestMethod.GET, useAuth, data),
  post: (url: string, useAuth: AuthStore, data?: IRequestData) =>
    fetchFunc(url, RequestMethod.POST, useAuth, data),
  put: (url: string, useAuth: AuthStore, data?: IRequestData) =>
    fetchFunc(url, RequestMethod.PUT, useAuth, data),
  patch: (url: string, useAuth: AuthStore, data?: IRequestData) =>
    fetchFunc(url, RequestMethod.PATCH, useAuth, data),
  delete: (url: string, useAuth: AuthStore, data?: IRequestData) =>
    fetchFunc(url, RequestMethod.DELETE, useAuth, data),
  emptyResponse,
};
