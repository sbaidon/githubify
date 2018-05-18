const commits = (state = { isFetching: false, items: [] }, action) => {
  switch (action.type) {
    case 'FETCH_COMMITS':
      return {
        ...state,
        isFetching: false,
      };
    case 'RECEIVE_COMMITS':
      return {
        ...state,
        isFetching: false,
        items: action.commits,
      };
    default:
      return state;
  }
};

export const commitsByRepository = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_COMMITS':
      return {
        ...state,
        [action.repository]: commits(state[action.repository], action),
      };
    default:
      return state;
  }
};
