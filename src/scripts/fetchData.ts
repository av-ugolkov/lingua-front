import { getAddr } from '@/config';
import getBrowserFingerprint from './get-browser-fingerprint';

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
