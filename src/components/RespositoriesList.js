import React, { Component } from 'react';
import Repository from './Repository';

class RepositoriesList extends Component {
  onClick = (owner, repository) => {
    this.props
      .setLastPage(owner, repository)
      .then(() => this.props.getCommits(owner, repository));
  };

  render() {
    return (
      <section className="section">
        <ul className="repository-grid">
          {this.props.repositories.items.map((repository, index) => (
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
