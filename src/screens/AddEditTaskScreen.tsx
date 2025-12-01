import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  ActivityIndicator,
  Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useMutation, useQuery } from '@apollo/client';
import GlassCard from '../components/GlassCard';
import { hairline, subtleBorder, cardBG } from '../theme';
import {
  XIcon,
  CalendarIcon,
  ClockIcon,
  BellIcon,
  BookIcon,
} from '../components/Icons';
import {
  CREATE_TASK_MUTATION,
  UPDATE_TASK_MUTATION,
  GET_TASKS_QUERY,
  GET_COURSES_QUERY,
} from '../api/queries';

interface AddEditTaskScreenProps {
  task: any | null;
  onClose: () => void;
  onSave: () => void;
}

const AddEditTaskScreen: React.FC<AddEditTaskScreenProps> = ({
  task,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    courseId: task?.courseId || '',
    dueDate: task?.dueDate || '',
    dueTime: task?.dueTime || '',
    hasReminder: task?.hasReminder || false,
  });

  const [showCoursePicker, setShowCoursePicker] = useState(false);

  const { data: coursesData, loading: coursesLoading } = useQuery(GET_COURSES_QUERY);
  
  const [createTask, { loading: creating }] = useMutation(CREATE_TASK_MUTATION, {
    refetchQueries: [{ query: GET_TASKS_QUERY }],
    onCompleted: () => {
      onSave();
      onClose();
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  const [updateTask, { loading: updating }] = useMutation(UPDATE_TASK_MUTATION, {
    refetchQueries: [{ query: GET_TASKS_QUERY }],
    onCompleted: () => {
      onSave();
      onClose();
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  const courses = coursesData?.courses || [];
  const isLoading = coursesLoading || creating || updating;

  const handleSubmit = () => {
    if (!formData.title || !formData.dueDate || !formData.dueTime) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    if (task) {
      updateTask({
        variables: {
          id: task.id,
          input: {
            title: formData.title,
            description: formData.description,
            courseId: formData.courseId,
            dueDate: formData.dueDate,
            dueTime: formData.dueTime,
            hasReminder: formData.hasReminder,
            completed: task.completed,
          },
        },
      });
    } else {
      createTask({
        variables: {
          input: {
            title: formData.title,
            description: formData.description,
            courseId: formData.courseId,
            dueDate: formData.dueDate,
            dueTime: formData.dueTime,
            hasReminder: formData.hasReminder,
          },
        },
      });
    }
  };

  const selectedCourse = courses.find((c: any) => c.id === formData.courseId);

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <GlassCard style={styles.formCard}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>
              {task ? 'Edit Task' : 'New Task'}
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <XIcon size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Task Name */}
            <View style={styles.field}>
              <Text style={styles.label}>Task Name</Text>
              <TextInput
                style={styles.input}
                value={formData.title}
                onChangeText={(text) =>
                  setFormData({ ...formData, title: text })
                }
                placeholder="Enter task name"
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* Description */}
            <View style={styles.field}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={formData.description}
                onChangeText={(text) =>
                  setFormData({ ...formData, description: text })
                }
                placeholder="Add details about this task"
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Course Selection */}
            <View style={styles.field}>
              <View style={styles.labelRow}>
                <BookIcon size={16} color="#374151" />
                <Text style={styles.label}>Course</Text>
              </View>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowCoursePicker(!showCoursePicker)}
              >
                {selectedCourse ? (
                  <View style={styles.selectedCourse}>
                    <LinearGradient
                      colors={[selectedCourse.color || '#6366f1', selectedCourse.color || '#a855f7']}
                      style={styles.courseDot}
                    />
                    <Text style={styles.selectButtonText}>
                      {selectedCourse.name}
                    </Text>
                  </View>
                ) : (
                  <Text style={styles.selectPlaceholder}>Select a course</Text>
                )}
              </TouchableOpacity>

              {showCoursePicker && (
                <View style={styles.pickerContainer}>
                  {courses.map((course: any) => (
                    <TouchableOpacity
                      key={course.id}
                      style={styles.pickerItem}
                      onPress={() => {
                        setFormData({ ...formData, courseId: course.id });
                        setShowCoursePicker(false);
                      }}
                    >
                      <LinearGradient
                        colors={[course.color || '#6366f1', course.color || '#a855f7']}
                        style={styles.courseDot}
                      />
                      <Text style={styles.pickerItemText}>{course.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Date and Time */}
            <View style={styles.row}>
              <View style={[styles.field, styles.halfField]}>
                <View style={styles.labelRow}>
                  <CalendarIcon size={16} color="#374151" />
                  <Text style={styles.label}>Due Date</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={formData.dueDate}
                  onChangeText={(text) =>
                    setFormData({ ...formData, dueDate: text })
                  }
                  placeholder="YYYY-MM-DD"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={[styles.field, styles.halfField]}>
                <View style={styles.labelRow}>
                  <ClockIcon size={16} color="#374151" />
                  <Text style={styles.label}>Time</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={formData.dueTime}
                  onChangeText={(text) =>
                    setFormData({ ...formData, dueTime: text })
                  }
                  placeholder="HH:MM"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            {/* Reminder Toggle */}
            <View style={styles.reminderRow}>
              <LinearGradient
                colors={['#60a5fa', '#6366f1']}
                style={styles.reminderIcon}
              >
                <BellIcon size={20} color="#fff" />
              </LinearGradient>
              <View style={styles.reminderInfo}>
                <Text style={styles.reminderTitle}>Set a reminder</Text>
                <Text style={styles.reminderDescription}>
                  Get notified before the deadline
                </Text>
              </View>
              <Switch
                value={formData.hasReminder}
                onValueChange={(value) =>
                  setFormData({ ...formData, hasReminder: value })
                }
                trackColor={{ false: '#d1d5db', true: '#a5b4fc' }}
                thumbColor={formData.hasReminder ? '#6366f1' : '#f4f4f5'}
              />
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
                activeOpacity={0.8}
                disabled={isLoading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                onPress={handleSubmit} 
                activeOpacity={0.8}
                disabled={isLoading}
              >
                <LinearGradient
                  colors={['#6366f1', '#a855f7']}
                  style={styles.submitButton}
                >
                  {isLoading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.submitButtonText}>
                      {task ? 'Update Task' : 'Create Task'}
                    </Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </GlassCard>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 48,
  },
  formCard: {
    padding: 24,
    backgroundColor: cardBG,
    borderWidth: hairline,
    borderColor: subtleBorder,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    gap: 20,
  },
  field: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: hairline,
    borderColor: subtleBorder,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: '#1f2937',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  selectButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: hairline,
    borderColor: subtleBorder,
    borderRadius: 12,
    padding: 14,
  },
  selectedCourse: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  courseDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  selectButtonText: {
    fontSize: 16,
    color: '#1f2937',
  },
  selectPlaceholder: {
    fontSize: 16,
    color: '#9ca3af',
  },
  pickerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 12,
    marginTop: 8,
    padding: 8,
    gap: 4,
  },
  pickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: 8,
  },
  pickerItemText: {
    fontSize: 14,
    color: '#374151',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfField: {
    flex: 1,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: hairline,
    borderColor: subtleBorder,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  reminderIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reminderInfo: {
    flex: 1,
  },
  reminderTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  reminderDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderWidth: hairline,
    borderColor: subtleBorder,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  submitButton: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    minWidth: 140,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default AddEditTaskScreen;
