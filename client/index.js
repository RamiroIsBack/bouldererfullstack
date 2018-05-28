import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import {BrowserRouter, Route } from 'react-router-dom'
import App from './components/App'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Dashboard from './components/Dashboard';
import requireAuth from './components/requireAuth';
const cache = new InMemoryCache({
  dataIdFromObject: o => o.id
});

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache
});

const Root = () => {
  return (
    <ApolloProvider client= {client}>
      <BrowserRouter >
        <div>
          <Route path='/' component={App}/>
          <Route path='/login' component={LoginForm}/>
          <Route path='/signup' component={SignupForm}/>
          <Route path= '/dashboard' component = {requireAuth (Dashboard)}/>
        </div>
      </BrowserRouter >
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
