import { ArrowLeft } from 'lucide-react';

export function JoinCreateCommunity({ 
  communities,
  onJoinCommunity, 
  onCreateCommunity,
  onBack 
}) {
  return (
    <div className="min-h-screen bg-[#f5f0eb] flex flex-col p-6">
      <button onClick={onBack} className="mb-8 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
        <ArrowLeft className="text-[#8b6f47]" size={20} />
      </button>
      
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        <h1 className="text-[#8b6f47] text-3xl text-center mb-8">Join or Create a Community</h1>
        
        <div className="space-y-4 mb-8">
          {/* Renders communities from the prop */}
          {communities.map((community) => (
            <button
              key={community.id}
              onClick={() => onJoinCommunity(community.id, community.name, community.location)}
              className="w-full bg-white rounded-3xl p-6 shadow-lg hover-xl transition-shadow flex items-center gap-4"
            >
              <div className="w-16 h-16 bg-[#c8ddc4] rounded-full flex items-center justify-center text-2xl">
                {community.logo}
              </div>
              <span className="text-[#8b6f47] text-left">{community.name}</span>
            </button>
          ))}
          
          <button
            onClick={onCreateCommunity}
            className="w-full bg-white rounded-3xl p-6 shadow-lg hover-xl transition-shadow flex items-center gap-4"
          >
            <div className="w-16 h-16 bg-[#c8ddc4] rounded-full flex items-center justify-center text-2xl">
              ✏️
            </div>
            <span className="text-[#8b6f47] text-left">Create A Community</span>
          </button>
        </div>
        
        <div className="flex gap-2 justify-center mt-auto mb-8">
          <div className="w-2 h-2 rounded-full bg-[#8b6f47]" />
          <div className="w-2 h-2 rounded-full bg-[#c8ddc4]" />
          <div className="w-2 h-2 rounded-full bg-[#c8ddc4]" />
        </div>
        
        <button className="w-full bg-[#a8a8a8] text-white py-4 rounded-2xl text-center">
          Get Started
        </button>
      </div>
    </div>
  );
}