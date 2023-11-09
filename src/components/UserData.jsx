import React from 'react';

function UserData({ selectedUser }) {
  console.log("select", selectedUser);
  return (
    <div className="userDataContainer">
      <img src={selectedUser.avatar_url} alt="Avatar" className="userAvatar" />
      <p className="username">{selectedUser.login}</p>
      <p className="userInfo">{selectedUser.location}</p>
      <p className="userInfo">{selectedUser.bio}</p>
      <div className="followers_Following">
        <p className="followers">Followers: {selectedUser.followers}</p>
        <p className="following">Following: {selectedUser.following}</p>
      </div>
    </div>
  );
}

export default UserData;
