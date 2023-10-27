import '../../assets/styles/components/notifications/_notifications.scss';

import type { ReactElement } from 'react';
import { Stack } from '../Stack';
import { FadeIn } from '../FadeIn';
import type { StoredNotification } from '../../utils/types/api.types';
import { Notification } from './Notification';

export interface NotificationsSectionProps {
  notifications: StoredNotification[];
  removeNotification: (id: StoredNotification['id']) => void;
}

export function NotificationsSection({
  notifications,
  removeNotification,
}: NotificationsSectionProps): ReactElement {
  return (
    <Stack BaseElement="aside" className="notifications">
      {notifications.map(({ id, message, type, visible }) => (
        <FadeIn
          key={id}
          onHided={() => removeNotification(id)}
          visible={visible}
        >
          <Notification variant={type}>{message}</Notification>
        </FadeIn>
      ))}
    </Stack>
  );
}
