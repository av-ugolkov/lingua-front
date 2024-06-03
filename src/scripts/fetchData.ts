'use client';

import { getAddr } from '@/config';
import getBrowserFingerprint from './get-browser-fingerprint';

interface Data {
  status: number;
  data: any;
}

function wrapPromise(promise: Promise<Response>): Data {
  let step = 'pending';
  let data: any;
  let status: number;

  const suspender = promise.then(
    (res) => {
      res.json().then(
        (data) => {
          data = data;
          status = res.status;
          step = 'success';
        },
        (err) => {
          data = err;
          status = res.status;
          step = 'error';
        }
      );
    },
    (err) => {
      status = -1;
      data = err;
      step = 'error';
    }
  );

  const read = () => {
    switch (step) {
      case 'pending':
        throw suspender;
      case 'error':
        throw { status, data };
      default:
        return { status, data };
    }
  };

  return read();
}

function fetchData(
  url: string,
  init: RequestInit,
  queries?: Map<string, string>,
  signal?: AbortSignal
): Data {
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
  return wrapPromise(
    fetch(fullUrl, init)
      .then(async (response) => {
        const data = await response.json();
        return data;
      })
      .catch((error) => {
        console.error(error);
        return error;
      })
  );
}

export default fetchData;
