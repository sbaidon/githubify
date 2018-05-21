const commits = (state = { isFetching: false, items: [] }, action) => {
  switch (action.type) {
    case 'FETCH_COMMITS':
      return {
        ...state,
        isFetching: true,
      };
    case 'RECEIVE_COMMITS':
      return {
        ...state,
        isFetching: false,
        items: [...state.items, ...action.commits],
      };
    default:
      return state;
  }
};

export const commitsByRepository = (state = {}, action) => {
  switch (action.type) {
    case 'RECEIVE_COMMITS':
    case 'FETCH_COMMITS':
      return {
        ...state,
        [action.repository]: commits(state[action.repository], action),
      };
    default:
      return state;
  }
};

export const activeRepository = (state = null, action) => {
  switch (action.type) {
    case 'EMPTY_COMMITS':
    case 'RECEIVE_COMMITS':
      return action.repository;
    default:
      return state;
  }
};
