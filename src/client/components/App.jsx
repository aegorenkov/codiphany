import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import Header from './Header.jsx';
import SolutionCard from './SolutionCard.jsx';

function fetchSolutions() {
  return fetch('/solutions')
    .then(response => response.json());
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {solutions:[]}
  }
  componentWillMount() {
    fetchSolutions().then((solutions) => {
      this.setState({solutions})
    });
  }
  render() {
    return (
      <div className='container'>
        <Header />
        { this.state.solutions.map(({title, description}) => {
          return <SolutionCard title={title} description={description}/>
          }) }
      </div>
    );
  }
}

export default App;
