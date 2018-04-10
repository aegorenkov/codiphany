import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import Header from './Header.jsx';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import SolutionPage from './SolutionPage.jsx';


class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='container'>
        <Header />
        <Switch>
          <Route exact path ='/' component={HomePage} />
          <Route path ='/:solutionId' component={SolutionPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
