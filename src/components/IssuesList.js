import React from 'react';
import moment from 'moment';
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
  getIssues = () => {
    fetch(`https://api.github.com/repos/${this.props.repo.full_name}/issues?state=all`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `token ${this.props.gitKey}`,
      })
    })
    .then( res => res.json() )
    .then( issues => this.setState({issues}, () => console.log({issues})) )
    .catch( err => console.error(err) );
  }
  sortCompleted = () => {
    const newList = [...this.state.issues];
    if (this.state.sortBy !== 'completed_at') {
      newList.sort( (a,b) => (!!b.closed_at ? 0 : 1) - (!!a.closed_at ? 0 : 1));
    } else {
      newList.reverse();
    }
    this.setState({issues: newList});
  }
  componentDidMount() {
    if (this.props.repo.has_issues) {
      this.getIssues();
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.repo.id !== prevProps.repo.id) {
      this.getIssues();
    }
  }
  render() {
    return (
      <div className="issues-list flex-col">
        <h3>{this.state.issues.length} Issues in {this.props.repo.name}:</h3>
        <button className="sort-wip" onClick={this.sortCompleted}>Sort by Completed</button>
        {!!this.state.issues.length && this.state.issues.map(issue => (
          <div key={issue.id} className="issue-item flex-row card">
            <div className="assignee flex-col">
              {issue.assignee
                ? <img src={issue.assignee.avatar_url} alt={issue.assignee.login + ' avatar'} />
                : <div className="placeholder"></div>
              }
            <span>{issue.assignee ? issue.assignee.login : ''}</span>
            </div>
            <div className="issue-details flex-col">
              <h4 className={issue.closed_at ? 'completed' : ''}>{issue.title}</h4>
              <span>Created: {moment(issue.created_at).format('MM/DD/YYYY')}</span>
              <span>Last updated: {moment(issue.updated_at).fromNow()}</span>
              {!!issue.closed_at && <span>Completed: {moment(issue.closed_at).fromNow()}</span>}
            </div>
          </div>
        )) }
      </div>
    );
  }
}

export default IssuesList;
