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
import { useQuery } from '@apollo/client';
import GlassCard from '../components/GlassCard';
import { hairline, subtleBorder, cardBG } from '../theme';
import { PlusIcon, BookIcon } from '../components/Icons';
import { GET_COURSES_QUERY } from '../api/queries';

interface CoursesScreenProps {
  onSelectCourse: (courseId: string) => void;
}

const CoursesScreen: React.FC<CoursesScreenProps> = ({ onSelectCourse }) => {
  const { data, loading } = useQuery(GET_COURSES_QUERY);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  const courses = data?.courses || [];

  const totalCompletedTasks = courses.reduce((sum: number, c: any) => sum + (c.completedTasks || 0), 0);
  const totalTasks = courses.reduce((sum: number, c: any) => sum + (c.totalTasks || 0), 0);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Courses</Text>
          <Text style={styles.subtitle}>Manage your subjects</Text>
        </View>
        <BookIcon size={32} color="#6366f1" />
      </View>

      {/* Course Cards */}
      <View style={styles.coursesList}>
        {courses.map((course: any) => {
          const progress = course.totalTasks > 0 
            ? (course.completedTasks / course.totalTasks) * 100 
            : 0;

          return (
            <GlassCard
              key={course.id}
              style={styles.courseCard}
              onPress={() => onSelectCourse(course.id)}
            >
              <View style={styles.courseHeader}>
                <LinearGradient
                  colors={[course.color || '#6366f1', course.color || '#a855f7']}
                  style={styles.courseIcon}
                >
                  <Text style={styles.courseInitial}>
                    {course.name.charAt(0)}
                  </Text>
                </LinearGradient>
                <View style={styles.courseInfo}>
                  <Text style={styles.courseName}>{course.name}</Text>
                  <Text style={styles.courseProgress}>
                    {course.completedTasks} of {course.totalTasks} tasks completed
                  </Text>
                </View>
                <Text style={styles.percentText}>{Math.round(progress)}%</Text>
              </View>

              {/* Progress Bar */}
              <View style={styles.progressBarContainer}>
                <LinearGradient
                  colors={[course.color || '#6366f1', course.color || '#a855f7']}
                  style={[styles.progressBar, { width: `${progress}%` }]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                />
              </View>

              {/* Stats */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>
                    {course.totalTasks - course.completedTasks}
                  </Text>
                  <Text style={styles.statLabel}>Remaining</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statNumber}>{course.completedTasks}</Text>
                  <Text style={styles.statLabel}>Completed</Text>
                </View>
              </View>
            </GlassCard>
          );
        })}
      </View>

      {/* Summary Card */}
      <GlassCard style={styles.summaryCard}>
        <View style={styles.summaryContent}>
          <View>
            <Text style={styles.summaryTitle}>Total Courses</Text>
            <Text style={styles.summarySubtitle}>
              You're enrolled in {courses.length} courses
            </Text>
          </View>
          <View style={styles.summaryStats}>
            <Text style={styles.summaryNumber}>
              {totalCompletedTasks}/{totalTasks}
            </Text>
            <Text style={styles.summaryLabel}>Tasks completed</Text>
          </View>
        </View>
      </GlassCard>

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
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 8,
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
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  coursesList: {
    gap: 16,
  },
  courseCard: {
    padding: 20,
    backgroundColor: cardBG,
    borderWidth: hairline,
    borderColor: subtleBorder,
  },
  courseHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 16,
  },
  courseIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  courseInitial: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  courseInfo: {
    flex: 1,
  },
  courseName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  courseProgress: {
    fontSize: 14,
    color: '#6b7280',
  },
  percentText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
  },
  progressBarContainer: {
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBar: {
    height: '100%',
    borderRadius: 6,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  summaryCard: {
    padding: 20,
    marginTop: 16,
    backgroundColor: cardBG,
    borderWidth: hairline,
    borderColor: subtleBorder,
  },
  summaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  summarySubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  summaryStats: {
    alignItems: 'flex-end',
  },
  summaryNumber: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1f2937',
  },
  summaryLabel: {
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

export default CoursesScreen;
