import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Githuibfy</h1>
            <h2 className="subtitle">Type a user</h2>
            <form>
              <div className="field has-addons">
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder="Find a repository"
                  />
                </div>
                <div className="control">
                  <a className="button is-info">Search</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default App;
