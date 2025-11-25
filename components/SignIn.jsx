import { useState } from 'react';

export function SignIn({ onSignIn, onCreateAccount }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-[#f5f0eb] flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-[#2d5a3d] text-4xl mb-2">VitaPlant</h1>
          <p className="text-[#8b6f47]">Track your community gardens</p>
        </div>
        
        <div className="bg-white rounded-3xl p-8 shadow-lg">
          <h2 className="text-[#2d5a3d] text-2xl mb-6">Sign In</h2>
          
          <div className="space-y-4">
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
            
            <button
              onClick={() => onSignIn(email, password)}
              className="w-full bg-[#2d5a3d] text-white py-3 rounded-2xl hover-[#234a31] transition-colors mt-6 text-center"
            >
              Sign In
            </button>
            
            <button
              onClick={onCreateAccount}
              className="w-full text-[#2d5a3d] py-3 rounded-2xl border-2 border-[#2d5a3d] hover-[#2d5a3d] hover-white transition-colors text-center"
            >
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
