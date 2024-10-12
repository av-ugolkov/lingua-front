import api, { AuthStore, IResponseData } from '@/scripts/api';

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
      prRefreshToken = api.get('/auth/refresh', AuthStore.NO);
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
        data: 'Refresh token error',
      };
    }
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      status: 0,
      data: error,
    };
  }
};
