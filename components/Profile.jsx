import { User } from 'lucide-react';
import { useRef } from 'react';

export function Profile({ 
  user,
  onLogout,
  onOpenSettings,
  onUpdateProfilePicture
};
  onLogout: () => void;
  onOpenSettings: () => void;
  onUpdateProfilePicture: (picture) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleEditPicture = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateProfilePicture(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const getRoleBadgeColor = (role) => {
    if (role === 'Owner' || role === 'Administrator') return 'bg-[#5a7a66]';
    if (role === 'Volunteer') return 'bg-[#5a7a66]';
    if (role === 'New') return 'bg-[#c8a962]';
    if (role === 'Gardener') return 'bg-[#8ba888]';
    return 'bg-[#8b6f47]';
  };

  return (
    <div className="min-h-screen bg-[#f5f0eb] pb-24">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <div className="px-6 py-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-32 h-32 bg-gradient-to-br from-[#5a9dd8] to-[#8bc992] rounded-full flex items-center justify-center mb-3 shadow-lg overflow-hidden">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <User size={64} className="text-white" />
            )}
          </div>
          <button onClick={handleEditPicture} className="text-[#8b6f47] cursor-pointer hover">
            Edit Picture
          </button>
        </div>
        
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="text-[#2d5a3d] mb-4">Roles</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {user.roles.map((role) => (
              <div 
                key={role} 
                className={`${getRoleBadgeColor(role)} text-white px-6 py-2 rounded-full`}
              >
                <span>{role}</span>
              </div>
            ))}
          </div>
          
          {user.communityLocation && (
            <>
              <h3 className="text-[#2d5a3d] mb-4">Community Location</h3>
              <div className="bg-[#f5f0eb] rounded-2xl p-4 mb-6">
                <p className="text-[#8b6f47]">{user.communityLocation}</p>
              </div>
            </>
          )}
          
          <h3 className="text-[#2d5a3d] mb-4">About Me</h3>
          <div className="bg-[#f5f0eb] rounded-2xl p-4 min-h-[100px]">
            <p className="text-[#8b6f47] text-sm">
              {user.bio || "I'm passionate about sustainable gardening and helping our community grow healthy plants."}
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={onLogout}
            className="w-full bg-[#2d5a3d] text-white py-4 rounded-2xl hover-[#234a31] transition-colors text-center shadow-md"
          >
            Sign Out
          </button>
          
          <button
            onClick={onOpenSettings}
            className="w-full bg-[#2d5a3d] text-white py-4 rounded-2xl hover-[#234a31] transition-colors text-center shadow-md"
          >
            User Settings
          </button>
        </div>
      </div>
    </div>
  );
}
