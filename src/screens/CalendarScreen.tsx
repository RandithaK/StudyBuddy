import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useQuery } from '@apollo/client';
import GlassCard from '../components/GlassCard';
import { hairline, subtleBorder, cardBG } from '../theme';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CalendarIcon,
} from '../components/Icons';
import { formatTime } from '../data/mockData';
import { GET_EVENTS_QUERY } from '../api/queries';

interface CalendarScreenProps {
  onAddTask: () => void;
}

const CalendarScreen: React.FC<CalendarScreenProps> = ({ onAddTask }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1)); // December 2025
  const [selectedDate, setSelectedDate] = useState('2025-12-01');

  const { data, loading } = useQuery(GET_EVENTS_QUERY);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  const events = data?.events || [];

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0,
  ).getDate();
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1,
  ).getDay();

  const monthName = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentMonth.getFullYear()}-${String(
      currentMonth.getMonth() + 1,
    ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter((e: any) => e.date === dateStr);
  };

  const selectedDateEvents = events.filter((e: any) => e.date === selectedDate);

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'exam':
        return '#ef4444';
      case 'class':
        return '#3b82f6';
      case 'study':
        return '#22c55e';
      default:
        return '#6b7280';
    }
  };

  const formatSelectedDate = () => {
    const date = new Date(selectedDate);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Calendar</Text>
          <Text style={styles.subtitle}>Plan your study schedule</Text>
        </View>
        <CalendarIcon size={32} color="#6366f1" />
      </View>

      {/* Calendar Card */}
      <GlassCard style={styles.calendarCard}>
        {/* Month Navigation */}
        <View style={styles.monthNav}>
          <TouchableOpacity style={styles.navButton} onPress={handlePrevMonth}>
            <ChevronLeftIcon size={20} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.monthText}>{monthName}</Text>
          <TouchableOpacity style={styles.navButton} onPress={handleNextMonth}>
            <ChevronRightIcon size={20} color="#374151" />
          </TouchableOpacity>
        </View>

        {/* Day Names */}
        <View style={styles.dayNamesRow}>
          {dayNames.map((day) => (
            <Text key={day} style={styles.dayName}>
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {/* Empty cells for days before month starts */}
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <View key={`empty-${index}`} style={styles.dayCell} />
          ))}

          {/* Calendar days */}
          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dateStr = `${currentMonth.getFullYear()}-${String(
              currentMonth.getMonth() + 1,
            ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const dayEvents = getEventsForDate(day);
            const isSelected = dateStr === selectedDate;
            const isToday = dateStr === '2025-12-01';

            return (
              <TouchableOpacity
                key={day}
                onPress={() => setSelectedDate(dateStr)}
                style={[
                  styles.dayCell,
                  isSelected && styles.selectedDay,
                  isToday && !isSelected && styles.todayCell,
                ]}
              >
                {isSelected ? (
                  <LinearGradient
                    colors={['#6366f1', '#a855f7']}
                    style={styles.selectedDayGradient}
                  >
                    <Text style={[styles.dayText, styles.selectedDayText]}>
                      {day}
                    </Text>
                    {dayEvents.length > 0 && (
                      <View style={styles.dotsContainer}>
                        {dayEvents.slice(0, 3).map((_evt: any, i: number) => (
                          <View
                            key={i}
                            style={[styles.dot, styles.dotWhite]}
                          />
                        ))}
                      </View>
                    )}
                  </LinearGradient>
                ) : (
                  <View style={styles.dayCellContent}>
                    <Text style={styles.dayText}>{day}</Text>
                    {dayEvents.length > 0 && (
                      <View style={styles.dotsContainer}>
                        {dayEvents.slice(0, 3).map((_e: any, i: number) => (
                          <View key={i} style={[styles.dot, styles.dotPurple]} />
                        ))}
                      </View>
                    )}
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </GlassCard>

      {/* Agenda for Selected Date */}
      <GlassCard style={styles.agendaCard}>
        <Text style={styles.agendaTitle}>
          Agenda for {formatSelectedDate()}
        </Text>

        {selectedDateEvents.length === 0 ? (
          <View style={styles.emptyAgenda}>
            <Text style={styles.emptyText}>No events scheduled for this day</Text>
            <TouchableOpacity onPress={onAddTask} activeOpacity={0.8}>
              <LinearGradient
                colors={['#6366f1', '#a855f7']}
                style={styles.addButton}
              >
                <Text style={styles.addButtonText}>Add Event</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.agendaList}>
            {selectedDateEvents.map((event: any) => {
              const course = event.course;
              return (
                <View key={event.id} style={styles.agendaItem}>
                  <View style={styles.agendaTime}>
                    <Text style={styles.agendaTimeText}>
                      {formatTime(event.startTime)}
                    </Text>
                    <View style={styles.timeLine} />
                    <Text style={styles.agendaTimeText}>
                      {formatTime(event.endTime)}
                    </Text>
                  </View>
                  <View style={styles.agendaContent}>
                    <Text style={styles.agendaEventTitle}>{event.title}</Text>
                    {course && (
                      <LinearGradient
                        colors={[course.color || '#6366f1', course.color || '#a855f7']}
                        style={styles.courseBadge}
                      >
                        <Text style={styles.courseBadgeText}>{course.name}</Text>
                      </LinearGradient>
                    )}
                  </View>
                  <View
                    style={[
                      styles.eventTypeDot,
                      { backgroundColor: getEventTypeColor(event.type) },
                    ]}
                  />
                </View>
              );
            })}
          </View>
        )}
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
  calendarCard: {
    padding: 20,
    marginBottom: 16,
    backgroundColor: cardBG,
    borderWidth: hairline,
    borderColor: subtleBorder,
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1f2937',
  },
  dayNamesRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dayName: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    color: '#6b7280',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
  },
  dayCellContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  selectedDay: {
    transform: [{ scale: 1.05 }],
  },
  selectedDayGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayCell: {
    borderWidth: 2,
    borderColor: '#6366f1',
    borderRadius: 16,
  },
  dayText: {
    fontSize: 14,
    color: '#1f2937',
  },
  selectedDayText: {
    color: '#fff',
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 4,
    gap: 3,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  dotPurple: {
    backgroundColor: '#6366f1',
  },
  dotWhite: {
    backgroundColor: '#fff',
  },
  agendaCard: {
    padding: 20,
    backgroundColor: cardBG,
    borderWidth: hairline,
    borderColor: subtleBorder,
  },
  agendaTitle: {
    fontSize: 20,
    fontWeight: '500',
    color: '#1f2937',
    marginBottom: 16,
  },
  emptyAgenda: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    color: '#9ca3af',
    marginBottom: 16,
  },
  addButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  agendaList: {
    gap: 12,
  },
  agendaItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: cardBG,
    padding: 16,
    borderRadius: 16,
    borderWidth: hairline,
    borderColor: subtleBorder,
    gap: 16,
  },
  agendaTime: {
    alignItems: 'center',
    minWidth: 60,
  },
  agendaTimeText: {
    fontSize: 14,
    color: '#374151',
  },
  timeLine: {
    width: 1,
    height: 16,
    backgroundColor: '#d1d5db',
    marginVertical: 4,
  },
  agendaContent: {
    flex: 1,
  },
  agendaEventTitle: {
    fontSize: 16,
    color: '#1f2937',
    marginBottom: 8,
  },
  courseBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  courseBadgeText: {
    fontSize: 12,
    color: '#fff',
  },
  eventTypeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginTop: 4,
  },
  bottomSpacer: {
    height: 100,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CalendarScreen;
