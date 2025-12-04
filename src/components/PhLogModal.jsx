import { X } from 'lucide-react';
import { useState } from 'react';

export function PhLogModal({
  plants,
  onClose,
  onSubmit
}) {
  const [selectedPlant, setSelectedPlant] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [currentPh, setCurrentPh] = useState(6.8);
  const [expectedPh] = useState(6.5);

  const handlePlantSelect = (e) => {
    // Corrected input change event handling for JSX
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
    if (currentPh > expectedPh) return { text: 'High pH (Alkaline)', color: '#8b6f7a' };
    return { text: 'Low pH (Acidic)', color: '#7aa595' };
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
            className="w-12 h-12 bg-[#c8ddc4] rounded-2xl flex items-center justify-center hover:bg-[#b8cdb4] transition-colors" // Fixed hover class syntax
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
              className="w-full px-4 py-3 rounded-xl border border-[#c8ddc4] bg-[#f5f0eb] focus:ring-2 focus:ring-[#2d5a3d] focus:outline-none" // Corrected focus classes
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
                  <span className="text-[#3d5a4a]">Expected pH: {expectedPh}</span>
                </div>
                
                <div className="relative h-32 flex items-center justify-center mb-4">
                  <div className="relative w-full max-w-xs">
                    {/* Simplified pH scale visualization */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#3d5a4a]" />
                    <div className="absolute w-full top-1/2 -translate-y-1/2 h-2 rounded-full opacity-60" 
                         style={{ background: 'linear-gradient(to right, #7aa595, #6b8e75, #8b6f7a)' }}/> 
                    
                    {/* Marker for current pH. Assuming range is roughly 5 to 9 for calculation (pH 0-14 scale, but 5-9 is common for plants) */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-4 border-white shadow-lg z-10"
                      style={{ 
                        // Estimate position: (Current pH - Min pH) / (Max pH - Min pH) * 100%. 
                        // Using a visual range of 4 to 10.
                        left: `${((currentPh - 4) / 6) * 100}%`,
                        backgroundColor: status.color // Corrected syntax
                      }}
                    />
                     {/* Marker for expected pH */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border-2 border-white shadow-lg z-0"
                      style={{ 
                        left: `${((expectedPh - 4) / 6) * 100}%`,
                        backgroundColor: '#3d5a4a' 
                      }}
                    />
                  </div>
                </div>
                
                <div className="text-center mb-2">
                  <p className="text-[#6b8e75] text-sm mb-1">Current</p>
                  <p className="text-[#6b8e75] text-5xl">pH {currentPh.toFixed(1)}</p>
                  <p className="text-[#6b8e75]">Level</p>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                  <span className="text-[#6b8e75]">{status.text}</span>
                </div>
              </div>
            </div>
          )}
          
          <button
            onClick={isConnected && selectedPlant ? handleSubmit : () => {}}
            disabled={!selectedPlant}
            className="w-full bg-[#2d5a3d] text-white py-4 rounded-2xl hover:bg-[#234a31] transition-colors text-center disabled:bg-[#a8a8a8] disabled:cursor-not-allowed" // Fixed disabled classes
          >
            {isConnected && selectedPlant ? 'Submit Log' : 'Connect to Sensor'}
          </button>
        </div>
      </div>
    </div>
  );
}