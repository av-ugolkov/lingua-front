import api, { AuthStore, IResponseData } from '@/scripts/api';
import { getUserID } from '../AuthToken';

const emptyPromise = Promise.resolve(null);
let prRefreshToken: Promise<IResponseData | null> = emptyPromise;

function setEmptyPromise() {
  setTimeout(() => {
    prRefreshToken = emptyPromise;
  }, 15000);
}

export const refreshToken = async (): Promise<IResponseData> => {
  try {
    if (prRefreshToken === emptyPromise) {
      const uid = getUserID();
      if (uid === '') {
        return {
          ok: false,
          status: 0,
          data: null,
          err: 'Refresh token error',
        };
      }
      prRefreshToken = api.get('/auth/refresh', AuthStore.NO, {
        query: [['uid', uid]],
      });
      setEmptyPromise();
    }
    const resp = await prRefreshToken;
    if (resp) {
      if (resp.ok) {
        return { ...resp, data: resp.data['access_token'] };
      } else {
        return resp;
      }
    } else {
      return {
        ok: false,
        status: 0,
        data: null,
        err: 'Refresh token error',
      };
    }
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      status: 0,
      data: null,
      err: error,
    };
  }
};
