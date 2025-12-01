import { gql } from '@apollo/client';

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      token
      user {
        id
        name
        email
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
  mutation CreateTask($input: CreateTaskInput!) {
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
  mutation UpdateTask($id: ID!, $input: UpdateTaskInput!) {
    updateTask(id: $id, input: $input) {
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
