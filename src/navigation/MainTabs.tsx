import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { hairline, subtleBorder } from '../theme';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LinearGradient from 'react-native-linear-gradient';
import {
  HomeIcon,
  CalendarIcon,
  BookIcon,
  CheckSquareIcon,
  TrendingUpIcon,
  PlusIcon,
} from '../components/Icons';

import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import CoursesScreen from '../screens/CoursesScreen';
import TasksScreen from '../screens/TasksScreen';
import ProgressScreen from '../screens/ProgressScreen';

const Tab = createBottomTabNavigator();

interface MainTabsProps {
  onAddTask: () => void;
  onAddEvent: () => void;
  onAddCourse: () => void;
  onNavigateToAccount: () => void;
  onNavigateToNotifications: () => void;
  selectedCourse: string | null;
  onSelectCourse: (courseId: string) => void;
  onEditTask: (task: any) => void;
  onClearCourse: () => void;
  onTabChange: (tabName: string) => void;
  initialRouteName?: string;
}

const MainTabs: React.FC<MainTabsProps> = ({
  onAddTask,
  onAddEvent,
  onAddCourse,
  onNavigateToAccount,
  onNavigateToNotifications,
  selectedCourse,
  onSelectCourse,
  onEditTask,
  onClearCourse,
  onTabChange,
  initialRouteName = 'Home',
}) => {
  const getTabIcon = (routeName: string, focused: boolean) => {
    const color = focused ? '#6366f1' : '#6b7280';
    const size = focused ? 24 : 22;

    switch (routeName) {
      case 'Home':
        return <HomeIcon size={size} color={color} />;
      case 'Calendar':
        return <CalendarIcon size={size} color={color} />;
      case 'Courses':
        return <BookIcon size={size} color={color} />;
      case 'Tasks':
        return <CheckSquareIcon size={size} color={color} />;
      case 'Progress':
        return <TrendingUpIcon size={size} color={color} />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Tab.Navigator
        initialRouteName={initialRouteName}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused }) => getTabIcon(route.name, focused),
          tabBarActiveTintColor: '#6366f1',
          tabBarInactiveTintColor: '#6b7280',
          tabBarStyle: styles.tabBar,
          tabBarItemStyle: styles.tabBarItem,
          tabBarLabelStyle: styles.tabBarLabel,
        })}
        screenListeners={{
          state: (e) => {
            const route = e.data.state.routes[e.data.state.index];
            onTabChange(route.name);
          },
        }}
      >
        <Tab.Screen name="Home">
          {() => (
            <HomeScreen
              onAddTask={onAddTask}
              onNavigateToAccount={onNavigateToAccount}
              onNavigateToNotifications={onNavigateToNotifications}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Calendar">
          {() => <CalendarScreen onAddEvent={onAddEvent} />}
        </Tab.Screen>
        <Tab.Screen name="Courses">
          {() => <CoursesScreen onSelectCourse={onSelectCourse} onAddCourse={onAddCourse} />}
        </Tab.Screen>
        <Tab.Screen name="Tasks">
          {() => (
            <TasksScreen
              selectedCourse={selectedCourse}
              onEditTask={onEditTask}
              onBack={onClearCourse}
            />
          )}
        </Tab.Screen>
        <Tab.Screen name="Progress" component={ProgressScreen} />
      </Tab.Navigator>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={styles.fabContainer}
        onPress={onAddTask}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={['#6366f1', '#a855f7']}
          style={styles.fab}
        >
          <PlusIcon size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    height: 72,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 24,
    borderWidth: hairline,
    borderColor: subtleBorder,
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 10,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarItem: {
    paddingTop: 4,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '500',
    marginTop: 4,
  },
  fabContainer: {
    position: 'absolute',
    bottom: 100,
    right: 24,
    zIndex: 100,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6366f1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
});

export default MainTabs;
