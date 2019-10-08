//import Apollo
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import React from 'react';
import ReactDOM from 'react-dom';
import '../src/styles/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

import { Router } from 'react-router-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
const history = createBrowserHistory();

// create connection to GraphQL API server
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={history}>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
);
serviceWorker.unregister();
