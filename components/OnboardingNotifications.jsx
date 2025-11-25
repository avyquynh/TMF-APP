import { Bell, Camera, MapPin, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

export function OnboardingNotifications({ 
  onContinue, 
  onBack 
}) {
  const [notifications, setNotifications] = useState(true);
  const [camera, setCamera] = useState(false);
  const [location, setLocation] = useState(false);

  return (
    <div className="min-h-screen bg-[#f5f0eb] flex flex-col p-6">
      <button onClick={onBack} className="mb-12 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center">
        <ArrowLeft className="text-[#8b6f47]" size={20} />
      </button>
      
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full">
        <h1 className="text-[#8b6f47] text-3xl mb-4">Welcome to VitaPlant</h1>
        <p className="text-[#8b6f47] mb-12 text-center">
          This app helps monitor your plant water usage. To get the best experience, please enable these permissions.
        </p>
        
        <div className="space-y-4 mb-auto">
          <div className="bg-white rounded-3xl p-6 shadow-lg flex items-center gap-4">
            <div className="w-14 h-14 bg-[#c8ddc4] rounded-2xl flex items-center justify-center flex-shrink-0">
              <Bell className="text-[#2d5a3d]" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-[#8b6f47] mb-1">Stay Updated</h3>
              <p className="text-[#8b6f47] text-sm opacity-75">
                Turn on notifications to receive reminders and community updates.
              </p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`w-12 h-7 rounded-full transition-colors flex-shrink-0 ${
                notifications ? 'bg-[#2d5a3d]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  notifications ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-lg flex items-center gap-4">
            <div className="w-14 h-14 bg-[#c8ddc4] rounded-2xl flex items-center justify-center flex-shrink-0">
              <Camera className="text-[#2d5a3d]" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-[#8b6f47] mb-1">Log Your Watering</h3>
              <p className="text-[#8b6f47] text-sm opacity-75">
                Enable your camera and allow photo access.
              </p>
            </div>
            <button
              onClick={() => setCamera(!camera)}
              className={`w-12 h-7 rounded-full transition-colors flex-shrink-0 ${
                camera ? 'bg-[#2d5a3d]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  camera ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
          </div>
          
          <div className="bg-white rounded-3xl p-6 shadow-lg flex items-center gap-4">
            <div className="w-14 h-14 bg-[#c8ddc4] rounded-2xl flex items-center justify-center flex-shrink-0">
              <MapPin className="text-[#2d5a3d]" size={24} />
            </div>
            <div className="flex-1">
              <h3 className="text-[#8b6f47] mb-1">Works Anywhere</h3>
              <p className="text-[#8b6f47] text-sm opacity-75">
                Turn on Location Services to get the best possible data and assistance.
              </p>
            </div>
            <button
              onClick={() => setLocation(!location)}
              className={`w-12 h-7 rounded-full transition-colors flex-shrink-0 ${
                location ? 'bg-[#2d5a3d]' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 bg-white rounded-full transition-transform ${
                  location ? 'translate-x-6' : 'translate-x-1'
                } mt-1`}
              />
            </button>
          </div>
        </div>
        
        <div className="flex gap-2 justify-center mb-8">
          <div className="w-2 h-2 rounded-full bg-[#8b6f47]" />
          <div className="w-2 h-2 rounded-full bg-[#c8ddc4]" />
          <div className="w-2 h-2 rounded-full bg-[#c8ddc4]" />
        </div>
        
        <button
          onClick={() => onContinue(notifications)}
          className="w-full bg-[#2d5a3d] text-white py-4 rounded-2xl hover-[#234a31] transition-colors text-center"
        >
          Next
        </button>
      </div>
    </div>
  );
}
