import { IResponseData, fetchData } from '@/scripts/fetchData';
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from '../localStorage';

export const refreshToken = async (
  signal: AbortSignal
): Promise<IResponseData> => {
  let token = getLocalStorage('access_token');
  if (
    token === '' ||
    token === 'undefined' ||
    token === undefined ||
    !token.includes('.')
  ) {
    return { ok: false, status: 0, data: 'no token' };
  }

  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload['exp'];
  const dateNow = Date.now();
  if (dateNow > exp * 1000) {
    const response = await fetchToken(signal);
    if (response.ok) {
      setLocalStorage('access_token', token);
    } else {
      removeLocalStorage('access_token');
    }
    return response;
  } else {
    return { status: 200, data: token, ok: true };
  }
};

async function fetchToken(signal: AbortSignal): Promise<IResponseData> {
  try {
    const response = await fetchData('/auth/refresh', {
      method: 'get',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      signal: signal,
    });
    return response;
  } catch (error: any) {
    return {
      ok: false,
      status: 0,
      data: error,
    };
  }
}
