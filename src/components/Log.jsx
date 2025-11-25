import { Thermometer, Leaf, Droplets } from 'lucide-react';
import { useState } from 'react';
import { IrrigationLogModal } from './IrrigationLogModal';
import { TemperatureLogModal } from './TemperatureLogModal';
import { PhLogModal } from './PhLogModal';

export function Log({ 
  plants,
  onLogActivity,
  logActivities 
}>;
  onLogActivity: (type, plantId, value) => void;
  logActivities<{
    type;
    plantId;
    plantName;
    value;
    timestamp;
  }>;
}) {
  const [showIrrigationModal, setShowIrrigationModal] = useState(false);
  const [showTemperatureModal, setShowTemperatureModal] = useState(false);
  const [showPhModal, setShowPhModal] = useState(false);

  const formatTimestamp = (date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays === 0) {
      const timeStr = date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12 
      });
      return `Today, ${timeStr}`;
    } else if (diffDays === 1) {
      const timeStr = date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12 
      });
      return `Yesterday, ${timeStr}`;
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12
      });
    }
  };

  const getActivityIcon = (type) => {
    if (type === 'irrigation') return <Droplets className="text-[#5a8a9a]" size={24} />;
    if (type === 'temperature') return <Thermometer className="text-[#8b6f47]" size={24} />;
    if (type === 'pH') return <Leaf className="text-[#6b8e75]" size={24} />;
    return <Droplets className="text-[#5a8a9a]" size={24} />;
  };

  const getActivityLabel = (type) => {
    if (type === 'irrigation') return 'Moisture';
    if (type === 'temperature') return 'Temperature';
    if (type === 'pH') return 'pH';
    return type;
  };

  return (
    <div className="px-6 py-6 pb-24">
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setShowTemperatureModal(true)}
          className="bg-white rounded-3xl p-6 shadow-lg hover-xl transition-shadow"
        >
          <div className="flex flex-col items-center">
            <Thermometer size={40} className="text-[#8b6f47] mb-3" />
            <p className="text-[#8b6f47] text-center mb-3">Log temperature</p>
            <div className="w-8 h-8 bg-[#f5f0eb] rounded-lg flex items-center justify-center">
              <span className="text-[#8b6f47] text-xl">+</span>
            </div>
          </div>
        </button>
        
        <button
          onClick={() => setShowPhModal(true)}
          className="bg-white rounded-3xl p-6 shadow-lg hover-xl transition-shadow"
        >
          <div className="flex flex-col items-center">
            <Leaf size={40} className="text-[#6b8e75] mb-3" />
            <p className="text-[#8b6f47] text-center mb-3">Log pH</p>
            <div className="w-8 h-8 bg-[#f5f0eb] rounded-lg flex items-center justify-center">
              <span className="text-[#6b8e75] text-xl">+</span>
            </div>
          </div>
        </button>
      </div>
      
      <button
        onClick={() => setShowIrrigationModal(true)}
        className="w-full bg-white rounded-3xl p-6 shadow-lg hover-xl transition-shadow mb-6"
      >
        <div className="flex flex-col items-center">
          <Droplets size={40} className="text-[#5a8a9a] mb-3" />
          <p className="text-[#8b6f47] text-center mb-3">Log plant irrigation & moisture</p>
          <div className="w-8 h-8 bg-[#f5f0eb] rounded-lg flex items-center justify-center">
            <span className="text-[#5a8a9a] text-xl">+</span>
          </div>
        </div>
      </button>
      
      <div className="bg-white rounded-3xl p-6 shadow-lg">
        <h3 className="text-[#2d5a3d] mb-4">My Recent Activity</h3>
        {logActivities.length === 0 ? (
          <p className="text-[#8b6f47] text-center py-4">No recent activity</p>
        ) : (
          <div className="space-y-4">
            {logActivities.slice(0, 5).map((activity, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#c8ddc4] rounded-full flex items-center justify-center flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-[#2d5a3d]">{activity.plantName}</p>
                  <p className="text-[#6b8e75]">{getActivityLabel(activity.type)}</p>
                </div>
                <span className="text-[#8b6f47] text-sm">{formatTimestamp(activity.timestamp)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {showIrrigationModal && (
        <IrrigationLogModal
          plants={plants}
          onClose={() => setShowIrrigationModal(false)}
          onSubmit={(plantId, value) => {
            onLogActivity('irrigation', plantId, value);
            setShowIrrigationModal(false);
          }}
        />
      )}
      
      {showTemperatureModal && (
        <TemperatureLogModal
          plants={plants}
          onClose={() => setShowTemperatureModal(false)}
          onSubmit={(plantId, value) => {
            onLogActivity('temperature', plantId, value);
            setShowTemperatureModal(false);
          }}
        />
      )}
      
      {showPhModal && (
        <PhLogModal
          plants={plants}
          onClose={() => setShowPhModal(false)}
          onSubmit={(plantId, value) => {
            onLogActivity('pH', plantId, value);
            setShowPhModal(false);
          }}
        />
      )}
    </div>
  );
}
