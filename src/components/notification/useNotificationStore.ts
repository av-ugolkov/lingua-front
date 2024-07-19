import { create } from 'zustand';

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

interface NotificationState {
  settings: NotificationSettings;
  setSettings: (settings: NotificationSettings) => void;
  notifications: NotificationData[];
  notificationInfo: (message: string) => void;
  notificationWarning: (message: string) => void;
  notificationSuccess: (message: string) => void;
  notificationError: (message: string) => void;
  removeNotification: (id: number) => void;
  clearNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  settings: { max: 5 },
  setSettings: (settings) => {
    set({ settings });
  },
  notifications: [],
  notificationInfo: (message: string) => {
    if (get().notifications.length >= get().settings.max) {
      get().removeNotification(get().notifications[0].id);
    }
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          id: Date.now(),
          type: NotificationType.Info,
          msg: message,
        },
      ],
    }));
  },
  notificationWarning: (message: string) => {
    if (get().notifications.length >= get().settings.max) {
      get().removeNotification(get().notifications[0].id);
    }
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          id: Date.now(),
          type: NotificationType.Warning,
          msg: message,
        },
      ],
    }));
  },
  notificationSuccess: (message: string) => {
    if (get().notifications.length >= get().settings.max) {
      get().removeNotification(get().notifications[0].id);
    }
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          id: Date.now(),
          type: NotificationType.Success,
          msg: message,
        },
      ],
    }));
  },
  notificationError: (message: string) => {
    if (get().notifications.length >= get().settings.max) {
      get().removeNotification(get().notifications[0].id);
    }
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          id: Date.now(),
          type: NotificationType.Error,
          msg: message,
        },
      ],
    }));
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    }));
  },
  clearNotifications: () => {
    set({ notifications: [] });
  },
}));
