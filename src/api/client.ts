import { ApolloClient, InMemoryCache, createHttpLink, from, Observable, FetchResult } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

// Export BASE_URL for use in other parts of the app (like background fetch)
export const BASE_URL = (API_URL || 'http://10.0.2.2:8086').replace('/query', '');

// Event to notify app to logout
type LogoutListener = () => void;
let logoutListeners: LogoutListener[] = [];
export const onLogout = (listener: LogoutListener) => {
  logoutListeners.push(listener);
  return () => {
    logoutListeners = logoutListeners.filter(l => l !== listener);
  };
};
const triggerLogout = () => {
  logoutListeners.forEach(l => l());
};

const httpLink = createHttpLink({
  uri: API_URL || 'http://10.0.2.2:8086/query',
});

const authLink = setContext(async (_, { headers }) => {
  // Get the authentication token from storage if it exists
  const token = await AsyncStorage.getItem('token');
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Refresh Token Logic
let isRefreshing = false;
let pendingRequests: any[] = [];

const resolvePendingRequests = () => {
  pendingRequests.map(callback => callback());
  pendingRequests = [];
};

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    for (let err of graphQLErrors) {
      // Check for authentication errors
      if (err.message === 'access denied' || err.message === 'unauthorized' || err.extensions?.code === 'UNAUTHENTICATED') {
        let forward$: Observable<FetchResult> | undefined;

        if (!isRefreshing) {
          isRefreshing = true;
          forward$ = new Observable<FetchResult>(observer => {
            (async () => {
              try {
                const refreshToken = await AsyncStorage.getItem('refreshToken');
                if (!refreshToken) {
                  throw new Error('No refresh token');
                }

                const response = await fetch(`${BASE_URL}/refresh-token`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ refreshToken }),
                });

                if (response.status !== 200) {
                  throw new Error('Refresh failed');
                }

                const data = await response.json();
                await AsyncStorage.setItem('token', data.token);
                if (data.refreshToken) {
                  await AsyncStorage.setItem('refreshToken', data.refreshToken);
                }

                resolvePendingRequests();
              } catch (error) {
                pendingRequests = [];
                await AsyncStorage.multiRemove(['token', 'refreshToken', 'user']);
                triggerLogout();
                observer.error(error);
                return;
              } finally {
                isRefreshing = false;
              }

              // Retry the request
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              };

              forward(operation).subscribe(subscriber);
            })();
          });
        } else {
          // Wait for refresh to complete
          forward$ = new Observable(observer => {
            pendingRequests.push(() => {
              const subscriber = {
                next: observer.next.bind(observer),
                error: observer.error.bind(observer),
                complete: observer.complete.bind(observer),
              };
              forward(operation).subscribe(subscriber);
            });
          });
        }
        return forward$;
      }
    }
  }
});

export const client = new ApolloClient({
  link: from([errorLink, authLink, httpLink]),
  cache: new InMemoryCache(),
});
