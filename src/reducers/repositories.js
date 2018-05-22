const repositories = (
  state = { lastPage: 0, isFetching: false, items: [] },
  action,
) => {
  switch (action.type) {
    case 'FETCH_REPOSITORIES':
      return {
        ...state,
        isFetching: true,
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
    case 'RECEIVE_REPOSITORIES':
    case 'FETCH_REPOSITORIES':
      return {
        ...state,
        [action.user]: repositories(state[action.repository], action),
      };
    default:
      return state;
  }
};

export const activeUser = (state = null, action) => {
  switch (action.type) {
    case 'FETCH_REPOSITORIES':
      return action.user;
    default:
      return state;
  }
};
