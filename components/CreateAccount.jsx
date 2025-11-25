import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export function CreateAccount({ 
  onCreate, 
  onBack 
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const canSubmit = name && email && password && password === confirmPassword;

  return (
    <div className="min-h-screen bg-[#f5f0eb] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <button onClick={onBack} className="mb-6 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center">
          <ArrowLeft className="text-[#8b6f47]" size={20} />
        </button>
        
        <div className="text-center mb-8">
          <h1 className="text-[#2d5a3d] text-4xl mb-2">VitaPlant</h1>
          <p className="text-[#8b6f47]">Create your account</p>
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-[#2d5a3d] text-2xl mb-6">Sign Up</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-[#8b6f47] mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#c8ddc4] focus-none focus-2 focus-[#2d5a3d]"
                placeholder="Your name"
              />
            </div>
            
            <div>
              <label className="block text-[#8b6f47] mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#c8ddc4] focus-none focus-2 focus-[#2d5a3d]"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label className="block text-[#8b6f47] mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#c8ddc4] focus-none focus-2 focus-[#2d5a3d]"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <label className="block text-[#8b6f47] mb-2">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#c8ddc4] focus-none focus-2 focus-[#2d5a3d]"
                placeholder="••••••••"
              />
            </div>
            
            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-red-500 text-sm">Passwords do not match</p>
            )}
            
            <button
              onClick={() => canSubmit && onCreate(email, password, name)}
              disabled={!canSubmit}
              className="w-full bg-[#2d5a3d] text-white py-3 rounded-2xl hover-[#234a31] transition-colors mt-6 text-center disabled-[#a8a8a8] disabled-not-allowed"
            >
              Create Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
