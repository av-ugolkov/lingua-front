import { getAddr } from '../config';
import getBrowserFingerprint from './get-browser-fingerprint';

async function asyncRequire(
  url: string,
  init?: RequestInit,
  queries?: Map<string, string>,
  signal?: AbortSignal
): Promise<Response> {
  const fullUrl = new URL(getAddr() + url);
  if (queries) {
    queries.forEach((value, key) => {
      fullUrl.searchParams.append(key, value);
    });
  }
  init.headers = {
    ...init.headers,
    Fingerprint: getBrowserFingerprint(),
  };
  if (signal) {
    init.signal = signal;
  }

  return await fetch(fullUrl, init);
}

export default asyncRequire;
