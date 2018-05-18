import axios from 'axios';
const BASE_URL = 'https://api.github.com'

export const fetchCommits = repository => ({
  type: 'FETCH_COMMITS',
  repository 
})

export const receiveCommits = commits => ({
    type: 'RECEIVE_COMMITS',
    commits,
})

export const fetchRepositories = user => ({
  type: 'FETCH_REPOSITORIES',
  user,
});

export const receiveRepositories = (repositories, user) => ({
  type: 'RECEIVE_REPOSITORIES',
  repositories,
  user,
})

export const emptyRepositories = ()  => ({
    type: 'EMPTY_REPOSITORIES',
})

export const emptyCommits = ()  => ({
    type: 'EMPTY_COMMITS',
})

export const getRepositories = (user) => {
  return (dispatch) => {
    dispatch(fetchRepositories(user));
    return axios.get(`${BASE_URL}/users/${user}/repos`)
    .then(({ data }) => dispatch(receiveRepositories(data, user)))
    .catch(error =>  new Error(error));
  }
}

export const getCommits = (user, repository) => {
  return (dispatch) => {
    dispatch(fetchCommits(repository));
    return axios.get(`${BASE_URL}/repos/${user}/${repository}/commits`)
    .then(({ data }) => receiveCommits(data))
    .catch(error =>  console.log(error));
  }
}
