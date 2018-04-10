import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import Header from './Header.jsx';
import { Switch, Route } from 'react-router-dom';
import HomePage from './HomePage.jsx';
import SolutionPage from './SolutionPage.jsx';
import EditPage from './EditPage.jsx';


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
          <Route exact path ='/:solutionId' component={SolutionPage} />
          <Route path ='/:solutionId/edit' component={EditPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
