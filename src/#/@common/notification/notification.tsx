import React, { useEffect, useRef } from 'react';
import NotifySystem, { System } from 'react-notification-system';

export interface INotificationProps {
  hide: any;
  notifications: any;
}

export const Notification: React.FC<INotificationProps> = props => {
  const { hide, notifications } = props;
  const notificationRef = useRef<System>(null);

  useEffect(() => {
    const curNotification = notificationRef.current;
    if (curNotification) {
      const notificationIds = notifications.map((n: any) => n.uid);
      const systemNotifications = curNotification.state.notifications || [];

      if (notifications.length > 0) {
        // Get all active notifications from react-notification-system
        // and remove all where uid is not found in the reducer
        systemNotifications.forEach((n: any) => {
          if (notificationIds.indexOf(n.uid) < 0) {
            if (curNotification && curNotification.removeNotification) {
              curNotification.removeNotification(n.uid);
            }
          }
        });

        notifications.forEach((n: any) => {
          if (curNotification && curNotification.addNotification) {
            curNotification.addNotification({
              ...n,
              onRemove: () => {
                hide(n.uid);
                if (n.onRemove) {
                  n.onRemove();
                }
              },
            });
          }
        });
      }
    }
  }, [hide, notificationRef, notifications]);

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

  return <NotifySystem ref={notificationRef} style={style} {...props} />;
};
