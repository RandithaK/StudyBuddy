import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@apollo/client';
import { REGISTER_MUTATION } from '../api/queries';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { AppLogo } from '../components/Icons';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registerMutation, { loading }] = useMutation(REGISTER_MUTATION, {
    onCompleted: async (data: any) => {
      const { token, user } = data.register;
      await login(token, user);
    },
    onError: (error: any) => {
      Alert.alert('Registration Failed', error.message);
    },
  });

  const handleRegister = () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    registerMutation({
      variables: {
        input: {
          name,
          email,
          password,
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.blobContainer}>
        <LinearGradient
          colors={['#c4b5fd', '#a78bfa']}
          style={[styles.blob, styles.blob1]}
        />
        <LinearGradient
          colors={['#93c5fd', '#60a5fa']}
          style={[styles.blob, styles.blob2]}
        />
      </View>

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <AppLogo size={80} />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join StudyBuddy today</Text>
        </View>

        <GlassCard style={styles.formCard}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor="#9ca3af"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#9ca3af"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Create a password"
              placeholderTextColor="#9ca3af"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            onPress={handleRegister}
            disabled={loading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={['#6366f1', '#a855f7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Sign Up</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </GlassCard>

        <TouchableOpacity
          style={styles.footer}
          onPress={() => navigation.navigate('Login' as never)}
        >
          <Text style={styles.footerText}>
            Already have an account? <Text style={styles.link}>Sign In</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  blobContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  blob: {
    position: 'absolute',
    borderRadius: 200,
    opacity: 0.6,
  },
  blob1: {
    top: -50,
    left: -50,
    width: 250,
    height: 250,
  },
  blob2: {
    bottom: 50,
    right: -50,
    width: 200,
    height: 200,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  formCard: {
    padding: 24,
    gap: 16,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4b5563',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#1f2937',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 24,
    alignItems: 'center',
  },
  footerText: {
    color: '#6b7280',
    fontSize: 14,
  },
  link: {
    color: '#6366f1',
    fontWeight: '600',
  },
});

export default RegisterScreen;
