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
​
export const fetchRepositories = user => ({
  type: 'FETCH_REPOSITORIES',
  user 
})

export const receiveRepositories = repositories => ({
  type: 'RECEIVE_REPOSITORIES',
  repositories
})

export const emptyRepositories = ()  => ({
    type: 'EMPTY_REPOSITORIES',
})
​
export const emptyCommits = ()  => ({
    type: 'EMPTY_COMMITS',
})

​
export const getRepositories = (user) => {
  return (dispatch) => {
    dispatch(fetchRepositories(user));
    return axios.get(`${BASE_URL}/users/${user}/repos`)
    .then(({ data }) => receiveRepositories(data))
    .catch(error =>  new Error(error));
  }
}

export const getCommits = (repository) => {
  return async (dispatch) => {
    dispatch(fetchCommits(repository));
    return axios.get(`${BASE_URL}/users/${user}/repos`)
    .then(({ data }) => receiveCommits(data))
    .catch(error =>  new Error(error));
  }
}
