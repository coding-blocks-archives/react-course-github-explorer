import React from 'react';

const RepoCard = ({ repo }) => (
  <div className="card mb-4">
    <div className="card-body">
      <a href={repo.html_url} target="_blank">
        <h3>{repo.full_name}</h3>

        <p>
          <strong>Stars:</strong> {repo.stargazers_count}
        </p>
        <p className="mb-0">
          <strong>Watchers:</strong> {repo.watchers_count}
        </p>
      </a>
    </div>
  </div>
);

export default RepoCard;
