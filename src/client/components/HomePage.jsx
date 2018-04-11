import React, { Component } from 'react';
import SolutionCard from './SolutionCard.jsx';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';


function fetchSolutions(username) {
  return fetch(`/solutions?username=${username}`)
    .then(response => response.json());
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {solutions:[]}
  }
  componentDidMount() {
    fetchSolutions(this.props.match.params.username).then((solutions) => {
      this.setState({solutions})
    });
  }
  render() {
    return (
      <div>
      <Header solutionId={false}/>
        {this.state.solutions.map(({ _id, title, description }, idx) => {
          return (
          <div>
          <Link key={idx} to={`/${this.props.match.params.username}/${_id}`} >
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