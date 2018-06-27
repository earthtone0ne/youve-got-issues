import React, { Component } from 'react';
import './App.css';
import GitKeyForm from './components/GitKeyForm';
import RepoList from './components/RepoList';

class App extends Component {
  constructor() {
    super();
    this.state = {
      gitKey: null,
      selectedRepo: null,
    };
  }
  updateValue= (key, value) => {
    this.setState({[key]: value}, ()=> console.log(key, value));
  }
  render() {
    return (
      <div className="App">
        <header className="App-header flex-row just-between">
          <div className="App-branding">
            <h3>You've got issues.</h3>
            <h6>View, sort and manage them with ease.</h6>
          </div>
          <GitKeyForm updateValue={this.updateValue}/>
        </header>
        <article className="flex-col">
          {this.state.gitKey && <RepoList gitKey={this.state.gitKey} updateValue={this.updateValue} /> }
          {this.state.selectedRepo && this.state.selectedRepo.name}
        </article>
      </div>
    );
  }
}

export default App;
