import React from 'react';
import Amplify, {Auth} from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
import './stylesheets/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// import Dndb from './dndbags/Dndb.jsx';
import CharSelect from './dndbags/char_select';
import Home from './Home';

Amplify.configure(awsconfig)

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/dndb">
          <CharSelect />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default withAuthenticator(App, true);
