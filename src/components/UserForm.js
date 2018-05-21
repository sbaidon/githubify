import React from 'react';

export default function UserForm({ onSubmit }) {
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
          <button type="submit" className="button is-info">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
