import React, { Component } from 'react';
import MainContainer from './containers/MainContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Githubify</h1>
            <h2 className="subtitle">Type a user</h2>
            <MainContainer />
          </div>
        </div>
      </section>
    );
  }
}

export default App;
