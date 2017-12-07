import React, { Component } from 'react';
import Authenticated from './components/Authenticated.js';
import Main from './components/Main.js';

class App extends Component {
  render() {
    return (
      <div>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css" />
        <Authenticated>
          <Main>
          </Main>
        </Authenticated>
      </div>
    );
  }
}

export default App;
