import { getAddr } from '@/config';
import getBrowserFingerprint from './get-browser-fingerprint';
import { refreshToken } from './middleware/refreshToken';

export interface IResponseData {
  status: number;
  data: any;
  ok: boolean;
}

export async function fetchData(
  url: string,
  init: RequestInit,
  queries?: Map<string, string>,
  signal?: AbortSignal
): Promise<IResponseData> {
  const fullUrl = new URL(getAddr() + url);
  if (queries) {
    queries.forEach((value, key) => {
      fullUrl.searchParams.append(key, value);
    });
  }
  const finger = getBrowserFingerprint() || '';
  init.headers = {
    ...init.headers,
    Fingerprint: finger,
  };
  if (signal) {
    init.signal = signal;
  }

  try {
    const response = await fetch(fullUrl, init);
    const data = await response.json();
    return { status: response.status, data: data, ok: response.ok };
  } catch (error) {
    throw { status: 0, data: error, ok: false };
  }
}

export async function getFetchDataWithToken(
  url: string,
  signal: AbortSignal,
  queries?: Map<string, string>
): Promise<IResponseData> {
  const respToken = await refreshToken(signal);
  if (respToken.ok) {
    const init: RequestInit = {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${respToken.data}`,
      },
    };
    return fetchData(url, init, queries, signal);
  } else {
    return { status: 0, data: respToken.data, ok: false };
  }
}

export async function postFetchDataWithToken(
  url: string,
  body: any,
  signal: AbortSignal,
  queries?: Map<string, string>
): Promise<IResponseData> {
  const respToken = await refreshToken(signal);
  if (respToken.ok) {
    const init: RequestInit = {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${respToken.data}`,
      },
      body: body,
    };
    return fetchData(url, init, queries, signal);
  } else {
    return { status: 0, data: respToken.data, ok: false };
  }
}
