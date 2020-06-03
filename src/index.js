import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';

import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';
import { onAuthStateChanged } from './firebase';
import { login, logout, subscribeToPortfolioChanges } from './actions';

import './index.css';

const reduxDevtoolsExtensionHook = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
const composeEnhancers = window[reduxDevtoolsExtensionHook] || compose;

Sentry.init({ dsn: 'https://b364066f996941509c0509e435a7daac@o357051.ingest.sentry.io/5245122' });

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk),
  ),
);

onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user));
    store.dispatch(subscribeToPortfolioChanges(user.uid));
  } else {
    store.dispatch(logout());
  }
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

serviceWorker.unregister();
