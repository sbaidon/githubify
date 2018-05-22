import React, { Component } from 'react';
import Commit from './Commit';

class CommitList extends Component {
  constructor(props) {
    super(props);
    const { commits: { items } } = props;
    this.state = {
      filteredCommits: items,
      page: 1,
    };
  }

  isLastPage = () => this.state.page >= this.props.lastPage;

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

  observerCallback = ([entry], observer) => {
    if (entry.isIntersecting) {
      const currentPage = this.state.page;
      const nextPage = currentPage + 1;
      observer.unobserve(this.getLastCommit());
      if (this.isLastPage()) {
        return;
      }
      this.props.getNextCommits(nextPage).then(() => {
        observer.observe(this.getLastCommit());
        this.setState({ page: nextPage });
      });
    }
  };

  componentDidMount() {
    const options = { rootMargin: '0px', threshold: 1.0 };
    const observer = new IntersectionObserver(this.observerCallback, options);
    observer.observe(this.getLastCommit());
  }

  getLastCommit = () => {
    const commits = document.querySelectorAll('.commit');
    const lastCommit = commits[commits.length - 1];
    return lastCommit;
  };

  render() {
    const { emptyCommits } = this.props;
    const { filteredCommits: items } = this.state;

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
              onChange={this.onChange}
              className="input"
              type="text"
              placeholder="Search by commit message"
            />
          </div>
        </div>
        <ul className="commits-grid" id="commits">
          {items.length ? (
            items.map((commit, index) => <Commit key={index} commit={commit} />)
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
