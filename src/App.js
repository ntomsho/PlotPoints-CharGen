import React from 'react';
import Amplify, {Auth} from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Dndb from './dndbags/Dndb.jsx';
import Home from './Home';

Amplify.configure(awsconfig)
Auth.currentAuthenticatedUser().then(user => console.log(Object.getOwnPropertyNames(user)))
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
