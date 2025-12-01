import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import { useMutation, useQuery } from '@apollo/client';
import GlassCard from '../components/GlassCard';
import { hairline, subtleBorder, cardBG } from '../theme';
import {
  XIcon,
  CalendarIcon,
  ClockIcon,
  BookIcon,
  TagIcon,
} from '../components/Icons';
import {
  CREATE_EVENT_MUTATION,
  GET_EVENTS_QUERY,
  GET_COURSES_QUERY,
} from '../api/queries';

interface AddEventScreenProps {
  onClose: () => void;
  onSave: () => void;
}

const AddEventScreen: React.FC<AddEventScreenProps> = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    title: '',
    courseId: '',
    date: '',
    startTime: '',
    endTime: '',
    type: 'study', // study, class, exam
    description: '',
  });

  const [showCoursePicker, setShowCoursePicker] = useState(false);
  const [showTypePicker, setShowTypePicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [customEventType, setCustomEventType] = useState('');

  const { data: coursesData, loading: coursesLoading } = useQuery(GET_COURSES_QUERY);

  const [createEvent, { loading: creating }] = useMutation(CREATE_EVENT_MUTATION, {
    refetchQueries: [{ query: GET_EVENTS_QUERY }],
    onCompleted: () => {
      onSave();
      onClose();
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  const courses = coursesData?.courses || [];
  const isLoading = coursesLoading || creating;

  const handleSubmit = () => {
    if (!formData.title || !formData.date || !formData.startTime || !formData.endTime) {
      Alert.alert('Missing Fields', 'Please fill in all required fields.');
      return;
    }

    createEvent({
      variables: {
        input: {
          title: formData.title,
          courseId: formData.courseId || null,
          date: formData.date,
          startTime: formData.startTime,
          endTime: formData.endTime,
          type: formData.type,
          description: formData.description,
        },
      },
    });
  };

  const selectedCourse = courses.find((c: any) => c.id === formData.courseId);

  const eventTypes = [
    { label: 'Study Session', value: 'study', color: '#22c55e' },
    { label: 'Class', value: 'class', color: '#3b82f6' },
    { label: 'Exam', value: 'exam', color: '#ef4444' },
    { label: 'Personal', value: 'personal', color: '#f59e0b' },
    { label: 'Family', value: 'family', color: '#ec4899' },
    { label: 'Movies', value: 'movies', color: '#8b5cf6' },
    { label: 'Vacation', value: 'vacation', color: '#14b8a6' },
    { label: 'Other (Custom)', value: 'other', color: '#6b7280' },
  ];

  const selectedType = eventTypes.find((t) => t.value === formData.type);
  const isCustomType = formData.type && !eventTypes.find((t) => t.value === formData.type);

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
            <Text style={styles.title}>New Event</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <XIcon size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Event Name */}
            <View style={styles.field}>
              <Text style={styles.label}>Event Title</Text>
              <TextInput
                style={styles.input}
                value={formData.title}
                onChangeText={(text) => setFormData({ ...formData, title: text })}
                placeholder="Enter event title"
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* Type Selection */}
            <View style={styles.field}>
              <View style={styles.labelRow}>
                <TagIcon size={16} color="#374151" />
                <Text style={styles.label}>Event Type</Text>
              </View>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowTypePicker(!showTypePicker)}
              >
                <View style={styles.selectedCourse}>
                  <View
                    style={[
                      styles.courseDot,
                      { backgroundColor: isCustomType ? '#6b7280' : (selectedType?.color || '#6b7280') },
                    ]}
                  />
                  <Text style={styles.selectButtonText}>
                    {isCustomType ? formData.type : (selectedType?.label || 'Select Type')}
                  </Text>
                </View>
              </TouchableOpacity>

              {showTypePicker && (
                <View style={styles.pickerContainer}>
                  {eventTypes.map((type) => (
                    <TouchableOpacity
                      key={type.value}
                      style={styles.pickerItem}
                      onPress={() => {
                        if (type.value === 'other') {
                          setCustomEventType('');
                          setFormData({ ...formData, type: '' });
                        } else {
                          setFormData({ ...formData, type: type.value });
                        }
                        setShowTypePicker(false);
                      }}
                    >
                      <View
                        style={[
                          styles.courseDot,
                          { backgroundColor: type.color },
                        ]}
                      />
                      <Text style={styles.pickerItemText}>{type.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Custom Event Type Input */}
              {(formData.type === '' || isCustomType) && (
                <View style={styles.customTypeContainer}>
                  <TextInput
                    style={styles.input}
                    value={formData.type}
                    onChangeText={(text) => setFormData({ ...formData, type: text })}
                    placeholder="Enter custom event type"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              )}
            </View>

            {/* Course Selection */}
            <View style={styles.field}>
              <View style={styles.labelRow}>
                <BookIcon size={16} color="#374151" />
                <Text style={styles.label}>Course (Optional)</Text>
              </View>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowCoursePicker(!showCoursePicker)}
              >
                {selectedCourse ? (
                  <View style={styles.selectedCourse}>
                    <LinearGradient
                      colors={[
                        selectedCourse.color || '#6366f1',
                        selectedCourse.color || '#a855f7',
                      ]}
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
                  <TouchableOpacity
                    style={styles.pickerItem}
                    onPress={() => {
                      setFormData({ ...formData, courseId: '' });
                      setShowCoursePicker(false);
                    }}
                  >
                    <View style={[styles.courseDot, styles.noneCourseDot]} />
                    <Text style={styles.pickerItemText}>None</Text>
                  </TouchableOpacity>
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
                        colors={[
                          course.color || '#6366f1',
                          course.color || '#a855f7',
                        ]}
                        style={styles.courseDot}
                      />
                      <Text style={styles.pickerItemText}>{course.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Date */}
            <View style={styles.field}>
              <View style={styles.labelRow}>
                <CalendarIcon size={16} color="#374151" />
                <Text style={styles.label}>Date</Text>
              </View>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={formData.date ? styles.selectButtonText : styles.selectPlaceholder}>
                  {formData.date || 'Select date'}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={formData.date ? new Date(formData.date) : new Date()}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(Platform.OS === 'ios');
                    if (selectedDate) {
                      const dateStr = selectedDate.toISOString().split('T')[0];
                      setFormData({ ...formData, date: dateStr });
                    }
                  }}
                />
              )}
            </View>

            {/* Time */}
            <View style={styles.row}>
              <View style={[styles.field, styles.halfField]}>
                <View style={styles.labelRow}>
                  <ClockIcon size={16} color="#374151" />
                  <Text style={styles.label}>Start Time</Text>
                </View>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => setShowStartTimePicker(true)}
                >
                  <Text style={formData.startTime ? styles.selectButtonText : styles.selectPlaceholder}>
                    {formData.startTime || 'Select time'}
                  </Text>
                </TouchableOpacity>
                {showStartTimePicker && (
                  <DateTimePicker
                    value={
                      formData.startTime
                        ? new Date(`2000-01-01T${formData.startTime}`)
                        : new Date()
                    }
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedTime) => {
                      setShowStartTimePicker(Platform.OS === 'ios');
                      if (selectedTime) {
                        const hours = selectedTime.getHours().toString().padStart(2, '0');
                        const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
                        setFormData({ ...formData, startTime: `${hours}:${minutes}` });
                      }
                    }}
                  />
                )}
              </View>

              <View style={[styles.field, styles.halfField]}>
                <View style={styles.labelRow}>
                  <ClockIcon size={16} color="#374151" />
                  <Text style={styles.label}>End Time</Text>
                </View>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => setShowEndTimePicker(true)}
                >
                  <Text style={formData.endTime ? styles.selectButtonText : styles.selectPlaceholder}>
                    {formData.endTime || 'Select time'}
                  </Text>
                </TouchableOpacity>
                {showEndTimePicker && (
                  <DateTimePicker
                    value={
                      formData.endTime
                        ? new Date(`2000-01-01T${formData.endTime}`)
                        : new Date()
                    }
                    mode="time"
                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                    onChange={(event, selectedTime) => {
                      setShowEndTimePicker(Platform.OS === 'ios');
                      if (selectedTime) {
                        const hours = selectedTime.getHours().toString().padStart(2, '0');
                        const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
                        setFormData({ ...formData, endTime: `${hours}:${minutes}` });
                      }
                    }}
                  />
                )}
              </View>
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
                placeholder="Add details about this event"
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
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
                    <Text style={styles.submitButtonText}>Create Event</Text>
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
  noneCourseDot: {
    backgroundColor: '#9ca3af',
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 12,
    marginTop: 8,
    padding: 8,
    gap: 4,
    borderWidth: hairline,
    borderColor: subtleBorder,
    zIndex: 10,
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
  customTypeContainer: {
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfField: {
    flex: 1,
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

export default AddEventScreen;
