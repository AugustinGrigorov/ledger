import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';

import Configuration from './views/Configuration';
import Overview from './views/Overview';

function App() {
  return (
    <Router>
      <Route path="*">
        <NavBar />
      </Route>
      <Switch>
        <Route exact path="/">
          <p>hello</p>
        </Route>
        <PrivateRoute path="/configuration">
          <Configuration />
        </PrivateRoute>
        <PrivateRoute path="/overview">
          <Overview />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default App;
