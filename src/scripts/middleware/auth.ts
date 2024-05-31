import asyncRequire from '../asyncRequire';

function refreshToken(
  signal: AbortSignal,
  success: (token: string) => void,
  fail: () => void
) {
  let token = localStorage.getItem('access_token');
  if (token == null) {
    fail();
    return;
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload['exp'];
  const dateNow = Date.now();
  if (dateNow > exp * 1000) {
    asyncRequire('/auth/refresh', {
      method: 'get',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      signal: signal,
    })
      .then(async (response) => {
        console.log('!!!!!!!!!!_refresh_token:', response);
        const data = await response.json();
        if (response.ok) {
          token = data.access_token;
          localStorage.setItem('access_token', token || '');
          success('Bearer ' + token);
        } else {
          localStorage.removeItem('access_token');
          console.error(data);
          // router.push('/').catch((error) => {
          //   console.error(error.message);
          // });
          fail();
        }
      })
      .catch((error) => {
        localStorage.removeItem('access_token');
        console.error(error);
        // router.push('/').catch((error) => {
        //   console.error(error.message);
        // });
        fail();
      });
  } else {
    success('Bearer ' + token);
  }
}

export default refreshToken;
