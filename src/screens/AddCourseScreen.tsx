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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useMutation } from '@apollo/client';
import GlassCard from '../components/GlassCard';
import { hairline, subtleBorder, cardBG } from '../theme';
import { XIcon } from '../components/Icons';
import { CREATE_COURSE_MUTATION, GET_COURSES_QUERY } from '../api/queries';

interface AddCourseScreenProps {
  onClose: () => void;
  onSave: () => void;
}

const AddCourseScreen: React.FC<AddCourseScreenProps> = ({ onClose, onSave }) => {
  const [name, setName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#6366f1');

  const [createCourse, { loading }] = useMutation(CREATE_COURSE_MUTATION, {
    refetchQueries: [{ query: GET_COURSES_QUERY }],
    onCompleted: () => {
      onSave();
      onClose();
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  const colors = [
    '#6366f1', // Indigo
    '#ec4899', // Pink
    '#8b5cf6', // Violet
    '#3b82f6', // Blue
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#06b6d4', // Cyan
  ];

  const handleSubmit = () => {
    if (!name.trim()) {
      Alert.alert('Missing Name', 'Please enter a course name.');
      return;
    }

    createCourse({
      variables: {
        input: {
          name: name,
          color: selectedColor,
        },
      },
    });
  };

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
            <Text style={styles.title}>New Course</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <XIcon size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* Course Name */}
            <View style={styles.field}>
              <Text style={styles.label}>Course Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="e.g. Mathematics"
                placeholderTextColor="#9ca3af"
              />
            </View>

            {/* Color Selection */}
            <View style={styles.field}>
              <Text style={styles.label}>Color Theme</Text>
              <View style={styles.colorsGrid}>
                {colors.map((color) => (
                  <TouchableOpacity
                    key={color}
                    onPress={() => setSelectedColor(color)}
                    style={[
                      styles.colorOption,
                      { backgroundColor: color },
                      selectedColor === color && styles.selectedColor,
                    ]}
                  >
                    {selectedColor === color && (
                      <View style={styles.colorCheck} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Preview */}
            <View style={styles.previewContainer}>
              <Text style={styles.label}>Preview</Text>
              <GlassCard style={styles.previewCard}>
                <View style={styles.previewHeader}>
                  <LinearGradient
                    colors={[selectedColor, selectedColor]}
                    style={styles.previewIcon}
                  >
                    <Text style={styles.previewInitial}>
                      {name ? name.charAt(0).toUpperCase() : '?'}
                    </Text>
                  </LinearGradient>
                  <View>
                    <Text style={styles.previewName}>
                      {name || 'Course Name'}
                    </Text>
                    <Text style={styles.previewSubtitle}>0 tasks completed</Text>
                  </View>
                </View>
              </GlassCard>
            </View>

            {/* Action Buttons */}
            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onClose}
                activeOpacity={0.8}
                disabled={loading}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmit}
                activeOpacity={0.8}
                disabled={loading}
              >
                <LinearGradient
                  colors={['#6366f1', '#a855f7']}
                  style={styles.submitButton}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="#fff" />
                  ) : (
                    <Text style={styles.submitButtonText}>Create Course</Text>
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
    gap: 24,
  },
  field: {
    gap: 12,
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
  colorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  colorCheck: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  previewContainer: {
    gap: 8,
  },
  previewCard: {
    padding: 16,
    backgroundColor: cardBG,
    borderWidth: hairline,
    borderColor: subtleBorder,
  },
  previewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  previewIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewInitial: {
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
  },
  previewName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#1f2937',
  },
  previewSubtitle: {
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

export default AddCourseScreen;
