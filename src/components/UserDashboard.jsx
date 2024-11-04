// src/components/UserDashboard.jsx
import React, { useState } from 'react';
import './UserDashboard.css';

const UserDashboard = () => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showJoinGroup, setShowJoinGroup] = useState(false);
  const [players, setPlayers] = useState([{ id: 1, name: '' }]);
  const [allowJoin, setAllowJoin] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([
    // Example groups, ideally fetched from database
    { id: 1, name: 'Team A', allowJoin: true },
    { id: 2, name: 'Team B', allowJoin: false },
    { id: 3, name: 'Team C', allowJoin: true },
  ]);

  // Handlers for adding and removing player fields
  const addPlayer = () => {
    setPlayers([...players, { id: players.length + 1, name: '' }]);
  };

  const removePlayer = (id) => {
    setPlayers(players.filter((player) => player.id !== id));
  };

  const handlePlayerChange = (id, value) => {
    setPlayers(players.map((player) => (player.id === id ? { ...player, name: value } : player)));
  };

  const handleSubmitGroup = () => {
    alert(`Group Created: ${groupName} with ${players.length} players`);
    // Code to save group to the database
  };

  const handleJoinGroup = (groupId) => {
    alert(`Joining group with ID: ${groupId}`);
    // Code to join the selected group
  };

  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>
      <button
        className="dashboard-btn"
        onClick={() => {
          setShowCreateGroup(true);
          setShowJoinGroup(false);
        }}
      >
        Create Group
      </button>
      <button
        className="dashboard-btn"
        onClick={() => {
          setShowCreateGroup(false);
          setShowJoinGroup(true);
        }}
      >
        Join Existing Group
      </button>

      {/* Create Group Section */}
      {showCreateGroup && (
        <div className="create-group-section">
          <h2>Create Group</h2>
          {players.map((player) => (
            <div key={player.id} className="player-field">
              <input
                type="text"
                placeholder="Player Name"
                value={player.name}
                onChange={(e) => handlePlayerChange(player.id, e.target.value)}
              />
              <button className="remove-player-btn" onClick={() => removePlayer(player.id)}>
                -
              </button>
            </div>
          ))}
          <button className="add-player-btn" onClick={addPlayer}>
            Add Player
          </button>

          <div className="checkbox-group">
            <input
              type="checkbox"
              checked={allowJoin}
              onChange={(e) => setAllowJoin(e.target.checked)}
            />
            <label>Allow others to join</label>
          </div>

          <div className="group-name">
            <label>Group Name:</label>
            <input
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <button className="submit-btn" onClick={handleSubmitGroup}>
            Submit
          </button>
        </div>
      )}

      {/* Join Existing Group Section */}
      {showJoinGroup && (
        <div className="join-group-section">
          <h2>Join Existing Group</h2>
          {groups.filter((group) => group.allowJoin).length === 0 ? (
            <p>No groups available to join</p>
          ) : (
            <ul className="group-list">
              {groups
                .filter((group) => group.allowJoin)
                .map((group) => (
                  <li key={group.id} className="group-item">
                    <span>{group.name}</span>
                    <button className="join-group-btn" onClick={() => handleJoinGroup(group.id)}>
                      Join
                    </button>
                  </li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
