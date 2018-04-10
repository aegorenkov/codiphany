import React, { Component } from 'react';

class SolutionCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {title, description} = this.props;
    return (
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
        </div>
      </div>
    );
  }
}

export default SolutionCard;