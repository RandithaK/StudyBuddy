import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Rect, G, Text as SvgText } from 'react-native-svg';
import GlassCard from '../components/GlassCard';
import { TrendingUpIcon, TargetIcon, AwardIcon, CalendarIcon } from '../components/Icons';
import { tasks } from '../data/mockData';

const { width } = Dimensions.get('window');

const ProgressScreen: React.FC = () => {
  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const overallCompletion = Math.round((completedTasks / totalTasks) * 100);
  const studyStreak = 7; // Mock data

  // Weekly activity data
  const weeklyData = [
    { day: 'Mon', tasks: 4 },
    { day: 'Tue', tasks: 6 },
    { day: 'Wed', tasks: 5 },
    { day: 'Thu', tasks: 8 },
    { day: 'Fri', tasks: 7 },
    { day: 'Sat', tasks: 3 },
    { day: 'Sun', tasks: 2 },
  ];

  const maxTasks = Math.max(...weeklyData.map((d) => d.tasks));
  const chartWidth = width - 88;
  const chartHeight = 160;
  const barWidth = (chartWidth - 60) / 7;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Progress</Text>
          <Text style={styles.subtitle}>Track your academic journey</Text>
        </View>
        <TrendingUpIcon size={32} color="#6366f1" />
      </View>

      {/* Key Stats */}
      <View style={styles.statsRow}>
        <GlassCard style={styles.statCard}>
          <LinearGradient
            colors={['#4ade80', '#10b981']}
            style={styles.statIcon}
          >
            <TargetIcon size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.statNumber}>{overallCompletion}%</Text>
          <Text style={styles.statLabel}>Overall</Text>
        </GlassCard>

        <GlassCard style={styles.statCard}>
          <LinearGradient
            colors={['#f97316', '#ef4444']}
            style={styles.statIcon}
          >
            <AwardIcon size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.statNumber}>{studyStreak}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </GlassCard>

        <GlassCard style={styles.statCard}>
          <LinearGradient
            colors={['#60a5fa', '#6366f1']}
            style={styles.statIcon}
          >
            <CalendarIcon size={24} color="#fff" />
          </LinearGradient>
          <Text style={styles.statNumber}>{completedTasks}</Text>
          <Text style={styles.statLabel}>Completed</Text>
        </GlassCard>
      </View>

      {/* Task Completion Pie Chart */}
      <GlassCard style={styles.chartCard}>
        <Text style={styles.chartTitle}>Task Completion</Text>
        <View style={styles.pieContainer}>
          {/* Simple pie chart representation */}
          <View style={styles.pieChart}>
            <Svg width={160} height={160} viewBox="0 0 160 160">
              {/* Background circle */}
              <G transform="translate(80, 80)">
                <Rect
                  x={-60}
                  y={-60}
                  width={120}
                  height={120}
                  rx={60}
                  fill="#6366f1"
                />
                {/* Completed portion - simplified arc representation */}
                <Rect
                  x={-50}
                  y={-50}
                  width={100}
                  height={100}
                  rx={50}
                  fill="#10b981"
                  opacity={(completedTasks / totalTasks)}
                />
                {/* Center circle */}
                <Rect
                  x={-35}
                  y={-35}
                  width={70}
                  height={70}
                  rx={35}
                  fill="rgba(255,255,255,0.9)"
                />
              </G>
            </Svg>
            <View style={styles.pieCenter}>
              <Text style={styles.pieCenterText}>{overallCompletion}%</Text>
            </View>
          </View>
          
          <View style={styles.legendContainer}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.legendDotGreen]} />
              <Text style={styles.legendText}>
                Completed: {completedTasks} ({Math.round((completedTasks / totalTasks) * 100)}%)
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.legendDotPurple]} />
              <Text style={styles.legendText}>
                Pending: {pendingTasks} ({Math.round((pendingTasks / totalTasks) * 100)}%)
              </Text>
            </View>
          </View>
        </View>
      </GlassCard>

      {/* Weekly Activity Bar Chart */}
      <GlassCard style={styles.chartCard}>
        <Text style={styles.chartTitle}>7-Day Activity</Text>
        <View style={styles.barChartContainer}>
          <Svg width={chartWidth} height={chartHeight + 30}>
            {/* Grid lines */}
            {[0, 2, 4, 6, 8].map((val, i) => (
              <G key={i}>
                <Rect
                  x={30}
                  y={chartHeight - (val / maxTasks) * chartHeight}
                  width={chartWidth - 30}
                  height={1}
                  fill="rgba(200, 200, 200, 0.3)"
                />
                <SvgText
                  x={20}
                  y={chartHeight - (val / maxTasks) * chartHeight + 4}
                  fontSize={10}
                  fill="#9ca3af"
                  textAnchor="end"
                >
                  {val}
                </SvgText>
              </G>
            ))}

            {/* Bars */}
            {weeklyData.map((item, index) => {
              const barHeight = (item.tasks / maxTasks) * (chartHeight - 10);
              const x = 40 + index * barWidth;
              const y = chartHeight - barHeight;

              return (
                <G key={item.day}>
                  {/* Bar with gradient simulation */}
                  <Rect
                    x={x}
                    y={y}
                    width={barWidth - 8}
                    height={barHeight}
                    rx={8}
                    fill="#6366f1"
                    opacity={0.8 + (index * 0.02)}
                  />
                  {/* Day label */}
                  <SvgText
                    x={x + (barWidth - 8) / 2}
                    y={chartHeight + 18}
                    fontSize={11}
                    fill="#6b7280"
                    textAnchor="middle"
                  >
                    {item.day}
                  </SvgText>
                </G>
              );
            })}
          </Svg>
        </View>
      </GlassCard>

      {/* Achievement Card */}
      <GlassCard style={styles.achievementCard}>
        <LinearGradient
          colors={['#fbbf24', '#f97316']}
          style={styles.achievementIcon}
        >
          <AwardIcon size={32} color="#fff" />
        </LinearGradient>
        <View style={styles.achievementContent}>
          <Text style={styles.achievementTitle}>Keep it up!</Text>
          <Text style={styles.achievementText}>
            You've maintained a {studyStreak}-day study streak. You're on fire! 🔥
          </Text>
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
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
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
    marginBottom: 12,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
  },
  chartCard: {
    padding: 20,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 16,
  },
  pieContainer: {
    alignItems: 'center',
  },
  pieChart: {
    position: 'relative',
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  pieCenter: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieCenterText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1f2937',
  },
  legendContainer: {
    gap: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendDotGreen: {
    backgroundColor: '#10b981',
  },
  legendDotPurple: {
    backgroundColor: '#6366f1',
  },
  legendText: {
    fontSize: 14,
    color: '#6b7280',
  },
  barChartContainer: {
    alignItems: 'center',
  },
  achievementCard: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  achievementIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 4,
  },
  achievementText: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 100,
  },
});

export default ProgressScreen;
