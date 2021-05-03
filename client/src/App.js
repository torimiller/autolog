import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import LoginDemo from './components/auth/LoginDemo';
import Alert from './components/layout/Alert';
import MaintenanceOptions from './components/maintenance/MaintenanceOptions';
import PendingMaintenance from './components/maintenance/PendingMaintenance';
import PrivateRoute from './components/routing/PrivateRoute';

// Redux
// Provider combines React and Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    // When the state updates, useEffect will keep running unless we add a second parameter with empty brackets
  }, []);

  return (
    <Provider store={store}>
    {console.log('App store:', store)}
    <Router>
      <Fragment>
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/login-demo" component={LoginDemo} />
            <PrivateRoute exact path="/maintenance-options" component={MaintenanceOptions} />
            <PrivateRoute exact path="/pending-maintenance" component={PendingMaintenance} />
          </Switch>
        </section>
      </Fragment>
    </Router>
    </Provider>
  );
}

export default App;
