import axios from 'axios';
const BASE_URL = 'https://api.github.com';

export const emptyCommits = () => ({
  type: 'EMPTY_COMMITS',
  repository: null,
});

export const fetchCommits = repository => ({
  type: 'FETCH_COMMITS',
  repository,
});

export const receiveCommits = (commits, repository, lastPage) => ({
  type: 'RECEIVE_COMMITS',
  commits,
  repository,
  lastPage,
});

export const fetchRepositories = user => ({
  type: 'FETCH_REPOSITORIES',
  user,
});

export const receiveRepositories = (repositories, user) => ({
  type: 'RECEIVE_REPOSITORIES',
  repositories,
  user,
});

export const setLastPage = (lastPage, repository) => ({
  type: 'SET_LAST_PAGE',
  repository,
  lastPage,
});

export const getRepositories = user => {
  return dispatch => {
    dispatch(emptyCommits());
    dispatch(fetchRepositories(user));
    return axios
      .get(`${BASE_URL}/users/${user}/repos`)
      .then(({ data }) => dispatch(receiveRepositories(data, user)));
  };
};

export const getCommits = (owner, repository, page = 1) => {
  return dispatch => {
    dispatch(fetchCommits(repository.id));
    return axios
      .get(
        `${BASE_URL}/repos/${owner}/${repository.name}/commits?per_page=20&page=${page}&sort=author-date&order=asc`,
      )
      .then(response => {
        dispatch(receiveCommits(response.data, repository.id));
      });
  };
};

export const fetchLastPage = (owner, repository) => {
  return dispatch => {
    return axios
      .get(
        `${BASE_URL}/repos/${owner}/${repository.name}/commits?per_page=20&page=1&sort=author-date&order=asc`,
      )
      .then(response => {
        const lastPageRegex = /.*&page=(\d*).*rel="last"/;
        const link = response.headers.link || null;
        if (link) {
          const lastPage = Number(link.match(lastPageRegex).pop());
          dispatch(setLastPage(lastPage, repository.id));
          return;
        }
        // If there is no link last page is always 0
        dispatch(setLastPage(1, repository.id));
      });
  };
};
