import React, { Component } from 'react';
import UserRepositories from './containers/UserRepositories';
import CommitByRepository from './containers/CommitsByRepository';
import UserForm from './components/UserForm';
import './App.css';
import { getRepositories } from './actions';

class App extends Component {
  onSubmit = e => {
    e.preventDefault();
    const user = e.target.user.value;
    this.props.store.dispatch(getRepositories(user));
  };

  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Githubify</h1>
            <h2 className="subtitle">Type a user</h2>
            <UserForm onSubmit={this.onSubmit} />
            <UserRepositories />
            <CommitByRepository />
          </div>
        </div>
      </section>
    );
  }
}

export default App;
