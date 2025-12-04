import React, { useState } from 'react';
import { JoinCreateCommunity } from './JoinCreateCommunity'; 

let nextId = 1; 
const generateId = () => (nextId++).toString();

export function CommunityManager() {

  const [communities, setCommunities] = useState([]);

  const handleCreateCommunity = () => {
    const newCommunity = {
      id: generateId(),
      name: `User-Created Community ${nextId}`, 
      logo: '⭐',
      location: 'Default Location'
    };
    setCommunities((prevCommunities) => [...prevCommunities, newCommunity]);

    alert(`Community "${newCommunity.name}" created and stored!`);
  };

  const handleJoinCommunity = (id, name, location) => {
    console.log(`Joining community: ${name} (${id}) at ${location}`);
  };

  const handleBack = () => {
    console.log("Navigating back...");
  };


  return (
    <JoinCreateCommunity 
      communities={communities}
      onJoinCommunity={handleJoinCommunity}
      onCreateCommunity={handleCreateCommunity} 
      onBack={handleBack}
    />
  );
}