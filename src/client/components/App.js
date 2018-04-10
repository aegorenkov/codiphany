import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';

function fetchGames() {
  return fetch('/games')
    .then(response => response.json());
}

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        Inital React Page
      </div>
    );
  }
}

export default App;
