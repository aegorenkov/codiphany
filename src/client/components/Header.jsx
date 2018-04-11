import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {auth: false};
  }
  componentDidMount() {
    axios.get('/auth')
      .then((response) => {
        this.setState({user: response.data.user});
      })
      .catch((response) => console.log(response));
  }
  render() {
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="mr-md-auto font-weight-normal">Codiphany</h5>
        <nav className="my-md-0 mr-md-3">
        { this.props.solutionId && this.state.user ? <Link to={`/${this.props.solutionId}/edit`}>edit</Link> : null}
        </nav>
        { this.state.user 
          ? this.state.user 
          : <a className="btn btn-outline-primary" href="https://github.com/login/oauth/authorize?client_id=bc880267139956469292">Login with GitHub</a> }
      </div>
    );
  }
}

export default Header;