import React from 'react';
import './IssuesList.css';

class IssuesList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issues: [],
      sortBy: null,
      sortIndex: 0, // TBD
    };
  }
  componentDidMount() {
    fetch(`https://api.github.com/repos/${this.props.repo.full_name}/issues?state=all`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `token ${this.props.gitKey}`,
      })
    })
    .then( res => res.json() )
    .then( issues => this.setState({issues}) )
    .catch( err => console.error(err) );
  }

  render() {
    return (
      <div className="issues-list flex-col">
        <h3>Issues in {this.props.repo.name}...</h3>
        {!!this.state.issues.length && this.state.issues.map(issue => (
          <div key={issue.id} className="issue-item flex-row card">
            <div className="assignee flex-col">
              {issue.assignee
                ? <img src={issue.assignee.avatar_url} alt={issue.assignee.name + ' avatar'} />
                : <div className="placeholder"></div>
              }
            <span>{()=>this.getProperty(issue, 'assignee', 'name')}</span>
            </div>
            <div className="issue-details flex-col">
              <h4>{issue.title}</h4>
              <span>{issue.created_at}</span>
              <span>{issue.updated_at}</span>
            </div>
          </div>
        )) }
      </div>
    );
  }
}

export default IssuesList;
