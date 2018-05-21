import { connect } from 'react-redux';
import CommitList from '../components/CommitList';
import { emptyCommits } from '../actions';

const mapStateToProps = ({
  commitsByRepository,
  activeRepository,
  activeUser,
}) => {
  const commits = activeRepository
    ? commitsByRepository[activeRepository]
    : { items: [], isFetching: false };
  return {
    commits,
    activeRepository,
    activeUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBack() {
      dispatch(emptyCommits());
    },
  };
};

const CommitsByRepository = connect(mapStateToProps, mapDispatchToProps)(
  CommitList,
);

export default CommitsByRepository;
