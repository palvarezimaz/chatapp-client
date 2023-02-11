import React from 'react';
import './css/SidePanel.css';
import RemoveUser from './RemoveUser';

function SidePanel({ usersList, userForDirectChat }) {
  return (
    <div className="SidePanel">
      <div className="ConnectedUsersBox">
        <h3>Users</h3>
        {usersList &&
          usersList.map((user, index) => (
            <li
              key={index}
              className={`eachUser ${user.hasNewMessages === true ? ' new-direct-messages' : ''
                }`}
              onClick={() => userForDirectChat(index)}
            >
              {user.username}
            </li>
          ))}
      </div>
      <div>
        <h3>DM</h3>
        <h3>
          <RemoveUser />
        </h3>
        <h4 className="MessageArea-Title-Sidebar">
        </h4>
      </div>
    </div>
  );
}

export default SidePanel;
