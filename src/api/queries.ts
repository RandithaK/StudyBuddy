import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        name
        email
        isVerified
      }
    }
  }
`;

export const REGISTER_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      token
      user {
        id
        name
        email
        isVerified
      }
    }
  }
`;

export const GET_TASKS_QUERY = gql`
  query GetTasks {
    tasks {
      id
      title
      description
      courseId
      dueDate
      dueTime
      completed
      hasReminder
      completedAt
      course {
        id
        name
        color
      }
    }
  }
`;

export const GET_COURSES_QUERY = gql`
  query GetCourses {
    courses {
      id
      name
      color
      totalTasks
      completedTasks
    }
  }
`;

export const GET_EVENTS_QUERY = gql`
  query GetEvents {
    events {
      id
      title
      description
      courseId
      date
      startTime
      endTime
      type
      course {
        id
        name
        color
      }
    }
  }
`;

export const CREATE_TASK_MUTATION = gql`
  mutation CreateTask($input: NewTaskInput!) {
    createTask(input: $input) {
      id
      title
      description
      courseId
      dueDate
      dueTime
      completed
      hasReminder
      course {
        id
        name
        color
      }
    }
  }
`;

export const UPDATE_TASK_MUTATION = gql`
  mutation UpdateTask($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      id
      title
      description
      courseId
      dueDate
      dueTime
      completed
      hasReminder
      course {
        id
        name
        color
      }
    }
  }
`;

export const DELETE_TASK_MUTATION = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

export const CREATE_EVENT_MUTATION = gql`
  mutation CreateEvent($input: NewEventInput!) {
    createEvent(input: $input) {
      id
      title
      description
      courseId
      date
      startTime
      endTime
      type
      course {
        id
        name
        color
      }
    }
  }
`;

export const CREATE_COURSE_MUTATION = gql`
  mutation CreateCourse($input: NewCourseInput!) {
    createCourse(input: $input) {
      id
      name
      color
      totalTasks
      completedTasks
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      id
      name
      email
      isVerified
    }
  }
`;

export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      success
      message
    }
  }
`;
