/**
 * StudyBuddy - A Study Planner App
 * React Native Implementation based on Reference Designs
 */

import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ApolloProvider } from '@apollo/client';

import SplashScreen from './src/screens/SplashScreen';
import MainTabs from './src/navigation/MainTabs';
import AccountScreen from './src/screens/AccountScreen';
import AddEditTaskScreen from './src/screens/AddEditTaskScreen';
import AddEventScreen from './src/screens/AddEventScreen';
import AddCourseScreen from './src/screens/AddCourseScreen';
import { Task } from './src/data/mockData';
import { client } from './src/api/client';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AuthStack from './src/navigation/AuthStack';

import EditProfileScreen from './src/screens/EditProfileScreen';
import DeveloperContactScreen from './src/screens/DeveloperContactScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';

type AppScreen = 'splash' | 'main' | 'account' | 'addEditTask' | 'addEvent' | 'addCourse' | 'editProfile' | 'developerContact' | 'notifications';

function AuthenticatedApp(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [activeTab, setActiveTab] = useState('Home');

  // Auto-dismiss splash screen after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentScreen === 'splash') {
        setCurrentScreen('main');
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [currentScreen]);

  const handleContinueFromSplash = () => {
    setCurrentScreen('main');
  };

  const handleNavigateToAccount = () => {
    setCurrentScreen('account');
  };

  const handleNavigateToEditProfile = () => {
    setCurrentScreen('editProfile');
  };

  const handleCloseEditProfile = () => {
    setCurrentScreen('account');
  };

  const handleNavigateToDeveloperContact = () => {
    setCurrentScreen('developerContact');
  };

  const handleCloseDeveloperContact = () => {
    setCurrentScreen('account');
  };

  const handleNavigateToNotifications = () => {
    setCurrentScreen('notifications');
  };

  const handleCloseNotifications = () => {
    setCurrentScreen('main');
  };

  const handleAddTask = () => {
    setEditingTask(null);
    setCurrentScreen('addEditTask');
  };

  const handleAddEvent = () => {
    setCurrentScreen('addEvent');
  };

  const handleAddCourse = () => {
    setCurrentScreen('addCourse');
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setCurrentScreen('addEditTask');
  };

  const handleCloseForm = () => {
    setEditingTask(null);
    setCurrentScreen('main');
  };

  const handleSaveTask = () => {
    setEditingTask(null);
    setCurrentScreen('main');
  };

  const handleSaveEvent = () => {
    setCurrentScreen('main');
  };

  const handleSaveCourse = () => {
    setCurrentScreen('main');
  };

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const handleClearCourse = () => {
    setSelectedCourse(null);
  };

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onContinue={handleContinueFromSplash} />;

      case 'account':
        return (
          <SafeAreaView style={styles.safeArea} edges={['top']}>
            <AccountScreen 
              onBack={() => setCurrentScreen('main')}
              onNavigateToEditProfile={handleNavigateToEditProfile}
              onNavigateToDeveloperContact={handleNavigateToDeveloperContact}
            />
          </SafeAreaView>
        );

      case 'notifications':
        return (
          <SafeAreaView style={styles.safeArea} edges={['top']}>
            <NotificationsScreen onBack={handleCloseNotifications} />
          </SafeAreaView>
        );

      case 'developerContact':
        return (
          <SafeAreaView style={styles.safeArea} edges={['top']}>
            <DeveloperContactScreen
              onBack={handleCloseDeveloperContact}
            />
          </SafeAreaView>
        );

      case 'editProfile':
        return (
          <SafeAreaView style={styles.safeArea} edges={['top']}>
            <EditProfileScreen
              onBack={handleCloseEditProfile}
              onSave={handleCloseEditProfile}
            />
          </SafeAreaView>
        );

      case 'addEditTask':
        return (
          <SafeAreaView style={styles.safeArea} edges={['top']}>
            <AddEditTaskScreen
              task={editingTask}
              onClose={handleCloseForm}
              onSave={handleSaveTask}
            />
          </SafeAreaView>
        );

      case 'addEvent':
        return (
          <SafeAreaView style={styles.safeArea} edges={['top']}>
            <AddEventScreen
              onClose={handleCloseForm}
              onSave={handleSaveEvent}
            />
          </SafeAreaView>
        );

      case 'addCourse':
        return (
          <SafeAreaView style={styles.safeArea} edges={['top']}>
            <AddCourseScreen
              onClose={handleCloseForm}
              onSave={handleSaveCourse}
            />
          </SafeAreaView>
        );

      case 'main':
      default:
        return (
          <NavigationContainer>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
              <MainTabs
                onAddTask={handleAddTask}
                onAddEvent={handleAddEvent}
                onAddCourse={handleAddCourse}
                onNavigateToAccount={handleNavigateToAccount}
                onNavigateToNotifications={handleNavigateToNotifications}
                selectedCourse={selectedCourse}
                onSelectCourse={handleSelectCourse}
                onEditTask={handleEditTask}
                onClearCourse={handleClearCourse}
                onTabChange={handleTabChange}
                initialRouteName={activeTab}
              />
            </SafeAreaView>
          </NavigationContainer>
        );
    }
  };

  return (
    <View style={styles.container}>{renderScreen()}</View>
  );
}

import { onLogout } from './src/api/client';

function Root() {
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    const unsubscribe = onLogout(() => {
      logout();
    });
    return unsubscribe;
  }, [logout]);

  if (isLoading) {
    return <SplashScreen onContinue={() => {}} />;
  }

  return user ? <AuthenticatedApp /> : <AuthStack />;
}

import BackgroundFetch from 'react-native-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from './src/api/client';

import { notificationService } from './src/services/NotificationService';

// Define the background task
const backgroundTask = async (taskId: string) => {
  console.log('[BackgroundFetch] taskId: ', taskId);

  try {
    // Check pending triggers
    const triggers = await notificationService.getPendingTriggers();
    const now = Date.now();
    const oneHour = 60 * 60 * 1000;
    
    // Find triggers that fired more than 1 hour ago
    const overdueTriggers = triggers.filter((t: any) => now > t.timestamp + oneHour);

    if (overdueTriggers.length > 0) {
        console.log(`[BackgroundFetch] Found ${overdueTriggers.length} overdue notifications. Checking with backend...`);
        
        const token = await AsyncStorage.getItem('userToken');

        if (token) {
            // Use BASE_URL from client config or fallback
            const url = BASE_URL || 'http://10.0.2.2:8080';
            const response = await fetch(`${url}/api/notifications/check-email-fallback`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const text = await response.text();
            console.log('[BackgroundFetch] Response:', text);
            
            // Remove processed triggers so we don't check them again
            for (const t of overdueTriggers) {
                await notificationService.removePendingTrigger(t.id);
            }
        } else {
            console.log('[BackgroundFetch] No token found');
        }
    } else {
        console.log('[BackgroundFetch] No overdue notifications to process.');
    }

  } catch (error) {
    console.error('[BackgroundFetch] Error:', error);
  }

  // Signal completion
  BackgroundFetch.finish(taskId);
};

export default function App() {
  useEffect(() => {
    // Configure BackgroundFetch
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15, // 15 minutes
        stopOnTerminate: false,
        startOnBoot: true,
        enableHeadless: true,
        forceAlarmManager: false,
      },
      backgroundTask,
      (error) => {
        console.log('[BackgroundFetch] Failed to start:', error);
      }
    );
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <ApolloProvider client={client}>
          <AuthProvider>
            <Root />
          </AuthProvider>
        </ApolloProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f4ff',
  },
});
