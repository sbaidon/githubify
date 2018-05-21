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

export const getRepositories = user => {
  return dispatch => {
    dispatch(emptyCommits());
    dispatch(fetchRepositories(user));
    return axios
      .get(`${BASE_URL}/users/${user}/repos`)
      .then(({ data }) => dispatch(receiveRepositories(data, user)))
  };
};

const lastPageRegex = /.*&page=(\d*)/;

export const getCommits = (owner, repository, page = 1) => {
  return dispatch => {
    dispatch(fetchCommits(repository));
    return axios
      .get(
        `${BASE_URL}/repos/${owner}/${repository}/commits?per_page=20&page=${page}&sort=author-date&order=asc`,
      )
      .then((response) => {
        const lastPage = Number(response.headers.link.match(lastPageRegex).pop());
        dispatch(receiveCommits(response.data, repository, lastPage)) 
      })
  };
};
