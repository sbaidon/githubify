import React from 'react';

export default function UserForm({ onSubmit, isLoading }) {
  const loadingClass = isLoading ? 'is-loading' : '';
  return (
    <form onSubmit={onSubmit}>
      <div className="field has-addons">
        <div className="control">
          <input
            required={true}
            className="input"
            type="text"
            placeholder="Find a repository"
            name="user"
          />
        </div>
        <div className="control">
          <button type="submit" className={`button is-info ${loadingClass}`}>
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
