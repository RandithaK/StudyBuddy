import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useMutation } from '@apollo/client';
import { useAuth } from '../context/AuthContext';
import { UPDATE_USER_MUTATION, CHANGE_PASSWORD_MUTATION } from '../api/queries';
import GlassCard from '../components/GlassCard';
import { hairline, subtleBorder, cardBG } from '../theme';
import { ChevronLeftIcon, UserIcon, MailIcon, SaveIcon, LockIcon } from '../components/Icons';

interface EditProfileScreenProps {
  onBack: () => void;
  onSave: () => void;
}

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ onBack, onSave }) => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  
  const [updateUser, { loading }] = useMutation(UPDATE_USER_MUTATION, {
    onCompleted: () => {
      Alert.alert('Success', 'Profile updated successfully');
      onSave();
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  const [changePassword, { loading: passwordLoading }] = useMutation(CHANGE_PASSWORD_MUTATION, {
    onCompleted: () => {
      Alert.alert('Success', 'Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordSection(false);
    },
    onError: (error) => {
      Alert.alert('Error', error.message);
    },
  });

  const handleSave = () => {
    if (!name.trim() || !email.trim()) {
      Alert.alert('Error', 'Name and Email are required');
      return;
    }

    updateUser({
      variables: {
        input: {
          name,
          email,
        },
      },
    });
  };

  const handlePasswordChange = () => {
    if (!currentPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      Alert.alert('Error', 'All password fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    changePassword({
      variables: {
        input: {
          currentPassword,
          newPassword,
        },
      },
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={onBack} style={styles.backButton}>
            <ChevronLeftIcon size={24} color="#1f2937" />
          </TouchableOpacity>
          <Text style={styles.title}>Edit Profile</Text>
          <View style={styles.spacer} /> 
        </View>

        <View style={styles.form}>
          <GlassCard style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <UserIcon size={16} color="#6366f1" />
              <Text style={styles.label}>Full Name</Text>
            </View>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              placeholderTextColor="#9ca3af"
            />
          </GlassCard>

          <GlassCard style={styles.inputGroup}>
            <View style={styles.labelContainer}>
              <MailIcon size={16} color="#6366f1" />
              <Text style={styles.label}>Email Address</Text>
            </View>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </GlassCard>

          {/* Password Change Section */}
          <TouchableOpacity
            onPress={() => setShowPasswordSection(!showPasswordSection)}
            style={styles.passwordToggle}
          >
            <View style={styles.passwordToggleContent}>
              <LockIcon size={20} color="#6366f1" />
              <Text style={styles.passwordToggleText}>Change Password</Text>
            </View>
            <Text style={styles.toggleIndicator}>{showPasswordSection ? '−' : '+'}</Text>
          </TouchableOpacity>

          {showPasswordSection && (
            <>
              <GlassCard style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <LockIcon size={16} color="#6366f1" />
                  <Text style={styles.label}>Current Password</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                  placeholder="Enter current password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                />
              </GlassCard>

              <GlassCard style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <LockIcon size={16} color="#6366f1" />
                  <Text style={styles.label}>New Password</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={newPassword}
                  onChangeText={setNewPassword}
                  placeholder="Enter new password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                />
              </GlassCard>

              <GlassCard style={styles.inputGroup}>
                <View style={styles.labelContainer}>
                  <LockIcon size={16} color="#6366f1" />
                  <Text style={styles.label}>Confirm New Password</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="Confirm new password"
                  placeholderTextColor="#9ca3af"
                  secureTextEntry
                />
              </GlassCard>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={handlePasswordChange}
                disabled={passwordLoading}
                style={styles.passwordButtonContainer}
              >
                <LinearGradient
                  colors={['#ec4899', '#a855f7']}
                  style={styles.passwordButton}
                >
                  {passwordLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <SaveIcon size={20} color="#fff" />
                      <Text style={styles.passwordButtonText}>Update Password</Text>
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </>
          )}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSave}
          disabled={loading}
          style={styles.saveButtonContainer}
        >
          <LinearGradient
            colors={['#6366f1', '#a855f7']}
            style={styles.saveButton}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <SaveIcon size={20} color="#fff" />
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  contentContainer: {
    padding: 24,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 32,
    marginTop: 8,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  link: {
    color: '#6366f1',
    fontWeight: '600',
  },
  spacer: {
    width: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1f2937',
  },
  form: {
    gap: 20,
  },
  inputGroup: {
    padding: 16,
    backgroundColor: cardBG,
    borderWidth: hairline,
    borderColor: subtleBorder,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },
  input: {
    fontSize: 16,
    color: '#1f2937',
    padding: 0,
  },
  saveButtonContainer: {
    marginTop: 32,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  passwordToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: cardBG,
    borderWidth: hairline,
    borderColor: subtleBorder,
    borderRadius: 12,
    marginTop: 12,
  },
  passwordToggleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  passwordToggleText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
  },
  toggleIndicator: {
    fontSize: 24,
    fontWeight: '300',
    color: '#6366f1',
  },
  passwordButtonContainer: {
    marginTop: 16,
  },
  passwordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 16,
    borderRadius: 16,
    shadowColor: '#ec4899',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  passwordButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
});

export default EditProfileScreen;
