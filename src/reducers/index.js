import { combineReducers } from 'redux';
import { commitsByRepository } from './commits';
import { repositoriesByUser } from './repositories';

export default combineReducers({
  commitsByRepository,
  repositoriesByUser,
});
