import React, { Component } from 'react';
import SolutionCard from './SolutionCard.jsx';
import { Link } from 'react-router-dom';
import Header from './Header.jsx';
import axios from 'axios';


function fetchSolutions(username) {
  return fetch(`/solutions?username=${username}`)
    .then(response => response.json());
}

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {solutions:[]}
    this.handleSolutionsClick = this.handleSolutionsClick.bind(this);
  }
  componentDidMount() {
    fetchSolutions(this.props.match.params.username).then((solutions) => {
      this.setState({solutions})
    });
    axios.get('/auth')
      .then((response) => {
        this.setState({user: response.data.user});
      })
      .catch((response) => console.log(response));
  }
  handleSolutionsClick() {
    axios.post(`/solution`, {
      title: 'Short one line summary of your problem.',
      description: 'Describe your problem.',
      resources: 'Resources here.',
      code: 'Code here.'
    }).then(() => {
      fetchSolutions(this.props.match.params.username).then((solutions) => {
        this.setState({solutions})
      });
    });
  }
  render() {
    return (
      <div>
      <Header mode='home'/>
        {this.state.user ?
          <button onClick={this.handleSolutionsClick} type="button" class="btn btn-outline-primary">New Solution</button>:
          null
        }
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