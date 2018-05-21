import React, { Component } from 'react';
import RepositoriesList from '../components/RespositoriesList';
import CommitList from '../components/CommitList';
import UserForm from './UserForm';

class Main extends Component {
  onSubmit = e => {
    e.preventDefault();
    const user = e.target.user.value;
    this.props.getRepositories(user);
  }

  render() {
    return (
      <div>
        <UserForm onSubmit={this.onSubmit} />
        {this.props.activeUser && !this.props.activeRepository ? <RepositoriesList getCommits={this.props.getCommits} repositories={this.props.repositories}/> : null}
        {this.props.activeRepository && this.props.activeRepository ? (
          <CommitList commits={this.props.commits} emptyCommits={this.props.emptyCommits} />
        ) : null}
      </div>
    );
  }
}

export default Main;
