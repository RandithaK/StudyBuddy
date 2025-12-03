import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
  AuthorizationStatus,
} from '@notifee/react-native';

class NotificationService {
  constructor() {
    this.createChannel();
  }

  async createChannel() {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
    });
  }

  async requestPermission() {
    const settings = await notifee.requestPermission();
    return settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED;
  }

  async scheduleNotification(
    id: string,
    title: string,
    body: string,
    date: Date,
  ) {
    const now = new Date();
    if (date <= now) {
      // Don't schedule past notifications
      return;
    }

    // Create a time-based trigger
    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    try {
      await notifee.createTriggerNotification(
        {
          id,
          title,
          body,
          android: {
            channelId: 'default',
            pressAction: {
              id: 'default',
            },
          },
        },
        trigger,
      );
      console.log(`Scheduled notification for ${title} at ${date.toLocaleString()}`);
    } catch (e) {
      console.error('Error scheduling notification:', e);
    }
  }

  async cancelNotification(id: string) {
    await notifee.cancelNotification(id);
  }

  async getScheduledNotifications() {
    return await notifee.getTriggerNotificationIds();
  }
  
  async cancelAllNotifications() {
    await notifee.cancelAllNotifications();
  }
}

export const notificationService = new NotificationService();
