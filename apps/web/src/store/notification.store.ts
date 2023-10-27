import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { NotificationProps } from 'ui';
import { v4 as randomUUID } from 'uuid';

interface Notification {
  id: string;
  type: NotificationProps['variant'];
  message: string;
  visible: boolean;
}

interface NotificationState {
  notifications: Notification[];

  addNotification: (
    message: Notification['message'],
    type: Notification['type'],
  ) => void;

  removeNotification: (id: Notification['id']) => void;
}

export const useNotificationStore = create<NotificationState>()(
  devtools(
    immer((set) => ({
      notifications: [],

      addNotification: (
        message: Notification['message'],
        type: Notification['type'],
      ) => {
        const notification: Notification = {
          id: randomUUID(),
          message,
          type,
          visible: true,
        };

        setTimeout(() => {
          set((state) => {
            for (const storeNotification of state.notifications) {
              if (storeNotification.id !== notification.id) continue;
              storeNotification.visible = false;
            }
          });
        }, 5 * 1000);

        set((state) => {
          state.notifications.push(notification);
        });
      },

      removeNotification: (id: Notification['id']) =>
        set((state) => ({
          notifications: state.notifications.filter(
            (notification) => notification.id !== id,
          ),
        })),
    })),
  ),
);
