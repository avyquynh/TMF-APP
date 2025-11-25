import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export function CreateCommunity({ 
  onCreateCommunity, 
  onBack 
}) {
  const [communityName, setCommunityName] = useState('');
  const [communityLocation, setCommunityLocation] = useState('');

  return (
    <div className="min-h-screen bg-[#f5f0eb] flex flex-col p-6">
      <button onClick={onBack} className="mb-8 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
        <ArrowLeft className="text-[#8b6f47]" size={20} />
      </button>
      
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        <h1 className="text-[#8b6f47] text-3xl text-center mb-8">Create Your Community</h1>
        
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-8">
          <div className="mb-4">
            <label className="block text-[#8b6f47] mb-2">Community Name</label>
            <input
              type="text"
              value={communityName}
              onChange={(e) => setCommunityName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#c8ddc4] focus-none focus-2 focus-[#2d5a3d]"
              placeholder="Enter community name"
            />
          </div>
          
          <div>
            <label className="block text-[#8b6f47] mb-2">Location</label>
            <input
              type="text"
              value={communityLocation}
              onChange={(e) => setCommunityLocation(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#c8ddc4] focus-none focus-2 focus-[#2d5a3d]"
              placeholder="Enter location (e.g., Phoenix, AZ)"
            />
          </div>
        </div>
        
        <button
          onClick={() => communityName && communityLocation && onCreateCommunity(communityName, communityLocation)}
          disabled={!communityName || !communityLocation}
          className="w-full bg-[#2d5a3d] text-white py-4 rounded-2xl hover-[#234a31] transition-colors disabled-[#a8a8a8] disabled-not-allowed text-center"
        >
          Create Community
        </button>
      </div>
    </div>
  );
}
