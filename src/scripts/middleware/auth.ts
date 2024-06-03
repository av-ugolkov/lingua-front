import fetchData from '@/scripts/fetchData';

//fetchData переделывать по типу refreshToken
//в refreshToken мы сразу обрабатываем data и уже здесь ни чего не нужно будет
function refreshToken(signal: AbortSignal): string {
  let token = localStorage.getItem('access_token');
  if (token == null) {
    return '';
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload['exp'];
  const dateNow = Date.now();
  if (dateNow > exp * 1000) {
    const { status, data } = fetchData('/auth/refresh', {
      method: 'get',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      signal: signal,
    });
    if (status >= 200 && status < 300) {
      token = data.access_token;
      localStorage.setItem('access_token', token || '');
      return 'Bearer ' + token;
    } else {
      localStorage.removeItem('access_token');
      console.error(data);
      return '';
    }
  } else {
    return 'Bearer ' + token;
  }
}

export default refreshToken;
