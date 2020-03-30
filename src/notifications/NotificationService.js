import PushNotification from 'react-native-push-notification';

export default class NotificationService {
  // onNotificaitn is a function passed in that is to be called when a
  // notification is to be emitted.
  constructor(onNotification) {
    this.configure(onNotification);
    this.lastId = 0;
  }

  configure(onNotification) {
    PushNotification.configure({
      onNotification: onNotification,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      popInitialNotification: true,
    });
  }

  // Appears right away
  localNotification() {
    this.lastId++;
    PushNotification.localNotification({
      title: 'Local Notification',
      message: 'My Notification Message',
      playSound: false,
      soundName: 'default',
      actions: '["Yes", "No"]',
    });
  }

  // Appears after a specified time. App does not have to be open.
  scheduleNotification(secondFromNow) {
    console.log('scheduled notification');
    this.lastId++;
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + secondFromNow * 1000), // 5 seconds
      title: 'Time to get your hands squeaky clean',
      //   message: 'My Scheduled Notification Message',
      playSound: true,
      soundName: 'default',
    });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({ id: '' + this.lastId });
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}
