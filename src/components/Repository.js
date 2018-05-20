import React from 'react';

export default function Respository({ repository, onClick }) {
  return (
    <div className="repository card">
      <div className="card-content">
        <p className="title">{repository.name}</p>
        <p className="subtitle">{repository.language}</p>
      </div>
      <footer className="card-footer">
        <a
          className="card-footer-item"
          onClick={() => onClick(repository.owner.login, repository.name)}
        >
          See commits
        </a>
      </footer>
    </div>
  );
}
