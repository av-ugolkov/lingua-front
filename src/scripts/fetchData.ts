'use client';

import { getAddr } from '@/config';
import getBrowserFingerprint from './get-browser-fingerprint';

export interface IResponseData {
  status: number;
  data: any;
  ok: boolean;
}

function fetchData(
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

  return fetch(fullUrl, init)
    .then(async (response: Response): Promise<IResponseData> => {
      const data = await response.json();
      if (response.ok) {
        return { status: response.status, data, ok: true };
      }
      throw { status: response.status, data, ok: false };
    })
    .catch((error: Error): IResponseData => {
      console.error(error);
      throw { status: 0, data: error, ok: false };
    });
}

export default fetchData;
