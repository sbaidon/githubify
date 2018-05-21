import { connect } from 'react-redux';
import { getRepositories } from '../actions';
import Main from '../components/Main';

const mapStateToProps = ({ activeUser, activeRepository }) => {
  return {
    activeUser,
    activeRepository,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getRepositories(user) {
      dispatch(getRepositories(user));
    },
  };
};

const MainContainer = connect(mapStateToProps, mapDispatchToProps)(Main);

export default MainContainer;
