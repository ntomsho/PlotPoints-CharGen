import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dndb from './dndbags/Dndb.jsx';
import Home from './Home';

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

export default App;
