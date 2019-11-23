import React from 'react';
import Amplify, {Auth} from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator, SignIn, SignUp } from 'aws-amplify-react';
import './stylesheets/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
// import Dndb from './dndbags/Dndb.jsx';
import CharSelect from './dndbags/char_select';
import Home from './Home';
import MyNavbar from './navbar';

Amplify.configure(awsconfig)


function App() {
  let currentUser;
  Auth.currentAuthenticatedUser().then(user => {
    currentUser = user.username;
  })
  return (
    <Router>
      <Switch>
        <Route path="/dndb">
          <MyNavbar currentUser={currentUser} />
          <CharSelect currentUser={currentUser} />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default withAuthenticator(App, {
  includeGreetings: false,
  authenticatorComponents: [<SignIn />, <SignUp />, MyNavbar]
});
