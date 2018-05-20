import React, { Component } from 'react';
import Commit from './Commit';

class CommitList extends Component {
  render() {
    const { commits: { items } } = this.props;
    if (!items.length) {
      return <h1>No items</h1>;
    }

    return (
      <div>
        <ul className="commits-grid">
          {items.map((commit, index) => <Commit key={index} commit={commit} />)}
        </ul>
        <a className="button">Next</a>
        <a className="button">Prev</a>
      </div>
    );
  }
}

export default CommitList;
