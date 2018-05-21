import {
  connect
} from 'react-redux';
import {
  getRepositories,
  emptyCommits,
  getCommits
} from '../actions';
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
      dispatch(getRepositories(user));
    },
    emptyCommits() {
      dispatch(emptyCommits());
    },
    getCommits(owner, repository) {
      dispatch(getCommits(owner, repository));
    },
  };
};

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default MainContainer;