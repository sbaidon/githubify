import { connect } from 'react-redux';
import { getCommits } from '../actions';
import RepositoriesList from '../components/RespositoriesList';

const mapStateToProps = ({
  repositoriesByUser,
  activeUser,
  activeRepository,
}) => {
  const repositories = activeUser
    ? repositoriesByUser[activeUser]
    : { items: [], isFetching: false };
  return {
    repositories,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCommits(owner, repository) {
      dispatch(getCommits(owner, repository));
    },
  };
};

const UserRepositories = connect(mapStateToProps, mapDispatchToProps)(
  RepositoriesList,
);

export default UserRepositories;
