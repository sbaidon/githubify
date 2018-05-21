import { connect } from 'react-redux';
import { getRepositories, emptyCommits, getCommits } from '../actions';
import Main from '../components/Main';

const mapStateToProps = ({
  activeRepository,
  activeUser,
  commitsByRepository,
  repositoriesByUser
}) => {
  const commits = commitsByRepository[activeRepository];
  const repositories = repositoriesByUser[activeUser];
  return {
    activeRepository,
    activeUser,
    commits,
    repositories
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
    getCommits(owner, repository, page = 0) {
      return dispatch(getCommits(owner, repository, page));
    },
  };
};

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default MainContainer;