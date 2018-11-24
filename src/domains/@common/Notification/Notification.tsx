// import green from '@material-ui/core/colors/green'
import * as React from 'react';
import * as Notifications from 'react-notification-system-redux';

export interface INotificationProps {
  notifications: Notifications.NotificationsState;
}

export class Notification extends React.Component<INotificationProps, {}> {
  render() {
    const { notifications } = this.props;

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

    return <Notifications notifications={notifications} style={style} />;
  }
}
