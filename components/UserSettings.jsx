import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export function UserSettings({
  user,
  onSave,
  onBack
};
  onSave: (updatedUser) => void;
  onBack: () => void;
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [language, setLanguage] = useState(user.language);
  const [bio, setBio] = useState(user.bio || '');

  const handleSave = () => {
    onSave({ name, email, language, bio });
  };

  return (
    <div className="min-h-screen bg-[#f5f0eb]">
      <div className="bg-[#c8ddc4] px-6 py-4 flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover-gray-50 transition-colors"
        >
          <ArrowLeft size={20} className="text-[#8b6f47]" />
        </button>
        <h2 className="text-[#2d5a3d] text-2xl">User Settings</h2>
      </div>

      <div className="px-6 py-8 pb-24">
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="text-[#2d5a3d] mb-4">Personal Information</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-[#8b6f47] mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#c8ddc4] bg-[#f5f0eb] focus-none focus-2 focus-[#2d5a3d]"
              />
            </div>

            <div>
              <label className="block text-[#8b6f47] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#c8ddc4] bg-[#f5f0eb] focus-none focus-2 focus-[#2d5a3d]"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="text-[#2d5a3d] mb-4">Language Preference</h3>

          <div className="space-y-3">
            <button
              onClick={() => setLanguage('English')}
              className={`w-full px-6 py-4 rounded-2xl border-2 flex items-center gap-4 transition-colors ${
                language === 'English'
                  ? 'border-[#2d5a3d] bg-[#d4e8d4]'
                  : 'border-[#c8ddc4] bg-white hover-[#f5f0eb]'
              }`}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl">
                🇺🇸
              </div>
              <span className="text-[#5a7a66]">English</span>
            </button>

            <button
              onClick={() => setLanguage('Spanish')}
              className={`w-full px-6 py-4 rounded-2xl border-2 flex items-center gap-4 transition-colors ${
                language === 'Spanish'
                  ? 'border-[#2d5a3d] bg-[#d4e8d4]'
                  : 'border-[#c8ddc4] bg-white hover-[#f5f0eb]'
              }`}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl">
                🇲🇽
              </div>
              <span className="text-[#5a7a66]">Spanish</span>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="text-[#2d5a3d] mb-4">About Me</h3>

          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-[#c8ddc4] bg-[#f5f0eb] focus-none focus-2 focus-[#2d5a3d] min-h-[120px] resize-none"
            placeholder="Tell us about yourself..."
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-[#2d5a3d] text-white py-4 rounded-2xl hover-[#234a31] transition-colors text-center shadow-md"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
