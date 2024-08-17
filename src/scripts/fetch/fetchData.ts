import { getAddr } from '@/config';
import getBrowserFingerprint from '../get-browser-fingerprint';

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

export async function fetchData(
  url: string,
  init: RequestInit,
  query?: string
): Promise<IResponseData> {
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
}
