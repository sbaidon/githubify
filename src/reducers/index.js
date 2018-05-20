import { combineReducers } from 'redux';
import { commitsByRepository, activeRepository } from './commits';
import { repositoriesByUser, activeUser } from './repositories';

export default combineReducers({
  commitsByRepository,
  repositoriesByUser,
  activeUser,
  activeRepository,
});
