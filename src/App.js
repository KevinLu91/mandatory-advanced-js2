import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './component/Main';
import Add from './component/Add';
import Edit from './component/Edit';
import Details from './component/Details';

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    };

  render() {
      return (
        <div id="app">
          <Router>
            <Route exact path='/movies' component={Main} />
            <Route path='/movies' component={Add} />
            <Route path='/edit/:id' component={Edit} />
            <Route path='/details/:id' component={Details} />
          </Router>
        </div>
      )
    }
}

export default App;
