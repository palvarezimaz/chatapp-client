import React from 'react';

function RemoveUser({ selectedUserForDirectChat, removeDirectChatUser }) {
  return (
    <div className="RemoveUser">
      <h3 onClick={removeDirectChatUser}>{selectedUserForDirectChat}</h3>
    </div>
  );
}

export default RemoveUser;
