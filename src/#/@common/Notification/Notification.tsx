import React, { useEffect, useRef } from 'react';
import NotifySystem, { System } from 'react-notification-system';

export interface INotificationProps {
  hide: any;
  notifications: any;
}

export const Notification: React.FC<INotificationProps> = props => {
  const { hide, notifications } = props;
  const notification = useRef<System>(null);

  useEffect(() => {
    const curNotification = notification.current;
    if (curNotification) {
      const notificationIds = notifications.map((notification: any) => notification.uid);
      const systemNotifications = curNotification.state.notifications || [];

      if (notifications.length > 0) {
        // Get all active notifications from react-notification-system
        // and remove all where uid is not found in the reducer
        systemNotifications.forEach((notification: any) => {
          if (notificationIds.indexOf(notification.uid) < 0) {
            notification.current.removeNotification(notification.uid);
          }
        });

        notifications.forEach((notification: any) => {
          curNotification.addNotification({
            ...notification,
            onRemove: () => {
              hide(notification.uid);
              if (notification.onRemove) {
                notification.onRemove();
              }
            },
          });
        });
      }
    }
  }, [hide, notification, notifications]);

  // Optional styling
  const style = {
    NotificationItem: {
      // Override the notification item
      DefaultStyle: {
        // Applied to every notification, regardless of the notification level
        margin: '10px 5px 2px 1px',
      },
    },
  };

  return <NotifySystem ref={notification} style={style} {...props} />;
};
