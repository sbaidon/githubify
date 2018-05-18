const repositories = (state = { isFetching: false, items: [] }, action) => {
  switch (action.type) {
    case 'FETCH_REPOSITORIES':
      return {
        ...state,
        isFetching: false,
      };
    case 'RECEIVE_REPOSITORIES':
      return {
        ...state,
        isFetching: false,
        items: action.repositories,
      };
    default:
      return state;
  }
};

export const repositoriesByUser = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_REPOSITORIES':
      return {
        ...state,
        [action.user]: repositories(state[action.repository], action),
      };
    default:
      return state;
  }
};
