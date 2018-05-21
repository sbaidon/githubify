import React, { Component } from 'react';
import Commit from './Commit';

class CommitList extends Component {
  constructor(props) {
    super(props);
    const { commits: { items } } = props;
    this.state = {
      filteredCommits: items,
    };
  }

  onChange = e => {
    this.filterCommits(e.target.value);
  };

  filterCommits(keyword) {
    const regex = new RegExp(keyword, 'gi');
    const filteredCommits = this.props.commits.items.filter(commit =>
      regex.test(commit.commit.message),
    );
    this.setState({
      filteredCommits,
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      filteredCommits: nextProps.commits.items,
    };
  }

  render() {
    const { onBack } = this.props;
    const { filteredCommits: items } = this.state;

    return (
      <section className="section">
        <div className="field">
          <div className="control">
            <a onClick={onBack} className="button">
              Back
            </a>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              onChange={this.onChange}
              className="input"
              type="text"
              placeholder="Search by commit message"
            />
          </div>
        </div>
        <ul className="commits-grid">
          {items.length ? (
            items.map((commit, index) => <Commit key={index} commit={commit} />)
          ) : (
            <h1>No commits were found</h1>
          )}
        </ul>
      </section>
    );
  }
}

export default CommitList;
