import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GlassCard from '../components/GlassCard';
import {
  UserIcon,
  MailIcon,
  BellIcon,
  PaletteIcon,
  LockIcon,
  HelpCircleIcon,
  ChevronRightIcon,
  EditIcon,
  AwardIcon,
  TargetIcon,
  CalendarIcon,
  LogOutIcon,
} from '../components/Icons';
import { tasks, courses } from '../data/mockData';

const AccountScreen: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  // Calculate user stats
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);
  const activeCourses = courses.length;

  const settingsItems = [
    {
      icon: BellIcon,
      title: 'Notifications',
      description: 'Push notifications for deadlines',
      hasToggle: true,
      value: notificationsEnabled,
      onToggle: setNotificationsEnabled,
      colors: ['#6366f1', '#a855f7'],
    },
    {
      icon: PaletteIcon,
      title: 'Appearance',
      description: 'Glassmorphism theme',
      hasToggle: false,
      colors: ['#f97316', '#ef4444'],
    },
    {
      icon: LockIcon,
      title: 'Privacy & Security',
      description: 'Manage your data',
      hasToggle: false,
      colors: ['#10b981', '#06b6d4'],
    },
    {
      icon: HelpCircleIcon,
      title: 'Help & Support',
      description: 'Get help with the app',
      hasToggle: false,
      colors: ['#3b82f6', '#6366f1'],
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Account</Text>
        <Text style={styles.subtitle}>Manage your profile and preferences</Text>
      </View>

      {/* Profile Card */}
      <GlassCard style={styles.profileCard}>
        <View style={styles.profileContent}>
          <View style={styles.avatarContainer}>
            <LinearGradient
              colors={['#6366f1', '#a855f7']}
              style={styles.avatar}
            >
              <Text style={styles.avatarText}>JD</Text>
            </LinearGradient>
            <TouchableOpacity activeOpacity={0.8}>
              <LinearGradient
                colors={['#6366f1', '#a855f7']}
                style={styles.editButton}
              >
                <EditIcon size={14} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <View style={styles.emailRow}>
              <MailIcon size={14} color="#6b7280" />
              <Text style={styles.profileEmail}>john.doe@university.edu</Text>
            </View>
            <LinearGradient
              colors={['#4ade80', '#10b981']}
              style={styles.premiumBadge}
            >
              <AwardIcon size={14} color="#fff" />
              <Text style={styles.premiumText}>Premium Student</Text>
            </LinearGradient>
          </View>
        </View>
      </GlassCard>

      {/* Quick Stats */}
      <View style={styles.statsRow}>
        <GlassCard style={styles.statCard}>
          <LinearGradient
            colors={['#60a5fa', '#6366f1']}
            style={styles.statIcon}
          >
            <TargetIcon size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.statNumber}>{completionRate}%</Text>
          <Text style={styles.statLabel}>Completion</Text>
        </GlassCard>

        <GlassCard style={styles.statCard}>
          <LinearGradient
            colors={['#a78bfa', '#ec4899']}
            style={styles.statIcon}
          >
            <CalendarIcon size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.statNumber}>{activeCourses}</Text>
          <Text style={styles.statLabel}>Courses</Text>
        </GlassCard>

        <GlassCard style={styles.statCard}>
          <LinearGradient
            colors={['#4ade80', '#10b981']}
            style={styles.statIcon}
          >
            <AwardIcon size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.statNumber}>{completedTasks}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </GlassCard>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsList}>
          {settingsItems.map((item) => {
            const Icon = item.icon;
            return (
              <GlassCard key={item.title} style={styles.settingItem}>
                <View style={styles.settingContent}>
                  <LinearGradient
                    colors={item.colors}
                    style={styles.settingIcon}
                  >
                    <Icon size={24} color="#fff" />
                  </LinearGradient>
                  <View style={styles.settingInfo}>
                    <Text style={styles.settingTitle}>{item.title}</Text>
                    <Text style={styles.settingDescription}>
                      {item.description}
                    </Text>
                  </View>
                  {item.hasToggle ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ false: '#d1d5db', true: '#a5b4fc' }}
                      thumbColor={item.value ? '#6366f1' : '#f4f4f5'}
                    />
                  ) : (
                    <ChevronRightIcon size={20} color="#9ca3af" />
                  )}
                </View>
              </GlassCard>
            );
          })}
        </View>
      </View>

      {/* Account Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.settingsList}>
          <GlassCard style={styles.settingItem}>
            <View style={styles.settingContent}>
              <LinearGradient
                colors={['#60a5fa', '#06b6d4']}
                style={styles.settingIcon}
              >
                <UserIcon size={24} color="#fff" />
              </LinearGradient>
              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>Edit Profile</Text>
                <Text style={styles.settingDescription}>
                  Update your personal information
                </Text>
              </View>
              <ChevronRightIcon size={20} color="#9ca3af" />
            </View>
          </GlassCard>

          <GlassCard style={{...styles.settingItem, ...styles.logoutItem}}>
            <View style={styles.settingContent}>
              <LinearGradient
                colors={['#ef4444', '#dc2626']}
                style={styles.settingIcon}
              >
                <LogOutIcon size={24} color="#fff" />
              </LinearGradient>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, styles.logoutText]}>
                  Log Out
                </Text>
                <Text style={styles.settingDescription}>
                  Sign out of your account
                </Text>
              </View>
            </View>
          </GlassCard>
        </View>
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
  profileCard: {
    padding: 20,
    marginBottom: 16,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  avatarText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#fff',
  },
  editButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6b7280',
  },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  premiumText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  settingsList: {
    gap: 12,
  },
  settingItem: {
    padding: 16,
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingIcon: {
    width: 48,
    height: 48,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  logoutItem: {
    marginTop: 8,
  },
  logoutText: {
    color: '#dc2626',
  },
  bottomSpacer: {
    height: 100,
  },
});

export default AccountScreen;
