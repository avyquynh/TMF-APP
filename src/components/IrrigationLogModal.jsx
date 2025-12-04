"use client";

import { X } from 'lucide-react';
import { useState } from 'react';

export function IrrigationLogModal({
  plants,
  onClose,
  onSubmit
}) {
  const [selectedPlant, setSelectedPlant] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [currentMoisture, setCurrentMoisture] = useState(38);
  const [expectedMoisture] = useState(35);

  const handlePlantSelect = (e) => {
    // Corrected input change event handling for JSX
    const value = e.target.value;
    setSelectedPlant(value);
    // Simulate sensor connection when plant is entered
    if (value) {
      setTimeout(() => setIsConnected(true), 500);
    } else {
      setIsConnected(false);
    }
  };

  const handleConnect = () => {
    if (isConnected && selectedPlant) {
      // Show moisture data
      setIsConnected(true);
    }
  };

  const handleSubmit = () => {
    if (selectedPlant) {
      // The onSubmit prop is expected to be defined here
      // The original code passed `onSubmit` as a prop but also defined a local `handleSubmit`.
      // Assuming the local `handleSubmit` is meant to call the prop `onSubmit`:
      onSubmit(selectedPlant, currentMoisture);
      onClose();
    }
  };

  const getMoistureStatus = () => {
    const diff = currentMoisture - expectedMoisture;
    if (Math.abs(diff) <= 5) return { text: 'Optimal Moisture', color: '#6b8e75' };
    if (diff > 5) return { text: 'High Moisture', color: '#5a8a9a' };
    return { text: 'Low Moisture', color: '#d4a574' };
  };

  const status = getMoistureStatus();

  return (
    <div className="fixed inset-0 bg-white z-[100] overflow-y-auto">
      <div className="min-h-screen pb-24">
        <div className="p-6 pb-4 flex justify-between items-start sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-[#3d5a4a] text-2xl">Plant Irrigation &</h2>
            <h2 className="text-[#3d5a4a] text-2xl">Moisture Log</h2>
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
              placeholder="Enter plant name"
            />
            {isConnected && selectedPlant && (
              <p className="text-[#8b8b8b] text-sm mt-2 text-center">
                {/* Assuming plant name format is 'Name - Sensor' */}
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
                  <span className="text-[#3d5a4a]">Expected Level%</span>
                </div>
                
                <div className="relative h-32 flex items-center justify-center mb-4">
                  {/* Box plot style visualization */}
                  <div className="relative w-full max-w-xs">
                    <div className="absolute left-1/4 right-1/4 top-1/2 -translate-y-1/2 h-24 bg-[#6b8e75] opacity-30 rounded-lg" />
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-[#3d5a4a]" />
                    <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-0.5 h-24 bg-[#3d5a4a]" />
                    <div className="absolute right-1/4 top-1/2 -translate-y-1/2 w-0.5 h-24 bg-[#3d5a4a]" />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#6b8e75] rounded-full border-4 border-white shadow-lg"
                      style={{ left: `${(currentMoisture / 100) * 100}%` }}
                    />
                    <div 
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-[#6b8e75] rounded-full border-4 border-white shadow-lg"
                      style={{ left: `${(expectedMoisture / 100) * 100}%` }}
                    />
                  </div>
                </div>
                
                <div className="text-center mb-2">
                  <p className="text-[#6b8e75] text-sm mb-1">Current</p>
                  <p className="text-[#6b8e75] text-5xl">{currentMoisture}%</p>
                  <p className="text-[#6b8e75]">Moisture Level</p>
                </div>
                
                <div className="flex items-center justify-center gap-2">
                  {/* Corrected syntax: style={{ backgroundColor: status.color }} */}
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: status.color }} />
                  <span className="text-[#6b8e75]">Soil Moisture:</span>
                  <span className="text-[#6b8e75]">{status.text}</span>
                </div>
              </div>
            </div>
          )}
          
          <button
            // Corrected syntax: removed extraneous curly brace and fixed disabled attribute
            onClick={isConnected && selectedPlant ? handleSubmit : handleConnect}
            disabled={!selectedPlant}
            className="w-full bg-[#2d5a3d] text-white py-4 rounded-2xl hover-[#234a31] transition-colors text-center disabled:bg-[#a8a8a8] disabled:cursor-not-allowed"
          >
            {isConnected && selectedPlant ? 'Submit Log' : 'Connect to Sensor'}
          </button>
        </div>
      </div>
    </div>
  );
}