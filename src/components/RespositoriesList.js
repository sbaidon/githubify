import React, { Component } from 'react';
import Repository from './Repository';

class RepositoriesList extends Component {
  onClick = (owner, repository) => {
    this.props.fetchCommits(owner, repository);
  };

  render() {
    const { repositories: { items } } = this.props;
    return (
      <section className="section">
        <ul className="repository-grid">
          {items.map((repository, index) => (
            <Repository
              key={index}
              repository={repository}
              onClick={this.onClick}
            />
          ))}
        </ul>
      </section>
    );
  }
}

export default RepositoriesList;
