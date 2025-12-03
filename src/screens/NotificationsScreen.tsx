import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import LinearGradient from 'react-native-linear-gradient';
import { ChevronLeftIcon, BellIcon, CheckIcon } from '../components/Icons';
import GlassCard from '../components/GlassCard';
import { hairline, subtleBorder, cardBG } from '../theme';
import { GET_NOTIFICATIONS_QUERY, MARK_NOTIFICATION_AS_READ_MUTATION } from '../api/queries';
import { formatDate, formatTime } from '../data/mockData';

interface NotificationsScreenProps {
  onBack: () => void;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onBack }) => {
  const { data, loading, refetch } = useQuery(GET_NOTIFICATIONS_QUERY, {
    pollInterval: 60000, // Poll every minute
  });

  const [markAsRead] = useMutation(MARK_NOTIFICATION_AS_READ_MUTATION);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsRead({
        variables: { id },
        refetchQueries: [{ query: GET_NOTIFICATIONS_QUERY }],
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const notifications = data?.notifications || [];
  const unreadCount = notifications.filter((n: any) => !n.read).length;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <ChevronLeftIcon size={24} color="#1f2937" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <View style={{ width: 40 }} /> 
      </View>

      {loading && !data ? (
        <View style={styles.centerContent}>
          <ActivityIndicator size="large" color="#6366f1" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={refetch} />
          }
        >
          {notifications.length === 0 ? (
            <View style={styles.emptyState}>
              <GlassCard style={styles.emptyCard}>
                <BellIcon size={48} color="#9ca3af" />
                <Text style={styles.emptyText}>No notifications yet</Text>
                <Text style={styles.emptySubtext}>
                  We'll notify you when tasks are due or events are starting.
                </Text>
              </GlassCard>
            </View>
          ) : (
            <View style={styles.list}>
              {notifications.map((notification: any) => (
                <TouchableOpacity
                  key={notification.id}
                  onPress={() => !notification.read && handleMarkAsRead(notification.id)}
                  activeOpacity={0.8}
                >
                  <GlassCard
                    style={[
                      styles.notificationItem,
                      !notification.read && styles.unreadItem,
                    ]}
                  >
                    <View style={styles.iconContainer}>
                      <LinearGradient
                        colors={
                          notification.type === 'TASK_DUE'
                            ? ['#f87171', '#ef4444']
                            : ['#60a5fa', '#3b82f6']
                        }
                        style={styles.iconGradient}
                      >
                        <BellIcon size={20} color="#fff" />
                      </LinearGradient>
                    </View>
                    <View style={styles.contentContainer}>
                      <Text
                        style={[
                          styles.message,
                          !notification.read && styles.unreadMessage,
                        ]}
                      >
                        {notification.message}
                      </Text>
                      <Text style={styles.time}>
                        {new Date(notification.createdAt).toLocaleDateString()} at{' '}
                        {new Date(notification.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </Text>
                    </View>
                    {!notification.read && (
                      <View style={styles.unreadDot} />
                    )}
                  </GlassCard>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderBottomWidth: hairline,
    borderBottomColor: subtleBorder,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: hairline,
    borderColor: subtleBorder,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 24,
    paddingBottom: 100,
  },
  list: {
    gap: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    gap: 16,
    alignItems: 'center',
  },
  unreadItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#6366f1',
    borderWidth: 1,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconGradient: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  message: {
    fontSize: 15,
    color: '#374151',
    marginBottom: 4,
    lineHeight: 20,
  },
  unreadMessage: {
    fontWeight: '600',
    color: '#1f2937',
  },
  time: {
    fontSize: 12,
    color: '#9ca3af',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6366f1',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  emptyCard: {
    padding: 32,
    alignItems: 'center',
    width: '100%',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default NotificationsScreen;
