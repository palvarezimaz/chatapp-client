import React from 'react';
import RemoveUser from './RemoveUser';

function SidePanel({
  usersList,
  rooms,
  // selectedUserForDirectChat,
  userForDirectChat,
  // removeDirectChatUser,
}) {
  return (
    <div className="SidePanel">
      <div className="ConnectedUsersBox">
        <h4>Connected users</h4>
        {usersList &&
          usersList.map((user, index) => (
            <li
              key={index}
              className="eachUser"
              onClick={() => userForDirectChat(index)}
            >
              {user.username}
              <br />
              Connected: {user.connected === true ? 'yes' : 'no'}
            </li>
          ))}
      </div>
      <div className="RoomsBox">
        <h4>Private Messages or Rooms</h4>
        {rooms &&
          rooms.map((room, index) => (
            <li key={index} className="eachRoom">
              {room}
            </li>
          ))}
      </div>
      <div>
        <h3>Direct message:</h3>
        <h3>
          <RemoveUser />
        </h3>
      </div>
    </div>
  );
}

export default SidePanel;
