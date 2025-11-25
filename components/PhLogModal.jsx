import { X } from 'lucide-react';
import { useState } from 'react';

export function PhLogModal({
  plants,
  onClose,
  onSubmit
}>;
  onClose: () => void;
  onSubmit: (plantId, ph) => void;
}) {
  const [selectedPlant, setSelectedPlant] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [currentPh, setCurrentPh] = useState(6.8);
  const [expectedPh] = useState(6.5);

  const handlePlantSelect = (e.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedPlant(value);
    if (value) {
      setTimeout(() => setIsConnected(true), 500);
    } else {
      setIsConnected(false);
    }
  };

  const handleSubmit = () => {
    if (selectedPlant) {
      onSubmit(selectedPlant, currentPh);
      onClose();
    }
  };

  const getPhStatus = () => {
    const diff = Math.abs(currentPh - expectedPh);
    if (diff <= 0.5) return { text: 'Optimal pH', color: '#6b8e75' };
    if (currentPh > expectedPh) return { text: 'High pH', color: '#8b6f7a' };
    return { text: 'Low pH', color: '#7aa595' };
  };

  const status = getPhStatus();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-[40px] w-full max-w-md shadow-2xl animate-slide-up pb-8">
        <div className="p-6 pb-4 flex justify-between items-start">
          <div>
            <h2 className="text-[#3d5a4a] text-2xl">Plant pH Level</h2>
            <h2 className="text-[#3d5a4a] text-2xl">Log</h2>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 bg-[#c8ddc4] rounded-2xl flex items-center justify-center hover-[#b8cdb4] transition-colors"
          >
            <X className="text-[#6b8e75]" size={24} />
          </button>
        </div>
        
        <div className="px-6 pb-6 space-y-4">
          <div>
            <label className="block text-[#6b8e75] mb-2">
              Enter the plant you are logging:
            </label>
            <input
              type="text"
              value={selectedPlant}
              onChange={handlePlantSelect}
              className="w-full px-4 py-3 rounded-xl border border-[#c8ddc4] bg-[#f5f0eb] focus-none focus-2 focus-[#2d5a3d]"
              placeholder="Plant 01 - Tomatoes"
            />
            {isConnected && selectedPlant && (
              <p className="text-[#8b8b8b] text-sm mt-2 text-center">
                {selectedPlant.split(' - ')[0]} is connected to Sensor_01
              </p>
            )}
          </div>
          
          {isConnected && selectedPlant && (
            <div className="bg-[#f5f0eb] rounded-3xl p-6">
              <p className="text-[#3d5a4a] text-center mb-4">
                Today's Date 3, 2025
              </p>
              
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[#3d5a4a]">Expected {expectedPh}</span>
                </div>
                
                <div className="relative h-32 flex items-center justify-center mb-4">
                  <div className="relative w-full max-w-xs">
                    <div className="absolute left-1/4 right-1/4 top-1/2 -translate-y-1/2 h-24 bg-[#6b8e75] opacity-30 rounded-lg" />
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#3d5a4a]" />
                    <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-0.5 h-24 bg-[#3d5a4a]" />
                    <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-0.5 h-24 bg-[#3d5a4a]" />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-4 border-white shadow-lg"
                      style={{ 
                        left: `${((currentPh - 5) / 4) * 100}%`,
                        backgroundColor.color
                      }}
                    />
                  </div>
                </div>
                
                <div className="text-center mb-2">
                  <p className="text-[#6b8e75] text-sm mb-1">Current</p>
                  <p className="text-[#6b8e75] text-5xl">pH {currentPh}</p>
                  <p className="text-[#6b8e75]">Level</p>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor.color }} />
                  <span className="text-[#6b8e75]">{status.text}</span>
                </div>
              </div>
            </div>
          )}
          
          <button
            onClick={isConnected && selectedPlant ? handleSubmit : () => {}}
            disabled={!selectedPlant}
            className="w-full bg-[#2d5a3d] text-white py-4 rounded-2xl hover-[#234a31] transition-colors text-center disabled-[#a8a8a8] disabled-not-allowed"
          >
            {isConnected && selectedPlant ? 'Submit Log' : 'Connect to Sensor'}
          </button>
        </div>
      </div>
    </div>
  );
}
