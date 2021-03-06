import React, { Component } from 'react';
import Header from './Header.jsx';


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
      <Header solutionId={this.props.match.params.solutionId} mode='view'/>
        <h1>{title}</h1>
        <p>{description}</p>
        <p>{resources}</p>
        <p dangerouslySetInnerHTML={{__html:code}} ></p>
      </div>
    )
  }
}

export default SolutionPage;