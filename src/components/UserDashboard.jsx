// src/components/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import './UserDashboard.css';
import { createRecord, readRecords } from '../utils/supabaseCRUD';

const UserDashboard = ({ loggedInUsername }) => {
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [showJoinGroup, setShowJoinGroup] = useState(false);
  const [players, setPlayers] = useState([{ id: 1, name: '' }]);
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchJoinableGroups();
  }, []);

  // Fetch groups that allow joining
  const fetchJoinableGroups = async () => {
    const data = await readRecords('Groups', { open: true });
    if (data) setGroups(data);
  };

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

  // Check if group name is unique and handle group creation
  const handleSubmitGroup = async () => {
    if (!groupName.trim()) {
      alert('Please enter a group name.');
      return;
    }

    // Step 1: Check if group name already exists
    const existingGroup = await readRecords('Groups', { group_name: groupName });
    if (existingGroup && existingGroup.length > 0) {
      alert(`A group with the name "${groupName}" already exists. Please choose a different name.`);
      return;
    }

    // Step 2: Validate logged-in user and players
    const membersToAdd = [{ group_name: groupName, username: loggedInUsername }];
    
    // Check if logged-in user is already in another group
    const userInAnotherGroup = await readRecords('Group_members', { username: loggedInUsername });
    if (userInAnotherGroup && userInAnotherGroup.length > 0) {
      alert(`You are already a member of another group and cannot create a new one.`);
      return;
    }

    for (const player of players) {
      if (player.name.trim()) {
        const userExists = await readRecords('Users', { username: player.name.trim() });
        if (!userExists || userExists.length === 0) {
          alert(`Invalid username: ${player.name}`);
          return;
        }

        const playerInAnotherGroup = await readRecords('Group_members', { username: player.name.trim() });
        if (playerInAnotherGroup && playerInAnotherGroup.length > 0) {
          alert(`User "${player.name}" is already in another group.`);
          return;
        }

        membersToAdd.push({ group_name: groupName, username: player.name.trim() });
      }
    }

    // Step 3: Create the group in the Groups table
    try {
      await createRecord('Groups', {
        group_name: groupName,
        status: false,
        open: open,
      });
      console.log(`Group "${groupName}" created successfully.`);
    } catch (error) {
      console.error('Error creating group:', error);
      alert('There was an error creating the group. Please try again.');
      return;
    }

    // Step 4: Insert all valid members into Group_members table
    try {
      const insertPromises = membersToAdd.map(member => createRecord('Group_members', member));
      await Promise.all(insertPromises);

      console.log(`Members added to Group_members for group "${groupName}".`);
      
      setGroupName('');
      setPlayers([{ id: 1, name: '' }]);
      setOpen(false);
      fetchJoinableGroups();
      alert(`Group "${groupName}" created successfully with members!`);
    } catch (error) {
      console.error('Error adding members to Group_members:', error);
      alert('There was an error adding members to the group. Please try again.');
    }
  };

  // Handle "Join Group" button click
  const handleJoinGroup = async (groupId, groupName) => {
    const userInAnotherGroup = await readRecords('Group_members', { username: loggedInUsername });
    if (userInAnotherGroup && userInAnotherGroup.length > 0) {
      alert(`You are already a member of another group and cannot join "${groupName}".`);
      return;
    }

    try {
      const result = await createRecord('Group_members', {
        group_name: groupName,
        username: loggedInUsername,
      });
    
        alert(`Successfully joined "${groupName}"!`);
        fetchJoinableGroups();
      
    } catch (error) {
      console.error('Error joining group:', error);
      alert('There was an error joining the group. Please try again.');
    }
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
          <div className="group-name">
            <label>Group Name:</label>
            <input
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className="player-list-container">
            {players.map((player) => (
              <div key={player.id} className="player-field">
                <label>Player {player.id}:</label>
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
          </div>

          <button className="add-player-btn" onClick={addPlayer}>
            Add Player
          </button>

          <div className="checkbox-group">
            <input
              type="checkbox"
              checked={open}
              onChange={(e) => setOpen(e.target.checked)}
            />
            <label>Allow others to join</label>
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
          {groups.length === 0 ? (
            <p>No groups available to join</p>
          ) : (
            <ul className="group-list">
              {groups.map((group) => (
                <li key={group.id} className="group-item">
                  <span>{group.group_name}</span>
                  <button
                    className="join-group-btn"
                    onClick={() => handleJoinGroup(group.id, group.group_name)}
                  >
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

