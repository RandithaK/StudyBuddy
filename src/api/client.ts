import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';

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

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
