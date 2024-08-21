export function getUserID(): string {
  const token = getAccessToken();
  if (token === '') {
    return '';
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload['user_id'];
}

export function getAccessToken(): string {
  const token = localStorage.getItem('access_token') || '';
  return token;
}

export function isActiveToken(): boolean {
  const token = getAccessToken();
  if (token === '') {
    return false;
  }
  const payload = JSON.parse(atob(token.split('.')[1]));
  const exp = payload['exp'];

  return Date.now() < exp * 1000;
}

export function setAccessToken(token: string) {
  localStorage.setItem('access_token', token);
}

export function deleteAccessToken() {
  localStorage.removeItem('access_token');
}
