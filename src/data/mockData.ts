export interface Task {
  id: string;
  title: string;
  description: string;
  courseId: string;
  dueDate: string;
  dueTime: string;
  completed: boolean;
  hasReminder: boolean;
}

export interface Course {
  id: string;
  name: string;
  colorFrom: string;
  colorTo: string;
  totalTasks: number;
  completedTasks: number;
}

export interface Event {
  id: string;
  title: string;
  courseId: string;
  date: string;
  startTime: string;
  endTime: string;
  type: 'class' | 'study' | 'exam';
}

export const courses: Course[] = [
  { id: '1', name: 'Biology 101', colorFrom: '#4ade80', colorTo: '#10b981', totalTasks: 10, completedTasks: 7 },
  { id: '2', name: 'History 205', colorFrom: '#fbbf24', colorTo: '#f97316', totalTasks: 8, completedTasks: 3 },
  { id: '3', name: 'Mathematics', colorFrom: '#60a5fa', colorTo: '#06b6d4', totalTasks: 12, completedTasks: 9 },
  { id: '4', name: 'Computer Science', colorFrom: '#a78bfa', colorTo: '#ec4899', totalTasks: 15, completedTasks: 12 },
  { id: '5', name: 'English Literature', colorFrom: '#f87171', colorTo: '#fb7185', totalTasks: 6, completedTasks: 4 },
  { id: '6', name: 'Physics', colorFrom: '#818cf8', colorTo: '#8b5cf6', totalTasks: 9, completedTasks: 5 },
];

export const tasks: Task[] = [
  {
    id: '1',
    title: 'Chapter 5 Reading',
    description: 'Read and summarize chapter 5 on cell division',
    courseId: '1',
    dueDate: '2025-12-03',
    dueTime: '14:00',
    completed: false,
    hasReminder: true,
  },
  {
    id: '2',
    title: 'Lab Report',
    description: 'Complete lab report on photosynthesis experiment',
    courseId: '1',
    dueDate: '2025-12-05',
    dueTime: '23:59',
    completed: false,
    hasReminder: true,
  },
  {
    id: '3',
    title: 'Essay Draft',
    description: 'First draft of WWI causes essay',
    courseId: '2',
    dueDate: '2025-12-02',
    dueTime: '17:00',
    completed: false,
    hasReminder: true,
  },
  {
    id: '4',
    title: 'Problem Set 8',
    description: 'Calculus problems on derivatives',
    courseId: '3',
    dueDate: '2025-12-04',
    dueTime: '10:00',
    completed: false,
    hasReminder: false,
  },
  {
    id: '5',
    title: 'Code Assignment',
    description: 'Implement binary search tree',
    courseId: '4',
    dueDate: '2025-12-06',
    dueTime: '23:59',
    completed: false,
    hasReminder: true,
  },
  {
    id: '6',
    title: 'Poetry Analysis',
    description: 'Analyze Robert Frost poems',
    courseId: '5',
    dueDate: '2025-12-01',
    dueTime: '16:00',
    completed: true,
    hasReminder: false,
  },
];

export const events: Event[] = [
  {
    id: '1',
    title: 'Biology Lecture',
    courseId: '1',
    date: '2025-12-01',
    startTime: '09:00',
    endTime: '10:30',
    type: 'class',
  },
  {
    id: '2',
    title: 'Study Session',
    courseId: '3',
    date: '2025-12-01',
    startTime: '14:00',
    endTime: '16:00',
    type: 'study',
  },
  {
    id: '3',
    title: 'History Seminar',
    courseId: '2',
    date: '2025-12-01',
    startTime: '11:00',
    endTime: '12:30',
    type: 'class',
  },
  {
    id: '4',
    title: 'Math Midterm',
    courseId: '3',
    date: '2025-12-04',
    startTime: '13:00',
    endTime: '15:00',
    type: 'exam',
  },
  {
    id: '5',
    title: 'CS Lab',
    courseId: '4',
    date: '2025-12-02',
    startTime: '15:00',
    endTime: '17:00',
    type: 'class',
  },
];

// Helper function to get course by ID
export const getCourseById = (courseId: string): Course | undefined => {
  return courses.find((c) => c.id === courseId);
};

// Helper function to format time
export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours, 10);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${displayHour}:${minutes} ${ampm}`;
};

// Helper function to format date
export const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

// Get today's date string
export const getTodayString = (): string => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};
