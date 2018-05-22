import { connect } from 'react-redux';
import {
  getRepositories,
  emptyCommits,
  getCommits,
  fetchLastPage,
} from '../actions';
import Main from '../components/Main';

const mapStateToProps = ({
  activeRepository,
  activeUser,
  commitsByRepository,
  repositoriesByUser,
}) => {
  const commits = commitsByRepository[activeRepository];
  const repositories = repositoriesByUser[activeUser];
  return {
    activeRepository,
    activeUser,
    commits,
    repositories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRepositories(user) {
      return dispatch(getRepositories(user));
    },
    emptyCommits() {
      return dispatch(emptyCommits());
    },
    getCommits(owner, repository, page = 1) {
      return dispatch(getCommits(owner, repository, page));
    },
    setLastPage(owner, repository) {
      return dispatch(fetchLastPage(owner, repository));
    },
  };
};

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default MainContainer;
