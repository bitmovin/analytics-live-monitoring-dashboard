import React, { Component } from 'react';
import Authenticated from './components/Authenticated.js';
import Main from './components/Main.js';

class App extends Component {
  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
          crossOrigin="anonymous"
        />
        <Authenticated>
          <Main>
          </Main>
        </Authenticated>
      </div>
    );
  }
}

export default App;
