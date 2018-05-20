import React, { Component } from 'react';
import Repository from './Repository';

class RepositoriesList extends Component {
  onClick = (owner, repository) => {
    this.props.fetchCommits(owner, repository);
  };

  render() {
    const { repositories: { items, isFetching } } = this.props;

    if (!items.length && !isFetching) {
      return (
        <h1 className="title has-text-centered">
          Please type in a github username
        </h1>
      );
    }
    return (
      <ul className="repository-grid">
        {items.map((repository, index) => (
          <Repository
            key={index}
            repository={repository}
            onClick={this.onClick}
          />
        ))}
      </ul>
    );
  }
}

export default RepositoriesList;
