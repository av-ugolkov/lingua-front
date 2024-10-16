import { createSlice } from '@reduxjs/toolkit/react';

export const enum NotificationType {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Error = 'error',
}

export interface NotificationData {
  id: number;
  type: NotificationType;
  msg: string;
}

export interface NotificationSettings {
  max: number;
}

export interface NotificationState {
  settings: NotificationSettings;
  notifications: NotificationData[];
}

const initialState: NotificationState = {
  settings: { max: 5 },
  notifications: [],
};

const slice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setSettings: (state, action: { payload: NotificationSettings }) => {
      state.settings = action.payload;
    },
    notificationInfo: (state, action: { payload: string }) => {
      if (state.notifications.length >= state.settings.max) {
        state.notifications.splice(0, 1);
      }
      state.notifications.push({
        id: Date.now(),
        type: NotificationType.Info,
        msg: action.payload,
      });
    },
    notificationWarning: (state, action: { payload: string }) => {
      if (state.notifications.length >= state.settings.max) {
        state.notifications.splice(0, 1);
      }
      state.notifications.push({
        id: Date.now(),
        type: NotificationType.Warning,
        msg: action.payload,
      });
    },
    notificationSuccess: (state, action: { payload: string }) => {
      if (state.notifications.length >= state.settings.max) {
        state.notifications.splice(0, 1);
      }
      state.notifications.push({
        id: Date.now(),
        type: NotificationType.Success,
        msg: action.payload,
      });
    },
    notificationError: (state, action: { payload: string }) => {
      if (state.notifications.length >= state.settings.max) {
        state.notifications.splice(0, 1);
      }
      state.notifications.push({
        id: Date.now(),
        type: NotificationType.Error,
        msg: action.payload,
      });
    },
    removeNotification: (state, action: { payload: number }) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const {
  setSettings,
  notificationInfo,
  notificationWarning,
  notificationSuccess,
  notificationError,
  removeNotification,
  clearNotifications,
} = slice.actions;

export default slice.reducer;
