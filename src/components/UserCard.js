import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex">
          <img className="img-round user-image mr-5" src={user.avatar_url} />
          <div>
            <h1>{user.name}</h1>
            <p className="mb-0 font-italic">{user.company}</p>
            <p className="mb-0">{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
