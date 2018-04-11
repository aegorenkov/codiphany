import React, { Component } from 'react';
import axios from 'axios';
import Header from './Header.jsx';


function fetchSolution(id) {
  return fetch(`/solution?id=${id}`)
    .then(response => response.json());
}
function putSolution(id, updateObj) {
  return axios.put(`/solution?id=${id}`, updateObj)
    .then((response) => console.log(response))
    .catch((response) => console.log(response));
}
class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      resources: '',
      code: ''
    }
    this.updateTitle = this.updateTitle.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateResources = this.updateResources.bind(this);
    this.updateCode = this.updateCode.bind(this);
  }
  componentDidMount() {
    fetchSolution(this.props.match.params.solutionId)
      .then((solution) => {
        this.setState(solution)
      });
  }
  updateTitle(e) {
    const updateObj = {title: e.target.innerText};
    this.setState(updateObj);
    putSolution(this.props.match.params.solutionId, updateObj);
  }
  updateDescription(e) {
    const updateObj = {description: e.target.innerText};
    this.setState(updateObj);
    putSolution(this.props.match.params.solutionId, updateObj);
  }
  updateResources(e) {
    const updateObj = {resources: e.target.innerText};
    this.setState(updateObj);
    putSolution(this.props.match.params.solutionId, updateObj);
  }
  updateCode(e) {
    const updateObj = {code: e.target.innerHTML};
    this.setState(updateObj);
    putSolution(this.props.match.params.solutionId, updateObj);
  }
  render() {
    const { title, description, resources, code } = this.state;
    return (
      <div>
      <Header solutionId={false}/>
        <h1 contentEditable="true" onBlur={this.updateTitle}>{title}</h1>
        <p contentEditable="true" onBlur={this.updateDescription}>{description}</p>
        <p contentEditable="true" onBlur={this.updateResources}>{resources}</p>
        <p contentEditable="true" onBlur={this.updateCode} dangerouslySetInnerHTML={{__html:code}} ></p>
      </div>
    )
  }
}

export default EditPage;