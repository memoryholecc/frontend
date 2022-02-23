import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient, ApolloLink, ApolloProvider, HttpLink, InMemoryCache } from '@apollo/client';
import { skipLimitPagination } from './utils/MemoryPagination';
import { env } from 'utils/MemoryEnvironment';
import { StyledEngineProvider } from '@mui/material';
import { MemoryThemeProvider } from 'components/MemoryThemeProvider';
import { GlobalContextProvider } from 'context';

const apollo = new ApolloClient({
  link: ApolloLink.from([
    new HttpLink({
      uri: env.GRAPHQL_ENDPOINT,
      useGETForQueries: true,
    }),
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          getAllCreators: skipLimitPagination(['sortBy']),
          getPatreonPosts: skipLimitPagination(['campaignId', 'sortBy']),
          searchCreatorByName: skipLimitPagination(['name', 'sortBy']),
        },
      },
    },
  }),
});

render(
  <React.StrictMode>
    <ApolloProvider client={apollo}>
      <GlobalContextProvider>
        <StyledEngineProvider injectFirst>
          <MemoryThemeProvider>
            <App />
          </MemoryThemeProvider>
        </StyledEngineProvider>
      </GlobalContextProvider>
    </ApolloProvider>
  </React.StrictMode>,

  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
