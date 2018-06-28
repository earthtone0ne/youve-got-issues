import React from 'react';
import './RepoList.css';

class RepoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: null,
    };
  }
  componentDidMount() {
    fetch('https://api.github.com/user/repos?type=public', {
      method: 'GET',
      headers: new Headers({
        'Authorization': `token ${this.props.gitKey}`,
      })
    })
    .then( res => res.json() )
    .then( repos => this.setState({repos}) )
    .catch( err => console.error(err) );
  }
  selectRepo = (event, repo) => {
    event.preventDefault();
    this.props.updateValue('selectedRepo', repo);
  }
  render() {
    const repos = this.state.repos;
    return (
      <div className="repo-list">
        <h3>Your repositories...</h3>
        {repos && Array.isArray(repos) ? repos.map( repo => (
          <div
            key={repo.id}
            className={`flex-row repo-item card`}
            onClick={(e)=>this.selectRepo(e, repo)}
          >
            <img src={repo.owner.avatar_url} />
            <div className="flex-col">
              <h4>{repo.name}</h4>
              <p>{new Date(repo.updated_at).toLocaleString()}</p>
            </div>
          </div>
        ))
      : <h5>Loading...</h5>

      }
      </div>
    );
  }
}

export default RepoList;
