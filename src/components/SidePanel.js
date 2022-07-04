import React from 'react';
import './css/SidePanel.css';
import RemoveUser from './RemoveUser';

function SidePanel({ usersList, rooms, userForDirectChat }) {
  console.log(`side panel userlist: ${usersList.map((user) => user.username)}`);
  return (
    <div className="SidePanel">
      <div className="ConnectedUsersBox">
        <h3>Connected users</h3>
        {usersList &&
          usersList.map((user, index) => (
            <li
              key={index}
              className="eachUser"
              onClick={() => userForDirectChat(index)}
            >
              {user.username}

              {user.hasNewMessages === true ? ' !!' : ' x'}
            </li>
          ))}
      </div>
      {/* <div className="RoomsBox">
        <h4>Private Messages or Rooms</h4>
        {rooms &&
          rooms.map((room, index) => (
            <li key={index} className="eachRoom">
              {room}
            </li>
          ))}
      </div> */}
      <div>
        <h3>Direct message</h3>
        <h3>
          <RemoveUser />
        </h3>
        <h4 className="MessageArea-Title-Sidebar">
          <span className="Chat-name-sidebar">Chat</span>
          <span className="App-name-sidebar">App</span>
        </h4>
      </div>
    </div>
  );
}

export default SidePanel;
