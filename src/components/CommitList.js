import React, { Component } from 'react';
import Commit from './Commit';

class CommitList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCommits: props.commits.items,
      page: 1,
    };
  }

  static getDerivedStateFromProps(nextProps) {
    return {
      filteredCommits: nextProps.commits.items,
    };
  }

  componentDidMount() {
    const options = { rootMargin: '0px', threshold: 1.0 };
    const observer = new IntersectionObserver(this.observerCallback, options);
    observer.observe(this.getLastCommit());
  }

  isLastPage = () => this.state.page >= this.props.lastPage;

  filterCommits = e => {
    const keyword = e.target.value;
    const regex = new RegExp(keyword, 'gi');
    const filteredCommits = this.props.commits.items.filter(commit =>
      regex.test(commit.commit.message),
    );
    this.setState({ filteredCommits });
  };

  // Array Destructuring - Helps to avoid accessing the parameter like this: entries[0], improves readability
  observerCallback = ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(this.getLastCommit());
      const currentPage = this.state.page;
      const nextPage = currentPage + 1;
      if (this.isLastPage()) {
        return;
      }
      this.props.getNextCommits(nextPage).then(() => {
        observer.observe(this.getLastCommit());
        this.setState({ page: nextPage });
      });
    }
  };

  getLastCommit = () => {
    // Spread operator - Using it to turn the HTMLCollection to an actual Array object, and be able to use array methods
    const commits = [...document.querySelectorAll('.commit')];
    return commits.pop();
  };

  render() {
    // Object Destructuring - Improves readability and helps avoid repetition
    const { emptyCommits } = this.props;
    const { filteredCommits } = this.state;

    return (
      <section className="section" id="commit-list">
        <nav className="breadcrumb is-large" aria-label="breadcrumbs">
          <ul>
            <li>
              <a onClick={emptyCommits}> &larr; Repositories</a>
            </li>
          </ul>
        </nav>
        <div className="field">
          <div className="control">
            <input
              onChange={this.filterCommits}
              className="input"
              type="text"
              placeholder="Search by commit message"
            />
          </div>
        </div>
        <ul className="commits-grid" id="commits">
          {filteredCommits.length ? (
            filteredCommits.map((commit, index) => (
              <Commit key={index} commit={commit} />
            ))
          ) : (
            <h1>No commits were found</h1>
          )}
        </ul>
        {this.isLastPage() ? (
          <h1 className="title has-text-centered">No more commits left</h1>
        ) : null}
      </section>
    );
  }
}

export default CommitList;
