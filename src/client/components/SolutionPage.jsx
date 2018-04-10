import React, { Component } from 'react';

function fetchSolution(id) {
  return fetch(`/solution?id=${id}`)
    .then(response => response.json());
}
class SolutionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '', 
      description: '', 
      resources: '', 
      code: ''
    }
  }
  componentDidMount() {
    fetchSolution(this.props.match.params.solutionId)
      .then((solution) => {
      this.setState(solution)
    });
  }
  render() {
    const { title, description, resources, code } = this.state;
    return (
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
        <p>{resources}</p>
        <p>{code}</p>
      </div>
    )
  }
}

export default SolutionPage;