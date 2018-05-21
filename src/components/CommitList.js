import React, { Component } from 'react';
import Commit from './Commit';

class CommitList extends Component {
  observer = null;

  constructor(props) {
    super(props);
    const { commits: { items } } = props;
    this.state = {
      filteredCommits: items,
      page: 1,
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

  componentDidUpdate() {
    if(this.observer) {
      this.observer.observe(this.getLastCommitElement());
    }
  }

  componentDidMount() {
    if (!this.observer) {
      const options = { rootMargin: '100px', threshold: 1.0 }
      this.observer = new IntersectionObserver(() => {
        if (this.state.page === this.props.lastPage) {
          this.observer.unobserve(this.getLastCommitElement()); 
          return;
        } 
        const nextPage = this.state.page + 1;
        this.props.getNextCommits(nextPage);
        this.observer.unobserve(this.getLastCommitElement());
        this.setState({ page: nextPage });
      }, options);
      const lastCommit = this.getLastCommitElement();
      this.observer.observe(this.getLastCommitElement());
    }
  }

  getLastCommitElement = () => {
    const commits = document.querySelectorAll('.commit');
    const lastCommit = commits[commits.length - 1];
    return lastCommit;
  }

  render() {
    const { emptyCommits } = this.props;
    const { filteredCommits: items } = this.state;

    return (
      <section className="section" id="commit-list">
        <nav className="breadcrumb is-large" aria-label="breadcrumbs">
          <ul>
            <li><a onClick={emptyCommits}> &larr; Repositories</a></li>
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
      </section>
    );
  }
}

export default CommitList;
