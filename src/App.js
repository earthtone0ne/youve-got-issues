import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header flex-row just-between">
          <div className="App-branding">
            <h3>You've got issues.</h3>
            <h6>View, sort and manage them with ease.</h6>
          </div>
        </header>
        <article className="flex-col">
        </article>
      </div>
    );
  }
}

export default App;
