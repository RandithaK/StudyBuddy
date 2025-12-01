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
import { Task } from './src/data/mockData';
import { client } from './src/api/client';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import AuthStack from './src/navigation/AuthStack';

type AppScreen = 'splash' | 'main' | 'account' | 'addEditTask';

function AuthenticatedApp(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('splash');
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

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

  const handleAddTask = () => {
    setEditingTask(null);
    setCurrentScreen('addEditTask');
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setCurrentScreen('addEditTask');
  };

  const handleCloseTaskForm = () => {
    setEditingTask(null);
    setCurrentScreen('main');
  };

  const handleSaveTask = (task: Task) => {
    console.log('Task saved:', task);
    setEditingTask(null);
    setCurrentScreen('main');
  };

  const handleSelectCourse = (courseId: string) => {
    setSelectedCourse(courseId);
  };

  const handleClearCourse = () => {
    setSelectedCourse(null);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onContinue={handleContinueFromSplash} />;

      case 'account':
        return (
          <SafeAreaView style={styles.safeArea} edges={['top']}>
            <AccountScreen />
          </SafeAreaView>
        );

      case 'addEditTask':
        return (
          <SafeAreaView style={styles.safeArea} edges={['top']}>
            <AddEditTaskScreen
              task={editingTask}
              onClose={handleCloseTaskForm}
              onSave={handleSaveTask}
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
                onNavigateToAccount={handleNavigateToAccount}
                selectedCourse={selectedCourse}
                onSelectCourse={handleSelectCourse}
                onEditTask={handleEditTask}
                onClearCourse={handleClearCourse}
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

function Root() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <SplashScreen onContinue={() => {}} />;
  }

  return user ? <AuthenticatedApp /> : <AuthStack />;
}

export default function App() {
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
