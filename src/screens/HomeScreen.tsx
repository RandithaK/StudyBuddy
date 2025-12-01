import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useQuery, useMutation } from '@apollo/client';
import GlassCard from '../components/GlassCard';
import { hairline, subtleBorder, cardBG } from '../theme';
import {
  ClockIcon,
  AlertCircleIcon,
  BookIcon,
  UserIcon,
  CheckIcon,
} from '../components/Icons';
import {
  formatTime,
  formatDate,
  getTodayString,
} from '../data/mockData';
import { GET_TASKS_QUERY, GET_EVENTS_QUERY, GET_COURSES_QUERY, UPDATE_TASK_MUTATION } from '../api/queries';

interface HomeScreenProps {
  onAddTask: () => void;
  onNavigateToAccount: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  onAddTask: _onAddTask,
  onNavigateToAccount,
}) => {
  const { data: tasksData, loading: tasksLoading } = useQuery(GET_TASKS_QUERY);
  const { data: eventsData, loading: eventsLoading } = useQuery(GET_EVENTS_QUERY);
  const { data: coursesData, loading: coursesLoading } = useQuery(GET_COURSES_QUERY);

  const [updateTask] = useMutation(UPDATE_TASK_MUTATION, {
    refetchQueries: [{ query: GET_TASKS_QUERY }, { query: GET_COURSES_QUERY }],
  });

  const isLoading = tasksLoading || eventsLoading || coursesLoading;

  const toggleTaskCompletion = async (task: any) => {
    try {
      await updateTask({
        variables: {
          input: {
            id: task.id,
            title: task.title,
            description: task.description,
            courseId: task.courseId,
            dueDate: task.dueDate,
            dueTime: task.dueTime,
            completed: !task.completed,
            hasReminder: task.hasReminder,
          },
        },
      });
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  const tasks = tasksData?.tasks || [];
  const events = eventsData?.events || [];
  const courses = coursesData?.courses || [];

  const today = getTodayString();
  const todayEvents = events.filter((e: any) => e.date === today);
  const upcomingTasks = tasks
    .filter((t: any) => !t.completed)
    .sort(
      (a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime(),
    )
    .slice(0, 5);

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return '#ef4444';
      case 'class':
        return '#3b82f6';
      case 'study':
        return '#22c55e';
      default:
        return '#6b7280';
    }
  };

  const todayDate = new Date();
  const dateString = todayDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Study Planner</Text>
          <Text style={styles.dateText}>{dateString}</Text>
        </View>
        <TouchableOpacity
          style={styles.avatarButton}
          onPress={onNavigateToAccount}
        >
          <UserIcon size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Today's Schedule */}
      <GlassCard style={styles.scheduleCard}>
        <View style={styles.sectionHeader}>
          <LinearGradient
            colors={['#60a5fa', '#6366f1']}
            style={styles.sectionIcon}
          >
            <ClockIcon size={20} color="#fff" />
          </LinearGradient>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
        </View>

        <View style={styles.eventsList}>
          {todayEvents.length === 0 ? (
            <Text style={styles.emptyText}>No events scheduled for today</Text>
          ) : (
            todayEvents.map((event: any) => {
              const course = event.course;
              return (
                <View key={event.id} style={styles.eventItem}>
                  <View style={styles.eventTime}>
                    <Text style={styles.timeText}>
                      {formatTime(event.startTime)}
                    </Text>
                    <Text style={styles.toText}>to</Text>
                    <Text style={styles.timeText}>
                      {formatTime(event.endTime)}
                    </Text>
                  </View>
                  <View style={styles.eventContent}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    {course && (
                      <LinearGradient
                        colors={[course.color || '#6366f1', course.color || '#a855f7']}
                        style={styles.courseBadge}
                      >
                        <Text style={styles.courseBadgeText}>{course.name}</Text>
                      </LinearGradient>
                    )}
                  </View>
                  <View
                    style={[
                      styles.eventDot,
                      { backgroundColor: getEventTypeColor(event.type) },
                    ]}
                  />
                </View>
              );
            })
          )}
        </View>
      </GlassCard>

      {/* Upcoming Deadlines */}
      <GlassCard style={styles.deadlinesCard}>
        <View style={styles.sectionHeader}>
          <LinearGradient
            colors={['#a855f7', '#ec4899']}
            style={styles.sectionIcon}
          >
            <AlertCircleIcon size={20} color="#fff" />
          </LinearGradient>
          <Text style={styles.sectionTitle}>Upcoming Deadlines</Text>
        </View>

        <View style={styles.tasksList}>
          {upcomingTasks.map((task: any) => {
            const course = task.course;
            const isOverdue = new Date(task.dueDate) < new Date();

            return (
              <View key={task.id} style={styles.taskItem}>
                <TouchableOpacity
                  style={[
                    styles.checkbox,
                    task.completed && styles.checkboxChecked,
                  ]}
                  onPress={(e) => {
                    e.stopPropagation();
                    toggleTaskCompletion(task);
                  }}
                >
                  {task.completed && <CheckIcon size={12} color="#fff" />}
                </TouchableOpacity>
                  <View style={styles.taskContent}>
                    <Text style={styles.taskTitle}>{task.title}</Text>
                    <View style={styles.taskMeta}>
                      {course && (
                        <LinearGradient
                          colors={[course.color || '#6366f1', course.color || '#a855f7']}
                          style={styles.courseBadgeSmall}
                        >
                          <Text style={styles.courseBadgeTextSmall}>
                            {course.name}
                          </Text>
                        </LinearGradient>
                      )}
                      <Text
                        style={[
                          styles.dueText,
                          isOverdue && styles.overdueText,
                        ]}
                      >
                        Due {formatDate(task.dueDate)}
                      </Text>
                    </View>
                  </View>
                </View>
            );
          })}
        </View>
      </GlassCard>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <GlassCard style={styles.statCard}>
          <BookIcon size={24} color="#6366f1" />
          <Text style={styles.statNumber}>{courses.length}</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </GlassCard>

        <GlassCard style={styles.statCard}>
          <ClockIcon size={24} color="#3b82f6" />
          <Text style={styles.statNumber}>{todayEvents.length}</Text>
          <Text style={styles.statLabel}>Today</Text>
        </GlassCard>

        <GlassCard style={styles.statCard}>
          <AlertCircleIcon size={24} color="#a855f7" />
          <Text style={styles.statNumber}>{upcomingTasks.length}</Text>
          <Text style={styles.statLabel}>Pending</Text>
        </GlassCard>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  contentContainer: {
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
    marginTop: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    color: '#1f2937',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#6b7280',
  },
  avatarButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: hairline,
    borderColor: subtleBorder,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scheduleCard: {
    padding: 20,
    marginBottom: 16,
    borderWidth: hairline,
    borderColor: subtleBorder,
    backgroundColor: cardBG,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1f2937',
  },
  eventsList: {
    gap: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#9ca3af',
    paddingVertical: 24,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: cardBG,
    padding: 16,
    borderRadius: 16,
    borderWidth: hairline,
    borderColor: subtleBorder,
    gap: 16,
  },
  eventTime: {
    alignItems: 'center',
    minWidth: 60,
  },
  timeText: {
    fontSize: 14,
    color: '#6b7280',
  },
  toText: {
    fontSize: 12,
    color: '#9ca3af',
  },
  eventContent: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 8,
  },
  courseBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  courseBadgeText: {
    fontSize: 12,
    color: '#fff',
  },
  eventDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 8,
  },
  deadlinesCard: {
    padding: 20,
    marginBottom: 16,
  },
  tasksList: {
    gap: 12,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 16,
    borderRadius: 16,
    borderWidth: hairline,
    borderColor: subtleBorder,
    gap: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#9ca3af',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 8,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  courseBadgeSmall: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  courseBadgeTextSmall: {
    fontSize: 11,
    color: '#fff',
  },
  dueText: {
    fontSize: 12,
    color: '#6b7280',
  },
  overdueText: {
    color: '#dc2626',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  bottomSpacer: {
    height: 100,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
