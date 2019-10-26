import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { Authenticator } from 'aws-amplify-react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Dndb from './dndbags/Dndb.jsx';
import Home from './Home';

Amplify.configure(awsconfig)

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dndb">
          <Dndb />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default withAuthenticator(App, true);
