"use client";

import { X } from 'lucide-react';
import { useState } from 'react';

export function TemperatureLogModal({
  plants,
  onClose,
  onSubmit
}) {
  const [selectedPlant, setSelectedPlant] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [currentTemp, setCurrentTemp] = useState(22);
  const [expectedTemp] = useState(20);

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
      onSubmit(selectedPlant, currentTemp);
      onClose();
    }
  };

  const getTempStatus = () => {
    const diff = currentTemp - expectedTemp;
    if (Math.abs(diff) <= 3) return { text: 'Optimal Temperature', color: '#6b8e75' };
    if (diff > 3) return { text: 'High Temperature', color: '#d4a574' };
    return { text: 'Low Temperature', color: '#5a8a9a' };
  };

  const status = getTempStatus();

  // Helper to normalize temperature (0-40C range assumed for position calculation)
  const normalizeTempPosition = (temp) => {
    const minRange = 0;
    const maxRange = 40;
    return Math.max(0, Math.min(100, ((temp - minRange) / (maxRange - minRange)) * 100));
  };

  return (
    <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
      <div className="min-h-screen pb-24">
        <div className="p-6 pb-4 flex justify-between items-start sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-[#3d5a4a] text-2xl">Plant Temperature</h2>
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
                  <span className="text-[#3d5a4a]">Expected Temp: {expectedTemp}°C</span>
                </div>
                
                <div className="relative h-32 flex items-center justify-center mb-4">
                  <div className="relative w-full max-w-xs">
                    {/* Optimal range: Left 1/4 to Right 1/4 */}
                    <div className="absolute left-1/4 right-1/4 top-1/2 -translate-y-1/2 h-24 bg-[#6b8e75] opacity-30 rounded-lg" />
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#3d5a4a]" />
                    <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-0.5 h-24 bg-[#3d5a4a]" />
                    <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-0.5 h-24 bg-[#3d5a4a]" />
                    
                    {/* Current Temp Marker */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#8b6f47] rounded-full border-4 border-white shadow-lg z-10"
                      style={{ 
                        left: `${normalizeTempPosition(currentTemp)}%`,
                        transform: 'translate(-50%, -50%)' // Center the marker
                      }}
                    />
                    {/* Expected Temp Marker (Static/Target) */}
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 bg-[#3d5a4a] rounded-full border-2 border-white shadow-lg z-0"
                      style={{ 
                        left: `${normalizeTempPosition(expectedTemp)}%`,
                        transform: 'translate(-50%, -50%)' // Center the marker
                      }}
                    />
                  </div>
                </div>
                
                <div className="text-center mb-2">
                  <p className="text-[#8b6f47] text-sm mb-1">Current</p>
                  <p className="text-[#8b6f47] text-5xl">{currentTemp}°C</p>
                  <p className="text-[#8b6f47]">Temperature</p>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} /> {/* Corrected syntax */}
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