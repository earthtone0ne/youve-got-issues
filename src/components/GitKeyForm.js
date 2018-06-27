import React from 'react';
import './GitKeyForm.css';

class GitKeyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredKey: ''
    };
  }
  handleChange = (event) => {
    this.setState({enteredKey: event.target.value});
  }
  handleSubmit = (event) => {
    event.preventDefault();
    // something something validation
    this.props.updateValue('gitKey', this.state.enteredKey);
  }
  render() {
    return (
      <form
        action="submit"
        className="git-key-form flex-col just-center"
        onSubmit={this.handleSubmit}
      >
        <div className="key-input flex-row">
          <label htmlFor="gitKey">Your GitHub API key:</label>
          <input type="text" name="gitKey" onChange={this.handleChange}/>
        </div>
        <button type="submit">Get my Git</button>
      </form>
    );
  }
}

export default GitKeyForm;
