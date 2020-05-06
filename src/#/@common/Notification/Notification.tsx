// import green from '@material-ui/core/colors/green'
import React from 'react';
import NotifySystem from 'react-notification-system';

export interface INotificationProps {
  hide: any;
  notifications: any;
}

export class Notification extends React.Component<INotificationProps, {}> {
  notification: React.RefObject<any>;

  constructor(props: INotificationProps) {
    super(props);

    this.notification = React.createRef();
  }

  componentWillReceiveProps(nextProps: INotificationProps) {
    const { notifications } = nextProps;
    const notificationIds = notifications.map((notification: any) => notification.uid);
    const systemNotifications = this.notification.current.state.notifications || [];

    if (notifications.length > 0) {
      // Get all active notifications from react-notification-system
      /// and remove all where uid is not found in the reducer
      systemNotifications.forEach((notification: any) => {
        if (notificationIds.indexOf(notification.uid) < 0) {
          this.notification.current.removeNotification(notification.uid);
        }
      });

      notifications.forEach((notification: any) => {
        this.notification.current.addNotification({
          ...notification,
          onRemove: () => {
            this.props.hide(notification.uid);
            if (notification.onRemove) {
              notification.onRemove(notification);
            }
          },
        });
      });
    }

    if (this.props.notifications !== notifications && notifications.length === 0) {
      this.notification.current.clearNotifications();
    }
  }

  shouldComponentUpdate(nextProps: INotificationProps) {
    return this.props !== nextProps;
  }

  render() {
    // Optional styling
    const style = {
      NotificationItem: {
        // Override the notification item
        DefaultStyle: {
          // Applied to every notification, regardless of the notification level
          margin: '10px 5px 2px 1px',
        },

        // success: { // Applied only to the success notification item
        //   color: green.A400,
        // },
      },
    };

    return <NotifySystem ref={this.notification} style={style} {...this.props} />;
  }
}
