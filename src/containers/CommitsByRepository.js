import { connect } from 'react-redux';
import CommitList from '../components/CommitList';

const mapStateToProps = ({ commitsByRepository, activeRepository }) => {
  const commits = activeRepository
    ? commitsByRepository[activeRepository]
    : { items: [], isFetching: false };
  return {
    commits,
    activeRepository,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cleanCommits: () => {},
  };
};

const CommitsByRepository = connect(mapStateToProps, mapDispatchToProps)(
  CommitList,
);

export default CommitsByRepository;
