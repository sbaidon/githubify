import React, { Component } from 'react';
import UserRepositories from '../containers/UserRepositories';
import CommitByRepository from '../containers/CommitsByRepository';
import UserForm from './UserForm';

class Main extends Component {
  onSubmit = e => {
    e.preventDefault();
    const user = e.target.user.value;
    this.props.getRepositories(user);
  };

  render() {
    return (
      <div>
        <UserForm onSubmit={this.onSubmit} />
        {!this.props.activeRepository ? <UserRepositories /> : null}
        {this.props.activeUser && this.props.activeRepository ? (
          <CommitByRepository />
        ) : null}
      </div>
    );
  }
}

export default Main;
