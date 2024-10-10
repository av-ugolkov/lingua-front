import api, { AuthStore, IResponseData } from '@/scripts/api';

export const refreshToken = async (): Promise<IResponseData> => {
  try {
    const response = await api.get('/auth/refresh', AuthStore.NO);
    if (response.ok) {
      return { ...response, data: response.data['access_token'] };
    }
    return response;
  } catch (error: any) {
    console.error(error);
    return {
      ok: false,
      status: 0,
      data: error,
    };
  }
};
