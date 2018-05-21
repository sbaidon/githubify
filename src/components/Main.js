import React, { Component } from 'react';
import RepositoriesList from '../components/RespositoriesList';
import CommitList from '../components/CommitList';
import UserForm from './UserForm';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserValid: true,
    }
  }
  
  onSubmit = e => {
    e.preventDefault();
    const user = e.target.user.value;
    this.props.getRepositories(user)
    .then(() => {
      this.setState({ isUserValid: true });
    })
    .catch(error => {
      this.setState({ isUserValid: false  });
    })
  }

  getNextCommits = (page) => {
    const { lastPage } = this.props.commits;
    if (page < lastPage) {
      const repository = this.props.repositories.items.find((repository) => repository.name === this.props.activeRepository);
      this.props.getCommits(repository.owner.login, repository.name, page)
    }
  }

  render() {
    return (
      <div>
        <UserForm onSubmit={this.onSubmit} />
        { !this.state.isUserValid ? <h1>Please type a valid github username</h1> : null} 
        {this.props.activeUser && !this.props.activeRepository 
          ? <RepositoriesList getCommits={this.props.getCommits} repositories={this.props.repositories}/> 
          : null}
        {this.props.activeRepository 
        ?  <CommitList 
        commits={this.props.commits} 
        lastPage={this.props.commits.lastPage}
        getNextCommits={this.getNextCommits}
        emptyCommits={this.props.emptyCommits} /> 
        : null}
      </div>
    );
  }
}

export default Main;
