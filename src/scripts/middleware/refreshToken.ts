import { fetchData } from '@/scripts/fetchData';
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from '../localStorage';

let timeout: NodeJS.Timeout;

export const refreshToken = (
  signal: AbortSignal,
  successCallback?: (token: string) => void,
  failCallback?: () => void
) => {
  let token = getLocalStorage('access_token');
  if (
    token === '' ||
    token === 'undefined' ||
    token === undefined ||
    !token.includes('.')
  ) {
    failCallback?.();
    return;
  }

  const fetch = async () => {
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
      setLocalStorage('access_token', response.data.access_token);
    } catch (error) {
      removeLocalStorage('access_token');
      console.error(error);
    }
  };
  console.log('token', token);
  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload['exp'];
  const dateNow = Date.now();
  if (dateNow > exp * 1000) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fetch().then(() => {
        token = getLocalStorage('access_token');
        if (token == '') {
          failCallback?.();
        } else {
          successCallback?.('Bearer ' + token);
        }
      });
    }, 1000);
  } else {
    successCallback?.('Bearer ' + token);
  }
};
