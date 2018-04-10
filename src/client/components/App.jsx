import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import Header from './Header.jsx';
import { Switch, Route } from 'react-router-dom';
import Home from './Home.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='container'>
        <Header />
        <Switch>
          <Route exact path ='/' component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
