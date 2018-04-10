import React, { Component } from 'react';
import SolutionCard from './SolutionCard.jsx';
import { Link } from 'react-router-dom';

function fetchSolutions() {
  return fetch('/solutions')
    .then(response => response.json());
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {solutions:[]}
  }
  componentDidMount() {
    fetchSolutions().then((solutions) => {
      this.setState({solutions})
    });
  }
  render() {
    return (
      <div>
        {this.state.solutions.map(({ _id, title, description }, idx) => {
          return (
          <div>
          <Link key={idx} to={`/${_id}`} >
            <SolutionCard key={_id} title={title} description={description}/>
          </Link>
          </div>
          )
        })}
      </div>
    )
  }
}

export default HomePage;