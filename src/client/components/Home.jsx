import React, { Component } from 'react';
import SolutionCard from './SolutionCard.jsx';

function fetchSolutions() {
  return fetch('/solutions')
    .then(response => response.json());
}

class Home extends Component {
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
      <div>
        {this.state.solutions.map(({ _id, title, description }) => {
          return <SolutionCard key={_id} title={title} description={description} />
        })}
      </div>
    )
  }
}

export default Home;