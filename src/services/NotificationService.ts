import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
  AuthorizationStatus,
  EventType,
} from '@notifee/react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

const PENDING_TRIGGERS_KEY = 'pending_notification_triggers';

class NotificationService {
  constructor() {
    this.createChannel();
    this.configureListeners();
  }

  configureListeners() {
    notifee.onForegroundEvent(async ({ type, detail }) => {
      if (type === EventType.PRESS && detail.notification?.id) {
        console.log('User pressed notification, clearing pending trigger:', detail.notification.id);
        await this.removePendingTrigger(detail.notification.id);
      }
    });

    notifee.onBackgroundEvent(async ({ type, detail }) => {
        if (type === EventType.PRESS && detail.notification?.id) {
            console.log('User pressed notification (background), clearing pending trigger:', detail.notification.id);
            await this.removePendingTrigger(detail.notification.id);
        }
    });
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
      return;
    }

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
      
      // Save to pending triggers for email fallback
      await this.addPendingTrigger(id, date.getTime());
      
    } catch (e) {
      console.error('Error scheduling notification:', e);
    }
  }

  async addPendingTrigger(id: string, timestamp: number) {
    try {
      const stored = await AsyncStorage.getItem(PENDING_TRIGGERS_KEY);
      const triggers = stored ? JSON.parse(stored) : [];
      triggers.push({ id, timestamp });
      await AsyncStorage.setItem(PENDING_TRIGGERS_KEY, JSON.stringify(triggers));
    } catch (e) {
      console.error('Error adding pending trigger:', e);
    }
  }

  async getPendingTriggers() {
    try {
      const stored = await AsyncStorage.getItem(PENDING_TRIGGERS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error getting pending triggers:', e);
      return [];
    }
  }

  async removePendingTrigger(id: string) {
    try {
      const stored = await AsyncStorage.getItem(PENDING_TRIGGERS_KEY);
      if (stored) {
        let triggers = JSON.parse(stored);
        triggers = triggers.filter((t: any) => t.id !== id);
        await AsyncStorage.setItem(PENDING_TRIGGERS_KEY, JSON.stringify(triggers));
      }
    } catch (e) {
      console.error('Error removing pending trigger:', e);
    }
  }

  async cancelNotification(id: string) {
    await notifee.cancelNotification(id);
    await this.removePendingTrigger(id);
  }

  async getScheduledNotifications() {
    return await notifee.getTriggerNotificationIds();
  }
  
  async cancelAllNotifications() {
    await notifee.cancelAllNotifications();
    await AsyncStorage.removeItem(PENDING_TRIGGERS_KEY);
  }
}

export const notificationService = new NotificationService();
