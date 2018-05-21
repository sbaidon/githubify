import React from 'react';

export default function Commit({ commit }) {
  return (
    <li className="media commit">
      <div className="media-content">
        <div className="content">
        <p>Sha:{commit.sha}</p>
        <p className="subtitle is-4">{commit.commit.message}</p>
        <small>Author: {commit.commit.author.name}</small> 
        <small>Date: {commit.commit.author.date}</small>
        </div>
      </div>
    </li>
  );
}