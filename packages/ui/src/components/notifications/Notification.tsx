import '../../assets/styles/components/notifications/_notification.scss';

import type { ReactElement } from 'react';
import type { CardProps } from '../Card';
import { Card } from '../Card';

// Types
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface NotificationProps extends CardProps {
  title?: string;
  variant?: NotificationType;
}

// Helpers
const defaultTitle: { [key in NotificationType]: string } = {
  info: 'For your information',
  success: 'Done!',
  warning: 'Please note that',
  error: 'Sorry, but',
};

export function Notification({
  title,
  variant = 'info',

  elevation,

  className = '',
  children,
  ...props
}: NotificationProps): ReactElement {
  return (
    <Card
      className={`notification notification--${variant} ${className}`}
      elevation={elevation || 5}
      {...props}
    >
      <strong className="notification__title">
        {title || defaultTitle[variant]}
      </strong>

      {children}
    </Card>
  );
}
