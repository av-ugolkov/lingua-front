import getBrowserFingerprint from './../tools/get-browser-fingerprint';
import require from '../require';
import { Navigate } from 'react-router-dom';

function refreshToken(
  next: (token: string | null, finger: string | null) => void,
  moveToMain?: boolean
) {
  let token = localStorage.getItem('access_token');
  if (token == null) {
    next(null, null);
    if (moveToMain) {
      return <Navigate to='/' />;
    }
    return;
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload['exp'];
  const dateNow = Date.now();
  const finger = getBrowserFingerprint() || 'no-fingerprint';
  if (dateNow > exp * 1000) {
    require('/auth/refresh', {
      method: 'get',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Fingerprint: finger,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.code == 200) {
          token = data['data']['access_token'];
          localStorage.setItem('access_token', token || '');
          next('Bearer ' + token, finger);
        } else {
          localStorage.removeItem('access_token');
          console.error('error:', data['data']);
          // router.push('/').catch((error) => {
          //   console.log(error);
          // });
          next(null, null);
          return <Navigate to='/' />;
        }
      })
      .catch((error) => {
        localStorage.removeItem('access_token');
        console.error('error:', error);
        // router.push('/').catch((error) => {
        //   console.log(error);
        // });
        next(null, null);
        return <Navigate to='/' />;
      });
  } else {
    next('Bearer ' + token, finger);
  }
}

export default refreshToken;
