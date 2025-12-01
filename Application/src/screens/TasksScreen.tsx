import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GlassCard from '../components/GlassCard';
import { ChevronLeftIcon, CheckSquareIcon, CheckIcon } from '../components/Icons';
import { tasks, getCourseById, formatDate, Task } from '../data/mockData';

interface TasksScreenProps {
  selectedCourse: string | null;
  onEditTask: (task: Task) => void;
  onBack: () => void;
}

type FilterType = 'all' | 'week' | 'overdue' | 'completed';

const TasksScreen: React.FC<TasksScreenProps> = ({
  selectedCourse,
  onEditTask,
  onBack,
}) => {
  const [filter, setFilter] = useState<FilterType>('all');

  const course = selectedCourse ? getCourseById(selectedCourse) : null;
  const screenTitle = course ? course.name : 'All Tasks';

  const filterTasks = () => {
    let filtered = selectedCourse
      ? tasks.filter((t) => t.courseId === selectedCourse)
      : tasks;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const weekFromNow = new Date(today);
    weekFromNow.setDate(weekFromNow.getDate() + 7);

    switch (filter) {
      case 'week':
        filtered = filtered.filter(
          (t) =>
            !t.completed &&
            new Date(t.dueDate) >= today &&
            new Date(t.dueDate) <= weekFromNow,
        );
        break;
      case 'overdue':
        filtered = filtered.filter(
          (t) => !t.completed && new Date(t.dueDate) < today,
        );
        break;
      case 'completed':
        filtered = filtered.filter((t) => t.completed);
        break;
    }

    return filtered.sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  };

  const filteredTasks = filterTasks();

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'week', label: 'This Week' },
    { id: 'overdue', label: 'Overdue' },
    { id: 'completed', label: 'Completed' },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {selectedCourse && (
            <TouchableOpacity style={styles.backButton} onPress={onBack}>
              <ChevronLeftIcon size={20} color="#374151" />
            </TouchableOpacity>
          )}
          <View>
            <Text style={styles.title}>{screenTitle}</Text>
            <Text style={styles.subtitle}>{filteredTasks.length} tasks</Text>
          </View>
        </View>
      </View>

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersContainer}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map((f) => (
          <TouchableOpacity
            key={f.id}
            onPress={() => setFilter(f.id)}
            activeOpacity={0.8}
          >
            {filter === f.id ? (
              <LinearGradient
                colors={['#6366f1', '#a855f7']}
                style={styles.filterChip}
              >
                <Text style={styles.filterChipTextActive}>{f.label}</Text>
              </LinearGradient>
            ) : (
              <View style={[styles.filterChip, styles.filterChipInactive]}>
                <Text style={styles.filterChipText}>{f.label}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tasks List */}
      <View style={styles.tasksList}>
        {filteredTasks.length === 0 ? (
          <GlassCard style={styles.emptyCard}>
            <CheckSquareIcon size={48} color="#9ca3af" />
            <Text style={styles.emptyText}>No tasks found</Text>
          </GlassCard>
        ) : (
          filteredTasks.map((task) => {
            const taskCourse = getCourseById(task.courseId);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const isOverdue = new Date(task.dueDate) < today && !task.completed;

            return (
              <GlassCard
                key={task.id}
                style={styles.taskCard}
                onPress={() => onEditTask(task)}
              >
                <View style={styles.taskContent}>
                  {/* Checkbox */}
                  <TouchableOpacity
                    style={[
                      styles.checkbox,
                      task.completed && styles.checkboxChecked,
                    ]}
                    onPress={(e) => {
                      e.stopPropagation();
                      // Toggle completion would go here
                    }}
                  >
                    {task.completed && <CheckIcon size={16} color="#fff" />}
                  </TouchableOpacity>

                  {/* Task Details */}
                  <View style={styles.taskDetails}>
                    <Text
                      style={[
                        styles.taskTitle,
                        task.completed && styles.taskTitleCompleted,
                      ]}
                    >
                      {task.title}
                    </Text>
                    {task.description && (
                      <Text
                        style={styles.taskDescription}
                        numberOfLines={1}
                      >
                        {task.description}
                      </Text>
                    )}

                    {/* Meta Info */}
                    <View style={styles.taskMeta}>
                      {taskCourse && (
                        <LinearGradient
                          colors={[taskCourse.colorFrom, taskCourse.colorTo]}
                          style={styles.courseBadge}
                        >
                          <Text style={styles.courseBadgeText}>
                            {taskCourse.name}
                          </Text>
                        </LinearGradient>
                      )}
                      <View
                        style={[
                          styles.dueBadge,
                          isOverdue && styles.dueBadgeOverdue,
                          task.completed && styles.dueBadgeCompleted,
                        ]}
                      >
                        <Text
                          style={[
                            styles.dueBadgeText,
                            isOverdue && styles.dueBadgeTextOverdue,
                            task.completed && styles.dueBadgeTextCompleted,
                          ]}
                        >
                          {isOverdue ? 'Overdue ' : ''}
                          {formatDate(task.dueDate)}
                        </Text>
                      </View>
                      {task.hasReminder && (
                        <View style={styles.reminderBadge}>
                          <Text style={styles.reminderBadgeText}>Reminder</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              </GlassCard>
            );
          })
        )}
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
    marginBottom: 16,
    marginTop: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '300',
    color: '#1f2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  filtersContainer: {
    marginBottom: 16,
    marginHorizontal: -24,
  },
  filtersContent: {
    paddingHorizontal: 24,
    gap: 8,
    flexDirection: 'row',
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  filterChipText: {
    fontSize: 14,
    color: '#374151',
  },
  filterChipTextActive: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  tasksList: {
    gap: 12,
  },
  emptyCard: {
    padding: 48,
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#9ca3af',
  },
  taskCard: {
    padding: 16,
  },
  taskContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#9ca3af',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: '#22c55e',
    borderColor: '#22c55e',
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  taskDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flexWrap: 'wrap',
  },
  courseBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  courseBadgeText: {
    fontSize: 11,
    color: '#fff',
  },
  dueBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  dueBadgeOverdue: {
    backgroundColor: 'rgba(254, 226, 226, 0.8)',
  },
  dueBadgeCompleted: {
    backgroundColor: 'rgba(220, 252, 231, 0.8)',
  },
  dueBadgeText: {
    fontSize: 11,
    color: '#374151',
  },
  dueBadgeTextOverdue: {
    color: '#dc2626',
  },
  dueBadgeTextCompleted: {
    color: '#16a34a',
  },
  reminderBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    backgroundColor: 'rgba(219, 234, 254, 0.8)',
  },
  reminderBadgeText: {
    fontSize: 11,
    color: '#1d4ed8',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default TasksScreen;
