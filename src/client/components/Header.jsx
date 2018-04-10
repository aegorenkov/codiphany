import React, { Component } from 'react';

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
        <h5 className="mr-md-auto font-weight-normal">Codiphany</h5>
        <nav className="my-md-0 mr-md-3">
        </nav>
        <a className="btn btn-outline-primary" href="#">Login with GitHub</a>
      </div>
    );
  }
}

export default Header;