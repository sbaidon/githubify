import React from 'react';

export default function Commit({ commit }) {
  return (
    <li className="content">
      <p className="title is-3 is-spaced">{commit.sha}</p>
      <p className="subtitle is-4">Author: {commit.commit.author.name}</p>
      <p className="subtitle is-4">Message: {commit.commit.message}</p>
      <p className="subtitle is-5">Date: {commit.commit.author.date}</p>
    </li>
  );
}
