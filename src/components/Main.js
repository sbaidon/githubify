import React, { Component } from 'react';
import RepositoriesList from '../components/RespositoriesList';
import CommitList from '../components/CommitList';
import UserForm from './UserForm';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserValid: true,
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const user = e.target.user.value;
    this.props
      .getRepositories(user)
      .then(() => this.setState({ isUserValid: true }))
      .catch(_ => this.setState({ isUserValid: false }));
  };

  getNextCommits = page => {
    const repository = this.props.repositories.items.find(
      repository => repository.id === this.props.activeRepository,
    );
    return this.props.getCommits(repository.owner.login, repository, page);
  };

  isLoading = () => {
    let loading = false;
    if (this.props.repositories)  {
      loading = this.props.repositories.isFetching;
    }
    if (this.props.commits) {
      loading = loading || this.props.commits.isFetching;
    }
    return loading;
  }

  render() {
    const showRepositories =
      this.props.activeUser && !this.props.activeRepository;
    const showCommits = !!this.props.activeRepository;

    return (
      <div>
        <UserForm isLoading={this.isLoading()} onSubmit={this.onSubmit} />
        {!this.state.isUserValid ? (
          <h1>Please type a valid github username</h1>
        ) : null}
        {showRepositories ? (
          <RepositoriesList
            getCommits={this.props.getCommits}
            setLastPage={this.props.setLastPage}
            repositories={this.props.repositories}
          />
        ) : null}
        {showCommits ? (
          <CommitList
            commits={this.props.commits}
            lastPage={this.props.commits.lastPage}
            getNextCommits={this.getNextCommits}
            emptyCommits={this.props.emptyCommits}
          />
        ) : null}
      </div>
    );
  }
}

export default Main;
