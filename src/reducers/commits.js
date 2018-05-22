const commits = (state = { isFetching: false, items: [] }, action) => {
  switch (action.type) {
    case 'FETCH_COMMITS':
      // Object Spread Operator - To make a copy of the remaining properties inside the `state` object and maintain inmutability
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
    case 'SET_LAST_PAGE':
      return {
        ...state,
        lastPage: action.lastPage,
      };
    default:
      return state;
  }
};

// Default Parameters - To set default values in case one parameter is not passed to the function
export const commitsByRepository = (state = {}, action) => {
  switch (action.type) {
    case 'SET_LAST_PAGE':
    case 'RECEIVE_COMMITS':
    case 'FETCH_COMMITS':
      return {
        ...state,
        // Computed Property Names - To dinamically set a property name
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
