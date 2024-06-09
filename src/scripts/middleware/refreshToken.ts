'use client';
import fetchData from '@/scripts/fetchData';
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from '../useLocalStorage';

//fetchData переделывать по типу refreshToken
//в refreshToken мы сразу обрабатываем data и уже здесь ни чего не нужно будет
function refreshToken(signal: AbortSignal): Promise<string> {
  let token = getLocalStorage('access_token');
  if (token == null || token == '' || token == undefined) {
    removeLocalStorage('access_token');
    return new Promise((resolve) => resolve(''));
  }

  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload['exp'];
  const dateNow = Date.now();
  if (dateNow > exp * 1000) {
    const fetchToken = fetchData('/auth/refresh', {
      method: 'get',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      signal: signal,
    })
      .then((data: any) => {
        token = data.access_token;
        setLocalStorage('access_token', token || '');
        return 'Bearer ' + token;
      })
      .catch((error: Error) => {
        removeLocalStorage('access_token');
        console.error(error);
        return '';
      });

    return fetchToken;
  } else {
    return new Promise((resolve) => resolve('Bearer ' + token));
  }
}

export default refreshToken;
