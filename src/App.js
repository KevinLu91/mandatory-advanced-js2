import React from 'react';
import './App.css';
import Main from './component/Main';
import Add from './component/Add';
import Edit from './component/Edit';
import Details from './component/Details';
import {Helmet} from 'react-helmet'

import {BrowserRouter as Router, Route} from "react-router-dom";

class App extends React.Component {
  render() {
      return (
        <div id='app'>
          <Helmet>
            <title>EC Movies</title>
          </Helmet>
          <div>
            <Router>
              <Route exact path='/' component={Main} />
              <Route path='/add' component={Add} />
              <Route path='/edit/:id' component={Edit} />
              <Route path='/details/:id' component={Details} />
            </Router>
          </div>
        </div>
      )
    }
}

export default App;
