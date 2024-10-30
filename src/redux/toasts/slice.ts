import { createSlice } from '@reduxjs/toolkit/react';

export const enum ToastType {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export interface ToastData {
  id: number;
  type: ToastType;
  msg: string;
}

export interface ToastSettings {
  max: number;
}

export interface ToastState {
  settings: ToastSettings;
  toasts: ToastData[];
}

const initialState: ToastState = {
  settings: { max: 5 },
  toasts: [],
};

const slice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    setSettings: (state, action: { payload: ToastSettings }) => {
      state.settings = action.payload;
    },
    toastInfo: (state, action: { payload: string }) => {
      if (state.toasts.length >= state.settings.max) {
        state.toasts.splice(0, 1);
      }
      state.toasts.push({
        id: Date.now(),
        type: ToastType.Info,
        msg: action.payload,
      });
    },
    toastWarning: (state, action: { payload: string }) => {
      if (state.toasts.length >= state.settings.max) {
        state.toasts.splice(0, 1);
      }
      state.toasts.push({
        id: Date.now(),
        type: ToastType.Warning,
        msg: action.payload,
      });
    },
    toastSuccess: (state, action: { payload: string }) => {
      if (state.toasts.length >= state.settings.max) {
        state.toasts.splice(0, 1);
      }
      state.toasts.push({
        id: Date.now(),
        type: ToastType.Success,
        msg: action.payload,
      });
    },
    toastError: (state, action: { payload: string }) => {
      if (state.toasts.length >= state.settings.max) {
        state.toasts.splice(0, 1);
      }
      state.toasts.push({
        id: Date.now(),
        type: ToastType.Error,
        msg: action.payload,
      });
    },
    removeToast: (state, action: { payload: number }) => {
      state.toasts = state.toasts.filter((n) => n.id !== action.payload);
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
  },
});

export const {
  setSettings,
  toastInfo,
  toastWarning,
  toastSuccess,
  toastError,
  removeToast,
  clearToasts,
} = slice.actions;

export default slice.reducer;
