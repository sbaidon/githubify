import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { getCommits, getRepositories } from './actions'
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import App from './App';
import './index.css';
import 'bulma/css/bulma.css';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

store.dispatch(getRepositories('sbaidon'))
.then(() => console.log(store.getState()));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
